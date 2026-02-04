/**
 * Product Repository
 * Data access layer for products (reads from JSON file)
 */
import fs from 'fs/promises';
import path from 'path';
import { Product, ProductListItem } from '../models/product.model';

export class ProductRepository {
  private readonly dataPath: string;

  constructor() {
    this.dataPath = path.join(__dirname, '../data/products.json');
  }

  /**
   * Get all products from JSON file
   */
  async findAll(): Promise<Product[]> {
    try {
      const data = await fs.readFile(this.dataPath, 'utf-8');
      const products = JSON.parse(data) as Product[];
      return products;
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        throw new Error('Products data file not found');
      }
      throw new Error('Failed to read products data');
    }
  }

  /**
   * Get product by slug
   */
  async findBySlug(slug: string): Promise<Product | null> {
    const products = await this.findAll();
    const product = products.find((p) => p.slug === slug);
    return product || null;
  }

  /**
   * Get simplified product list
   */
  async findAllSimplified(): Promise<ProductListItem[]> {
    const products = await this.findAll();
    return products.map((product) => ({
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      thumbnail: product.images[0],
      condition: product.condition,
      freeShipping: product.shipping.freeShipping,
    }));
  }
}
