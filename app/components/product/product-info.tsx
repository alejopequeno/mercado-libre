/**
 * Product Info Component
 * Displays main product information (title, price, condition)
 */
"use client";

import { formatPrice } from "@/lib/utils";
import { Product } from "@/types/product.types";
import { Star, Package } from "lucide-react";
import { DiscountBadge } from "./discount-badge";

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const hasDiscount = product.price.discount && product.price.originalAmount;

  return (
    <div className="space-y-2">
      {/* Condition & Sales */}
      <div className="flex items-center gap-2 text-sm text-neutral-400">
        <span className="capitalize">
          {product.condition === "new" ? "Nuevo" : "Usado"}
        </span>
        <span>|</span>
        <span>{product.soldQuantity} vendidos</span>
      </div>

      <div>
        {/* Title */}
        <h1 className="text-2xl font-medium">{product.title}</h1>

        {/* Rating */}
        {product.rating.total > 0 && (
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-blue-500 text-blue-500" />
              <span className="ml-1 text-sm font-semibold">
                {product.rating.average}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.rating.total} reseñas)
            </span>
          </div>
        )}
      </div>

      {/* Price */}
      <div className="space-y-2">
        {hasDiscount && (
          <div className="flex items-center gap-2">
            <span className="text-lg text-neutral-400 line-through">
              {formatPrice(
                product.price.originalAmount!,
                product.price.currency,
              )}
            </span>
            <DiscountBadge discount={product.price.discount!} />
          </div>
        )}
        <div className="text-4xl">
          {formatPrice(product.price.amount, product.price.currency)}
        </div>
      </div>

      {product.shipping.estimatedDelivery && (
        <p className="text-sm text-muted-foreground">
          {product.shipping.freeShipping ? (
            <span className="text-green-600 font-semibold">Llega gratis</span>
          ) : (
            <span className="font-semibold">Llega en</span>
          )}{" "}
          en {product.shipping.estimatedDelivery}
        </p>
      )}

      {/* Stock */}
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Package className="size-4" strokeWidth={2.4} />
        <span>
          <span className="font-semibold">Stock disponible:</span>{" "}
          {product.availableQuantity} unidades
        </span>
      </div>

      {/* Warranty */}
      {product.warranty && (
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold">Garantía:</span> {product.warranty}
        </p>
      )}
    </div>
  );
}
