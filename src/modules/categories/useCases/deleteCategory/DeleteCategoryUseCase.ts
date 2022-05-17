import { HTTPNotFound } from '@http/HTTPHandler';
import { Category } from '@modules/categories/model/Category';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(id: string): Promise<Category> {
    try {
      const category = await this.categoriesRepository.delete(id);
      if (!category) throw new HTTPNotFound('Category was not found!');

      return category;
    } catch (error) {
      throw error;
    }
  }
}

export { DeleteCategoryUseCase };
