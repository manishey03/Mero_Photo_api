import express from 'express';

//
import { userController } from './index';

//
import { auth } from '../../middleware';
import { paramsValidator } from '../../middleware/validator.middleware';
import { getUserSchema } from './user.validation';

//

//
const userRouter = express.Router();

//
userRouter.route('/notification').get(auth, userController.getNotification);
userRouter.route('/:user').get(auth, paramsValidator(getUserSchema), userController.getUsers);

//
export default userRouter;
