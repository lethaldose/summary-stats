import { Router } from 'express';
import HttpException from '../errors/http-exception.js';
import { logger } from '../utils/logger.js';
import { AUTH_PASSWORD, AUTH_USER } from '../configuration/index.js';
import AuthToken from './auth-token.js';

const router = Router();

const authenticateUser = (username: string, password: string) => {
  return username === AUTH_USER && password === AUTH_PASSWORD;
};

router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (!authenticateUser(username, password)) {
      logger.error(`login failed for user:${username}`);
      return res.send(401);
    }

    const token = AuthToken.generate(username);
    res.status(200).json({ token });
  } catch (err) {
    logger.error(err);
    throw new HttpException(422, 'Unable to login');
  }
});

export { router as authController };
