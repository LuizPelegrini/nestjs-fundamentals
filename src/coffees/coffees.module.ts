import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavour } from './entities/flavour.entity';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports: [EventsModule, TypeOrmModule.forFeature([Coffee, Flavour])],
  controllers: [CoffeesController],
  providers: [CoffeesService],
})
export class CoffeesModule {}
