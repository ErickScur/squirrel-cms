import { HTTPNotFound } from '@http/HTTPHandler';
import { Address, User } from '@modules/users/model/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class DeleteAddressUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute(id: string, addressId: string): Promise<User> {
    try {
      const user = await this.usersRepository.findById(id);
      if (!user) throw new HTTPNotFound('User was not found!');

      const index = user.addresses.findIndex((a: any) => a._id.toString() == addressId);
      if (index == -1) throw new HTTPNotFound('Address was not found!');

      user.addresses.splice(index, 1);

      const updated = await this.usersRepository.updateAll(id, user);

      return updated;
    } catch (e) {
      throw e;
    }
  }
}

export { DeleteAddressUseCase };
