import { ProductService } from "@/services/product.service";
import type { Metadata } from "next";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await ProductService.getProductBySlug(params.slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
    };
  }

  return {
    title: product.title,
    description: product.description.substring(0, 160),
  };
}

export default async function ProductLayout(props: {
  children: React.ReactNode;
}) {
  return <>{props.children}</>;
}
