import mongoose from 'mongoose';
import { ICreateCategorySchemaType } from './category.validation';

export interface ICategory {
  _id: mongoose.Types.ObjectId;
  title: string;
}

export interface ICategoryUser {
  _id: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
}

export interface ICount<T> {
  data: T[];
  count: number;
}

export interface ICategoryService {
  create(data: ICreateCategorySchemaType): Promise<ICategory>;
  get(): Promise<ICount<ICategory>>;
}
