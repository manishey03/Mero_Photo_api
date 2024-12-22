import mongoose from 'mongoose';

//
import type { BookingModelType } from './model/booking.model';

//
import { BadRequestError, NotFoundError } from '../../utils/api/apiError';

//
import type { ICreateBookingSchemaType, ICreateReviewSchemaType } from './booking.validation';

//
import { BookingStatus } from './type';
import { AvailableStatus } from '../availability/type';

//
import type { IUser } from '../user/type';
import type { IBooking, IBookingService, ICount } from './type';

//
import type { ReviewModelType } from './model/review.model';
import type { UserModelType } from '../user/model/user.model';
import type { AvailabilityModelType } from '../availability/model/availability.model';
import type { NotificationModelType } from '../notification/model/notification.model';

/**
 * Booking Service
 */
class BookingService implements IBookingService {
  private bookingModel;
  private userModel;
  private availabilityModel;
  private reviewModel;
  private notificationModel;

  constructor(
    bookingModel: BookingModelType,
    userModel: UserModelType,
    availabilityModel: AvailabilityModelType,
    reviewModeL: ReviewModelType,
    notificationModel: NotificationModelType,
  ) {
    this.bookingModel = bookingModel;
    this.userModel = userModel;
    this.availabilityModel = availabilityModel;
    this.reviewModel = reviewModeL;
    this.notificationModel = notificationModel;
  }

  /**
   * Create booking
   */
  async create(user: IUser, data: ICreateBookingSchemaType): Promise<IBooking> {
    const availability = await this.availabilityModel.findById(data.availabilityId);
    if (!availability) {
      throw new BadRequestError('Availability not found');
    }

    // user.
    const userDetails = await this.userModel.findById(user._id);

    // Notification send to photographer
    await this.notificationModel.create({
      userId: String(availability.photographerId),
      title: `${userDetails?.firstName} ${userDetails?.lastName} sent you a booking request.`,
    });

    return await this.bookingModel.create({
      userId: user._id,
      providerId: String(availability.photographerId),
      availabilityId: String(data.availabilityId),
      status: BookingStatus.REQUESTED,
    });
  }

  /**
   * Get Booking Request
   */

  async getBookingRequest(user: IUser, availabilityId: string): Promise<ICount<IBooking>> {
    const count = await this.bookingModel.countDocuments({
      providerId: String(user._id),
      availabilityId: String(availabilityId),
    });
    const bookings = await this.bookingModel
      .find({
        providerId: String(user._id),
        availabilityId: String(availabilityId),
      })
      .populate({
        path: 'userId',
        model: 'User',
      })
      .populate({
        path: 'availabilityId',
      })
      .then((bookings) =>
        bookings.map((booking) => ({
          ...booking.toObject(),
          user: booking.userId,
          userId: booking.userId._id,
          availability: booking.availabilityId,
          availabilityId: booking.availabilityId._id,
        })),
      );

    return { data: bookings, count };
  }

  /**
   * Accept booking
   */
  async accept(user: IUser, id: string): Promise<void> {
    const booking = await this.bookingModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
      status: BookingStatus.REQUESTED,
      providerId: new mongoose.Types.ObjectId(user._id),
    });

    if (!booking) {
      throw new BadRequestError('Booking not found');
    }

    const provider = await this.userModel.findById(user._id);
    if (!provider) {
      throw new NotFoundError('Provider not found');
    }

    //
    await this.bookingModel.findByIdAndUpdate(id, { status: BookingStatus.ACCEPTED });
    await this.availabilityModel.findByIdAndUpdate(booking.availabilityId, { status: AvailableStatus.BOOKED });
    await this.notificationModel.create({
      userId: booking.userId,
      title: `${provider.firstName} ${provider.lastName} accepted your booking request.`,
    });
    return;
  }

  /**
   * Decline booking
   */
  async decline(user: IUser, id: string): Promise<void> {
    const booking = await this.bookingModel.findOne({
      _id: new mongoose.Types.ObjectId(id),
      status: BookingStatus.REQUESTED,
      providerId: new mongoose.Types.ObjectId(user._id),
    });

    if (!booking) {
      throw new BadRequestError('Booking not found');
    }

    const provider = await this.userModel.findById(user._id);
    if (!provider) {
      throw new NotFoundError('Provider not found');
    }

    await this.bookingModel.findByIdAndUpdate(id, { status: BookingStatus.DECLINED });
    await this.notificationModel.create({
      userId: booking.userId,
      title: `${provider.firstName} ${provider.lastName} declined your booking request.`,
    });
    return;
  }

  /**
   * Review Booking
   */
  async review(user: IUser, bookingId: string, data: ICreateReviewSchemaType): Promise<void> {
    const booking = await this.bookingModel.findOne({
      _id: new mongoose.Types.ObjectId(bookingId),
      userId: user._id,
      status: BookingStatus.ACCEPTED,
    });

    if (!booking) {
      throw new BadRequestError('Booking not found');
    }

    const isAlreadyExist = await this.reviewModel.countDocuments({
      bookingId: new mongoose.Types.ObjectId(bookingId),
      userId: user._id,
    });

    if (isAlreadyExist) {
      throw new BadRequestError('Only one review can do');
    }

    await this.reviewModel.create({
      userId: user._id,
      bookingId,
      comment: data.comment,
      rating: data.rating,
    });
    return;
  }
}

export default BookingService;
