import { inject, injectable } from 'tsyringe';
import slugify from 'slugify';
import { HTTPBadRequest } from '@http/HTTPHandler';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';

@injectable()
class CreateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}
  async execute({ name, description, price, stock, categoryId, brandId }): Promise<void> {
    try {
      const productExists = await this.productsRepository.findByName(name);
      if (productExists)
        throw new HTTPBadRequest('A Product with the same name already exists!');

      const slug = slugify(name.toLowerCase());
      await this.productsRepository.create({
        name,
        description,
        price,
        stock,
        categoryId,
        brandId,
        slug,
      });
    } catch (error) {
      throw error;
    }
  }
}

export { CreateProductUseCase };
