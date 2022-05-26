import { HTTPNotFound, HTTPInternalServer } from '@http/HTTPHandler';
import { User } from '@modules/users/model/User';
import {
  IUpdateUserDTO,
  IUsersRepository,
} from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute(id: string, data: IUpdateUserDTO): Promise<User> {
    try {
      const findUser = await this.usersRepository.findById(id);
      if (!findUser) throw new HTTPNotFound('User was not found!');

      const user = await this.usersRepository.update(id, data);
      if (!user) throw new HTTPInternalServer('Error while trying to update user!');
      return user;
    } catch (e) {
      throw e;
    }
  }
}

export { UpdateUserUseCase };
