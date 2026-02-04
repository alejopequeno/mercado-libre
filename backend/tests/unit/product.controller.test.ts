import { ProductController } from '../../src/controllers/product.controller';
import { ProductService } from '../../src/services/product.service';
import { Request, Response, NextFunction } from 'express';
import { ApiResponse, ErrorDetails } from '../../src/utils/response.util';

jest.mock('../../src/services/product.service');

describe('ProductController', () => {
  let productController: ProductController;
  let productService: jest.Mocked<ProductService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    productService = new ProductService({} as never) as jest.Mocked<ProductService>;
    productController = new ProductController(productService);

    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
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

      const getAllProductsSpy = jest.fn().mockResolvedValue(mockProducts);
      productService.getAllProducts = getAllProductsSpy;

      await productController.getAllProducts(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(getAllProductsSpy).toHaveBeenCalled();
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: mockProducts,
        })
      );
    });

    it('should call next with error on service failure', async () => {
      const error = new Error('Service error');
      productService.getAllProducts = jest.fn().mockRejectedValue(error);

      await productController.getAllProducts(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
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

      mockRequest.params = { slug: 'test-product' };
      const getProductBySlugSpy = jest.fn().mockResolvedValue(mockProduct);
      productService.getProductBySlug = getProductBySlugSpy;

      await productController.getProductBySlug(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(getProductBySlugSpy).toHaveBeenCalledWith('test-product');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          data: mockProduct,
        })
      );
    });

    it('should return 400 on validation error', async () => {
      mockRequest.params = { slug: '' };

      await productController.getProductBySlug(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);

      const errorMatcher = expect.objectContaining({
        code: 'VALIDATION_ERROR',
      }) as unknown as ErrorDetails;

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining<Partial<ApiResponse<never>>>({
          success: false,
          error: errorMatcher,
        })
      );
    });

    it('should call next with error on service failure', async () => {
      const error = new Error('Service error');
      mockRequest.params = { slug: 'test-product' };
      productService.getProductBySlug = jest.fn().mockRejectedValue(error);

      await productController.getProductBySlug(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
