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
  slug: string;
}
interface ICreateProductDTO {
  name: string;
  description: string;
  mainImage?: string;
  price: number;
  stock: number;
  categoryId: string;
  brandId: string;
  slug: string;
}

interface IProductsRepository {
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product>;
  findByName(name: string): Promise<Product>;
  create({
    name,
    description,
    price,
    stock,
    categoryId,
    brandId,
    slug,
  }: ICreateProductDTO): Promise<Product>;
  update({
    name,
    description,
    price,
    stock,
    categoryId,
    brandId,
    id,
  }: IUpdateProductDTO): Promise<Product>;
  delete(id: string): Promise<Product>;
  updateImages(id: string, product: Product): Promise<Product>;
}

export { IProductsRepository, IUpdateProductDTO, ICreateProductDTO };
