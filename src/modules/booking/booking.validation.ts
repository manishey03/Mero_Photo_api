import { object, string, InferType, number } from 'yup';

//
// import { BookingStatus } from './type';

/**
 * Create Booking Schema
 */
export const createBookingSchema = object({
  // providerId: string().trim().required('Provider ID is required'),
  availabilityId: string().trim().required('Availability ID is required'),
  // status: string().oneOf(Object.keys(BookingStatus)).required('Status is required'),
});

/**
 * Create Review Schema
 */
export const createReviewSchema = object({
  comment: string()
    .trim()
    .min(1, 'Comment should be at least 1 character')
    .max(100, 'Comment can not be greater than 100 character')
    .required('Comment is required'),
  rating: number()
    .min(1, 'Rating should be at least 1')
    .max(5, 'Rating can not be greater than 5')
    .default(4)
    .optional(),
});

//
export type ICreateReviewSchemaType = InferType<typeof createReviewSchema>;
export type ICreateBookingSchemaType = InferType<typeof createBookingSchema>;
