import PaymentModel from './model/payment.model';
import PurchaseModel from './model/purchase.model';
import BookingModel from '../booking/model/booking.model';

//
import PaymentService from './payment.service';
import PaymentController from './payment.controller';

//
const paymentService = new PaymentService(BookingModel, PurchaseModel, PaymentModel);
const paymentController = new PaymentController();

export { paymentService, paymentController };
