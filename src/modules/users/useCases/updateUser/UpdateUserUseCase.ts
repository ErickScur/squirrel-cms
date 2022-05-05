import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';
import { Environment } from '../../../../environment';
import { HTTPInternalServer, HTTPNotFound } from '../../../../http/HTTPHandler';
import { User } from '../../model/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class UpdateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute(id: string, { name, email, cpf }): Promise<User> {
    try {
      const findUser = await this.usersRepository.findById(id);
      if (!findUser) throw new HTTPNotFound('User was not found!');

      const user = await this.usersRepository.update({
        id,
        name,
        email,
        cpf,
      });
      if (!user) throw new HTTPInternalServer('Error while trying to update user!');
      return user;
    } catch (e) {
      throw e;
    }
  }
}

export { UpdateUserUseCase };
