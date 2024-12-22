import ReviewModel from './model/review.model';
import BookingModel from './model/booking.model';
import UserModel from '../user/model/user.model';
import AvailabilityModel from '../availability/model/availability.model';
import NotificationModel from '../notification/model/notification.model';

//
import BookingService from './booking.service';
// import AvailabilityBusiness from './booking.business';
import BookingController from './booking.controller';

//
// const business = new AvailabilityBusiness();
const bookingController = new BookingController();
const bookingService = new BookingService(BookingModel, UserModel, AvailabilityModel, ReviewModel, NotificationModel);

//
export { bookingService, bookingController };
