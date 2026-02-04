"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useMemo } from "react";
import { useProduct } from "@/hooks/api";
import {
  useProductSKU,
  useProductVariants,
  useProductImages,
} from "@/hooks/utils";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductInfo } from "@/components/product/product-info";
import { ProductDescription } from "@/components/product/product-description";
import { ProductVariants } from "@/components/product/product-variants";
import { ProductBreadcrumbs } from "@/components/product/product-breadcrumbs";
import { ProductStockIndicator } from "@/components/product/product-stock-indicator";
import { ProductActions } from "@/components/product/product-actions";
import { PaymentMethods } from "@/components/product/payment-methods";
import { SellerInfo } from "@/components/product/seller-info";
import { QuantitySelector } from "@/components/product/quantity-selector";
import { ProductQuestions } from "@/components/product/product-questions";
import { ProductReviews } from "@/components/product/product-reviews";
import { ProductDetailSkeleton } from "@/components/product/product-detail-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Product } from "@/types/product.types";
import { EmptyIcon } from "@/components/icons/empty-icon";
import { BoxContainer } from "@/components/layout/box-container";

export default function ProductPage() {
  const params = useParams();
  const productSlug = params.slug as string;
  const { data: product, isLoading, error } = useProduct(productSlug);

  // Custom hooks for product logic
  const { selectedVariants, handleVariantChange } = useProductVariants(product);

  const { currentSKU, adjustedPrice, isOutOfStock, availableQuantity } =
    useProductSKU({
      product,
      selectedVariants,
    });

  const displayImages = useProductImages(product, selectedVariants);

  // Display product with adjusted price and images
  const displayProduct = useMemo((): Product | undefined => {
    if (!product) return undefined;
    return {
      ...product,
      price: adjustedPrice || product.price,
      images: displayImages,
    };
  }, [product, adjustedPrice, displayImages]);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-6">
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Volver a productos
          </Button>
        </Link>
        <BoxContainer className="text-center w-full items-center justify-center flex flex-1">
          <EmptyIcon />
        </BoxContainer>
      </div>
    );
  }

  if (!product || !displayProduct) {
    return (
      <div className="space-y-6">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver a productos
            </Button>
          </Link>
        </div>
        <div className="rounded-lg border bg-card p-6 text-center">
          <p className="text-muted-foreground">Producto no encontrado</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header: Breadcrumbs */}
      <div className="mb-6">
        <ProductBreadcrumbs path={product.category.path} />
      </div>

      {/* Content: Gallery + Sidebar */}
      <BoxContainer className="grid gap-8 [grid-template-areas:'gallery'_'sidebar'_'description'] lg:[grid-template-areas:'gallery_sidebar'_'description_sidebar'] lg:grid-cols-[2fr_1fr]">
        {/* Gallery */}
        <div className="min-w-0 [grid-area:gallery]">
          <ProductGallery
            images={displayProduct.images}
            title={displayProduct.title}
          />
        </div>

        {/* Sidebar */}
        <div className="space-y-6 [grid-area:sidebar]">
          {/* Product Details Card */}
          <Card>
            <CardContent className="space-y-6">
              <ProductInfo product={displayProduct} />

              {/* Variants */}
              {product.variants && product.variants.length > 0 && (
                <ProductVariants
                  variants={product.variants}
                  selectedVariants={selectedVariants}
                  onVariantChange={handleVariantChange}
                  skus={product.skus}
                />
              )}

              {/* Stock Indicator */}
              {currentSKU && (
                <ProductStockIndicator availableQuantity={availableQuantity} />
              )}

              {/* Quantity Selector */}
              <QuantitySelector availableQuantity={availableQuantity} />

              {/* Action Buttons */}
              <ProductActions isDisabled={isOutOfStock} />
            </CardContent>
          </Card>

          {/* Seller Info */}
          <SellerInfo seller={displayProduct.seller} />

          {/* Payment Methods */}
          <PaymentMethods
            paymentMethods={displayProduct.paymentMethods}
            currency={displayProduct.price.currency}
          />
        </div>

        {/* Description */}
        <div className="min-w-0 [grid-area:description] space-y-6">
          <ProductDescription product={displayProduct} />
          <ProductQuestions
            questions={displayProduct.questions}
            productTitle={displayProduct.title}
          />

          {/* Reviews */}
          <ProductReviews
            reviews={displayProduct.reviews}
            rating={displayProduct.rating}
          />
        </div>
      </BoxContainer>
    </div>
  );
}
