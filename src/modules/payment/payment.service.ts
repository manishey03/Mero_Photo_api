import type { PaymentModelType } from './model/payment.model';
import type { PurchaseModelType } from './model/purchase.model';
import type { BookingModelType } from '../booking/model/booking.model';

//
import type { IPaymentService } from './type';
import type { IPaymentInitiateSchemaType } from './payment.validation';

//
import EsewaPaymentService from './esewa.service';
import { decodeEsewaPaymentInfo } from './helper';

const esewaPaymentService = new EsewaPaymentService();

class PaymentService implements IPaymentService {
  private bookingModel;
  private purchaseModel;
  private paymentModel;

  constructor(bookingModel: BookingModelType, purchaseModel: PurchaseModelType, paymentModel: PaymentModelType) {
    this.bookingModel = bookingModel;
    this.purchaseModel = purchaseModel;
    this.paymentModel = paymentModel;
  }

  async paymentInitiate(data: IPaymentInitiateSchemaType) {
    // eslint-disable-next-line no-useless-catch
    try {
      const response = await esewaPaymentService.esewaPaymentIntegration({
        amount: data?.amount,
        transactionId: data?.bookingId,
      });

      await this.purchaseModel.create({
        bookingId: data.bookingId,
        amount: data.amount,
      });

      //
      return { url: response };
    } catch (error) {
      throw error;
    }
  }

  async completePayment(data: string): Promise<string> {
    const decodePaymentInfo = decodeEsewaPaymentInfo(data);

    // check trasaction iD -> PAYMENT INITIATE
    //
    await this.paymentModel.create({
      pidx: decodePaymentInfo?.transaction_code,
      amount: Number(decodePaymentInfo?.total_amount),
      bookingId: decodePaymentInfo?.transaction_uuid,
      paymentInfo: JSON.stringify(decodePaymentInfo),
    });

    //
    return `
     <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Payment Success</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f0f8ff;
          color: #333;
          text-align: center;
          padding-top: 100px;
        }
        .container {
          max-width: 400px;
          margin: auto;
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
          color: #28a745;
        }
        .btn {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 16px;
          color: #fff;
          background-color: #007bff;
          text-decoration: none;
          border-radius: 5px;
        }
        .btn:hover {
          background-color: #0056b3;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Payment Success!</h1>
        <p>Your payment has been processed successfully.</p>
        <a href="http://localhost:5173" class="btn">Go to Homepage</a>
      </div>
    </body>
    </html>
    `;
  }
}
export default PaymentService;
