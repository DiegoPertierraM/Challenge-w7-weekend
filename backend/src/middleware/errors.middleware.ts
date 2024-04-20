import createDebug from 'debug';
import { type NextFunction, type Request, type Response } from 'express';

const debug = createDebug('W7E:errors:middleware');

export class HttpError extends Error {
  constructor(
    public status: number,
    public statusMessage: string,
    message?: string,
    options?: ErrorOptions
  ) {
    super(message, options);
  }
}

export class ErrorsMiddleware {
  constructor() {
    debug('Instantiated errors middleware');
  }

  handle(error: Error, _req: Request, res: Response, _next: NextFunction) {
    if (error instanceof HttpError) {
      debug('Error', error.message);
      res.status(error.status);
      res.json({
        status: `${error.status} ${error.statusMessage}`,
        message: error.message,
      });
      return;
    }

    debug('Request received', error.message);
    res.status(500);
    res.json({
      status: '500 internal server error',
      message: error.message,
    });
  }
}
