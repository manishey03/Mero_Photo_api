import { Request, Response, NextFunction } from 'express';

//
import { UserModelType } from '../modules/user/model/user.model';
import { UserRole } from '../modules/user/type';

//
import { ForbiddenError, NotAuthorizedError, NotFoundError } from '../utils/api/apiError';

interface IRole {
  checkUser(req: Request, _res: Response, next: NextFunction): Promise<void>;
  checkAdmin(req: Request, _res: Response, next: NextFunction): Promise<void>;
  checkProvider(req: Request, _res: Response, next: NextFunction): Promise<void>;
}

class RoleMiddleware implements IRole {
  private userModel;
  constructor(userModel: UserModelType) {
    this.userModel = userModel;
    Object.getOwnPropertyNames(RoleMiddleware.prototype)
      .filter((propertyName: string) => propertyName !== 'constructor')
      .forEach((method: string) => {
        if (typeof this[method as keyof RoleMiddleware] === 'function') {
          this[method as keyof RoleMiddleware] = this[method as keyof RoleMiddleware].bind(this);
        }
      });
  }

  async checkAdmin(req: Request, _res: Response, next: NextFunction) {
    try {
      if (!req?.payload?._id) {
        throw new NotAuthorizedError('Unauthorized');
      }

      const user = await this.userModel.findById(req.payload?._id);
      if (!user) {
        throw new NotFoundError('User not found');
      }

      if (user.role !== UserRole.ADMIN) {
        throw new ForbiddenError('Unauthorized');
      }

      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  }

  async checkProvider(req: Request, _res: Response, next: NextFunction) {
    try {
      if (!req?.payload?._id) {
        throw new NotAuthorizedError('Unauthorized');
      }

      const user = await this.userModel.findById(req.payload?._id);
      if (!user) {
        throw new NotFoundError('User not found');
      }

      if (user.role !== UserRole.PHOTOGRAPHER) {
        throw new ForbiddenError('Unauthorized');
      }

      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  }

  async checkUser(req: Request, _res: Response, next: NextFunction) {
    try {
      if (!req?.payload?._id) {
        throw new NotAuthorizedError('Unauthorized');
      }

      const user = await this.userModel.findById(req.payload?._id);
      if (!user) {
        throw new NotFoundError('User not found');
      }

      if (user.role !== UserRole.USER) {
        throw new ForbiddenError('Unauthorized');
      }

      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  }
}

export default RoleMiddleware;
