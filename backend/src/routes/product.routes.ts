/**
 * Product Routes
 * Defines all product-related endpoints
 */
import { Router, type Router as RouterType } from 'express';
import { ProductController } from '../controllers/product.controller';
import { ProductService } from '../services/product.service';
import { ProductRepository } from '../repositories/product.repository';

const router: RouterType = Router();

// Dependency injection
const productRepository = new ProductRepository();
const productService = new ProductService(productRepository);
const productController = new ProductController(productService);

/**
 * @route GET /api/products
 * @description Get all products (simplified list)
 * @access Public
 */
router.get('/', (req, res, next) => {
  void productController.getAllProducts(req, res, next);
});

/**
 * @route GET /api/products/:slug
 * @description Get product details by slug
 * @access Public
 */
router.get('/:slug', (req, res, next) => {
  void productController.getProductBySlug(req, res, next);
});

export default router;
