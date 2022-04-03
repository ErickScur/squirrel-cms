import { Category } from '../model/Category';

interface IUpdateCategoryDTO {
  name: string;
  description: string;
  id: string;
}
interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findAll(): Promise<Category[]>;
  findById(id: string): Promise<Category>;
  findByName(name: string): Promise<Category>;
  create({ name, description }: ICreateCategoryDTO): Promise<Category>;
  update({ name, description, id }: IUpdateCategoryDTO): Promise<Category>;
  delete(id: string): Promise<Category>;
}

export { ICategoriesRepository, IUpdateCategoryDTO, ICreateCategoryDTO };
