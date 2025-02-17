// /src/orders/entities/order.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Client } from '../../clients/entities/client.entity';
import { Payment } from './payment.entity';
import { OrderBook } from './order-book.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Client, (client) => client.orders, { nullable: false })
  client: Client;

  @CreateDateColumn({ type: 'timestamp' })
  dateCreated: Date;

  @Column({ type: 'double precision', default: 0 })
  shippingValue: number;

  @Column({ type: 'double precision', default: 0 })
  totalValue: number;

  @OneToOne(() => Payment, (payment) => payment.order, {
    cascade: true,
    nullable: true,
  })
  payment: Payment;

  @OneToMany(() => OrderBook, (orderBook) => orderBook.order, {
    cascade: true,
  })
  orderBooks: OrderBook[];
}
