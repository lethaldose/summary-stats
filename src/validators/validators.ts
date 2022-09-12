import Joi from 'joi';

export const loginSchema = Joi.object({
  username: Joi.string().alphanum().trim().required(),
  password: Joi.string().min(8).required(),
});

export const employeeSchema = Joi.object({
  name: Joi.string().max(50).required(),
  department: Joi.string().max(100).required(),
  sub_department: Joi.string().max(50).optional(),
  currency: Joi.string().length(3).required(),
  salary: Joi.number().min(1).max(999999999).required(),
  on_contract: Joi.boolean().optional(),
});

export const summaryStatsQueryScheme = Joi.object({
  onContract: Joi.boolean().optional(),
  groupBy: Joi.array().items(Joi.string().valid('department', 'subDepartment')).single(),
});

export default { loginSchema, employeeSchema, summaryStatsQueryScheme };
