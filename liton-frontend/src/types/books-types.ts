import type { CalendarDate, DateValue } from "@internationalized/date";

export interface Book {
    id: number;
    title: string;
    coverUrl?: string;
    author?: string;
    publishYear?: string;
    coverid?: string;
    rentalValue?: number;
}

export interface BookOrder {
    productId: number;
    startRental: CalendarDate | DateValue | any;
    endRental: CalendarDate | DateValue | any;
    unitValue: number;
    product: Book;
    period: string;
    rentalValue: number;
  }
  