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

  private groupList(items: Employee[], attr: keyof Employee): { [key: string]: Employee[] } {
    const empGroup: { [key: string]: Employee[] } = {};
    return items.reduce((r, v) => {
      const key = v[attr] as string;
      if (!r[key]) r[key] = [];
      r[key].push(v);
      return r;
    }, empGroup);
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

    let groupByDepartment: { [key: string]: Employee[] } = {};
    const empGroups: EmployeeGroup[] = [];

    if (this.groupBy.department) groupByDepartment = this.groupList(this.employees, 'department');

    const groupBySubDepartment: { [key: string]: { [key: string]: Employee[] } } = {};
    if (this.groupBy.subDepartment) {
      for (const dep of Object.keys(groupByDepartment)) {
        groupBySubDepartment[dep] = this.groupList(groupByDepartment[dep], 'subDepartment');
      }
    }

    // flatten the response as array
    for (const dep of Object.keys(groupByDepartment)) {
      if (this.groupBy.subDepartment) {
        for (const subDep of Object.keys(groupBySubDepartment[dep])) {
          empGroups.push(this.employeeGroupFor(dep, subDep, groupBySubDepartment[dep][subDep]));
        }
      } else {
        empGroups.push(this.employeeGroupFor(dep, undefined, groupByDepartment[dep]));
      }
    }
    return empGroups;
  }
}
