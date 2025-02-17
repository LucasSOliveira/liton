export type PaymentType = 'credit' | 'ticket';

export interface Payment {
  paymentType: PaymentType;
  cardName?: string;
  cardNumber?: string;
  cardCCV?: string;
  cardValidity?: string;
  ticketNumber?: string;
}

export interface OrderBook {
  productId: number;
  startRental: Date;
  endRental: Date;
  unitValue: number;
}

export interface Order {
  id?: number;
  dateCreated?: string | Date;
  shippingValue?: number;
  totalValue?: number;
  payment?: Payment;
  orderBooks?: OrderBook[];
}