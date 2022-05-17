import { HTTPNotFound } from '@http/HTTPHandler';
import { Brand } from '@modules/brands/model/Brand';
import { IBrandsRepository } from '@modules/brands/repositories/IBrandsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindBrandByIdUseCase {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository
  ) {}
  async execute(id: string): Promise<Brand> {
    try {
      const brand = await this.brandsRepository.findById(id);
      if (!brand) throw new HTTPNotFound('Brand was not found!');

      return brand;
    } catch (error) {
      throw error;
    }
  }
}

export { FindBrandByIdUseCase };
