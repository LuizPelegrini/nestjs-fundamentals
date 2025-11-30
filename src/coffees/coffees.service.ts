import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee-dto';
import { PatchCoffeeDto } from './dto/patch-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Flavour } from './entities/flavour.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { EventsService } from 'src/events/events.service';
import { EventName } from 'src/events/constants';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
    @InjectRepository(Flavour)
    private readonly flavoursRepository: Repository<Flavour>,
    private readonly eventsService: EventsService,
    private readonly dataSource: DataSource,
  ) {}

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;

    return this.coffeesRepository.find({
      relations: {
        flavours: true,
      },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    const coffee = await this.coffeesRepository.findOne({
      where: { id },
      relations: { flavours: true },
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee with id ${id} not found`);
    }

    return coffee;
  }

  async create(coffeeDto: CreateCoffeeDto) {
    const flavours = await Promise.all(
      coffeeDto.flavours.map((name) => this.preloadFlavour(name)),
    );
    const newCoffee = this.coffeesRepository.create({
      ...coffeeDto,
      flavours,
    });
    return this.coffeesRepository.save(newCoffee);
  }

  async update(coffeeId: number, coffeeDto: PatchCoffeeDto) {
    // only update flavours if property is provided in request
    const flavours =
      coffeeDto.flavours &&
      (await Promise.all(
        coffeeDto.flavours.map((name) => this.preloadFlavour(name)),
      ));

    // preloads existing entry and replaces its values with the ones coming from request
    const coffee = await this.coffeesRepository.preload({
      id: coffeeId,
      ...coffeeDto,
      flavours,
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee with id ${coffeeId} not found`);
    }

    return this.coffeesRepository.save(coffee);
  }

  async remove(id: number) {
    const coffee = await this.findOne(id);
    return this.coffeesRepository.remove(coffee);
  }

  // TODO: This is not called anywhere yet
  async recommend(coffee: Coffee) {
    return this.dataSource.transaction(async (entityManager) => {
      coffee.recommendations++;
      await entityManager.save(coffee);
      await this.eventsService.create(
        {
          name: EventName.RECOMMEND_COFFEE,
          type: 'coffee',
          payload: {
            coffeeId: coffee.id,
          },
        },
        entityManager,
      );
    });
  }

  async preloadFlavour(name: string) {
    const flavour = await this.flavoursRepository.findOne({
      where: { name },
    });

    if (!flavour) {
      return this.flavoursRepository.create({
        name,
      });
    }

    return flavour;
  }
}
