import type { AddEmployeePayload } from './types.js';
import Persistable from '../data-store/persistable.js';

export class Employee implements Persistable {
  id = '';
  name: string;
  salary: number;
  onContract: boolean;
  currency: string;
  department: string;
  subDepartment: string;

  constructor(emp: AddEmployeePayload) {
    this.name = emp.name;
    this.salary = Number(emp.salary);
    this.onContract = emp.on_contract ? emp.on_contract.toLowerCase() === 'true' : false;
    this.currency = emp.currency;
    this.department = emp.department;
    this.subDepartment = emp.sub_department;
  }

  setId(id: string) {
    this.id = id;
  }
}
