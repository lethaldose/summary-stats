import { Router } from 'express';

import { employeeService } from '../employee/employee-service.js';
import { Employee } from '../employee/employee.js';
import StatsCalculator, { SummaryStats } from '../stats/stats-calculator';
// import HttpException from '../errors/http-exception.js';
// import { logger } from '../utils/logger.js';
// const ErrorMessages = {
//   CreateEmployee: 'Error adding new employee record',
// };

const router = Router();

router.get('/', (req, res) => {
  try {
    const items: Employee[] = employeeService.all();
    const summaryStats: SummaryStats = new StatsCalculator(items.map((e) => e.salary)).calculate();
    res.status(200).json({ summaryStats });
  } catch (err) {
    // logger.error(err, ErrorMessages.CreateEmployee);
    // throw new HttpException(422, ErrorMessages.CreateEmployee);
  }
});

export { router as statsSummaryRouter };
