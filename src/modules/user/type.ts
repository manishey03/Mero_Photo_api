import mongoose from 'mongoose';
import { IChangePasswordSchemaType, IRegisterSchemaType, IUpdateProfileSchemaType } from './user.validation';
import { IPayload } from '../../types/global';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  PHOTOGRAPHER = 'photographer',
}

//
export interface IUser {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
  bio: string;
  contact: string;
  featuredImages: string[];
}

export interface IUserResponse {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export interface ICount<T> {
  data: T[];
  count: number;
}

export interface IUserService {
  getUserByEmail(email: string): Promise<IUser>;
  createUser(data: IRegisterSchemaType): Promise<IUser>;
  update(user: IPayload, data: IUpdateProfileSchemaType): Promise<void>;
  changePassword(
    user: IPayload,
    data: IChangePasswordSchemaType,
  ): Promise<{ user: IUserResponse; accessToken: string; refreshToken: string }>;
  createProvider(data: IRegisterSchemaType): Promise<IUser>;
}
