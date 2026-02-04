/**
 * Standardized API Response Utilities
 */

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ErrorDetails;
  timestamp: string;
}

export interface ErrorDetails {
  message: string;
  code?: string;
  details?: unknown;
}

export class ResponseUtil {
  /**
   * Success response
   */
  static success<T>(data: T): ApiResponse<T> {
    return {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Error response
   */
  static error(message: string, code?: string, details?: unknown): ApiResponse<never> {
    return {
      success: false,
      error: {
        message,
        code,
        details,
      },
      timestamp: new Date().toISOString(),
    };
  }
}
