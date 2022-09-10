import request from 'supertest';
import { jest } from '@jest/globals';
import { getApp } from '../app.js';
import { employeeService } from './employee-service.js';

describe('Employee controller', () => {
  const app = getApp();

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('create', () => {
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
        id: expect.any(String),
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
        id: expect.any(String),
        name: 'Abhishek',
        salary: 145000,
        currency: 'USD',
        department: 'Engineering',
        subDepartment: 'Platform',
        onContract: true,
      });
    });

    it('returns exception on failure', async () => {
      const attrs = {
        name: 'Abhishek',
        salary: '145000',
        currency: 'USD',
        department: 'Engineering',
        sub_department: 'Platform',
      };

      jest.spyOn(employeeService, 'add').mockImplementation(() => {
        throw new Error('failure adding employee');
      });

      const res = await request(app).post('/api/v1/employees').send(attrs);
      expect(res.status).toEqual(422);
      expect(res.body).toEqual({ status: 422, message: 'Error adding new employee record' });
    });
  });

  describe('delete', () => {
    it('deletes employee record', async () => {
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

      const delRes = await request(app).delete(`/api/v1/employees/${employee.id}`);
      expect(delRes.status).toEqual(204);
    });
  });
});
