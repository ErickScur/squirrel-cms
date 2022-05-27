import { HTTPNotFound, HTTPBadRequest } from '@http/HTTPHandler';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class AddProductUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}
  async execute(id: string, product: string, quantity: number) {
    try {
      const user = await this.usersRepository.findById(id);
      if (!user) throw new HTTPNotFound('User was not found!');

      const findProduct = await this.productsRepository.findById(product);
      if (!findProduct) throw new HTTPNotFound('Product was not found!');

      let productInCart;
      const products = user.cart.products;
      if (product.length > 0) {
        const index = products.findIndex(p => p.product.toString() == product.toString());
        if (index != -1) {
          productInCart = products[index];
          productInCart.quantity += quantity;
          user.cart.total += findProduct.price * quantity;
        } else {
          user.cart.products.push({
            product,
            quantity,
          });
          user.cart.total += findProduct.price * quantity;
        }
      }

      const updatedUser = await this.usersRepository.updateAll(id, user);
      if (!updatedUser) throw new HTTPBadRequest('Could not update cart');

      return updatedUser;
    } catch (e) {
      throw e;
    }
  }
}

export { AddProductUseCase };
