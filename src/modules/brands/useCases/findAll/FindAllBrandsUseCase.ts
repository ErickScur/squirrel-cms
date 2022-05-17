import { Brand } from '@modules/brands/model/Brand';
import { IBrandsRepository } from '@modules/brands/repositories/IBrandsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindAllBrandsUseCase {
  constructor(
    @inject('BrandsRepository')
    private brandsRepository: IBrandsRepository
  ) {}
  async execute(): Promise<Brand[]> {
    try {
      return await this.brandsRepository.findAll();
    } catch (error) {
      throw error;
    }
  }
}

export { FindAllBrandsUseCase };
