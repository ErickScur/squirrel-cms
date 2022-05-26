import { User } from '@modules/users/model/User';
import { UserSchema } from '@modules/users/schema/UserSchema';
import { ICreateUserDTO, IUpdateUserDTO, IUsersRepository } from '../IUsersRepository';

// This implementation of repository is only used for testing with JEST

class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async findAll(): Promise<User[]> {
    return this.users;
  }
  async findById(id: string): Promise<User> {
    return this.users.find(u => u._id.toString() == id);
  }
  async findByEmail(email: string): Promise<User> {
    return this.users.find(u => u.email == email);
  }
  async getCredentials(email: string): Promise<User> {
    return this.users.find(u => u.email == email);
  }
  async create(data: ICreateUserDTO): Promise<User> {
    const user = new UserSchema();
    const { name, cpf, email, password } = data;
    Object.assign(user, {
      name,
      cpf,
      email,
      password,
    });
    this.users.push(user);
    return user;
  }
  async update(id: string, data: IUpdateUserDTO): Promise<User> {
    throw new Error('Method not implemented.');
  }
  async updateCart(id: string, user: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
  async delete(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
}

export { UsersRepositoryInMemory };
