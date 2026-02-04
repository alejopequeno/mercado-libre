/**
 * Product Service
 * Handles all product-related API calls
 */
import { apiClient } from "@/lib/api-client";
import { ApiResponse, Product, ProductListItem } from "@/types/product.types";

export class ProductService {
  /**
   * Get all products (simplified list)
   */
  static async getAllProducts(): Promise<ProductListItem[]> {
    const response =
      await apiClient.get<ApiResponse<ProductListItem[]>>("/api/products");

    if (!response.data.success || !response.data.data) {
      throw new Error("Failed to fetch products");
    }

    return response.data.data;
  }

  /**
   * Get product details by slug
   */
  static async getProductBySlug(slug: string): Promise<Product> {
    const response = await apiClient.get<ApiResponse<Product>>(
      `/api/products/${slug}`,
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(`Failed to fetch product with slug: ${slug}`);
    }

    return response.data.data;
  }

  /**
   * Get product details by ID (deprecated)
   */
  static async getProductById(id: string): Promise<Product> {
    const response = await apiClient.get<ApiResponse<Product>>(
      `/api/products/${id}`,
    );

    if (!response.data.success || !response.data.data) {
      throw new Error(`Failed to fetch product with ID: ${id}`);
    }

    return response.data.data;
  }
}
