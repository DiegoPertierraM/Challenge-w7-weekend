import { type AuthInterceptor } from '../middleware/auth.interceptor';
import { Auth } from './auth.services';

describe('Given a instance of the class SongsRouter', () => {
  const auth = new Auth();
  test('Then it should be instance of the class', () => {
    expect(auth).toBeInstanceOf(Auth);
  });
});
