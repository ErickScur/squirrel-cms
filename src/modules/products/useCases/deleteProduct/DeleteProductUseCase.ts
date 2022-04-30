import { inject, injectable } from 'tsyringe';
import { HTTPNotFound } from '../../../../http/HTTPHandler';
import { Product } from '../../model/Product';
import { IProductsRepository } from '../../repositories/IProductsRepository';

@injectable()
class DeleteProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}
  async execute(id: string): Promise<Product> {
    const product = await this.productsRepository.findById(id);
    if (!product) throw new HTTPNotFound('Product was not found!');

    return await this.productsRepository.delete(id);
  }
}

export { DeleteProductUseCase };
