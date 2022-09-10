import request from 'supertest';
import { getApp } from '../app.js';
import { employeeService } from '../employee/employee-service.js';
import { AddEmployeePayload } from '../employee/types';

describe('Summary controller', () => {
  const app = getApp();

  describe('summary', () => {
    beforeEach(() => {
      employeeService.add({
        name: 'Abhishek',
        salary: '145000',
        currency: 'USD',
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
    });

    it('get summary for all employees', async () => {
      const res = await request(app).get('/api/v1/stats-summary');
      expect(res.status).toEqual(200);
      expect(res.body).toEqual({
        summaryStats: {
          mean: 117500,
          max: 145000,
          min: 90000,
        },
      });
    });
  });
});
