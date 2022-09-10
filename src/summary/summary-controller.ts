import { Router } from 'express';
import { employeeService } from '../employee/employee-service.js';
import { Employee } from '../employee/employee.js';
import StatsCalculator, { SummaryStats } from '../stats/stats-calculator.js';
import { FilterCriteria } from '../employee/types.js';
import qs from 'qs';
// import HttpException from '../errors/http-exception.js';
// import { logger } from '../utils/logger.js';
// const ErrorMessages = {
// };

const router = Router();

router.get('/', (req, res) => {
  try {
    const filterParams: FilterCriteria = req.query as FilterCriteria;
    const employees: Employee[] = employeeService.filter(filterParams);
    const summaryStats: SummaryStats = new StatsCalculator(employees.map((e) => e.salary)).calculate();
    res.status(200).json({ summaryStats });
  } catch (err) {
    // logger.error(err, ErrorMessages.CreateEmployee);
    // throw new HttpException(422, ErrorMessages.CreateEmployee);
  }
});

export { router as statsSummaryRouter };
