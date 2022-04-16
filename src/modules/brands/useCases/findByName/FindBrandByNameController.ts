import { Request, Response } from 'express';
import { FindBrandByNameUseCase } from './FindBrandByNameUseCase';
import { container } from 'tsyringe';

class FindBrandByNameController {
  async handle(req: Request, res: Response): Promise<Response> {
    const findBrandByNameUseCase = container.resolve(FindBrandByNameUseCase);
    const { name } = req.params;
    try {
      const brands = await findBrandByNameUseCase.execute(name);
      return res.status(200).send(brands);
    } catch (error) {
      return res.status(error.statusCode).json({ message: error.message });
    }
  }
}

export { FindBrandByNameController };
