import { type NextFunction, type Request, type Response } from 'express';
import createDebug from 'debug';
import { HttpError } from './errors.middleware';
import { Auth, type Payload } from '../services/auth.services.js';

const debug = createDebug('W7E:auth:intercceptor');

export class AuthInterceptor {
  constructor() {
    debug('Instantiated auth interceptor');
  }

  authentication(req: Request, res: Response, next: NextFunction) {
    const data = req.get('Authorization');

    const error = new HttpError(498, 'Token expired/invalid', 'Token invalid');

    if (!data?.startsWith('Bearer')) {
      next(error);
      return;
    }

    const token = data.slice(7);

    try {
      const payload = Auth.verifyJwt(token);
      req.body.payload = payload;
      next();
    } catch (err) {
      error.message = (err as Error).message;
      next(error);
    }
  }

  isAdmin(req: Request, res: Response, next: NextFunction) {
    const { payload } = req.body as { payload: Payload };
    const { role } = payload;
    if (role !== 'admin') {
      next(
        new HttpError(
          403,
          'Forbidden',
          'You are not allowed to access this resource'
        )
      );
      return;
    }

    next();
  }

  authorization(req: Request, res: Response, next: NextFunction) {
    const { payload } = req.body as { payload: Payload };
    const { id } = req.params;
    if (payload.id !== id) {
      next(
        new HttpError(
          403,
          'Forbidden',
          'You are not allowed to access this resource'
        )
      );
    }

    next();
  }
}
