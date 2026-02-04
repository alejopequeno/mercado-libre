/**
 * Product Service
 * Business logic layer for products
 */
import { Product, ProductListItem } from '../models/product.model';
import { ProductRepository } from '../repositories/product.repository';

export class ProductService {
  private readonly productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  /**
   * Get all products (simplified list)
   */
  async getAllProducts(): Promise<ProductListItem[]> {
    const products = await this.productRepository.findAllSimplified();

    if (products.length === 0) {
      throw new Error('No products found');
    }

    return products;
  }

  /**
   * Get product details by slug
   */
  async getProductBySlug(slug: string): Promise<Product> {
    if (!slug || slug.trim() === '') {
      throw new Error('Product slug is required');
    }

    const product = await this.productRepository.findBySlug(slug);

    if (!product) {
      throw new Error(`Product with slug ${slug} not found`);
    }

    return product;
  }
}
