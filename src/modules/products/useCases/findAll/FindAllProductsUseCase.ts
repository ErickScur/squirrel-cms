import { Product } from '@modules/products/model/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';

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
