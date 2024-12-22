import mongoose, { Model } from 'mongoose';

//
import { ICategoryUser } from '../type';

//
const Schema = mongoose.Schema;
const ReviewSchema = new Schema<ICategoryUser>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});

//
const CategoryUserModel: Model<ICategoryUser> = mongoose.model<ICategoryUser>('CategoryUser', ReviewSchema);
export type CategoryUserModelType = typeof CategoryUserModel;
export default CategoryUserModel;
