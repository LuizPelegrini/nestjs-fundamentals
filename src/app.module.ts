import { Module } from '@nestjs/common';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsModule } from './events/events.module';
import { CoffeeRatingsModule } from './coffee-ratings/coffee-ratings.module';

@Module({
  imports: [
    CoffeesModule,
    EventsModule,
    CoffeeRatingsModule, // TODO: Not being used so far
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'admin123',
      database: 'postgres',
      // loads entities files automatically, without the need to add every single entity in the entities array
      autoLoadEntities: true,
      // Setting synchronize: true -> Indicates if database schema should be auto created on every application launch, as typeorm will keep it in sync with your entities
      // it shouldn't be used in production - otherwise you can lose production data.
      // for production, we should use migrations instead.
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
