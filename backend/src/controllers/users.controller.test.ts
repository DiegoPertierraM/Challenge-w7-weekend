import { type Request, type Response } from 'express';
import { HttpError } from '../middleware/errors.middleware';
import { BaseController } from './base.controller';
import { type Repo } from '../repositories/type.repo';
import { valid, type ObjectSchema } from 'joi';

type TestModel = Record<string, unknown>;
type TestCreateDto = Record<string, unknown>;
const testCreateDtoSchema = {
  validate: jest.fn().mockReturnValue({ error: null, value: {} }),
} as unknown as ObjectSchema<TestCreateDto>;
const testUpdateDtoSchema = {
  validate: jest.fn().mockReturnValue({ error: null, value: {} }),
} as unknown as ObjectSchema<TestCreateDto>;

export class TestController extends BaseController<TestModel, TestCreateDto> {
  constructor(protected readonly repo: Repo<TestModel, TestCreateDto>) {
    super(repo, testCreateDtoSchema, testUpdateDtoSchema);
  }
}

describe('Given a instance of the class TestController', () => {
  const repo = {
    readAll: jest.fn(),
    readById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  } as unknown as Repo<TestModel, TestCreateDto>;

  const req = {} as unknown as Request;
  const res = {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;
  const next = jest.fn();

  const controller = new TestController(repo);
  test('Then it should be instance of the class', () => {
    expect(controller).toBeInstanceOf(TestController);
  });
});
