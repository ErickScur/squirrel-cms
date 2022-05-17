import { inject, injectable } from 'tsyringe';
import { HTTPNotFound } from '@http/HTTPHandler';
import { Brand } from '@modules/brands/model/Brand';
import { IBrandsRepository } from '@modules/brands/repositories/IBrandsRepository';

@injectable()
class DeleteBrandUseCase {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository
  ) {}
  async execute(id: string): Promise<Brand> {
    try {
      const brand = await this.brandsRepository.delete(id);
      if (!brand) throw new HTTPNotFound('Brand was not found!');

      return brand;
    } catch (error) {
      throw error;
    }
  }
}

export { DeleteBrandUseCase };
