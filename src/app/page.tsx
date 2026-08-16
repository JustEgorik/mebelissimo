import { HomeView } from "@/components/home/HomeView";
import { PRODUCTS } from "@/lib/catalog";

/** Шесть моделей из макета коллекции на главной. */
const FEATURED = [
  "beds-luna",
  "beds-terry",
  "beds-adeli",
  "beds-aurelia",
  "beds-barocco",
  "beds-estel",
];

export default function Page() {
  const featured = FEATURED.map(
    (slug) => PRODUCTS.find((p) => p.slug === slug)!,
  );

  return <HomeView featured={featured} />;
}
