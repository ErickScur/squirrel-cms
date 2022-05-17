import { Product } from '@modules/products/model/Product';
import { ProductSchema } from '@modules/products/schema/ProductSchema';
import {
  IProductsRepository,
  ICreateProductDTO,
  IUpdateProductDTO,
} from '../IProductsRepository';

class ProductsRepository implements IProductsRepository {
  async findAll(): Promise<Product[]> {
    try {
      return await ProductSchema.find();
    } catch (error) {
      throw error;
    }
  }
  async findById(id: string): Promise<Product> {
    try {
      return await ProductSchema.findById(id);
    } catch (error) {
      throw error;
    }
  }
  async findByName(name: string): Promise<Product> {
    try {
      return await ProductSchema.findOne({ name });
    } catch (error) {
      throw error;
    }
  }
  async create({
    name,
    description,
    price,
    stock,
    categoryId,
    brandId,
    slug,
  }: ICreateProductDTO): Promise<Product> {
    try {
      return await ProductSchema.create({
        name,
        description,
        price,
        stock,
        categoryId,
        brandId,
        slug,
      });
    } catch (error) {
      throw error;
    }
  }
  async update({
    name,
    description,
    price,
    stock,
    categoryId,
    brandId,
    id,
    slug,
  }: IUpdateProductDTO): Promise<Product> {
    try {
      return await ProductSchema.findByIdAndUpdate(id, {
        name,
        description,
        price,
        stock,
        categoryId,
        brandId,
        slug,
      });
    } catch (error) {
      throw error;
    }
  }
  async delete(id: string): Promise<Product> {
    try {
      return await ProductSchema.findByIdAndDelete(id);
    } catch (error) {
      throw error;
    }
  }
  async updateImages(id: string, product: Product): Promise<Product> {
    try {
      return await ProductSchema.findByIdAndUpdate(id, product);
    } catch (error) {
      throw error;
    }
  }
}

export { ProductsRepository };
