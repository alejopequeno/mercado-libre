/**
 * Product Reviews Component
 * Displays product reviews/opinions with ratings and photos
 */
"use client";

import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Review } from "@/types/product.types";
import { Star, ThumbsUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ProductBox } from "./product-box";

interface ProductReviewsProps {
  reviews?: Review[];
  rating: {
    average: number;
    total: number;
  };
}

export function ProductReviews({ reviews = [], rating }: ProductReviewsProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  // Calcular distribución de estrellas (memoizado)
  const ratingDistribution = useMemo(() => {
    return [5, 4, 3, 2, 1].map((stars) => {
      const count = reviews.filter((r) => r.rating === stars).length;
      const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
      return { stars, count, percentage };
    });
  }, [reviews]);

  // Reviews con fotos (memoizado)
  const reviewsWithPhotos = useMemo(() => {
    return reviews.filter((r) => r.images && r.images.length > 0);
  }, [reviews]);

  // Renderizar estrellas (memoizado)
  const renderStars = useCallback((rating: number, size: "sm" | "md" | "lg" = "md") => {
    const sizeClasses = {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-6 w-6",
    };

    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              sizeClasses[size],
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-200 text-gray-200",
            )}
          />
        ))}
      </div>
    );
  }, []);

  return (
    <ProductBox title="Opiniones del producto">
      <div className="space-y-6">
        {/* Rating Summary */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Rating Score */}
          <div className="space-y-2">
            <div className="flex items-end gap-3">
              <span className="text-5xl font-bold">
                {rating.average.toFixed(1)}
              </span>
              {renderStars(Math.round(rating.average), "lg")}
            </div>
            <p className="text-sm text-muted-foreground">
              {rating.total} calificaciones
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ stars, percentage }) => (
              <div key={stars} className="flex items-center gap-2 text-sm">
                <span className="w-4">{stars}</span>
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews with Photos */}
        {reviewsWithPhotos.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold">Opiniones con fotos</h3>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {reviewsWithPhotos.slice(0, 4).map((review) =>
                review.images?.map((img, idx) => (
                  <div
                    key={`${review.id}-${idx}`}
                    className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt="Foto de opinión"
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      {review.rating}
                      <Star className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
                    </div>
                  </div>
                )),
              )}
            </div>
          </div>
        )}

        {/* Characteristic Ratings */}
        {reviews.length > 0 &&
          reviews[0].characteristics &&
          reviews[0].characteristics.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold">Calificación de características</h3>
              <div className="space-y-2">
                {reviews[0].characteristics.map((char, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{char.label}</span>
                      {renderStars(char.value, "sm")}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Reviews List */}
        {displayedReviews.length > 0 && (
          <div className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Opiniones destacadas</h3>
            {displayedReviews.map((review) => (
              <div
                key={review.id}
                className="space-y-3 pb-4 border-b last:border-0"
              >
                {/* User Info */}
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.userAvatar} />
                    <AvatarFallback>
                      {review.userName.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{review.userName}</p>
                    <div className="flex items-center gap-2">
                      {renderStars(review.rating, "sm")}
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(review.date), {
                          addSuffix: true,
                          locale: es,
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="space-y-2">
                  {review.title && (
                    <p className="font-medium text-sm">{review.title}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {review.comment}
                  </p>
                </div>

                {/* Review Images */}
                {review.images && review.images.length > 0 && (
                  <div className="flex gap-2">
                    {review.images.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative w-20 h-20 rounded-lg overflow-hidden"
                      >
                        <Image
                          src={img}
                          alt={`Foto ${idx + 1}`}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Like Button */}
                <Button variant="ghost" size="sm" className="h-8 gap-2">
                  <ThumbsUp className="h-3 w-3" />
                  <span className="text-xs">{review.likes}</span>
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Show More Button */}
        {reviews.length > 3 && (
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="w-full"
          >
            {showAll
              ? "Ver menos opiniones"
              : `Ver todas las opiniones (${reviews.length})`}
          </Button>
        )}

        {reviews.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Star className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Aún no hay opiniones sobre este producto</p>
          </div>
        )}
      </div>
    </ProductBox>
  );
}
