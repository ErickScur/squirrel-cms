import { inject, injectable } from 'tsyringe';
import { HTTPBadRequest } from '../../../../http/HTTPHandler';
import { IBrandsRepository } from '../../repositories/IBrandsRepository';

@injectable()
class CreateBrandUseCase {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository
  ) {}

  async execute({ name, description }): Promise<void> {
    try {
      const cateogryAlreadyExists = await this.brandsRepository.findByName(name);
      if (cateogryAlreadyExists) throw new HTTPBadRequest('Brand already exists');

      await this.brandsRepository.create({ name, description });
    } catch (error) {
      throw error;
    }
  }
}

export { CreateBrandUseCase };
