import { inject, injectable } from 'tsyringe';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { hash } from 'bcrypt';
import { Environment } from '@environment/index';
import { HTTPForbidden, HTTPInternalServer } from '@http/HTTPHandler';

@injectable()
class CreateUserUseCase {
  private _hashSalt;
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {
    this._hashSalt = Environment.getConfig('PASSWORD_SALT');
  }
  async execute({ name, email, password, cpf }): Promise<void> {
    try {
      const userAlreadyExists = await this.usersRepository.findByEmail(email);
      if (userAlreadyExists) throw new HTTPForbidden('Email already in use!');

      const passwordHash = await hash(password, parseInt(this._hashSalt));
      const user = await this.usersRepository.create({
        name,
        email,
        password: passwordHash,
        cpf,
        admin: false,
      });
      if (!user) throw new HTTPInternalServer('Error while trying to create user!');
    } catch (e) {
      throw e;
    }
  }
}

export { CreateUserUseCase };
