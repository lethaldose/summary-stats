import { Router } from 'express';

import { employeeService } from './employee-service.js';
import { AddEmployeePayload } from './types.js';

const router = Router();

router.post('/', (req, res) => {
  const employee = employeeService.add({ ...req.body } as AddEmployeePayload);
  res.status(201).json({ employee });
});

// router.get('/:id', (req, res) => {
// const cusId: string = req.params['id'];
// const employee = employeeService.getById(cusId);
// res.status(200).json({ employee });
// });

export { router as employeeRouter };
