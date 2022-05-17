import { HTTPForbidden } from '@http/HTTPHandler';
import { UsersRepositoryInMemory } from '@modules/users/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
  });

  it('should be able to authenticate an user', async () => {
    const user = {
      cpf: '123456789',
      email: 'user@test.com',
      password: '1234',
      name: 'user test',
    };
    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute(user.email, user.password);

    expect(result).toHaveProperty('token');
  });

  it('should not be able to authenticate user with wrong credentials', () => {
    expect(async () => {
      await authenticateUserUseCase.execute('false@email.com', '21356');
    }).rejects.toBeInstanceOf(HTTPForbidden);
  });
});
