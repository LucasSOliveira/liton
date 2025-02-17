// /src/orders/orders.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Payment, PaymentType } from './entities/payment.entity';
import { Client } from '../clients/entities/client.entity';
import { Book } from '../books/entities/book.entity';
import { OrderBook } from './entities/order-book.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async create(orderData: {
    client: Client;
    shippingValue: number;
    totalValue: number;
    payment: {
      paymentType: PaymentType;
      cardName?: string;
      cardNumber?: string;
      cardCCV?: string;
      cardValidity?: string;
      ticketNumber?: string;
    };
    orderBooks: {
      book: Book;
      startRental: Date;
      endRental: Date;
      unitValue: number;
    }[];
  }): Promise<Order> {
    const payment = new Payment();
    payment.paymentType = orderData.payment.paymentType;
    payment.cardNumber = orderData.payment.cardNumber || null;
    payment.cardCCV = orderData.payment.cardCCV || null;
    payment.cardValidity = orderData.payment.cardValidity || null;
    payment.ticketNumber = orderData.payment.ticketNumber || null;

    const orderBooks: OrderBook[] = [];
    for (const ob of orderData.orderBooks) {
      const orderBook = new OrderBook();
      orderBook.book = ob.book;
      orderBook.startRental = ob.startRental;
      orderBook.endRental = ob.endRental;
      orderBook.unitValue = ob.unitValue;
      orderBooks.push(orderBook);
    }

    const order = this.ordersRepository.create({
      client: orderData.client,
      shippingValue: orderData.shippingValue,
      totalValue: orderData.totalValue,
      payment,
      orderBooks,
    });

    const savedOrder: any = await this.ordersRepository.save(order);

    if (savedOrder) {
      delete savedOrder.client;
    }
    return savedOrder;
  }

  async findPaginatedForClient(
    clientId: number,
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: Order[]; total: number; page: number; limit: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await this.ordersRepository.findAndCount({
      where: { client: { id: clientId } },
      relations: ['payment', 'orderBooks', 'orderBooks.book'],
      skip,
      take: limit,
      order: { dateCreated: 'DESC' },
    });
    return { data, total, page, limit };
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: ['client', 'payment', 'orderBooks', 'orderBooks.book'],
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async update(id: number, updateData: Partial<Order>): Promise<Order> {
    await this.ordersRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.ordersRepository.delete(id);
  }
}
