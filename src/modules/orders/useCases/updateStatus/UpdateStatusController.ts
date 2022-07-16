import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { UpdateStatusUseCase } from './UpdateStatusUseCase';

class UpdateStatusController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const updateStatusUseCase = container.resolve(UpdateStatusUseCase);
    const { id } = req.query;
    try {
      //@ts-ignore
      await updateStatusUseCase.execute(id);
      return res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
}

export { UpdateStatusController };
