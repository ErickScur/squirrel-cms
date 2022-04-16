import { inject, injectable } from 'tsyringe';
import { HTTPNotFound } from '../../../../http/HTTPHandler';
import { Brand } from '../../model/Brand';
import { IBrandsRepository } from '../../repositories/IBrandsRepository';

@injectable()
class FindBrandByNameUseCase {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository
  ) {}
  async execute(name: string): Promise<Brand> {
    try {
      const brand = await this.brandsRepository.findByName(name);
      if (!brand) throw new HTTPNotFound('Brand was not found!');

      return brand;
    } catch (error) {
      throw error;
    }
  }
}

export { FindBrandByNameUseCase };
