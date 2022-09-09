import type { AddEmployeePayload } from './types.js';
import { Employee } from './employee.js';

class EmployeeService {
  signup(emp: AddEmployeePayload): Employee {
    return new Employee(emp);
  }
}

export const employeeService = new EmployeeService();
