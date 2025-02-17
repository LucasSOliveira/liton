// src/orders/entities/payment.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';

export enum PaymentType {
  CREDIT = 'credit',
  TICKET = 'ticket',
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: PaymentType })
  paymentType: PaymentType;

  @Column({ type: 'varchar', nullable: true })
  cardName: string | null;

  @Column({ type: 'varchar', nullable: true })
  cardNumber: string | null;

  @Column({ type: 'varchar', nullable: true })
  cardCCV: string | null;

  @Column({ type: 'varchar', nullable: true })
  cardValidity: string | null;

  @Column({ type: 'varchar', nullable: true })
  ticketNumber: string | null;

  @OneToOne(() => Order, (order) => order.payment)
  @JoinColumn()
  order: Order;
}
