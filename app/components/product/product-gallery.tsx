/**
 * Product Gallery Component
 * Image carousel with navigation arrows and thumbnail preview
 */
"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Card } from "../ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const goToPrevious = () => {
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex gap-2">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex flex-col gap-2 max-h-[600px] overflow-y-auto">
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "relative w-20 h-20 shrink-0 overflow-hidden rounded-lg border-2 transition-colors cursor-pointer",
                selectedImage === index
                  ? "border-blue-500"
                  : "border-neutral-100 hover:border-gray-300",
              )}
            >
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                className="object-contain"
                sizes="80px"
              />
            </motion.button>
          ))}
        </div>
      )}

      {/* Main Image Carousel */}
      <Card className="relative aspect-square flex-1 overflow-hidden rounded-xl group">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={selectedImage}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="relative w-full h-full"
          >
            <Image
              src={images[selectedImage]}
              alt={`${title} - Image ${selectedImage + 1}`}
              fill
              className="object-contain"
              priority={selectedImage === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon-lg"
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 border bg-neutral-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeft
                className="size-5 text-neutral-500"
                strokeWidth={2.4}
              />
            </Button>
            <Button
              variant="ghost"
              size="icon-lg"
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 border rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRight
                className="size-5 text-neutral-500"
                strokeWidth={2.4}
              />
            </Button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-1 absolute bottom-4 left-1/2 -translate-x-1/2">
            {images.map((_, index) => {
              const isSelected = index === selectedImage;
              return (
                <div
                  onClick={() => setSelectedImage(index)}
                  key={index}
                  className={cn(
                    "w-2 h-2 rounded-full cursor-pointer",
                    isSelected ? "bg-blue-500" : "bg-gray-300",
                  )}
                />
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}
