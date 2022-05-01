import { NextFunction, Request, Response } from 'express';
import { container } from 'tsyringe';
import { UploadImageUseCase } from './UploadImageUseCase';

class UploadImageController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const uploadImageUseCase = container.resolve(UploadImageUseCase);
    const { id } = req.params;
    const files = req.files;
    try {
      const product = await uploadImageUseCase.execute(files, id);
      return res.status(200).send(product);
    } catch (error) {
      next(error);
    }
  }
}

export { UploadImageController };
