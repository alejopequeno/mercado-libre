/**
 * Product Breadcrumbs Component
 * Displays category navigation path
 */
import { memo } from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ProductBreadcrumbsProps {
  path: string[];
}

export const ProductBreadcrumbs = memo(function ProductBreadcrumbs({
  path,
}: ProductBreadcrumbsProps) {
  return (
    <nav className="text-sm text-muted-foreground overflow-hidden flex items-center gap-2">
      <Button variant="outline" className="gap-2" asChild>
        <Link href="/">
          <ArrowLeft className="size-4" />
          Volver
        </Link>
      </Button>
      <ol className="flex items-center gap-2 min-w-0">
        {path.map((item: string, index: number) => (
          <li
            key={index}
            className="flex items-center gap-2 shrink-0 last:shrink last:min-w-0"
          >
            {index > 0 && <span>›</span>}
            <span className="last:truncate">{item}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
});
