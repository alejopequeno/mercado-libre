import type { Metadata } from "next";

async function getProduct(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    const res = await fetch(`${baseUrl}/api/products/${slug}`, {
      cache: "no-store",
    });

    if (!res.ok) return null;

    const data = await res.json();
    return data.data;
  } catch {
    return null;
  }
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const product = await getProduct(params.slug);

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
