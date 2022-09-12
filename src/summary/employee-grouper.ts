import { Employee } from '../employee/employee.js';

export interface EmployeeGroup {
  employees: Employee[];
  group?: Group;
}

export interface Group {
  department: string;
  subDepartment?: string;
}

export interface GroupCriteria {
  department?: boolean;
  subDepartment?: boolean;
}

export default class EmployeeGrouper {
  constructor(private groupBy: GroupCriteria, private employees: Employee[] = []) {}

  private groupList(items: Employee[], attr: string) {
    return items.reduce((r, v) => {
      const key = v[attr];
      if (!r[key]) r[key] = [];
      r[key].push(v);
      return r;
    }, {});
  }

  private employeeGroupFor(dep: string, subDep: string | undefined, employees: Employee[]): EmployeeGroup {
    return {
      group: {
        department: dep,
        subDepartment: subDep,
      },
      employees,
    } as EmployeeGroup;
  }

  group(): EmployeeGroup[] {
    if (this.employees.length == 0) return [];

    if (!this.groupBy.department) return [{ employees: this.employees }];

    let groupByDepartment = {};
    const empGroups: EmployeeGroup[] = [];

    if (this.groupBy.department) groupByDepartment = this.groupList(this.employees, 'department');

    if (this.groupBy.subDepartment) {
      for (const dep of Object.keys(groupByDepartment)) {
        groupByDepartment[dep] = this.groupList(groupByDepartment[dep], 'subDepartment');
      }
    }

    // flatten the response as array
    for (const dep of Object.keys(groupByDepartment)) {
      if (this.groupBy.subDepartment) {
        for (const subDep of Object.keys(groupByDepartment[dep])) {
          empGroups.push(this.employeeGroupFor(dep, subDep, groupByDepartment[dep][subDep]));
        }
      } else {
        empGroups.push(this.employeeGroupFor(dep, undefined, groupByDepartment[dep]));
      }
    }
    return empGroups;
  }
}
