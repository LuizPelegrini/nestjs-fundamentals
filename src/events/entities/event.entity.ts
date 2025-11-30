import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EventName } from '../constants';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({
    type: 'enum',
    enum: EventName,
  })
  name: EventName;

  @Column('json')
  payload: Record<string, any>;
}
