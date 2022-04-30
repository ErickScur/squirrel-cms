import { User } from '../../model/User';
import { UserSchema } from '../../schema/UserSchema';
import { ICreateUserDTO, IUpdateUserDTO, IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  findAll(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
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
  update(data: IUpdateUserDTO): Promise<User> {
    throw new Error('Method not implemented.');
  }
  delete(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }
}

export { UsersRepository };
