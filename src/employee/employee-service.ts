import { nanoid } from 'nanoid';
import type { AddEmployeePayload } from './types.js';
import { Employee } from './employee.js';
import InMemoryStore from '../data-store/in-memory-store.js';

class EmployeeService {
  store: InMemoryStore;

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
}

export const employeeService = new EmployeeService();
