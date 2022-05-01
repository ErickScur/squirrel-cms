import { container } from 'tsyringe';
import { UpdateProductUseCase } from './UpdateProductUseCase';
import { NextFunction, Request, Response } from 'express';

class UpdateProductController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const updateProductUseCase = container.resolve(UpdateProductUseCase);
    const { id } = req.params;
    const { name, description, price, stock, categoryId, brandId } = req.body;
    try {
      const product = await updateProductUseCase.execute({
        name,
        description,
        price,
        stock,
        categoryId,
        brandId,
        id,
      });
      return res.status(200).send(product);
    } catch (error) {
      next(error);
    }
  }
}

export { UpdateProductController };
