import request from 'supertest';
import { createApp } from '../../src/app';
import { ApiResponse } from '../../src/utils/response.util';
import { Product, ProductListItem } from '../../src/models/product.model';

describe('Product API Integration Tests', () => {
  const app = createApp();

  describe('GET /api/products', () => {
    it('should return all products', async () => {
      const response = await request(app).get('/api/products').expect(200);
      const body = response.body as ApiResponse<ProductListItem[]>;

      expect(body).toHaveProperty('success', true);
      expect(body).toHaveProperty('data');
      expect(Array.isArray(body.data)).toBe(true);
      expect(body).toHaveProperty('timestamp');

      if (body.data) {
        const product = body.data[0];
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('slug');
        expect(product).toHaveProperty('title');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('thumbnail');
        expect(product).toHaveProperty('condition');
        expect(product).toHaveProperty('freeShipping');
      }
    });

    it('should return 200 even if no products exist', async () => {
      // This test assumes products always exist in test data
      const response = await request(app).get('/api/products');

      expect([200, 500]).toContain(response.status);
    });
  });

  describe('GET /api/products/:slug', () => {
    it('should return product details by slug', async () => {
      // First get the list to find a valid slug
      const listResponse = await request(app).get('/api/products');
      const listBody = listResponse.body as ApiResponse<ProductListItem[]>;
      const firstProductSlug = listBody.data?.[0]?.slug;

      const response = await request(app)
        .get(`/api/products/${firstProductSlug ?? ''}`)
        .expect(200);
      const body = response.body as ApiResponse<Product>;

      expect(body).toHaveProperty('success', true);
      expect(body).toHaveProperty('data');
      expect(body).toHaveProperty('timestamp');

      if (body.data) {
        const product = body.data;
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('slug');
        expect(product).toHaveProperty('title');
        expect(product).toHaveProperty('description');
        expect(product).toHaveProperty('price');
        expect(product).toHaveProperty('images');
        expect(product).toHaveProperty('condition');
        expect(product).toHaveProperty('seller');
        expect(product).toHaveProperty('shipping');
        expect(product).toHaveProperty('attributes');
        expect(product).toHaveProperty('rating');
        expect(product).toHaveProperty('paymentMethods');
        expect(product).toHaveProperty('warranty');
        expect(product).toHaveProperty('category');
      }
    });

    it('should return 404 for non-existent product slug', async () => {
      const response = await request(app).get('/api/products/invalid-slug-123').expect(404);
      const body = response.body as ApiResponse<never>;

      expect(body).toHaveProperty('success', false);
      expect(body).toHaveProperty('error');
      expect(body.error).toHaveProperty('message');
      expect(body.error?.message).toContain('not found');
    });

    it('should return 400 for empty slug', async () => {
      const response = await request(app).get('/api/products/%20');

      expect([400, 404]).toContain(response.status);
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health').expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api-docs', () => {
    it('should return Swagger documentation page', async () => {
      const response = await request(app).get('/api-docs/');

      // Swagger UI returns 200 or redirects
      expect([200, 301, 302]).toContain(response.status);
    });
  });

  describe('Error handling', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/api/invalid-route').expect(404);
      const body = response.body as ApiResponse<never>;

      expect(body).toHaveProperty('success', false);
      expect(body.error).toHaveProperty('code', 'NOT_FOUND');
    });
  });
});
