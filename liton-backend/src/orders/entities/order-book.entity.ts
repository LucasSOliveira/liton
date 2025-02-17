// filepath: /c:/Users/lucas/Documents/projects/liton/liton-backend/src/orders/entities/order-book.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Book } from '../../books/entities/book.entity';

@Entity('order_books')
export class OrderBook {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.orderBooks, { nullable: false })
  order: Order;

  @ManyToOne(() => Book, { nullable: false })
  book: Book;

  @Column({ type: 'timestamp' })
  startRental: Date;

  @Column({ type: 'timestamp' })
  endRental: Date;

  @Column({ type: 'double precision' })
  unitValue: number;
}
