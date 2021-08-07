import {
  Entity,
  Column,
  PrimaryColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Vaccination } from './Vaccination';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryColumn('uuid')
  id!: string;

  @Column('int')
  orderNumber!: number;

  @Column({ type: 'varchar', length: '255', select: false })
  responsiblePerson!: string;

  @Column({ type: 'varchar', length: '255' })
  healthCareDistrict!: string;

  @Column({ type: 'varchar', length: '255' })
  vaccine!: string;

  @Column('smallint')
  injections!: string;

  @Column('timestamptz')
  arrived!: Date;

  @OneToMany('Vaccination', 'sourceBottle')
  vaccinations!: Vaccination[];

  @CreateDateColumn({ select: false })
  createdAt!: Date;

  @UpdateDateColumn({ select: false })
  updatedAt!: Date;
}
