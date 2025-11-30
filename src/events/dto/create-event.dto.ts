import { IsEnum, IsNotEmptyObject, IsObject, IsString } from 'class-validator';
import { EventName } from '../constants';

export class EventDto {
  @IsEnum(EventName)
  readonly name: EventName;

  @IsString()
  readonly type: string;

  @IsObject()
  @IsNotEmptyObject()
  readonly payload: Record<string, any>;
}
