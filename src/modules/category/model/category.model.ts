import mongoose, { Model } from 'mongoose';

//
import { ICategory } from '../type';

//
const Schema = mongoose.Schema;
const CategorySchema = new Schema<ICategory>(
  {
    title: { type: String, required: true },
  },
  { timestamps: true },
);

//
const CategoryModel: Model<ICategory> = mongoose.model<ICategory>('Category', CategorySchema);
export type CategoryModelType = typeof CategoryModel;
export default CategoryModel;
