import { Request, Response, NextFunction } from 'express';

//
import ApiResponse from '../../utils/api/apiResponse';

//
import { userService } from './index';
import { IGetUserSchemaType } from './user.validation';
import { IUser } from './type';

/**
 * User Controller
 */
class UserController {
  async getUserByEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await userService.getUserByEmail(req.body);

      //
      return new ApiResponse(res).addMessage('Fetched user details').send(response);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get Notification
   */
  async getNotification(req: Request, res: Response, next: NextFunction) {
    try {
      const { data, count } = await userService.getNotifications(req.user as IUser);

      //
      return new ApiResponse(res)
        .addMessage('Fetched user notification successfully')
        .addMetadata({ count })
        .send(data);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get Users
   */
  async getUsers(req: Request<IGetUserSchemaType>, res: Response, next: NextFunction) {
    try {
      const { data, count } = await userService.getUsers(req.params.user);

      //
      return new ApiResponse(res).addMessage('Fetched users successfully').addMetadata({ count }).send(data);
    } catch (err) {
      next(err);
    }
  }
}

export default UserController;
