import { HTTPNotFound } from '@http/HTTPHandler';
import { User } from '@modules/users/model/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindUserByIdUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute(id: string): Promise<User> {
    try {
      const user = await this.usersRepository.findById(id);
      if (!user) throw new HTTPNotFound('User was not found!');

      return user;
    } catch (e) {
      throw e;
    }
  }
}

export { FindUserByIdUseCase };
