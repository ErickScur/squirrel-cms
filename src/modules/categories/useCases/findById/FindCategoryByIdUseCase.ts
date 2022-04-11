import { inject, injectable } from 'tsyringe';
import { HTTPNotFound } from '../../../../http/HTTPHandler';
import { Category } from '../../model/Category';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

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
