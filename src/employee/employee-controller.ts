import { Router } from 'express';

import { employeeService } from './employee-service.js';
import { AddEmployeePayload } from './types.js';
import HttpException from '../errors/http-exception.js';
import { logger } from '../utils/logger.js';

const ErrorMessages = {
  CreateEmployee: 'Error adding new employee record',
};

const router = Router();

router.post('/', (req, res) => {
  try {
    const employee = employeeService.add({ ...req.body } as AddEmployeePayload);
    res.status(201).json({ employee });
  } catch (err) {
    logger.error(err, ErrorMessages.CreateEmployee);
    throw new HttpException(422, ErrorMessages.CreateEmployee);
  }
});

router.delete('/:id', (req, res) => {
  const empId: string = req.params['id'];
  employeeService.remove(empId);
  res.sendStatus(204);
});

export { router as employeeRouter };
