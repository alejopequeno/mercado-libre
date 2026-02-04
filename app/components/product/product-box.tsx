/**
 * Product Box Component
 * Reusable container for product sections with consistent styling
 */

import { ReactNode } from "react";

interface ProductBoxProps {
  title: string;
  children: ReactNode;
}

export function ProductBox({ title, children }: ProductBoxProps) {
  return (
    <div className="border-t py-8">
      <h3 className="text-lg font-semibold mb-4 pl-4">{title}</h3>
      <div className="px-4">{children}</div>
    </div>
  );
}
