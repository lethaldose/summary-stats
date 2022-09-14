import { Employee } from '../employee/employee.js';
import EmployeeGrouper, { EmployeeGroup } from './employee-grouper.js';
import { GroupCriteria } from './types.js';

describe('Employee Grouper', () => {
  let employeeList: Employee[];

  beforeEach(() => {
    employeeList = [];
    employeeList.push(
      new Employee({
        name: 'Abhishek',
        salary: '145000',
        currency: 'USD',
        department: 'Engineering',
        sub_department: 'Platform',
      }),
    );

    employeeList.push(
      new Employee({
        name: 'Roger',
        salary: '45500',
        currency: 'USD',
        on_contract: 'true',
        department: 'Engineering',
        sub_department: 'Data',
      }),
    );

    employeeList.push(
      new Employee({
        name: 'Abhishek',
        salary: '90000',
        currency: 'USD',
        department: 'Banking',
        on_contract: 'true',
        sub_department: 'Loan',
      }),
    );

    employeeList.push(
      new Employee({
        name: 'John',
        salary: '20000',
        currency: 'USD',
        department: 'Banking',
        sub_department: 'Credit',
      }),
    );
  });

  it('handles empty employee list', () => {
    const grouper = new EmployeeGrouper({ department: true } as GroupCriteria, []);
    const grp: EmployeeGroup[] = grouper.group();
    expect(grp).toEqual([]);
  });

  it('handles empty criteria', () => {
    const grouper = new EmployeeGrouper({} as GroupCriteria, employeeList);
    const grp: EmployeeGroup[] = grouper.group();
    expect(grp.length).toEqual(1);
    expect(grp[0].employees.length).toEqual(4);
    expect(grp[0].group).toBeUndefined();
  });

  it('groups employees by department', () => {
    const grouper = new EmployeeGrouper({ department: true } as GroupCriteria, employeeList);
    const grp: EmployeeGroup[] = grouper.group();
    expect(grp).toEqual([
      {
        employees: [
          {
            currency: 'USD',
            department: 'Engineering',
            id: '',
            name: 'Abhishek',
            onContract: false,
            salary: 145000,
            subDepartment: 'Platform',
          },
          {
            currency: 'USD',
            department: 'Engineering',
            id: '',
            name: 'Roger',
            onContract: true,
            salary: 45500,
            subDepartment: 'Data',
          },
        ],
        group: { department: 'Engineering' },
      },
      {
        employees: [
          {
            currency: 'USD',
            department: 'Banking',
            id: '',
            name: 'Abhishek',
            onContract: true,
            salary: 90000,
            subDepartment: 'Loan',
          },
          {
            currency: 'USD',
            department: 'Banking',
            id: '',
            name: 'John',
            onContract: false,
            salary: 20000,
            subDepartment: 'Credit',
          },
        ],
        group: { department: 'Banking' },
      },
    ]);
  });

  it('groups employees by sub department', () => {
    const grouper = new EmployeeGrouper({ department: true, subDepartment: true } as GroupCriteria, employeeList);
    const grp: EmployeeGroup[] = grouper.group();
    expect(grp).toEqual([
      {
        employees: [
          {
            currency: 'USD',
            department: 'Engineering',
            id: '',
            name: 'Abhishek',
            onContract: false,
            salary: 145000,
            subDepartment: 'Platform',
          },
        ],
        group: { department: 'Engineering', subDepartment: 'Platform' },
      },
      {
        employees: [
          {
            currency: 'USD',
            department: 'Engineering',
            id: '',
            name: 'Roger',
            onContract: true,
            salary: 45500,
            subDepartment: 'Data',
          },
        ],
        group: { department: 'Engineering', subDepartment: 'Data' },
      },
      {
        employees: [
          {
            currency: 'USD',
            department: 'Banking',
            id: '',
            name: 'Abhishek',
            onContract: true,
            salary: 90000,
            subDepartment: 'Loan',
          },
        ],
        group: { department: 'Banking', subDepartment: 'Loan' },
      },
      {
        employees: [
          {
            currency: 'USD',
            department: 'Banking',
            id: '',
            name: 'John',
            onContract: false,
            salary: 20000,
            subDepartment: 'Credit',
          },
        ],
        group: { department: 'Banking', subDepartment: 'Credit' },
      },
    ]);
  });
});
