import { Category } from '@modules/categories/model/Category';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindAllCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute(): Promise<Category[]> {
    try {
      const categories = await this.categoriesRepository.findAll();
      return categories;
    } catch (error) {
      throw error;
    }
  }
}

export { FindAllCategoriesUseCase };
