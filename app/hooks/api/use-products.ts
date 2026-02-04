/**
 * useProducts Hook
 * Custom hook for fetching products list using TanStack Query
 */
"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ProductService } from "@/services/product.service";
import { ProductListItem } from "@/types/product.types";

export function useProducts(): UseQueryResult<ProductListItem[], Error> {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => ProductService.getAllProducts(),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos (antes era cacheTime)
  });
}
