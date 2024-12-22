import mongoose from 'mongoose';

//
import type { IUser } from '../user/type';
import type { ICreateBookingSchemaType } from './booking.validation';

export enum BookingStatus {
  REQUESTED = 'Requested',
  ACCEPTED = 'Accepted',
  DECLINED = 'Declined',
}

export interface IBooking {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  providerId: mongoose.Types.ObjectId;
  availabilityId: mongoose.Types.ObjectId;
  status: BookingStatus;
}

export interface IReview {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  bookingId: mongoose.Types.ObjectId;
  comment: string;
  rating: number;
}

// export type IBookingFilter = {
//   date?: string;
//   limit?: number;
//   page?: number;
// };

export interface ICount<T> {
  data: T[];
  count: number;
}

// export interface IBookingBusiness {
//   buildFilter(filters: IBookingFilter): { filter: Record<string, string>; limit: number; page: number };
// }

export interface IBookingService {
  create(user: IUser, data: ICreateBookingSchemaType): Promise<IBooking>;
}
