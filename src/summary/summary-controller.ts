import { Router } from 'express';
import { employeeService } from '../employee/employee-service.js';
import { Employee } from '../employee/employee.js';
import StatsCalculator, { Stats } from '../stats/stats-calculator.js';
import { FilterCriteria, SummaryStatsResponse } from './types.js';
// import HttpException from '../errors/http-exception.js';
// import { logger } from '../utils/logger.js';
// const ErrorMessages = {
// };

const router = Router();

router.get('/', (req, res) => {
  try {
    const filterParams: FilterCriteria = req.query as FilterCriteria;
    const employees: Employee[] = employeeService.filter(filterParams);
    const stats: Stats = new StatsCalculator(employees.map((e) => e.salary)).calculate();

    const response: SummaryStatsResponse = {
      summaryStats: [
        {
          stats,
        },
      ],
    };
    res.status(200).json(response);
  } catch (err) {
    // logger.error(err, ErrorMessages.CreateEmployee);
    // throw new HttpException(422, ErrorMessages.CreateEmployee);
  }
});

export { router as statsSummaryRouter };
