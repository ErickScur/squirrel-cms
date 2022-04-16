import { inject, injectable } from 'tsyringe';
import { Brand } from '../../model/Brand';
import { IBrandsRepository } from '../../repositories/IBrandsRepository';

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
