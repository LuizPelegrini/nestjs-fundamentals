import { DataSource } from 'typeorm';
import { Flavour } from './coffees/entities/flavour.entity';
import { Coffee } from './coffees/entities/coffee.entity';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin123',
  database: 'postgres',
  entities: [Coffee, Flavour],
  migrations: [__dirname + '/migrations/**/*{.js,.ts}'],
});
