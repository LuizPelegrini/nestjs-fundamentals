import { Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    const coffee = this.coffees.find((coffee) => coffee.id === +id);
    if (!coffee) {
      throw new NotFoundException(`Coffee with id ${id} not found`);
    }

    return coffee;
  }

  create(coffee: Coffee) {
    this.coffees.push(coffee);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(coffeeId: string, { id, ...body }: Coffee) {
    this.coffees = this.coffees.map((coffee) => {
      if (coffee.id === +coffeeId) {
        return {
          id: coffee.id,
          ...body,
        };
      }

      return coffee;
    });
  }

  remove(id: string) {
    this.coffees = this.coffees.filter((coffee) => coffee.id !== +id);
  }
}
