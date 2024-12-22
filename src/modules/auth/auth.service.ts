import { jwtHelper } from '../../utils/jwt.helper';
import { IAuthService, IUser, IUserResponse } from './type';

//
import { IChangePasswordSchemaType, IUpdateProfileSchemaType } from '../user/user.validation';
import { ILoginSchemaType, IRegisterSchemaType } from './auth.validation';

//
import { ForbiddenError } from '../../utils/api/apiError';
import { verifyPassword } from '../../utils/password.utils';

//
import { IUserService } from '../user/type';
import { IPayload } from '../../types/global';

class AuthService implements IAuthService {
  private userService;
  constructor(userService: IUserService) {
    this.userService = userService;
  }

  async login(data: ILoginSchemaType): Promise<{ user: IUserResponse; accessToken: string; refreshToken: string }> {
    const user = await this.userService.getUserByEmail(data.email);
    const checkPassword = await verifyPassword(user.password, data.password);
    if (!checkPassword) {
      throw new ForbiddenError('Invalid password');
    }

    //
    const payload = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    };
    const { accessToken, refreshToken } = await jwtHelper.createJwtToken(payload);

    //
    return {
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    };
  }

  async register(data: IRegisterSchemaType): Promise<IUser> {
    const user = await this.userService.createUser(data);
    return user;
  }

  async update(user: IPayload, data: IUpdateProfileSchemaType): Promise<void> {
    await this.userService.update(user, data);
    return;
  }

  async changePassword(user: IPayload, data: IChangePasswordSchemaType): Promise<void> {
    await this.userService.changePassword(user, data);
    return;
  }

  async createProvider(data: IRegisterSchemaType): Promise<IUser> {
    const user = await this.userService.createProvider(data);
    return user;
  }
}
export default AuthService;
