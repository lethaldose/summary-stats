import request from 'supertest';
import { getApp } from './app';

describe('/api/v1/test', () => {
  it('works', async () => {
    const app = getApp();
    const res = await request(app).get('/api/v1/health-check');
    const { ok } = res.body;
    expect(res.status).toEqual(200);
    expect(ok).toEqual(true);
  });
});
