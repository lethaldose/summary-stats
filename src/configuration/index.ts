import { config } from 'dotenv';

const envConfigName: string = process.env.NODE_ENV || 'dev';
config({ path: `./configs/${envConfigName}.env` });

export const PORT: string = process.env.APP_PORT as string;
export const NODE_ENV: string = process.env.NODE_ENV as string;
export const LOG_LEVEL: string = process.env.LOG_LEVEL as string;
export const isProduction: boolean = process.env.NODE_ENV === 'production';
export const AUTH_USER: string = process.env.AUTH_USER as string;
export const AUTH_PASSWORD: string = process.env.AUTH_PASSWORD as string;
export const JWT_SECRET: string = process.env.JWT_SECRET as string;
export const JWT_EXPIRY: string = process.env.JWT_EXPIRY as string;
