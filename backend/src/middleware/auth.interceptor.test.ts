import { type Request, type Response } from 'express';
import { AuthInterceptor } from './auth.interceptor';
import { Auth } from '../services/auth.services';
import { HttpError } from './errors.middleware';

describe('Given a instance of the class AuthInterceptor', () => {
  const authInterceptor = new AuthInterceptor();
  Auth.verifyJwt = jest.fn().mockReturnValue({ id: '123' });
  test('Then it should be instance of the class', () => {
    expect(authInterceptor).toBeInstanceOf(AuthInterceptor);
  });

  describe('When we call the method authentication', () => {
    const req = {
      body: {},
      get: jest.fn().mockReturnValue('Bearer token'),
    } as unknown as Request;
    const res = {
      json: jest.fn(),
      status: jest.fn(),
    } as unknown as Response;
    const next = jest.fn();

    test('Then call next without parameters', () => {
      authInterceptor.authentication(req, res, next);
      expect(Auth.verifyJwt).toHaveBeenCalled();
      expect(req.body.payload).toEqual({ id: '123' });
      expect(next).toHaveBeenCalledWith();
    });

    describe('When we call the method authentication and token is malformed', () => {
      test('Then call next without parameters', () => {
        const error = new HttpError(
          498,
          'Token expired/invalid',
          'Token invalid'
        );
        req.get = jest.fn().mockReturnValue('myToken');
        authInterceptor.authentication(req, res, next);
        expect(next).toHaveBeenCalledWith(error);
      });
    });

    describe('When we call the method authentication and token is invalid', () => {
      test('Then call next with error', () => {
        const error = new Error('Token invalid');
        req.get = jest.fn().mockReturnValue('Bearer myToken');
        // eslint-disable-next-line max-nested-callbacks
        Auth.verifyJwt = jest.fn().mockImplementation(() => {
          throw error;
        });
        authInterceptor.authentication(req, res, next);
        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
