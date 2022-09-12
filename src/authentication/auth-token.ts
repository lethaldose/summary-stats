import { JWT_SECRET, JWT_EXPIRY } from '../configuration/index.js';
import jwt from 'jsonwebtoken';

export default class AuthToken {
  static generate(username: string) {
    return jwt.sign({ username }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
  }
}
