/**
 * Product Stock Indicator Component
 * Shows stock availability status
 */
import { memo } from "react";

interface ProductStockIndicatorProps {
  availableQuantity: number;
  lowStockThreshold?: number;
}

export const ProductStockIndicator = memo(function ProductStockIndicator({
  availableQuantity,
  lowStockThreshold = 10,
}: ProductStockIndicatorProps) {
  if (availableQuantity === 0) {
    return (
      <div className="text-sm">
        <p className="text-red-600 font-medium">Sin stock</p>
      </div>
    );
  }

  if (availableQuantity < lowStockThreshold) {
    return (
      <div className="text-sm">
        <p className="text-orange-600 font-medium">
          ¡Últimas {availableQuantity} unidades!
        </p>
      </div>
    );
  }

  return (
    <div className="text-sm">
      <p className="text-green-600 font-medium">Stock disponible</p>
    </div>
  );
});
