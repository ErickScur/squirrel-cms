import { HTTPBadRequest } from '@http/HTTPHandler';
import { ICategoriesRepository } from '@modules/categories/repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }): Promise<void> {
    try {
      const cateogryAlreadyExists = await this.categoriesRepository.findByName(name);
      if (cateogryAlreadyExists) throw new HTTPBadRequest('Category already exists');

      await this.categoriesRepository.create({ name, description });
    } catch (error) {
      throw error;
    }
  }
}

export { CreateCategoryUseCase };
