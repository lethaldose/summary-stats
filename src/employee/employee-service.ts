import { nanoid } from 'nanoid';
import type { FilterCriteria, AddEmployeePayload } from './types.js';
import { Employee } from './employee.js';
import InMemoryStore from '../data-store/in-memory-store.js';

export default class EmployeeService {
  private store: InMemoryStore;

  constructor() {
    this.store = new InMemoryStore();
  }

  add(emp: AddEmployeePayload): Employee {
    const newEmployee = new Employee(emp);
    newEmployee.setId(nanoid());

    if (!this.store.add(newEmployee)) {
      throw new Error('Cannot add employee');
    }

    return newEmployee;
  }

  remove(id: string): boolean {
    return this.store.remove(id);
  }

  all(): Employee[] {
    return this.store.items as Employee[];
  }

  filter(filterCriteria: FilterCriteria): Employee[] {
    return this.store.items.filter((item) => {
      const emp: Employee = item as Employee;
      let condition = true;
      if (filterCriteria.onContract) {
        condition = condition && emp.onContract == true;
      }
      return condition;
    }) as Employee[];
  }
}

export const employeeService = new EmployeeService();
