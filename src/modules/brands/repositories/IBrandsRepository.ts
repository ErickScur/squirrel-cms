import { Brand } from '../model/Brand';

interface IUpdateBrandDTO {
  name: string;
  description: string;
  id: string;
}
interface ICreateBrandDTO {
  name: string;
  description: string;
}

interface IBrandsRepository {
  findAll(): Promise<Brand[]>;
  findById(id: string): Promise<Brand>;
  findByName(name: string): Promise<Brand>;
  create({ name, description }: ICreateBrandDTO): Promise<Brand>;
  update({ name, description, id }: IUpdateBrandDTO): Promise<Brand>;
  delete(id: string): Promise<Brand>;
}

export { IBrandsRepository, IUpdateBrandDTO, ICreateBrandDTO };
