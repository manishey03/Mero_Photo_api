import type { CategoryModelType } from './model/category.model';

//
import { BadRequestError } from '../../utils/api/apiError';

//
import type { ICategory, ICategoryService, ICount } from './type';

//
import type { ICreateCategorySchemaType } from './category.validation';

/**
 * Category Service
 */
class CategoryService implements ICategoryService {
  private categoryModel;

  constructor(categoryModel: CategoryModelType) {
    this.categoryModel = categoryModel;
  }

  /**
   * Create category
   */
  async create(data: ICreateCategorySchemaType): Promise<ICategory> {
    const category = await this.categoryModel.findOne({ title: data.title });
    if (category) {
      throw new BadRequestError('Category already exist');
    }

    return await this.categoryModel.create({
      title: data.title,
    });
  }

  /**
   * Get Category
   */
  async get(): Promise<ICount<ICategory>> {
    const count = await this.categoryModel.countDocuments();
    const categories = await this.categoryModel.find();

    return {
      data: categories,
      count,
    };
  }
}

export default CategoryService;
