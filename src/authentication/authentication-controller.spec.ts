import request from 'supertest';
import { jest } from '@jest/globals';
import { getApp } from '../app.js';

describe('Authentication controller', () => {
  const app = getApp();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('succesfully authenticates user', async () => {
    const attrs = {
      username: 'johndoe',
      password: 'johndoedoe',
    };
    const res = await request(app).post('/api/v1/login').send(attrs);

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({
      token: expect.any(String),
    });
  });

  it('gives unauthorized error', async () => {
    const attrs = {
      username: 'johndoe',
      password: 'invalidpwd',
    };
    const res = await request(app).post('/api/v1/login').send(attrs);
    expect(res.status).toEqual(401);
    expect(res.body).toEqual({});
  });

  it('validates request parameters', async () => {
    const res = await request(app).post('/api/v1/login').send({});

    expect(res.status).toEqual(400);
    expect(res.body).toEqual([
      { message: '"username" is required', path: ['username'] },
      { message: '"password" is required', path: ['password'] },
    ]);
  });
});
