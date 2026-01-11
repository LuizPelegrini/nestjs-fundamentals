import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavour } from './flavour.entity';

@Entity('coffees')
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  brand: string;

  @JoinTable()
  @ManyToMany(
    () => Flavour,
    (flavour) => flavour.coffees,
    { cascade: true }, // ensures that when a coffee is created, the flavours are also created
  )
  flavours: Flavour[];

  @Column({ default: 0 })
  recommendations: number;
}
