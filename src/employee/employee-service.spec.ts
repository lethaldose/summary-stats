import EmployeeService from './employee-service.js';
import { AddEmployeePayload } from './types.js';
import { FilterCriteria } from '../summary/types.js';

describe('EmployeeService', () => {
  describe('filter', () => {
    let empSvc: EmployeeService;
    beforeEach(() => {
      empSvc = new EmployeeService();
      empSvc.add({
        name: 'Abhishek',
        salary: '145000',
        currency: 'USD',
        department: 'Engineering',
        sub_department: 'Platform',
      } as AddEmployeePayload);

      empSvc.add({
        name: 'Anurag',
        salary: '34000',
        currency: 'USD',
        on_contract: 'true',
        department: 'Banking',
        sub_department: 'Loans',
      } as AddEmployeePayload);
    });

    it('should filter emloyees by onContract', () => {
      const emps = empSvc.filter({ onContract: true } as FilterCriteria);
      expect(emps.length).toEqual(1);
      expect(emps[0].onContract).toBeTruthy();
    });

    it('should not filter emloyees by onContract', () => {
      const emps = empSvc.filter({} as FilterCriteria);
      expect(emps.length).toEqual(2);
    });
  });
});
