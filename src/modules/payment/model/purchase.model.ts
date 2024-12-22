import mongoose, { Model } from 'mongoose';

//
import { IPurchase, PaymentMethod, PaymentStatus } from '../type';

//
const Schema = mongoose.Schema;
const PurchaseSchema = new Schema<IPurchase>({
  bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
  amount: { type: Number, required: true },
  paymentMethod: {
    type: String,
    default: PaymentMethod.ESEWA,
  },
  purchaseDate: {
    type: Date,
    default: new Date(),
  },
  status: {
    type: String,
    default: PaymentStatus.PENDING,
  },
});

//
const PurchaseModel: Model<IPurchase> = mongoose.model<IPurchase>('Purchase', PurchaseSchema);
export type PurchaseModelType = typeof PurchaseModel;
export default PurchaseModel;
