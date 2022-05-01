import { Cart, User } from '../model/User';

interface IUpdateUserDTO {
  name: string;
  cpf: string;
  email: string;
  id: string;
}
interface ICreateUserDTO {
  name: string;
  cpf: string;
  email: string;
  password: string;
  admin: boolean;
}

interface IUsersRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  getCredentials(email: string): Promise<User>;
  create(data: ICreateUserDTO): Promise<User>;
  update(data: IUpdateUserDTO): Promise<User>;
  updateCart(id: string, user: User): Promise<User>;
  delete(id: string): Promise<User>;
}

export { IUsersRepository, IUpdateUserDTO, ICreateUserDTO };
