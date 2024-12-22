import { Request, Response, NextFunction } from 'express';

//
import { categoryService } from './index';

//
import ApiResponse from '../../utils/api/apiResponse';

//
import type { ICreateCategorySchemaType } from './category.validation';

/**
 * Category Controller
 */
class CategoryController {
  async create(req: Request<unknown, unknown, ICreateCategorySchemaType>, res: Response, next: NextFunction) {
    try {
      const response = await categoryService.create(req.body);

      //
      return new ApiResponse(res).addMessage('Category created successfully').send(response);
    } catch (err) {
      next(err);
    }
  }

  async get(_req: Request, res: Response, next: NextFunction) {
    try {
      const response = await categoryService.get();

      //
      return new ApiResponse(res).addMessage('Category fetched successfully').send(response);
    } catch (err) {
      next(err);
    }
  }
}

export default CategoryController;
