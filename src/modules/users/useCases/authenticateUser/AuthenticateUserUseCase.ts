import { inject, injectable } from 'tsyringe';
import { HTTPForbidden } from '../../../../http/HTTPHandler';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Environment } from '../../../../environment';

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}
  async execute(email: string, password: string) {
    try {
      const user = await this.usersRepository.getCredentials(email);
      if (!user) throw new HTTPForbidden('Email or Password incorrect');

      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) throw new HTTPForbidden('Email or Password incorrect');

      const jwtSecret = Environment.getConfig('JWT_SECRET');
      const token = sign({ admin: user.admin }, jwtSecret, {
        subject: user._id.toString(),
        expiresIn: '10d',
      });

      return {
        user,
        token,
      };
    } catch (e) {
      throw e;
    }
  }
}

export { AuthenticateUserUseCase };
