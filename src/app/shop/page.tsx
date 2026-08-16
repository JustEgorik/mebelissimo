import { ShopView } from "@/components/shop/ShopView";
import type { CategoryId } from "@/lib/catalog";

const VALID: CategoryId[] = ["beds", "kids", "sofas"];

export default async function Page({ searchParams }: PageProps<"/shop">) {
  const { c } = await searchParams;
  const category = VALID.includes(c as CategoryId) ? (c as CategoryId) : "beds";

  return <ShopView category={category} />;
}
