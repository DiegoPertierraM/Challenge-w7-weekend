import { type PrismaClient } from '@prisma/client';
import { createApp, startApp } from './app';

describe('Given the function createApp ', () => {
  test('Then it should be call and return app', () => {
    const app = createApp();
    expect(app).toBeDefined();
  });
});

describe('Given the function startApp ', () => {
  describe('When we call it', () => {
    test('Then it should call app.use', () => {
      const app = createApp();
      jest.spyOn(app, 'use');
      const mockPrisma = {} as unknown as PrismaClient;
      startApp(app, mockPrisma);
      expect(app.use).toBeDefined();
    });
  });
});
