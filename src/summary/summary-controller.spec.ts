import request from 'supertest';
import { getApp } from '../app.js';
import { employeeService } from '../employee/employee-service.js';
import { AddEmployeePayload } from '../employee/types';

describe('Summary controller', () => {
  const app = getApp();

  beforeEach(() => {
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
      sub_department: 'Platform',
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
      sub_department: 'Loan',
    } as AddEmployeePayload);
  });

  describe('summary', () => {
    it('get summary for all employees', async () => {
      const res = await request(app).get('/api/v1/stats-summary');
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
      const res = await request(app).get('/api/v1/stats-summary').query({ onContract: true });

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
  });

  describe('group by', () => {
    xit('group response by department', async () => {
      const res = await request(app)
        .get('/api/v1/stats-summary')
        .query({ groupBy: ['department'] });

      expect(res.status).toEqual(200);
      expect(res.body).toEqual({
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
              department: 'Engineering',
            },
          },
        ],
      });
    });
  });
});
