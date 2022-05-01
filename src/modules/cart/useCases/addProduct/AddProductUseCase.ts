import { inject, injectable } from 'tsyringe';
import { HTTPBadRequest, HTTPNotFound } from '../../../../http/HTTPHandler';
import { IProductsRepository } from '../../../products/repositories/IProductsRepository';
import { IUsersRepository } from '../../../users/repositories/IUsersRepository';

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

      user.cart.products.push({
        product,
        quantity,
      });
      user.cart.total += findProduct.price * quantity;

      const updatedUser = await this.usersRepository.updateCart(id, user);
      if (!updatedUser) throw new HTTPBadRequest('Could not update cart');

      return updatedUser;
    } catch (e) {
      throw e;
    }
  }
}

export { AddProductUseCase };
