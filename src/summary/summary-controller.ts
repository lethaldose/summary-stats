import { Router } from 'express';
import { employeeService } from '../employee/employee-service.js';
import { Employee } from '../employee/employee.js';
import StatsCalculator, { SummaryStats } from '../stats/stats-calculator.js';
import EmployeeGrouper from './employee-grouper.js';
import { SummaryStatsResponse, SummaryStatsGroup, Group, StatsQuery } from './types.js';
import HttpException from '../errors/http-exception.js';
import { logger } from '../utils/logger.js';
import ValidateSchema, { ValidationProp } from '../middleware/schema-validator.js';
import { summaryStatsQueryScheme } from '../validators/validators.js';
import { StatsQueryParser } from './stats-query-parser.js';

const ErrorMessages = {
  GroupBySubDepartment:
    'Only subDepartment is passed in groupBy criteria. Valid values are department or both department and subDepartment',
  StatsSummary: 'Error getting stats summary',
};

const router = Router();

router.get('/', ValidateSchema(summaryStatsQueryScheme, ValidationProp.query), (req, res) => {
  try {
    const qp = new StatsQueryParser(req.query as unknown as StatsQuery);
    const filterParams = qp.filterCriteria();
    const groupCriteria = qp.groupByCriteria();
    if (!groupCriteria.department && groupCriteria.subDepartment) {
      return res.status(400).json({ message: ErrorMessages.GroupBySubDepartment });
    }

    const employees: Employee[] = employeeService.filter(filterParams);
    const empGroups = new EmployeeGrouper(groupCriteria, employees).group();
    const statsGroup: SummaryStatsGroup[] = [];
    for (const empGroup of empGroups) {
      const stats: SummaryStats = new StatsCalculator(empGroup.employees.map((e) => e.salary)).calculate();
      statsGroup.push({
        group: empGroup.group as Group,
        stats,
      });
    }

    const response: SummaryStatsResponse = { summaryStats: statsGroup };
    res.status(200).json(response);
  } catch (err) {
    logger.error(err, ErrorMessages.StatsSummary);
    throw new HttpException(422, ErrorMessages.StatsSummary);
  }
});

export { router as statsSummaryRouter };
