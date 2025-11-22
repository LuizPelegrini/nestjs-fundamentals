import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee-dto';
import { PatchCoffeeDto } from './dto/patch-coffee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeesRepository: Repository<Coffee>,
  ) {}

  findAll() {
    return this.coffeesRepository.find({
      relations: {
        flavours: true,
      },
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

  create(coffeeDto: CreateCoffeeDto) {
    const newCoffee = this.coffeesRepository.create(coffeeDto);
    return this.coffeesRepository.save(newCoffee);
  }

  async update(coffeeId: number, coffeeDto: PatchCoffeeDto) {
    // preloads existing entry and replaces its values with the ones coming from request
    const coffee = await this.coffeesRepository.preload({
      id: coffeeId,
      ...coffeeDto,
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
}
