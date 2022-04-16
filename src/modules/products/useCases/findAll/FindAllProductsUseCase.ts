import { inject, injectable } from 'tsyringe';
import { Product } from '../../model/Product';
import { IProductsRepository } from '../../repositories/IProductsRepository';

@injectable()
class FindAllProductsUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}
  async execute(): Promise<Product[]> {
    try {
      return await this.productsRepository.findAll();
    } catch (e) {
      throw e;
    }
  }
}

export { FindAllProductsUseCase };
