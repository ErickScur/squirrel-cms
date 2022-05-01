import { inject, injectable } from 'tsyringe';
import { HTTPInternalServer, HTTPNotFound } from '../../../../http/HTTPHandler';
import { IProductsRepository } from '../../repositories/IProductsRepository';

@injectable()
class UploadImageUseCase {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}
  async execute(files: any, id: string) {
    try {
      const product = await this.productsRepository.findById(id);
      if (!product) throw new HTTPNotFound('Product was not found!');

      files.forEach(f => {
        product.images.push({
          path: f.path,
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
