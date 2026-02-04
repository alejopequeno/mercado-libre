/**
 * Error Handling Middleware
 * Centralized error handling for the application
 */
import { Request, Response, NextFunction } from 'express';
import { ResponseUtil } from '../utils/response.util';

export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number = 500,
    public code?: string
  ) {
    super(message);
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  error: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  if (process.env.NODE_ENV !== 'test') {
    console.error('Error:', error);
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json(ResponseUtil.error(error.message, error.code));
    return;
  }

  // Handle specific error types
  if (error.message.includes('not found')) {
    res.status(404).json(ResponseUtil.error(error.message, 'NOT_FOUND'));
    return;
  }

  if (error.message.includes('required')) {
    res.status(400).json(ResponseUtil.error(error.message, 'BAD_REQUEST'));
    return;
  }

  // Default server error
  res
    .status(500)
    .json(
      ResponseUtil.error(
        'Internal server error',
        'INTERNAL_SERVER_ERROR',
        process.env.NODE_ENV === 'development' ? error.message : undefined
      )
    );
};

export const notFoundHandler = (_req: Request, res: Response): void => {
  res.status(404).json(ResponseUtil.error('Route not found', 'NOT_FOUND'));
};
