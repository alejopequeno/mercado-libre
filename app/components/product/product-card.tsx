import Link from "next/link";
import { motion } from "motion/react";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";
import { Truck } from "lucide-react";
import type { ProductListItem } from "@/types/product.types";
import { DiscountBadge } from "./discount-badge";

interface ProductCardProps {
  product: ProductListItem;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link href={`/products/${product.slug}`}>
      <motion.div
        initial={{
          scale: 1,
          boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)",
        }}
        whileHover={{
          scale: 1.01,
          boxShadow: "0 10px 10px 0 rgba(0,0,0,0.08)",
          transition: {
            type: "spring",
            stiffness: 400,
            damping: 12,
            mass: 0.8,
          },
        }}
        whileTap={{
          scale: 0.99,
          boxShadow: "0 0px 10px 0 rgba(0,0,0,0.1)",
          transition: {
            type: "spring",
            stiffness: 600,
            damping: 8,
            mass: 0.5,
          },
        }}
        className="border rounded-xl bg-card cursor-pointer overflow-hidden h-full"
      >
        {/* Image */}
        <div className="relative aspect-square border-b">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4 flex flex-col gap-2">
          {/* Title */}
          <h2 className="line-clamp-2 text-sm">{product.title}</h2>

          {/* Price */}
          <div>
            {product.price.originalAmount && (
              <p className="text-sm text-muted-foreground line-through">
                {formatPrice(
                  product.price.originalAmount,
                  product.price.currency,
                )}
              </p>
            )}
            <div className="flex items-center gap-1">
              <p className="text-2xl">
                {formatPrice(product.price.amount, product.price.currency)}
              </p>
              {product.price.discount && (
                <DiscountBadge discount={product.price.discount} />
              )}
            </div>
          </div>

          {/* Free Shipping */}
          {product.freeShipping && (
            <div className="flex items-center gap-1 text-sm text-green-600">
              <Truck className="h-4 w-4" />
              <span className="font-semibold">Envío gratis</span>
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );
};
