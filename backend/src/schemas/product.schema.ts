/**
 * Zod Validation Schemas for Product
 */
import { z } from 'zod';

// Request validation schemas
export const GetProductBySlugSchema = z.object({
  slug: z.string().min(1, 'Product slug is required'),
});
