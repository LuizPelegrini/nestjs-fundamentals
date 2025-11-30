import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee-dto';
import { PatchCoffeeDto } from './dto/patch-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flavour } from './entities/flavour.entity';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
    @InjectRepository(Flavour)
    private readonly flavoursRepository: Repository<Flavour>,
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
