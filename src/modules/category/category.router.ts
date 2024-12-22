import express from 'express';

//
import { categoryController } from './index';

//
import { auth, roleMiddleware } from '../../middleware';
import { bodyValidator } from '../../middleware/validator.middleware';

//
import { createCategorySchema } from './category.validation';

//
const categoryRouter = express.Router();

//
categoryRouter
  .route('/')
  .get(auth, categoryController.get)
  .post(auth, roleMiddleware.checkUser, bodyValidator(createCategorySchema), categoryController.create);

//
export default categoryRouter;
