import { container } from 'tsyringe';
import { UpdateProductUseCase } from './UpdateProductUseCase';
import { Request, Response } from 'express';

class UpdateProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const updateProductUseCase = container.resolve(UpdateProductUseCase);
    const { id } = req.params;
    const { name, description, mainImage, price, stock, categoryId, brandId } = req.body;
    try {
      const product = await updateProductUseCase.execute({
        name,
        description,
        mainImage,
        price,
        stock,
        categoryId,
        brandId,
        id,
      });
      return res.status(200).send(product);
    } catch (error) {
      return res.status(error.statusCode || 400).json({ message: error.message });
    }
  }
}

export { UpdateProductController };
