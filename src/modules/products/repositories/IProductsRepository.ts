import { Product } from '../model/Product';

interface IUpdateProductDTO {
  name: string;
  description: string;
  id: string;
  mainImage?: string;
  price: number;
  stock: number;
  categoryId: string;
  brandId: string;
}
interface ICreateProductDTO {
  name: string;
  description: string;
  mainImage?: string;
  price: number;
  stock: number;
  categoryId: string;
  brandId: string;
}

interface IProductsRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product>;
  findByName(name: string): Promise<Product>;
  create({
    name,
    description,
    mainImage,
    price,
    stock,
    categoryId,
    brandId,
  }: ICreateProductDTO): Promise<Product>;
  update({
    name,
    description,
    mainImage,
    price,
    stock,
    categoryId,
    brandId,
    id,
  }: IUpdateProductDTO): Promise<Product>;
  delete(id: string): Promise<Product>;
}

export { IProductsRepository, IUpdateProductDTO, ICreateProductDTO };
