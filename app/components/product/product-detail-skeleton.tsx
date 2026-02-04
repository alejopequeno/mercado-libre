import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { BoxContainer } from "@/components/layout/box-container";

export const ProductDetailSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Breadcrumbs Skeleton */}
      <div className="mb-6">
        <Skeleton className="h-8 w-64" />
      </div>

      {/* Content: Gallery + Sidebar */}
      <BoxContainer className="grid gap-8 [grid-template-areas:'gallery'_'sidebar'_'description'] lg:[grid-template-areas:'gallery_sidebar'_'description_sidebar'] lg:grid-cols-[2fr_1fr]">
        {/* Gallery Skeleton */}
        <div className="min-w-0 [grid-area:gallery]">
          <div className="space-y-4">
            <Skeleton className="aspect-square w-full" />
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="aspect-square w-full" />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6 [grid-area:sidebar]">
          {/* Product Details Card Skeleton */}
          <Card>
            <CardContent className="space-y-6">
              {/* Title */}
              <div className="space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-4/5" />
              </div>

              {/* Rating */}
              <Skeleton className="h-5 w-32" />

              {/* Price */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-40" />
              </div>

              {/* Variants */}
              <div className="space-y-3">
                <Skeleton className="h-5 w-24" />
                <div className="flex gap-2">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-20" />
                  ))}
                </div>
              </div>

              {/* Stock */}
              <Skeleton className="h-5 w-32" />

              {/* Quantity */}
              <div className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-10 w-32" />
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            </CardContent>
          </Card>

          {/* Seller Info Skeleton */}
          <Card>
            <CardContent className="space-y-3">
              <Skeleton className="h-5 w-32" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods Skeleton */}
          <Card>
            <CardContent className="space-y-3">
              <Skeleton className="h-5 w-40" />
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Description Skeleton */}
        <div className="min-w-0 [grid-area:description] space-y-6">
          {/* Description */}
          <Card>
            <CardContent className="space-y-4">
              <Skeleton className="h-6 w-48" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </CardContent>
          </Card>

          {/* Questions */}
          <Card>
            <CardContent className="space-y-4">
              <Skeleton className="h-6 w-56" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardContent className="space-y-4">
              <Skeleton className="h-6 w-40" />
              <div className="space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-4/5" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </BoxContainer>
    </div>
  );
};
