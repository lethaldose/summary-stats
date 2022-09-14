import request from 'supertest';
import { jest } from '@jest/globals';
import { getApp } from '../app.js';
import { employeeService } from './employee-service.js';
import AuthToken from '../authentication/auth-token.js';
import { AUTH_USER } from '../configuration/index.js';

describe('Employee controller', () => {
  const app = getApp();
  let token: string;

  beforeEach(() => {
    token = AuthToken.generate(AUTH_USER);
  });

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
      const res = await request(app)
        .post('/api/v1/employees')
        .set('Authorization', 'Bearer ' + token)
        .send(attrs);

      const { employee } = res.body;
      expect(res.status).toEqual(201);
      expect(employee).toEqual({
        id: expect.any(String),
        name: 'Abhishek',
        salary: 145000,
        currency: 'USD',
        onContract: false,
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
      const res = await request(app)
        .post('/api/v1/employees')
        .set('Authorization', 'Bearer ' + token)
        .send(attrs);

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

      const res = await request(app)
        .post('/api/v1/employees')
        .set('Authorization', 'Bearer ' + token)
        .send(attrs);

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

      const res = await request(app)
        .post('/api/v1/employees')
        .set('Authorization', 'Bearer ' + token)
        .send(attrs);

      const { employee } = res.body;
      expect(res.status).toEqual(201);

      const delRes = await request(app)
        .delete(`/api/v1/employees/${employee.id}`)
        .set('Authorization', 'Bearer ' + token);

      expect(delRes.status).toEqual(204);
    });
  });

  describe('validation', () => {
    it('validates employee record', async () => {
      const res = await request(app)
        .post('/api/v1/employees')
        .set('Authorization', 'Bearer ' + token)
        .send({});

      expect(res.status).toEqual(400);
      expect(res.body).toEqual([
        { message: '"name" is required', path: ['name'] },
        { message: '"department" is required', path: ['department'] },
        { message: '"currency" is required', path: ['currency'] },
        { message: '"salary" is required', path: ['salary'] },
      ]);
    });
  });
});
