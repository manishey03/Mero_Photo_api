//
import mongoose from 'mongoose';

//
import { UserRole } from '../user/type';
import type { ILoginSchemaType, IRegisterSchemaType } from './auth.validation';

//
export interface IUser {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface IUserResponse {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
}

export interface IAuthService {
  login(data: ILoginSchemaType): Promise<{ user: IUserResponse; accessToken: string; refreshToken: string }>;
  register(data: IRegisterSchemaType): Promise<IUser>;
}
