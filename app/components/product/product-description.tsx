/**
 * Product Description Component
 * Displays product description and attributes with category tabs and fade animation
 */
"use client";

import { useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Tabs, Tab } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Product } from "@/types/product.types";
import { ProductBox } from "./product-box";
import { cn } from "@/lib/utils";

interface ProductDescriptionProps {
  product: Product;
  className?: string;
}

export function ProductDescription({
  product,
  className,
}: ProductDescriptionProps) {
  // Estado para controlar qué categoría está seleccionada
  const [selectedCategory, setSelectedCategory] = useState(0);

  // Transformar attributes a formato Tab[]
  const tabs: Tab[] = useMemo(() => {
    return product.attributes.map((category, index) => ({
      value: index.toString(),
      label: category.name,
    }));
  }, [product.attributes]);

  // Handler para cambio de tab (memoizado)
  const handleTabChange = useCallback((value: string) => {
    setSelectedCategory(parseInt(value, 10));
  }, []);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Description */}
      <ProductBox title="Descripción">
        <p className="whitespace-pre-line text-muted-foreground">
          {product.description}
        </p>
      </ProductBox>

      {/* Attributes with Category Buttons */}
      {product.attributes && product.attributes.length > 0 && (
        <ProductBox title="Características técnicas">
          <div className="space-y-2 overflow-hidden">
            {/* Category Tabs */}
            {product.attributes.length > 1 && (
              <Tabs
                tabs={tabs}
                value={selectedCategory.toString()}
                onChangeAction={handleTabChange}
              />
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{
                  duration: 0.2,
                  ease: [0.83, 0, 0.17, 1],
                }}
              >
                <Table>
                  <TableBody>
                    {product.attributes[selectedCategory].values.map(
                      (attr, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium w-1/2">
                            {attr.name}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {attr.value}
                          </TableCell>
                        </TableRow>
                      ),
                    )}
                  </TableBody>
                </Table>
              </motion.div>
            </AnimatePresence>
          </div>
        </ProductBox>
      )}
    </div>
  );
}
