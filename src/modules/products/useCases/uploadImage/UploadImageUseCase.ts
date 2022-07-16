import { Environment } from '@environment/index';
import { HTTPNotFound, HTTPInternalServer } from '@http/HTTPHandler';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class UploadImageUseCase {
  private baseUrl: string;

  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {
    this.baseUrl = Environment.getConfig('BASE_URL');
  }
  async execute(files: any, id: string) {
    try {
      const product = await this.productsRepository.findById(id);
      if (!product) throw new HTTPNotFound('Product was not found!');

      files.forEach(f => {
        product.images.push({
          path: `${this.baseUrl}/static/products/${f.filename}`,
          filename: f.filename,
        });
      });

      const updatedProduct = await this.productsRepository.updateImages(id, product);
      if (!updatedProduct)
        throw new HTTPInternalServer('There was an error updating the product');

      return updatedProduct;
    } catch (e) {
      throw e;
    }
  }
}

export { UploadImageUseCase };
