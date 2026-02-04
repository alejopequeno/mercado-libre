import { Skeleton } from "@/components/ui/skeleton";

export const ProductCardSkeleton = () => {
  return (
    <div className="border rounded-xl bg-card overflow-hidden h-full">
      {/* Image Skeleton */}
      <div className="relative aspect-square border-b">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="p-4 flex flex-col gap-2">
        {/* Title Skeleton - 2 lines */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        {/* Price Skeleton */}
        <div className="mt-1">
          <Skeleton className="h-3 w-20 mb-1" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-7 w-24" />
            <Skeleton className="h-5 w-12" />
          </div>
        </div>

        {/* Free Shipping Skeleton */}
        <Skeleton className="h-4 w-24 mt-1" />
      </div>
    </div>
  );
};
