import express from 'express';

//
import { authController } from './index';
import { loginSchema, registerSchema } from './auth.validation';

//
import { auth, roleMiddleware } from '../../middleware';
import { bodyValidator } from '../../middleware/validator.middleware';

//
import { changePasswordSchema, updateProfileSchema } from '../user/user.validation';

//
const authRouter = express.Router();

//
authRouter.route('/me').get(auth, authController.me);

authRouter.route('/login').post(bodyValidator(loginSchema), authController.login);

authRouter.route('/register').post(bodyValidator(registerSchema), authController.register);

authRouter.route('/update-profile').patch(auth, bodyValidator(updateProfileSchema), authController.update);

authRouter.route('/change-password').post(auth, bodyValidator(changePasswordSchema), authController.changePassword);

authRouter
  .route('/photographer')
  .post(auth, roleMiddleware.checkAdmin, bodyValidator(registerSchema), authController.createProvider);

//
export default authRouter;
