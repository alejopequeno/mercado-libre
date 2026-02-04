/**
 * Custom Hook: useProductImages
 * Returns images based on selected variants (any variant type)
 */
import { useMemo } from "react";
import { Product } from "@/types/product.types";

export function useProductImages(
  product: Product | undefined,
  selectedVariants: Record<string, string>
): string[] {
  return useMemo(() => {
    if (!product?.variants) return product?.images || [];

    // Loop through all variants and check if any selected option has images
    for (const variant of product.variants) {
      const selectedOptionId = selectedVariants[variant.id];
      if (!selectedOptionId) continue;

      const selectedOption = variant.options.find(
        (opt) => opt.id === selectedOptionId
      );

      if (selectedOption?.images && selectedOption.images.length > 0) {
        return selectedOption.images;
      }
    }

    // Fallback to product default images
    return product.images;
  }, [product, selectedVariants]);
}
