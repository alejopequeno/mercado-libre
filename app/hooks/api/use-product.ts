/**
 * useProduct Hook
 * Custom hook for fetching single product details using TanStack Query
 */
"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ProductService } from "@/services/product.service";
import { Product } from "@/types/product.types";

interface UseProductOptions {
  enabled?: boolean;
}

export function useProduct(
  slug: string,
  options?: UseProductOptions,
): UseQueryResult<Product, Error> {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => ProductService.getProductBySlug(slug),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
    enabled: options?.enabled !== false && !!slug,
    retry: 2,
  });
}
