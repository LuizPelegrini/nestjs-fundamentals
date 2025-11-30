import { Injectable } from '@nestjs/common';
import { EventDto } from './dto/create-event.dto';
import { EntityManager, Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}

  private getRepository(e?: EntityManager) {
    return e?.getRepository(Event) ?? this.eventsRepository;
  }

  create(eventDto: EventDto, entityManager?: EntityManager) {
    const repository = this.getRepository(entityManager);
    const event = repository.create(eventDto);
    return repository.save(event);
  }
}
