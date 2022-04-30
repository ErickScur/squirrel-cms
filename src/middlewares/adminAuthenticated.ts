import { NextFunction, Request, Response } from 'express';
import { HTTPBadRequest, HTTPForbidden, HTTPNotFound } from '../http/HTTPHandler';
import { verify } from 'jsonwebtoken';
import { Environment } from '../environment';
import { UsersRepository } from '../modules/users/repositories/implementations/UsersRepository';

interface IPayload {
  sub: string;
  admin: boolean;
}
export async function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const jwtSecret = Environment.getConfig('JWT_SECRET');
  try {
    if (!authHeader) throw new HTTPBadRequest('Token is missing');
    const [, token] = authHeader.split(' ');
    const { sub, admin } = verify(token, jwtSecret) as IPayload;
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(sub);
    if (!user) throw new HTTPNotFound('User does not exist');

    if (!user.admin) throw new HTTPForbidden('User must be admin');
    req.body._user = user;
    next();
  } catch (e) {
    next(e);
  }
}
