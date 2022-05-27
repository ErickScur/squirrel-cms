import { User } from '@modules/users/model/User';
import { UserSchema } from '@modules/users/schema/UserSchema';
import { ICreateUserDTO, IUpdateUserDTO, IUsersRepository } from '../IUsersRepository';

class UsersRepository implements IUsersRepository {
  async findAll(): Promise<User[]> {
    try {
      return await UserSchema.find();
    } catch (e) {
      throw e;
    }
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
  async updateAll(id: string, user: User): Promise<User> {
    try {
      return await UserSchema.findByIdAndUpdate(id, user, { new: true });
    } catch (e) {
      throw e;
    }
  }
  async update(id: string, data: IUpdateUserDTO): Promise<User> {
    try {
      return await UserSchema.findByIdAndUpdate(id, data, { new: true });
    } catch (e) {
      throw e;
    }
  }
  async delete(id: string): Promise<User> {
    try {
      return await UserSchema.findByIdAndDelete(id);
    } catch (e) {
      throw e;
    }
  }
}

export { UsersRepository };
