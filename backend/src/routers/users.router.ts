import {
  type NextFunction,
  type Request,
  type Response,
  Router as createRouter,
} from 'express';
import createDebug from 'debug';
import { type UsersController } from '../controllers/users.controller';
import { HttpError } from '../middleware/errors.middleware.js';
import { Auth } from '../services/auth.services.js';
import { type AuthInterceptor } from '../middleware/auth.interceptor';

const debug = createDebug('W7E:users:router');

export class UsersRouter {
  router = createRouter();

  constructor(
    readonly controller: UsersController,
    readonly authInterceptor: AuthInterceptor
  ) {
    debug('Instantiated users router');

    this.router.get('/', controller.getAll.bind(controller));
    this.router.get('/:id', controller.getById.bind(controller));

    this.router.post('/register', controller.create.bind(controller));
    this.router.post('/login', controller.login.bind(controller));

    this.router.patch(
      '/:id',
      authInterceptor.authentication.bind(authInterceptor),
      controller.update.bind(controller)
    );
    this.router.delete(
      '/:id',
      authInterceptor.authentication.bind(authInterceptor),
      controller.delete.bind(controller)
    );
  }
}
