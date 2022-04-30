import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateProductUseCase } from './CreateProductUseCase';

class CreateProductController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const createProductUseCase = container.resolve(CreateProductUseCase);
    const { name, description, mainImage, price, stock, categoryId, brandId } = req.body;
    try {
      await createProductUseCase.execute({
        name,
        description,
        mainImage,
        price,
        stock,
        categoryId,
        brandId,
      });
      return res.status(201).send();
    } catch (error) {
      next(error);
    }
  }
}

export { CreateProductController };
