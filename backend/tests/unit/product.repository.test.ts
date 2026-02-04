import { ProductRepository } from '../../src/repositories/product.repository';
import fs from 'fs/promises';

jest.mock('fs/promises');

describe('ProductRepository', () => {
  let productRepository: ProductRepository;
  const mockProducts = [
    {
      id: 'MLA123',
      slug: 'test-product',
      title: 'Test Product',
      description: 'Test Description',
      price: { amount: 100, currency: 'USD' },
      images: ['http://test.com/image.jpg'],
      condition: 'new',
      availableQuantity: 10,
      soldQuantity: 5,
      seller: {
        id: 'SELLER123',
        nickname: 'Test Seller',
        reputation: {
          level: 'green',
          powerSellerStatus: true,
          positivePercentage: 99,
          transactions: { total: 100, completed: 95, canceled: 5 },
        },
        registrationDate: '2020-01-01T00:00:00Z',
        totalSales: 1000,
      },
      shipping: {
        freeShipping: true,
        mode: 'me2',
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
      paymentMethods: [{ id: 'visa', name: 'Visa', type: 'credit_card' }],
      warranty: 'Test Warranty',
      category: { id: 'CAT123', name: 'Test Category', path: ['Electronics'] },
    },
  ];

  beforeEach(() => {
    productRepository = new ProductRepository();
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all products from JSON file', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockProducts));

      const result = await productRepository.findAll();

      expect(result).toEqual(mockProducts);
      expect(fs.readFile).toHaveBeenCalledWith(expect.stringContaining('products.json'), 'utf-8');
    });

    it('should throw error when file not found', async () => {
      const error = new Error('ENOENT');
      (error as NodeJS.ErrnoException).code = 'ENOENT';
      (fs.readFile as jest.Mock).mockRejectedValue(error);

      await expect(productRepository.findAll()).rejects.toThrow('Products data file not found');
    });

    it('should throw error when JSON parsing fails', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue('invalid json');

      await expect(productRepository.findAll()).rejects.toThrow('Failed to read products data');
    });
  });

  describe('findBySlug', () => {
    it('should return product by slug', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockProducts));

      const result = await productRepository.findBySlug('test-product');

      expect(result).toEqual(mockProducts[0]);
    });

    it('should return null when product not found', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockProducts));

      const result = await productRepository.findBySlug('invalid-slug');

      expect(result).toBeNull();
    });
  });

  describe('findAllSimplified', () => {
    it('should return simplified product list', async () => {
      (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockProducts));

      const result = await productRepository.findAllSimplified();

      expect(result).toHaveLength(1);
      expect(result[0]).toEqual({
        id: 'MLA123',
        slug: 'test-product',
        title: 'Test Product',
        price: { amount: 100, currency: 'USD' },
        thumbnail: 'http://test.com/image.jpg',
        condition: 'new',
        freeShipping: true,
      });
    });
  });
});
