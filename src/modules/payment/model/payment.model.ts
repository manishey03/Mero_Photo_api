import mongoose, { Model } from 'mongoose';

//
import { IPayment, PaymentMethod } from '../type';

//
const Schema = mongoose.Schema;
const PaymentSchema = new Schema<IPayment>({
  purchaseId: { type: Schema.Types.ObjectId, ref: 'Purchase', required: true },
  bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
  amount: { type: Number, required: true },
  pidx: {
    type: String,
  },
  paymentInfo: {
    type: String,
  },
  transactionId: {
    type: String,
  },
  paymentMethod: {
    type: String,
    default: PaymentMethod.ESEWA,
  },
  status: {
    type: String,
    default: 'success',
  },
});

//
const PaymentModel: Model<IPayment> = mongoose.model<IPayment>('Payment', PaymentSchema);
export type PaymentModelType = typeof PaymentModel;
export default PaymentModel;
