/**
 * Quantity Selector Component
 * Allows user to select product quantity with animated counter
 */
"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";

interface QuantitySelectorProps {
  availableQuantity: number;
  onQuantityChange?: (quantity: number) => void;
}

export function QuantitySelector({
  availableQuantity,
  onQuantityChange,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(1);
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = aumenta, -1 = disminuye

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setDirection(-1);
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  const handleIncrease = () => {
    if (quantity < availableQuantity) {
      const newQuantity = quantity + 1;
      setDirection(1);
      setQuantity(newQuantity);
      onQuantityChange?.(newQuantity);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Cantidad:</span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleDecrease}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>

          {/* Animated Number Counter */}
          <div className="w-5 text-center font-medium relative h-6 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={quantity}
                initial={{
                  y: direction === 1 ? 20 : -20,
                  opacity: 0,
                }}
                animate={{
                  y: 0,
                  opacity: 1,
                }}
                exit={{
                  y: direction === 1 ? -20 : 20,
                  opacity: 0,
                }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {quantity}
              </motion.span>
            </AnimatePresence>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={handleIncrease}
            disabled={quantity >= availableQuantity}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <span>{quantity > 1 ? "unidades" : "unidad"}</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        (+{availableQuantity - quantity} disponibles)
      </p>
    </div>
  );
}
