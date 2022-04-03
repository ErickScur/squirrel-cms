import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository
  ) {}

  async execute({ name, description }): Promise<void> {
    const cateogryAlreadyExists = await this.categoriesRepository.findByName(name);
    if (cateogryAlreadyExists) throw new Error('Category already exists');

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
