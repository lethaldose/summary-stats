import request from 'supertest';
import { getApp } from '../app.js';

describe('Employee controller', () => {
  const app = getApp();

  xit('gets employee by id', async () => {
    const res = await request(app).get('/api/v1/employee/c-0001');
    const { employee } = res.body;
    expect(res.status).toEqual(200);
    expect(employee).toEqual({
      id: 'c-0001',
      name: 'John Doe',
      email: 'foo@example.com',
      created_at: expect.any(String),
    });
  });

  it('creates employee record', async () => {
    const attrs = {
      name: 'Abhishek',
      salary: '145000',
      currency: 'USD',
      department: 'Engineering',
      sub_department: 'Platform',
    };
    const res = await request(app).post('/api/v1/employees').send(attrs);

    const { employee } = res.body;
    expect(res.status).toEqual(201);
    expect(employee).toEqual({
      name: 'Abhishek',
      salary: 145000,
      currency: 'USD',
      department: 'Engineering',
      subDepartment: 'Platform',
    });
  });

  it('creates oncontract employee record', async () => {
    const attrs = {
      name: 'Abhishek',
      salary: '145000',
      currency: 'USD',
      department: 'Engineering',
      sub_department: 'Platform',
      on_contract: 'true',
    };
    const res = await request(app).post('/api/v1/employees').send(attrs);

    const { employee } = res.body;
    expect(res.status).toEqual(201);
    expect(employee).toEqual({
      name: 'Abhishek',
      salary: 145000,
      currency: 'USD',
      department: 'Engineering',
      subDepartment: 'Platform',
      onContract: true,
    });
  });
});
