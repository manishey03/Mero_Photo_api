import mongoose, { Model } from 'mongoose';

//
import { IReview } from '../type';

//
const Schema = mongoose.Schema;
const ReviewSchema = new Schema<IReview>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    bookingId: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
    comment: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 4 },
  },
  { timestamps: true },
);

//
const ReviewModel: Model<IReview> = mongoose.model<IReview>('Review', ReviewSchema);
export type ReviewModelType = typeof ReviewModel;
export default ReviewModel;
