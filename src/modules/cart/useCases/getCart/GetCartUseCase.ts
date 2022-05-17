import { HTTPNotFound } from '@http/HTTPHandler';
import { IProductsRepository } from '@modules/products/repositories/IProductsRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class GetCartUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository
  ) {}
  async execute(id: string) {
    try {
      const user = await this.usersRepository.findById(id);
      if (!user) throw new HTTPNotFound('User was not found!');

      return user.cart;
    } catch (e) {
      throw e;
    }
  }
}

export { GetCartUseCase };
