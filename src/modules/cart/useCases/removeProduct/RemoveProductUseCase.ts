import { inject, injectable } from 'tsyringe';
import {
  HTTPNotFound,
  HTTPBadRequest,
  HTTPForbidden,
} from '../../../../http/HTTPHandler';
import { IProductsRepository } from '../../../products/repositories/IProductsRepository';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';

@injectable()
class RemoveProductUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}
  async execute(id: string, product: string) {
    try {
      const user = await this.usersRepository.findById(id);
      if (!user) throw new HTTPNotFound('User was not found!');

      const findProduct = await this.productsRepository.findById(product);
      if (!findProduct) throw new HTTPNotFound('Product was not found!');

      const products = user.cart.products;
      if (!products.length) throw new HTTPForbidden('Cart is empty!');

      const index = products.findIndex(p => p.product.toString() == product.toString());
      if (index == -1) throw new HTTPNotFound('Product was not found!');

      const productCart = user.cart.products[index];
      user.cart.total -= productCart.quantity * findProduct.price;
      user.cart.products.splice(index, 1);

      const updatedUser = await this.usersRepository.updateCart(id, user);
      if (!updatedUser) throw new HTTPBadRequest('Could not update cart');

      return updatedUser;
    } catch (e) {
      throw e;
    }
  }
}

export { RemoveProductUseCase };
