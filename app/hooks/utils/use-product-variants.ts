/**
 * Custom Hook: useProductVariants
 * Manages product variant selection and URL state (dynamic)
 */
import { useMemo, useEffect, useCallback } from "react";
import { useQueryStates, parseAsString } from "nuqs";
import { Product } from "@/types/product.types";

interface UseProductVariantsReturn {
  selectedVariants: Record<string, string>;
  handleVariantChange: (variantId: string, optionId: string) => void;
}

/**
 * Build dynamic query state config based on product variants
 */
function buildQueryConfig(product: Product | undefined) {
  if (!product?.variants) {
    return {};
  }

  const config: Record<
    string,
    ReturnType<typeof parseAsString.withDefault>
  > = {};

  product.variants.forEach((variant) => {
    config[variant.id] = parseAsString.withDefault("");
  });

  return config;
}

export function useProductVariants(
  product: Product | undefined
): UseProductVariantsReturn {
  // Build dynamic query config based on actual product variants
  const queryConfig = useMemo(() => buildQueryConfig(product), [product]);

  // URL state management with nuqs
  const [queryVariants, setQueryVariants] = useQueryStates(queryConfig, {
    history: "replace",
  });

  // Convert to clean object (remove empty values)
  const selectedVariants = useMemo(() => {
    const clean: Record<string, string> = {};
    Object.entries(queryVariants).forEach(([key, value]) => {
      if (value) clean[key] = value;
    });
    return clean;
  }, [queryVariants]);

  // Auto-select first available SKU on mount
  useEffect(() => {
    if (!product?.variants || !product?.skus) return;

    // Only run if no selection exists
    const hasSelection = Object.values(queryVariants).some((v) => v);
    if (hasSelection) return;

    // Find first available SKU
    const firstAvailableSKU = product.skus.find(
      (sku) => sku.availableQuantity > 0
    );

    if (firstAvailableSKU) {
      setQueryVariants(firstAvailableSKU.combination);
    }
  }, [product?.variants, product?.skus, queryVariants, setQueryVariants]);

  // Stable callback for variant changes
  const handleVariantChange = useCallback(
    (variantId: string, optionId: string): void => {
      setQueryVariants({
        [variantId]: optionId,
      });
    },
    [setQueryVariants]
  );

  return {
    selectedVariants,
    handleVariantChange,
  };
}
