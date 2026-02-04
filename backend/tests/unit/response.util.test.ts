/**
 * Response Utility Unit Tests
 */
import { ResponseUtil } from '../../src/utils/response.util';

describe('ResponseUtil', () => {
  describe('success', () => {
    it('should return success response with data', () => {
      const data = { id: 1, name: 'Test' };
      const response = ResponseUtil.success(data);

      expect(response).toHaveProperty('success', true);
      expect(response).toHaveProperty('data', data);
      expect(response).toHaveProperty('timestamp');
      expect(typeof response.timestamp).toBe('string');
    });

    it('should return success response with array data', () => {
      const data = [1, 2, 3];
      const response = ResponseUtil.success(data);

      expect(response.success).toBe(true);
      expect(response.data).toEqual(data);
    });
  });

  describe('error', () => {
    it('should return error response with message', () => {
      const message = 'Something went wrong';
      const response = ResponseUtil.error(message);

      expect(response).toHaveProperty('success', false);
      expect(response).toHaveProperty('error');
      expect(response.error).toHaveProperty('message', message);
      expect(response).toHaveProperty('timestamp');
    });

    it('should return error response with code', () => {
      const message = 'Not found';
      const code = 'NOT_FOUND';
      const response = ResponseUtil.error(message, code);

      expect(response.error).toHaveProperty('code', code);
    });

    it('should return error response with details', () => {
      const message = 'Validation failed';
      const code = 'VALIDATION_ERROR';
      const details = { field: 'email', issue: 'invalid format' };
      const response = ResponseUtil.error(message, code, details);

      expect(response.error).toHaveProperty('details', details);
    });
  });
});
