import mongoose, { Model } from 'mongoose';

//
import { BookingStatus, IBooking } from '../type';

//
const Schema = mongoose.Schema;
const BookingSchema = new Schema<IBooking>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    providerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    availabilityId: { type: Schema.Types.ObjectId, ref: 'Availability', required: true },
    status: { type: String, default: BookingStatus.REQUESTED },
  },
  { timestamps: true },
);

//
const BookingModel: Model<IBooking> = mongoose.model<IBooking>('Booking', BookingSchema);
export type BookingModelType = typeof BookingModel;
export default BookingModel;
