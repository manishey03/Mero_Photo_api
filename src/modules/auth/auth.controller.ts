import { Request, Response, NextFunction } from 'express';

//
import { authService } from './index';

//
import ApiResponse from '../../utils/api/apiResponse';

//
import type { IRegisterSchemaType } from './auth.validation';
import type { IChangePasswordSchemaType, IUpdateProfileSchemaType } from '../user/user.validation';

/**
 * Auth Controller
 */
class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await authService.login(req.body);

      //
      return new ApiResponse(res).addMessage('successfully login').send(response);
    } catch (err) {
      next(err);
    }
  }

  async register(req: Request<unknown, unknown, IRegisterSchemaType>, res: Response, next: NextFunction) {
    try {
      const response = await authService.register(req.body);

      //
      return new ApiResponse(res).addMessage('successfully registered').send(response);
    } catch (err) {
      next(err);
    }
  }

  async update(req: Request<unknown, unknown, IUpdateProfileSchemaType>, res: Response, next: NextFunction) {
    try {
      await authService.update(req.user, req.body);

      //
      return new ApiResponse(res).addMessage('Profile update successfully').send({});
    } catch (err) {
      next(err);
    }
  }

  /**
   * Change Password
   */
  async changePassword(req: Request<unknown, unknown, IChangePasswordSchemaType>, res: Response, next: NextFunction) {
    try {
      await authService.changePassword(req.user, req.body);

      //
      return new ApiResponse(res).addMessage('Password changed successfully').send({});
    } catch (err) {
      next(err);
    }
  }

  async createProvider(req: Request<unknown, unknown, IRegisterSchemaType>, res: Response, next: NextFunction) {
    try {
      const response = await authService.createProvider(req.body);

      //
      return new ApiResponse(res).addMessage('Provider created successfully').send(response);
    } catch (err) {
      next(err);
    }
  }

  me(req: Request, res: Response, next: NextFunction) {
    try {
      return new ApiResponse(res).addMessage('Get loggedIn user details').send(req.user);
    } catch (err) {
      next(err);
    }
  }
}

//
export default AuthController;
