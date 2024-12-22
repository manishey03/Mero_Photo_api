import { object, string, InferType } from 'yup';

/**
 * Create Category Schema
 */
export const createCategorySchema = object({
  title: string()
    .trim()
    .min(1, 'Category should be at least 1 character')
    .max(50, 'Category can not be greater than 50 character')
    .required('Category is required'),
});

//
export type ICreateCategorySchemaType = InferType<typeof createCategorySchema>;
