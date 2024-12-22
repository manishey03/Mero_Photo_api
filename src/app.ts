import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
dotenv.config();

//
import type { NextFunction, Request, Response } from 'express';

//
import './config/database';

//
import appRouter from './router';
import { app, httpServer } from './server';

//
import appConfig from './config/index';
import { error } from './utils/api/response.utl';

//
dotenv.config();

// Other middleware and configurations
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));

// routes
app.use('/api', appRouter);

app.get('/', (_req: Request, res: Response) => {
  return res.json({
    success: true,
    message: 'Api working fine',
  });
});

// Error Handler

/**
 * Interface for Custom Error
 */
export interface CustomError extends Error {
  code: number;
  errors: string | { [key: string]: string };
}

/**
 * Global error handling
 */
app.use((err: CustomError, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    next(err);
  }
  const { message, code } = error(err, err.code);
  //
  return res.status(code).json({ message, code });
});

// FOR SEEDER:
import './seeder';

//
const PORT = appConfig.port;
httpServer.listen(PORT, async () => {
  console.log(`Server running at http://localhost:`, PORT);
});
