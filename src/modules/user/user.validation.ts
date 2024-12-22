import { object, string, InferType } from 'yup';
import { UserRole } from './type';

export const getUserSchema = object({
  user: string().oneOf(['user', 'photographer']).required('User type is required').default('user'),
});

export const loginSchema = object({
  email: string().email('Invalid email format').required('Email is required'),
  password: string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one capital letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%&*(){}]/, 'Password must contain at least one symbol (!@#$%&*(){})'),
});

export const registerSchema = object({
  firstName: string()
    .min(2, 'Should be at least two character')
    .max(10, 'Can not be greater than 10 character')
    .required('First name is required'),
  lastName: string()
    .min(2, 'Should be at least two character')
    .max(10, 'Can not be greater than 10 character')
    .required('Last name is required'),
  email: string().email('Invalid email format').required('Email is required'),
  password: string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Password must contain at least one capital letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%&*(){}]/, 'Password must contain at least one symbol (!@#$%&*(){})'),
  role: string().oneOf(Object.keys(UserRole)).optional(),
});

export const updateProfileSchema = object({
  firstName: string()
    .min(2, 'Should be at least two character')
    .max(10, 'Can not be greater than 10 character')
    .optional(),
  lastName: string()
    .min(2, 'Should be at least two character')
    .max(10, 'Can not be greater than 10 character')
    .optional(),
  bio: string().min(1, 'Bio should be at least one character').optional(),
  contact: string()
    .min(10, 'Contact number can not be less than 10 digit')
    .max(10, 'Contact number can not be greater than 10 digit')
    .optional(),
});

export const changePasswordSchema = object({
  oldPassword: string()
    .required('Old password is required')
    .min(8, 'Old password must be at least 8 characters long')
    .matches(/[A-Z]/, 'Old password must contain at least one capital letter')
    .matches(/[0-9]/, 'Old password must contain at least one number')
    .matches(/[!@#$%&*(){}]/, 'Old password must contain at least one symbol (!@#$%&*(){})'),
  newPassword: string()
    .required('New password is required')
    .min(8, 'New password must be at least 8 characters long')
    .matches(/[A-Z]/, 'New password must contain at least one capital letter')
    .matches(/[0-9]/, 'New password must contain at least one number')
    .matches(/[!@#$%&*(){}]/, 'New password must contain at least one symbol (!@#$%&*(){})'),
});

//
export type IGetUserSchemaType = InferType<typeof getUserSchema>;
//
export type ILoginSchemaType = InferType<typeof loginSchema>;
export type IChangePasswordSchemaType = InferType<typeof changePasswordSchema>;

export type IRegisterSchemaType = InferType<typeof registerSchema>;
export type IUpdateProfileSchemaType = InferType<typeof updateProfileSchema>;
