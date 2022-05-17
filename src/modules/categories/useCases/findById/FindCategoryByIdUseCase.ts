import { HTTPNotFound } from '@http/HTTPHandler';
import { Category } from '@modules/categories/model/Category';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindCategoryByIdUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(id: string): Promise<Category> {
    try {
      const category = await this.categoriesRepository.findById(id);
      if (!category) throw new HTTPNotFound('Category was not found!');

      return category;
    } catch (error) {
      throw error;
    }
  }
}

export { FindCategoryByIdUseCase };
