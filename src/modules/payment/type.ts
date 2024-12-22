import mongoose from 'mongoose';
import { IPaymentInitiateSchemaType } from './payment.validation';

export enum PaymentMethod {
  ESEWA = 'esewa',
  KHALTI = 'khalti',
}

export enum PaymentStatus {
  SUCCESS = 'success',
  FAILURE = 'failure',
  PENDING = 'pending',
}

export interface IPurchase {
  _id: mongoose.Types.ObjectId;
  bookingId: mongoose.Types.ObjectId;
  amount: number;
  paymentMethod: PaymentMethod;
  purchaseDate: Date;
  status: PaymentStatus;
}

export interface IPayment {
  _id: mongoose.Types.ObjectId;
  pidx: string;
  transactionId: string;
  purchaseId: mongoose.Types.ObjectId;
  bookingId: mongoose.Types.ObjectId;
  amount: number;
  paymentInfo: string;
  status: string;
  paymentMethod: PaymentMethod;
}

export interface IPaymentService {
  paymentInitiate(data: IPaymentInitiateSchemaType): Promise<{ url: string }>;
  completePayment(data: string): Promise<string>;
}
