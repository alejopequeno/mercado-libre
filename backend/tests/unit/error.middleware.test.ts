/**
 * Error Middleware Unit Tests
 */
import { Request, Response, NextFunction } from 'express';
import { AppError, errorHandler, notFoundHandler } from '../../src/middlewares/error.middleware';
import { ApiResponse, ErrorDetails } from '../../src/utils/response.util';

describe('Error Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    mockNext = jest.fn();

    // Mock console.error to avoid cluttering test output
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('AppError', () => {
    it('should create an AppError with message and statusCode', () => {
      const error = new AppError('Test error', 400, 'TEST_ERROR');

      expect(error.message).toBe('Test error');
      expect(error.statusCode).toBe(400);
      expect(error.code).toBe('TEST_ERROR');
      expect(error.name).toBe('AppError');
    });

    it('should default to statusCode 500', () => {
      const error = new AppError('Test error');

      expect(error.statusCode).toBe(500);
    });
  });

  describe('errorHandler', () => {
    it('should handle AppError with custom status code', () => {
      const error = new AppError('Custom error', 403, 'FORBIDDEN');

      errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(403);

      const errorMatcher = expect.objectContaining({
        message: 'Custom error',
        code: 'FORBIDDEN',
      }) as unknown as ErrorDetails;

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining<Partial<ApiResponse<never>>>({
          success: false,
          error: errorMatcher,
        })
      );
    });

    it('should handle "not found" errors with 404', () => {
      const error = new Error('Product not found');

      errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(404);

      const errorMatcher = expect.objectContaining({
        code: 'NOT_FOUND',
      }) as unknown as ErrorDetails;

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining<Partial<ApiResponse<never>>>({
          success: false,
          error: errorMatcher,
        })
      );
    });

    it('should handle "required" errors with 400', () => {
      const error = new Error('Field is required');

      errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(400);

      const errorMatcher = expect.objectContaining({
        code: 'BAD_REQUEST',
      }) as unknown as ErrorDetails;

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining<Partial<ApiResponse<never>>>({
          success: false,
          error: errorMatcher,
        })
      );
    });

    it('should handle generic errors with 500', () => {
      const error = new Error('Something went wrong');

      errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(500);

      const errorMatcher = expect.objectContaining({
        message: 'Internal server error',
        code: 'INTERNAL_SERVER_ERROR',
      }) as unknown as ErrorDetails;

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining<Partial<ApiResponse<never>>>({
          success: false,
          error: errorMatcher,
        })
      );
    });

    it('should include error details in development mode', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const error = new Error('Dev error');

      errorHandler(error, mockRequest as Request, mockResponse as Response, mockNext);

      const errorMatcher = expect.objectContaining({
        details: 'Dev error',
      }) as unknown as ErrorDetails;

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining<Partial<ApiResponse<never>>>({
          error: errorMatcher,
        })
      );

      process.env.NODE_ENV = originalEnv;
    });
  });

  describe('notFoundHandler', () => {
    it('should return 404 with NOT_FOUND code', () => {
      notFoundHandler(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);

      const errorMatcher = expect.objectContaining({
        message: 'Route not found',
        code: 'NOT_FOUND',
      }) as unknown as ErrorDetails;

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining<Partial<ApiResponse<never>>>({
          success: false,
          error: errorMatcher,
        })
      );
    });
  });
});
