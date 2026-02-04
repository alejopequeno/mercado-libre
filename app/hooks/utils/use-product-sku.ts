/**
 * Custom Hook: useProductSKU
 * Manages SKU selection and pricing logic
 */
import { useMemo } from "react";
import { Product, ProductSKU, Price } from "@/types/product.types";

interface UseProductSKUProps {
  product: Product | undefined;
  selectedVariants: Record<string, string>;
}

interface UseProductSKUReturn {
  currentSKU: ProductSKU | null;
  adjustedPrice: Price | undefined;
  isOutOfStock: boolean;
  availableQuantity: number;
}

// Utility: Find SKU by combination
function findSKUByCombination(
  skus: ProductSKU[] | undefined,
  combination: Record<string, string>
): ProductSKU | null {
  if (!skus) return null;
  return (
    skus.find((sku) =>
      Object.keys(sku.combination).every(
        (key) => sku.combination[key] === combination[key]
      )
    ) || null
  );
}

export function useProductSKU({
  product,
  selectedVariants,
}: UseProductSKUProps): UseProductSKUReturn {
  // Find current SKU based on selected variants
  const currentSKU = useMemo(
    () => findSKUByCombination(product?.skus, selectedVariants),
    [product?.skus, selectedVariants]
  );

  // Calculate adjusted price based on SKU
  const adjustedPrice = useMemo(() => {
    if (!product?.price) return undefined;
    if (!currentSKU) return product.price;

    return {
      ...product.price,
      amount: product.price.amount + currentSKU.priceModifier,
      originalAmount: product.price.originalAmount
        ? product.price.originalAmount + currentSKU.priceModifier
        : undefined,
    };
  }, [product, currentSKU]);

  // Stock status
  const isOutOfStock = currentSKU ? currentSKU.availableQuantity === 0 : false;
  const availableQuantity = currentSKU?.availableQuantity ?? 0;

  return {
    currentSKU,
    adjustedPrice,
    isOutOfStock,
    availableQuantity,
  };
}
