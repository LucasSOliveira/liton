// src/orders/orders.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseGuards,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PaymentType } from './entities/payment.entity';
import { ClientsService } from '../clients/clients.service';
import { BooksService } from '../books/books.service';
import { Book } from 'src/books/entities/book.entity';

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly clientsService: ClientsService,
    private readonly booksService: BooksService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body()
    orderData: {
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
        productId: number;
        startRental: Date;
        endRental: Date;
        unitValue: number;
      }[];
    },
    @Request() req,
  ): Promise<Order> {
    const clientId = req.user.id;

    const client = await this.clientsService.findOne(clientId);
    if (!client) {
      throw new NotFoundException(`Client with id ${clientId} not found`);
    }

    const orderBooksData: {
      book: Book;
      startRental: Date;
      endRental: Date;
      unitValue: number;
    }[] = [];
    for (const ob of orderData.orderBooks) {
      const book = await this.booksService.findOne(ob.productId);
      if (!book) {
        throw new NotFoundException(`Book with id ${ob.productId} not found`);
      }
      orderBooksData.push({
        book,
        startRental: new Date(ob.startRental),
        endRental: new Date(ob.endRental),
        unitValue: ob.unitValue,
      });
    }

    return this.ordersService.create({
      client,
      shippingValue: orderData.shippingValue,
      totalValue: orderData.totalValue,
      payment: orderData.payment,
      orderBooks: orderBooksData,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findClientOrders(
    @Request() req,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    const clientId = req.user.id as number;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    return await this.ordersService.findPaginatedForClient(
      clientId,
      pageNumber,
      limitNumber,
    );
  }
}
