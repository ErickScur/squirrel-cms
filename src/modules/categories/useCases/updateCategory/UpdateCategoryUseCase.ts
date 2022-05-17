import { HTTPNotFound, HTTPBadRequest } from '@http/HTTPHandler';
import { Category } from '@modules/categories/model/Category';
import {
  ICategoriesRepository,
  IUpdateCategoryDTO,
} from '@modules/categories/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}
  async execute({ name, description, id }: IUpdateCategoryDTO): Promise<Category> {
    try {
      const category = await this.categoriesRepository.findById(id);
      if (!category) throw new HTTPNotFound('Category was not found!');

      const categorySameName = await this.categoriesRepository.findByName(name);
      if (categorySameName)
        if (categorySameName._id.toString() != id)
          throw new HTTPBadRequest('A Category with the same name already exists');

      const updatedCategory = await this.categoriesRepository.update({
        name,
        description,
        id,
      });
      if (!updatedCategory)
        throw new HTTPBadRequest('An error occurred while trying to update the Category');

      return updatedCategory;
    } catch (error) {
      throw error;
    }
  }
}

export { UpdateCategoryUseCase };
