import express from 'express';

//
import { bookingController } from './index';

//
import { auth, roleMiddleware } from '../../middleware';
import { bodyValidator, paramsValidator } from '../../middleware/validator.middleware';

//
import { paramIdSchema } from '../../utils/validator';
import { createBookingSchema, createReviewSchema } from './booking.validation';

//
const bookingRouter = express.Router();

//
bookingRouter
  .route('/')
  .post(auth, roleMiddleware.checkUser, bodyValidator(createBookingSchema), bookingController.create);

bookingRouter
  .route('/:id')
  .get(auth, roleMiddleware.checkProvider, paramsValidator(paramIdSchema), bookingController.getBookingRequest);

bookingRouter
  .route('/accept/:id')
  .post(auth, roleMiddleware.checkProvider, paramsValidator(paramIdSchema), bookingController.accept);

bookingRouter
  .route('/decline/:id')
  .post(auth, roleMiddleware.checkProvider, paramsValidator(paramIdSchema), bookingController.decline);

bookingRouter
  .route('/review/:id')
  .post(
    auth,
    roleMiddleware.checkUser,
    paramsValidator(paramIdSchema),
    bodyValidator(createReviewSchema),
    bookingController.review,
  );

//
export default bookingRouter;
