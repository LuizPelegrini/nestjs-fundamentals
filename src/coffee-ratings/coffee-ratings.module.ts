import { Module } from '@nestjs/common';
import { CoffeeRatingsService } from './coffee-ratings.service';
import { CoffeesModule } from 'src/coffees/coffees.module';

@Module({
  imports: [CoffeesModule],
  providers: [CoffeeRatingsService],
})
export class CoffeeRatingsModule {}
