import { InferType, object, string } from 'yup';

/**
 * Param ID schema
 */
export const paramIdSchema = object({
  id: string().trim().required('Id is required'),
});

//
export type IParamIdSchema = InferType<typeof paramIdSchema>;
