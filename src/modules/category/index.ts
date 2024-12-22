import CategoryModel from './model/category.model';

//
import CategoryService from './category.service';
import CategoryController from './category.controller';

//
const categoryController = new CategoryController();
const categoryService = new CategoryService(CategoryModel);

//
export { categoryService, categoryController };
