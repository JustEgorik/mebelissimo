import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ProductView } from "@/components/product/ProductView";
import { PRODUCTS, money, productBySlug, relatedTo } from "@/lib/catalog";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) return {};

  return {
    title: `${product.name} — ${money(product.price)} | Mebelissimo`,
    description: `${product.name} на заказ. Изготовление 20–30 дней, доставка и установка по Молдове.`,
  };
}

export default async function Page({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = productBySlug(slug);
  if (!product) notFound();

  return <ProductView product={product} related={relatedTo(product)} />;
}
