import { HTTPNotFound, HTTPBadRequest } from '@http/HTTPHandler';
import { Product } from '@modules/products/model/Product';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import slugify from 'slugify';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateProductUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}
  async execute({
    name,
    description,
    price,
    stock,
    categoryId,
    brandId,
    id,
  }): Promise<Product> {
    try {
      const product = await this.productsRepository.findById(id);
      if (!product) throw new HTTPNotFound('Product was not found!');

      const productSameName = await this.productsRepository.findByName(name);
      if (productSameName)
        if (productSameName._id.toString() != id)
          throw new HTTPBadRequest('A Product with the same name already exists!');

      let slug = product.slug;
      if (name) slug = slugify(name);

      const updatedProduct = await this.productsRepository.update({
        name,
        description,
        price,
        stock,
        categoryId,
        brandId,
        slug,
        id,
      });
      if (!updatedProduct)
        throw new HTTPBadRequest('An error occurred while trying to update the Product');

      return updatedProduct;
    } catch (e) {
      throw e;
    }
  }
}

export { UpdateProductUseCase };
