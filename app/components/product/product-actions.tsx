/**
 * Product Actions Component
 * Purchase and cart action buttons
 */
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductActionsProps {
  isDisabled: boolean;
  onBuyNow?: () => void;
  onAddToCart?: () => void;
}

export const ProductActions = memo(function ProductActions({
  isDisabled,
  onBuyNow,
  onAddToCart,
}: ProductActionsProps) {
  return (
    <div className="space-y-3">
      <Button
        className="w-full"
        size="xl"
        variant="blue"
        disabled={isDisabled}
        onClick={onBuyNow}
      >
        Comprar ahora
      </Button>
      <Button
        variant="outline"
        className="w-full gap-2"
        size="xl"
        disabled={isDisabled}
        onClick={onAddToCart}
      >
        <ShoppingCart className="size-4" />
        Agregar al carrito
      </Button>
    </div>
  );
});
