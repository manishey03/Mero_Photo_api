import { Request, Response, NextFunction } from 'express';

//
import { bookingService } from './index';

//
import ApiResponse from '../../utils/api/apiResponse';

//
import type { IParamIdSchema } from '../../utils/validator';
import type { ICreateBookingSchemaType, ICreateReviewSchemaType } from './booking.validation';

//
import { IUser } from '../user/type';

/**
 * Booking Controller
 */
class BookingController {
  async create(req: Request<unknown, unknown, ICreateBookingSchemaType>, res: Response, next: NextFunction) {
    try {
      const response = await bookingService.create(req.user as IUser, req.body);

      //
      return new ApiResponse(res).addMessage('Booking created successfully').send(response);
    } catch (err) {
      next(err);
    }
  }

  async getBookingRequest(req: Request<IParamIdSchema>, res: Response, next: NextFunction) {
    try {
      const { data, count } = await bookingService.getBookingRequest(req.user as IUser, req.params.id);

      //
      return new ApiResponse(res).addMessage('Booking request fetched successfully').addMetadata({ count }).send(data);
    } catch (err) {
      next(err);
    }
  }

  async accept(req: Request<IParamIdSchema>, res: Response, next: NextFunction) {
    try {
      await bookingService.accept(req.user as IUser, req.params.id);

      //
      return new ApiResponse(res).addMessage('Booking accepted successfully').send({});
    } catch (err) {
      next(err);
    }
  }

  async decline(req: Request<IParamIdSchema>, res: Response, next: NextFunction) {
    try {
      await bookingService.decline(req.user as IUser, req.params.id);

      //
      return new ApiResponse(res).addMessage('Booking declined successfully').send({});
    } catch (err) {
      next(err);
    }
  }

  async review(req: Request<IParamIdSchema, unknown, ICreateReviewSchemaType>, res: Response, next: NextFunction) {
    try {
      await bookingService.review(req.user as IUser, req.params.id, req.body);

      //
      return new ApiResponse(res).addMessage('Review created successfully').send({});
    } catch (err) {
      next(err);
    }
  }
}

export default BookingController;
