import { DeleteProductUseCase } from './DeleteProductUseCase';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class DeleteProductController {
  async handle(req: Request, res: Response): Promise<Response> {
    const deleteProductUseCase = container.resolve(DeleteProductUseCase);
    const { id } = req.params;
    try {
      await deleteProductUseCase.execute(id);
      return res.status(200).send();
    } catch (error) {
      return res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
}

export { DeleteProductController };
