/**
 * Product Controller
 * Handles HTTP requests and responses
 */
import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';
import { ResponseUtil } from '../utils/response.util';
import { GetProductBySlugSchema } from '../schemas/product.schema';
import { ZodError } from 'zod';

export class ProductController {
  private readonly productService: ProductService;

  constructor(productService: ProductService) {
    this.productService = productService;
  }

  /**
   * Get all products
   * GET /api/products
   */
  getAllProducts = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const products = await this.productService.getAllProducts();
      res.status(200).json(ResponseUtil.success(products));
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get product by slug
   * GET /api/products/slug/:slug
   */
  getProductBySlug = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Validate params
      const { slug } = GetProductBySlugSchema.parse({ slug: req.params.slug });

      const product = await this.productService.getProductBySlug(slug);
      res.status(200).json(ResponseUtil.success(product));
    } catch (error) {
      if (error instanceof ZodError) {
        res
          .status(400)
          .json(ResponseUtil.error('Invalid product slug', 'VALIDATION_ERROR', error.errors));
        return;
      }
      next(error);
    }
  };
}
