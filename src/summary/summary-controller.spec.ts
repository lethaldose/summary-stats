import request from 'supertest';
import { getApp } from '../app.js';
import { employeeService } from '../employee/employee-service.js';
import { AddEmployeePayload } from '../employee/types.js';
import { Express } from 'express';
import { jest } from '@jest/globals';
import AuthToken from '../authentication/auth-token.js';
import { AUTH_USER } from '../configuration/index.js';

describe('Summary controller', () => {
  let app: Express;
  let token: string;

  beforeEach(() => {
    token = AuthToken.generate(AUTH_USER);

    app = getApp();
    employeeService.add({
      name: 'Abhishek',
      salary: '145000',
      currency: 'USD',
      department: 'Engineering',
      sub_department: 'Platform',
    } as AddEmployeePayload);

    employeeService.add({
      name: 'Roger',
      salary: '45500',
      currency: 'USD',
      on_contract: 'true',
      department: 'Engineering',
      sub_department: 'Data',
    } as AddEmployeePayload);

    employeeService.add({
      name: 'Abhishek',
      salary: '90000',
      currency: 'USD',
      department: 'Banking',
      on_contract: 'true',
      sub_department: 'Loan',
    } as AddEmployeePayload);

    employeeService.add({
      name: 'John',
      salary: '20000',
      currency: 'USD',
      department: 'Banking',
      sub_department: 'Credit',
    } as AddEmployeePayload);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('summary', () => {
    it('get summary for all employees', async () => {
      const res = await request(app)
        .get('/api/v1/stats-summary')
        .set('Authorization', 'Bearer ' + token);

      expect(res.status).toEqual(200);
      expect(res.body).toEqual({
        summaryStats: [
          {
            stats: {
              mean: 75125,
              max: 145000,
              min: 20000,
            },
          },
        ],
      });
    });

    it('filters employee by on_contract', async () => {
      const res = await request(app)
        .get('/api/v1/stats-summary')
        .set('Authorization', 'Bearer ' + token)
        .query({ onContract: true });

      expect(res.status).toEqual(200);
      expect(res.body).toEqual({
        summaryStats: [
          {
            stats: {
              mean: 67750,
              max: 90000,
              min: 45500,
            },
          },
        ],
      });
    });

    it('handles error', async () => {
      jest.spyOn(employeeService, 'filter').mockImplementation(() => {
        throw new Error('error filtering');
      });
      const res = await request(app)
        .get('/api/v1/stats-summary')
        .set('Authorization', 'Bearer ' + token)
        .query({ onContract: true });

      expect(res.status).toEqual(422);
      expect(res.body).toEqual({ status: 422, message: 'Error getting stats summary' });
    });
  });

  describe('group by', () => {
    it('group response by department', async () => {
      const res = await request(app)
        .get('/api/v1/stats-summary')
        .set('Authorization', 'Bearer ' + token)
        .query({ groupBy: 'department' });

      expect(res.status).toEqual(200);
      expect(res.body).toMatchObject({
        summaryStats: [
          {
            stats: {
              mean: 95250,
              max: 145000,
              min: 45500,
            },
            group: {
              department: 'Engineering',
            },
          },
          {
            stats: {
              mean: 55000,
              max: 90000,
              min: 20000,
            },
            group: {
              department: 'Banking',
            },
          },
        ],
      });
    });

    it('group response by department and sub department', async () => {
      const res = await request(app)
        .get('/api/v1/stats-summary')
        .set('Authorization', 'Bearer ' + token)
        .query({ groupBy: ['department', 'subDepartment'] });

      expect(res.status).toEqual(200);
      expect(res.body).toEqual({
        summaryStats: [
          {
            group: { department: 'Engineering', subDepartment: 'Platform' },
            stats: { max: 145000, mean: 145000, min: 145000 },
          },
          {
            group: { department: 'Engineering', subDepartment: 'Data' },
            stats: { max: 45500, mean: 45500, min: 45500 },
          },
          { group: { department: 'Banking', subDepartment: 'Loan' }, stats: { max: 90000, mean: 90000, min: 90000 } },
          { group: { department: 'Banking', subDepartment: 'Credit' }, stats: { max: 20000, mean: 20000, min: 20000 } },
        ],
      });
    });

    it('returns bad request error if only subDepartment is passed in', async () => {
      const res = await request(app)
        .get('/api/v1/stats-summary')
        .set('Authorization', 'Bearer ' + token)
        .query({ groupBy: 'subDepartment' });

      expect(res.status).toEqual(400);
      expect(res.body).toEqual({
        message:
          'Only subDepartment is passed in groupBy criteria. Valid values are department or both department and subDepartment',
      });
    });
  });
});
