import { inject, injectable } from 'tsyringe';
import { HTTPNotFound } from '../../../../http/HTTPHandler';
import { Product } from '../../model/Product';
import { IProductsRepository } from '../../repositories/IProductsRepository';

@injectable()
class FindByIdUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}
  async execute(id: string): Promise<Product> {
    try {
      const product = await this.productsRepository.findById(id);
      if (!product) throw new HTTPNotFound('Product was not found!');

      return product;
    } catch (e) {
      throw e;
    }
  }
}

export { FindByIdUseCase };
