import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { AlarmItemEntity } from './alarm-item.entity';

@Entity('alarms')
export class AlarmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  severity: string;

  @Column()
  triggerdAt: Date;

  @Column()
  isAcknowledged: boolean;

  @OneToMany(() => AlarmItemEntity, (item) => item.alarm, { cascade: true })
  items: AlarmItemEntity[];
}
