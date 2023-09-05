import dotenv from 'dotenv';
dotenv.config();

interface Config {
  env: string | undefined;
  dbPort: string | number;
  dbUser: string | undefined;
  dbPassword: string | undefined;
  dbHost: string | undefined;
  dbName: string | undefined;
}

const config: Config = {
  env: process.env.NODE_ENV ?? 'dev',
  dbPort: process.env.DB_PORT ?? 3000,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
};

export { config };
