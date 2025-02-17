import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BooksModule } from './books/books.module';
import { OpenLibraryModule } from './openlibrary/openlibrary.module';
import { Book } from './books/entities/book.entity';

import { Client } from './clients/entities/client.entity';
import { Order } from './orders/entities/order.entity';
import { Payment } from './orders/entities/payment.entity';
import { OrderBook } from './orders/entities/order-book.entity';

import { ClientsModule } from './clients/clients.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [Book, Client, Order, Payment, OrderBook],
        synchronize: true,
        retryAttempts: 10,
        retryDelay: 3000,
      }),
    }),
    BooksModule,
    OpenLibraryModule,
    ClientsModule,
    OrdersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
