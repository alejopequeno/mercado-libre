/**
 * Product Variants Component
 * Displays selectable product variants (color, storage, etc.)
 */
"use client";

import { memo } from "react";
import { ProductVariantGroup, ProductSKU } from "@/types/product.types";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface ProductVariantsProps {
  variants: ProductVariantGroup[];
  selectedVariants: Record<string, string>;
  onVariantChange: (variantId: string, optionId: string) => void;
  skus?: ProductSKU[];
}

function isOptionAvailable(
  skus: ProductSKU[],
  selectedVariants: Record<string, string>,
  variantId: string,
  optionId: string,
): boolean {
  if (skus.length === 0) return true;

  const matchingSKUs = skus.filter((sku) => {
    if (sku.combination[variantId] !== optionId) return false;

    return Object.keys(selectedVariants).every((key) => {
      if (key === variantId) return true;
      if (!selectedVariants[key]) return true;
      return sku.combination[key] === selectedVariants[key];
    });
  });

  return matchingSKUs.some((sku) => sku.availableQuantity > 0);
}

export const ProductVariants = memo(function ProductVariants({
  variants,
  selectedVariants,
  onVariantChange,
  skus = [],
}: ProductVariantsProps): React.JSX.Element {
  return (
    <div className="space-y-2">
      {variants.map((variantGroup) => {
        const selectedOption = variantGroup.options.find(
          (opt) => opt.id === selectedVariants[variantGroup.id],
        );

        const isColorVariant = variantGroup.type === "color";

        return (
          <div key={variantGroup.id} className="space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {variantGroup.name}:{" "}
                <span className="font-normal">
                  {selectedOption?.label || "Seleccionar"}
                </span>
              </h3>
            </div>

            {/* Render color circles or text buttons */}
            {isColorVariant ? (
              <div className="flex flex-wrap gap-1">
                {variantGroup.options.map((option) => {
                  const isSelected =
                    selectedVariants[variantGroup.id] === option.id;
                  const isAvailable = isOptionAvailable(
                    skus,
                    selectedVariants,
                    variantGroup.id,
                    option.id,
                  );

                  return (
                    <TooltipProvider key={option.id}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            key={option.id}
                            onClick={() => {
                              if (isAvailable) {
                                onVariantChange(variantGroup.id, option.id);
                              }
                            }}
                            disabled={!isAvailable}
                            className={`relative w-8 h-8 rounded-full border-2 cursor-pointer transition-all duration-200 ${
                              !isAvailable
                                ? "opacity-40 cursor-not-allowed"
                                : isSelected
                                  ? "border-blue-500 shadow-md scale-110"
                                  : "border-gray-300 hover:border-gray-400"
                            }`}
                            style={{
                              backgroundColor: option.hex || "#cccccc",
                            }}
                            title={
                              !isAvailable
                                ? `${option.label} - Sin stock`
                                : option.label
                            }
                          >
                            {isSelected && isAvailable && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Check
                                  className="size-4"
                                  style={{
                                    color:
                                      option.hex === "#ffffff" ||
                                      option.hex === "#f5f5f5"
                                        ? "#000000"
                                        : "#ffffff",
                                  }}
                                  strokeWidth={3}
                                />
                              </div>
                            )}
                            {/* Diagonal line for out of stock */}
                            {!isAvailable && (
                              <div
                                className="absolute inset-0"
                                style={{ pointerEvents: "none" }}
                              >
                                <svg
                                  className="w-full h-full"
                                  viewBox="0 0 48 48"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <line
                                    x1="8"
                                    y1="8"
                                    x2="40"
                                    y2="40"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="text-red-500"
                                  />
                                </svg>
                              </div>
                            )}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent
                          side="top"
                          sideOffset={5}
                          className="font-semibold"
                        >
                          {!isAvailable
                            ? `${option.label} - Sin stock`
                            : option.label}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {variantGroup.options.map((option) => {
                  const isSelected =
                    selectedVariants[variantGroup.id] === option.id;
                  const isAvailable = isOptionAvailable(
                    skus,
                    selectedVariants,
                    variantGroup.id,
                    option.id,
                  );

                  return (
                    <Button
                      key={option.id}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        if (isAvailable) {
                          onVariantChange(variantGroup.id, option.id);
                        }
                      }}
                      disabled={!isAvailable}
                      className={`min-w-[80px] h-10 relative ${
                        !isAvailable
                          ? "opacity-40 cursor-not-allowed line-through"
                          : isSelected
                            ? "border-2 border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-300 hover:border-gray-400"
                      }`}
                      title={
                        !isAvailable ? `${option.label} - Sin stock` : undefined
                      }
                    >
                      {option.label}
                      {!isAvailable && (
                        <span className="ml-1 text-xs text-red-500">
                          (Sin stock)
                        </span>
                      )}
                    </Button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
});
