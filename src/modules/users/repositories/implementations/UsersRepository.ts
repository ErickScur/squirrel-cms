import { Cart, User } from '../../model/User';
import { UserSchema } from '../../schema/UserSchema';
import { ICreateUserDTO, IUpdateUserDTO, IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  async findById(id: string): Promise<User> {
    try {
      return await UserSchema.findById(id);
    } catch (e) {
      throw e;
    }
  }
  async findByEmail(email: string): Promise<User> {
    try {
      return await UserSchema.findOne({ email });
    } catch (e) {
      throw e;
    }
  }
  async getCredentials(email: string): Promise<User> {
    try {
      return await UserSchema.findOne({ email }).select('password email admin');
    } catch (e) {
      throw e;
    }
  }
  async create(data: ICreateUserDTO): Promise<User> {
    try {
      return await UserSchema.create(data);
    } catch (e) {
      throw e;
    }
  }
  async updateCart(id: string, user: User): Promise<User> {
    try {
      return await UserSchema.findByIdAndUpdate(id, user);
    } catch (e) {
      throw e;
    }
  }
  async update(data: IUpdateUserDTO): Promise<User> {
    const { id, email, cpf, name } = data;
    try {
      return await UserSchema.findByIdAndUpdate(id, { email, cpf, name });
    } catch (e) {
      throw e;
    }
  }
  delete(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
}

export { UsersRepository };
