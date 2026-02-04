import { ProductService } from '../../src/services/product.service';
import { ProductRepository } from '../../src/repositories/product.repository';

jest.mock('../../src/repositories/product.repository');

describe('ProductService', () => {
  let productService: ProductService;
  let productRepository: jest.Mocked<ProductRepository>;

  beforeEach(() => {
    productRepository = new ProductRepository() as jest.Mocked<ProductRepository>;
    productService = new ProductService(productRepository);
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const mockProducts = [
        {
          id: 'MLA123',
          slug: 'test-product',
          title: 'Test Product',
          price: { amount: 100, currency: 'USD' },
          thumbnail: 'http://test.com/image.jpg',
          condition: 'new' as const,
          freeShipping: true,
        },
      ];

      const findAllSimplifiedSpy = jest.fn().mockResolvedValue(mockProducts);
      productRepository.findAllSimplified = findAllSimplifiedSpy;

      const result = await productService.getAllProducts();

      expect(result).toEqual(mockProducts);
      expect(findAllSimplifiedSpy).toHaveBeenCalled();
    });

    it('should throw error when no products found', async () => {
      productRepository.findAllSimplified = jest.fn().mockResolvedValue([]);

      await expect(productService.getAllProducts()).rejects.toThrow('No products found');
    });
  });

  describe('getProductBySlug', () => {
    it('should return product by slug', async () => {
      const mockProduct = {
        id: 'MLA123',
        slug: 'test-product',
        title: 'Test Product',
        description: 'Test Description',
        price: { amount: 100, currency: 'USD' },
        images: ['http://test.com/image.jpg'],
        condition: 'new' as const,
        availableQuantity: 10,
        soldQuantity: 5,
        seller: {
          id: 'SELLER123',
          nickname: 'Test Seller',
          reputation: {
            level: 'green' as const,
            powerSellerStatus: true,
            positivePercentage: 99,
            transactions: { total: 100, completed: 95, canceled: 5 },
          },
          registrationDate: '2020-01-01T00:00:00Z',
          totalSales: 1000,
        },
        shipping: {
          freeShipping: true,
          mode: 'me2' as const,
          methods: ['Standard'],
        },
        attributes: [
          {
            name: 'Características generales',
            values: [
              { name: 'Marca', value: 'Test' },
              { name: 'Modelo', value: 'Test Model' },
            ],
          },
        ],
        rating: { average: 4.5, total: 100 },
        paymentMethods: [{ id: 'visa', name: 'Visa', type: 'credit_card' as const }],
        warranty: 'Test Warranty',
        category: { id: 'CAT123', name: 'Test Category', path: ['Electronics'] },
      };

      const findBySlugSpy = jest.fn().mockResolvedValue(mockProduct);
      productRepository.findBySlug = findBySlugSpy;

      const result = await productService.getProductBySlug('test-product');

      expect(result).toEqual(mockProduct);
      expect(findBySlugSpy).toHaveBeenCalledWith('test-product');
    });

    it('should throw error when product not found', async () => {
      productRepository.findBySlug = jest.fn().mockResolvedValue(null);

      await expect(productService.getProductBySlug('invalid')).rejects.toThrow(
        'Product with slug invalid not found'
      );
    });

    it('should throw error when slug is empty', async () => {
      await expect(productService.getProductBySlug('')).rejects.toThrow('Product slug is required');
    });

    it('should throw error when slug is whitespace', async () => {
      await expect(productService.getProductBySlug('   ')).rejects.toThrow(
        'Product slug is required'
      );
    });
  });
});
