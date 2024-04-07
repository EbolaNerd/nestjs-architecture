import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { CreateAlarmCommand } from './create-alarm.command';
import { Logger } from '@nestjs/common';
import { AlarmRepository } from '../ports/alarm.repository';
import { AlarmFactory } from 'src/alarms/domain/factories/alarm.factory';
import { AlarmCreatedEvent } from 'src/alarms/domain/events/alarm-created.event';

@CommandHandler(CreateAlarmCommand)
export class CreateAlarmCommandHandler
  implements ICommandHandler<CreateAlarmCommand>
{
  constructor(
    private readonly alarmRepository: AlarmRepository,
    private readonly alarmFactory: AlarmFactory,
    private readonly eventBus: EventBus,
  ) {}

  private readonly logger = new Logger(CreateAlarmCommandHandler.name);

  async execute(command: CreateAlarmCommand) {
    this.logger.debug(
      `Processing "CreateAlarmCommand": ${JSON.stringify(command)}`,
    );
    const alarm = this.alarmFactory.create(command.name, command.severity);
    const newAlarm = this.alarmRepository.save(alarm);

    this.eventBus.publish(new AlarmCreatedEvent(alarm));

    return newAlarm;
  }
}
