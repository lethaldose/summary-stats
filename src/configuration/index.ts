import { config } from 'dotenv';

config();

export const PORT: string = process.env.APP_PORT as string;
export const NODE_ENV: string = process.env.NODE_ENV as string;
export const LOG_LEVEL: string = process.env.LOG_LEVEL as string;
export const isProduction: boolean = process.env.NODE_ENV === 'production';
