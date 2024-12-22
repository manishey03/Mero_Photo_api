import type { UserModelType } from './model/user.model';

//
import { IUserService, IUser, UserRole, ICount, IUserResponse } from './type';

//
import { hashPassword, verifyPassword } from '../../utils/password.utils';

//
import { BadRequestError, ForbiddenError } from '../../utils/api/apiError';
import type { IChangePasswordSchemaType, IRegisterSchemaType, IUpdateProfileSchemaType } from './user.validation';
import { jwtHelper } from '../../utils/jwt.helper';
import { NotificationModelType } from '../notification/model/notification.model';
import { INotification } from '../notification/type';

class UserService implements IUserService {
  private userModel;
  private notificationModel;
  constructor(userModel: UserModelType, notificationModel: NotificationModelType) {
    this.userModel = userModel;
    this.notificationModel = notificationModel;
  }

  async getUserByEmail(email: string): Promise<IUser> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new BadRequestError('User not found');
    }

    //
    return user;
  }

  async createUser(data: IRegisterSchemaType): Promise<IUser> {
    const user = await this.userModel.findOne({ email: data.email });

    if (user) {
      throw new BadRequestError('User already exists');
    }

    const newUser = await this.userModel.create({
      ...data,
      password: await hashPassword(data.password),
      role: UserRole.USER,
    });

    //
    return newUser;
  }

  async update(user: IUser, data: IUpdateProfileSchemaType): Promise<void> {
    const userDetails = await this.userModel.findById(String(user._id));
    if (!userDetails) {
      throw new ForbiddenError('User not found');
    }

    //
    await this.userModel.findByIdAndUpdate(user._id, { ...data });
    return;
  }

  async changePassword(
    user: IUser,
    data: IChangePasswordSchemaType,
  ): Promise<{ user: IUserResponse; accessToken: string; refreshToken: string }> {
    const userDetails = await this.userModel.findById(String(user._id));
    if (!userDetails) {
      throw new ForbiddenError('User not found');
    }

    //
    const checkPassword = await verifyPassword(user.password, data.oldPassword);
    if (!checkPassword) {
      throw new ForbiddenError('Invalid password');
    }

    //
    await this.userModel.findByIdAndUpdate(user._id, { password: await hashPassword(data.newPassword) });

    //
    const payload = {
      _id: userDetails._id,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
      role: userDetails.role,
    };
    const { accessToken, refreshToken } = await jwtHelper.createJwtToken(payload);

    //
    //
    return {
      user: {
        _id: String(userDetails._id),
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        email: userDetails.email,
        role: userDetails.role,
      },
      accessToken,
      refreshToken,
    };
  }

  async createProvider(data: IRegisterSchemaType): Promise<IUser> {
    const user = await this.userModel.findOne({ email: data.email });
    if (user) {
      throw new BadRequestError('User already exists');
    }

    return await this.userModel.create({
      ...data,
      password: await hashPassword(data.password),
      role: UserRole.PHOTOGRAPHER,
    });
  }

  /**
   * Get Notifications
   */
  async getNotifications(user: IUser): Promise<ICount<INotification>> {
    const count = await this.notificationModel.countDocuments({ userId: user._id });
    const notifications = await this.notificationModel.find({ userId: user._id });

    //
    return {
      data: notifications,
      count,
    };
  }

  /**
   * Get Users
   */
  async getUsers(role: string): Promise<ICount<IUser>> {
    const count = await this.userModel.countDocuments({ role });
    const users = await this.userModel.find({ role });

    //
    return {
      data: users,
      count,
    };
  }
}

//
export default UserService;
