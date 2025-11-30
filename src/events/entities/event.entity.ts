import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { EventName } from '../constants';

@Index(['name', 'type'])
@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Index()
  @Column({
    type: 'enum',
    enum: EventName,
  })
  name: EventName;

  @Column('json')
  payload: Record<string, any>;
}
