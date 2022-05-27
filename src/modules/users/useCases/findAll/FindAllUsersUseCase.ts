import { User } from '@modules/users/model/User';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class FindAllUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute(): Promise<User[]> {
    try {
      return await this.usersRepository.findAll();
    } catch (e) {
      throw e;
    }
  }
}

export { FindAllUsersUseCase };
