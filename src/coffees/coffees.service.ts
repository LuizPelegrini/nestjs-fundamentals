import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee-dto';
import { PatchCoffeeDto } from './dto/patch-coffee.dto';
import { randomUUID } from 'node:crypto';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: randomUUID(),
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((coffee) => coffee.id === id);
    if (!coffee) {
      throw new NotFoundException(`Coffee with id ${id} not found`);
    }

    return coffee;
  }

  create({ name, brand, flavors }: CreateCoffeeDto) {
    this.coffees.push({
      id: randomUUID(),
      name,
      brand,
      flavors,
    });
  }

  update(coffeeId: string, coffeeDto: PatchCoffeeDto) {
    this.coffees = this.coffees.map((coffee) => {
      if (coffee.id === coffeeId) {
        return {
          ...coffee,
          ...coffeeDto,
        };
      }

      return coffee;
    });
  }

  remove(id: string) {
    this.coffees = this.coffees.filter((coffee) => coffee.id !== id);
  }
}
