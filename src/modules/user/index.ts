import UserModel from './model/user.model';
import NotificationModel from '../notification/model/notification.model';

//
import UserService from './user.service';
import UserController from './user.controller';

//
const userService = new UserService(UserModel, NotificationModel);
const userController = new UserController();

//
export { userService, userController };
