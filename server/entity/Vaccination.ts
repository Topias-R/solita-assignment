import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Order } from './Order';

@Entity({ name: 'vaccinations' })
export class Vaccination {
  @PrimaryColumn('uuid')
  id!: string;

  @ManyToOne('Order', 'vaccinations')
  @JoinColumn({ name: 'sourceBottle' })
  sourceBottle!: Order;

  @Column({ type: 'varchar', length: '255' })
  gender!: string;

  @Column('timestamptz')
  vaccinationDate!: Date;

  @CreateDateColumn({ select: false })
  createdAt!: Date;

  @UpdateDateColumn({ select: false })
  updatedAt!: Date;
}
