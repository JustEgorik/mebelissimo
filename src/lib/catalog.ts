/**
 * Каталог Mebelissimo.
 *
 * Названия, цены и фотографии — реальные, сняты с mebelissimo.md (OpenCart).
 * Атрибуты `kind` и `swatches` на старом сайте не заведены: они проставлены
 * здесь детерминированно, чтобы фильтры и кружки тканей из макета работали.
 * При переезде на Supabase таблица товаров заменит этот файл целиком.
 */

export type CategoryId = "beds" | "kids" | "sofas";

/** Значения фильтра в макете магазина. */
export type Kind = "double" | "single" | "lift" | "kids";

export type Product = {
  slug: string;
  name: string;
  nameRo: string;
  price: number;
  image: string;
  category: CategoryId;
  kind: Kind;
  swatches: string[];
  fabricCount: number;
};

export const CATEGORIES: { id: CategoryId; ru: string; ro: string }[] = [
  { id: "beds", ru: "Кровати", ro: "Paturi" },
  { id: "kids", ru: "Кровати детские", ro: "Paturi pentru copii" },
  { id: "sofas", ru: "Диваны", ro: "Canapele" },
];

export const KINDS: { id: Kind | "all"; ru: string; ro: string }[] = [
  { id: "all", ru: "Все", ro: "Toate" },
  { id: "double", ru: "Двуспальные", ro: "Duble" },
  { id: "single", ru: "Односпальные", ro: "Simple" },
  { id: "lift", ru: "С подъёмным механизмом", ro: "Cu mecanism de ridicare" },
  { id: "kids", ru: "Детские", ro: "Pentru copii" },
];

export const KIND_TAG: Record<Kind, { ru: string; ro: string }> = {
  double: { ru: "Двуспальная", ro: "Dublu" },
  single: { ru: "Односпальная", ro: "Simplu" },
  lift: { ru: "С подъёмным механизмом", ro: "Cu mecanism de ridicare" },
  kids: { ru: "Детская", ro: "Pentru copii" },
};

const SWATCH_SETS = [
  ["#b9a790", "#8a6a4b", "#4a5750", "#2b2621"],
  ["#d5c7b4", "#9c8f7d", "#6a5a48"],
  ["#c9b9a4", "#7f6f5c", "#3b4a44", "#241f1b"],
  ["#e0d4c2", "#a98f72", "#5d5347"],
  ["#cbb79c", "#8a6a4b", "#413a33", "#7a8b83"],
  ["#d8ccbb", "#96825f", "#2f2a25"],
];

/** [название, цена, путь к фото на mebelissimo.md] */
const BEDS: [string, number, string][] = [
  ["Luna", 15300, "/image/cache/catalog/beds/78-262x262.jpg"],
  ["Terry", 10800, "/image/cache/catalog/beds/v3-262x262.jpg"],
  ["Adeli", 11700, "/image/cache/catalog/beds/v5-262x262.jpg"],
  ["Amadeus", 11800, "/image/cache/catalog/beds/v7-262x262.jpg"],
  ["Aurelia", 12500, "/image/cache/catalog/beds/v9-262x262.jpg"],
  ["Berta", 11270, "/image/cache/catalog/beds/v11-262x262.jpg"],
  ["Bricks", 10800, "/image/cache/catalog/beds/v13-262x262.jpg"],
  ["Barocco", 16100, "/image/cache/catalog/beds/v15-262x262.jpg"],
  ["Country", 14400, "/image/cache/catalog/beds/v17-262x262.jpg"],
  ["City", 25000, "/image/cache/catalog/beds/v19-262x262.jpg"],
  ["Erica", 10690, "/image/cache/catalog/beds/v21-262x262.jpg"],
  ["Mia", 12000, "/image/cache/catalog/beds/v22-262x262.jpg"],
  ["Marsel", 12000, "/image/cache/catalog/beds/v23-262x262.jpg"],
  ["Estel", 16500, "/image/cache/catalog/beds/v25-262x262.jpg"],
  ["Geometry", 13650, "/image/cache/catalog/beds/v27-262x262.jpg"],
  ["Gothic", 13650, "/image/cache/catalog/beds/v29-262x262.jpg"],
  ["Gloria", 11270, "/image/cache/catalog/beds/v31-262x262.jpg"],
  ["Holly", 11100, "/image/cache/catalog/beds/v32-262x262.jpg"],
  ["Sofia", 11160, "/image/cache/catalog/beds/v33-262x262.jpg"],
  ["Marachesh", 11000, "/image/cache/catalog/beds/v35-262x262.jpg"],
  ["Nikoly", 15500, "/image/cache/catalog/beds/v37-262x262.jpg"],
  ["Piano", 11700, "/image/cache/catalog/beds/v39-262x262.jpg"],
  ["Provance", 11000, "/image/cache/catalog/beds/v41-262x262.jpg"],
  ["Rubi", 15500, "/image/cache/catalog/beds/v43-262x262.jpg"],
  ["Sherlok", 17250, "/image/cache/catalog/beds/v45-262x262.jpg"],
  ["Sun", 12400, "/image/cache/catalog/beds/v46-262x262.jpg"],
  ["Steps", 15000, "/image/cache/catalog/beds/v47-262x262.jpg"],
  ["Tiffany", 14100, "/image/cache/catalog/beds/v49-262x262.jpg"],
  ["Lily", 16500, "/image/cache/catalog/beds/v51-262x262.jpg"],
  ["Avangard", 14700, "/image/cache/catalog/beds/v53-262x262.jpg"],
  ["Qween", 16500, "/image/cache/catalog/beds/v54-262x262.jpg"],
  ["Yasmin", 12400, "/image/cache/catalog/beds/42-262x262.jpg"],
  ["Shato", 11800, "/image/cache/catalog/beds/44-262x262.jpg"],
  ["Jessica", 12400, "/image/cache/catalog/46-262x262.jpg"],
  ["Morocco", 13200, "/image/cache/catalog/beds/50-262x262.jpg"],
  ["Red", 11370, "/image/cache/catalog/beds/54-262x262.jpg"],
  ["Chocolate", 14370, "/image/cache/catalog/beds/56-262x262.jpg"],
  ["Loft", 15700, "/image/cache/catalog/beds/60-262x262.jpg"],
  ["Chicago", 11300, "/image/cache/catalog/beds/68-262x262.jpg"],
  ["Dream", 16670, "/image/cache/catalog/beds/72-262x262.jpg"],
  ["Air", 16200, "/image/cache/catalog/beds/74-262x262.jpg"],
  ["Madrid", 16300, "/image/cache/catalog/beds/76-262x262.jpg"],
  ["Sonata", 10350, "/image/cache/catalog/beds/v10-262x262.jpg"],
];

const KIDS: [string, number, string][] = [
  ["Cookies", 12530, "/image/cache/catalog/new/34n-262x262.jpg"],
  ["Vegas", 9770, "/image/cache/catalog/new/60n-262x262.jpg"],
  ["Pink", 7930, "/image/cache/catalog/new/20n-262x262.jpg"],
  ["Princess", 13100, "/image/cache/catalog/new/54n-262x262.jpg"],
  ["Berta", 8160, "/image/cache/catalog/beds_kids/5-262x262.jpg"],
  ["Sofia", 11500, "/image/cache/catalog/new/102n-262x262.jpg"],
  ["Adeli", 12300, "/image/cache/catalog/beds_kids/16n-262x262.jpg"],
  ["Violet", 12760, "/image/cache/catalog/new/50n-262x262.jpg"],
  ["Bricks", 12420, "/image/cache/catalog/2n-262x262.jpg"],
  ["Provence", 10200, "/image/cache/catalog/beds_kids/11-262x262.jpg"],
  ["Aurelia", 12190, "/image/cache/catalog/KIDS%20NEW/66n-262x262.jpg"],
  ["Milana", 10690, "/image/cache/catalog/new/94n-262x262.jpg"],
  ["Piano", 11270, "/image/cache/catalog/new/10n-262x262.jpg"],
  ["Harry", 12300, "/image/cache/catalog/new/90n-262x262.jpg"],
  ["Oliver", 12300, "/image/cache/catalog/beds_kids/15-262x262.jpg"],
  ["Sonata", 12300, "/image/cache/catalog/new/96n-262x262.jpg"],
  ["Geometry", 12300, "/image/cache/catalog/new/28n-262x262.jpg"],
  ["Marta", 12190, "/image/cache/catalog/new/46n-262x262.jpg"],
  ["Summer", 13800, "/image/cache/catalog/beds_kids/19-262x262.jpg"],
  ["Rubi", 14490, "/image/cache/catalog/new/108n-262x262.jpg"],
  ["Aisi", 11900, "/image/cache/catalog/KIDS%20NEW/26n-262x262.jpg"],
  ["Lips", 12500, "/image/cache/catalog/beds_kids/22-262x262.jpg"],
  ["Zipp", 12500, "/image/cache/catalog/beds_kids/23-262x262.jpg"],
];

const SOFAS: [string, number, string][] = [
  ["Magic", 35000, "/image/cache/catalog/%D0%B4%D0%B8%D0%B2%D0%B0%D0%BD%D1%8B/5-262x262.jpg"],
  ["Dakar", 30000, "/image/cache/catalog/%D0%B4%D0%B8%D0%B2%D0%B0%D0%BD%D1%8B/10-262x262.jpg"],
  ["Fly", 29000, "/image/cache/catalog/%D0%B4%D0%B8%D0%B2%D0%B0%D0%BD%D1%8B/15-262x262.jpg"],
  ["Fold", 24500, "/image/cache/catalog/%D0%B4%D0%B8%D0%B2%D0%B0%D0%BD%D1%8B/20-262x262.jpg"],
  ["Singapore", 19000, "/image/cache/catalog/%D0%B4%D0%B8%D0%B2%D0%B0%D0%BD%D1%8B/29-262x262.jpg"],
  ["Berlin", 21500, "/image/cache/catalog/%D0%B4%D0%B8%D0%B2%D0%B0%D0%BD%D1%8B/25-262x262.jpg"],
  ["London", 16000, "/image/cache/catalog/%D0%B4%D0%B8%D0%B2%D0%B0%D0%BD%D1%8B/40-262x262.jpg"],
  ["Air", 19000, "/image/cache/catalog/%D0%B4%D0%B8%D0%B2%D0%B0%D0%BD%D1%8B/32-262x262.jpg"],
];

const PHOTO_ORIGIN = "http://mebelissimo.md";

/**
 * Тип кровати выводится из цены: дорогие модели идут как двуспальные с
 * подъёмным механизмом, дешёвые — односпальные. Заглушка до реальных данных.
 */
function bedKind(price: number, i: number): Kind {
  if (price >= 15000) return i % 2 === 0 ? "lift" : "double";
  if (price <= 11300) return "single";
  return "double";
}

function build(
  rows: [string, number, string][],
  category: CategoryId,
  prefix: { ru: string; ro: string },
): Product[] {
  return rows.map(([model, price, image], i) => ({
    slug: `${category}-${model.toLowerCase().replace(/\s+/g, "-")}`,
    name: `${prefix.ru} ${model}`,
    nameRo: `${prefix.ro} ${model}`,
    price,
    image: PHOTO_ORIGIN + image,
    category,
    kind: category === "kids" ? "kids" : bedKind(price, i),
    swatches: SWATCH_SETS[i % SWATCH_SETS.length],
    fabricCount: 4 + (i % 6),
  }));
}

export const PRODUCTS: Product[] = [
  ...build(BEDS, "beds", { ru: "Кровать", ro: "Patul" }),
  ...build(KIDS, "kids", { ru: "Кровать детская", ro: "Pat pentru copii" }),
  ...build(SOFAS, "sofas", { ru: "Диван", ro: "Canapea" }),
];

export function productBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function countByCategory(category: CategoryId) {
  return PRODUCTS.filter((p) => p.category === category).length;
}

/** Похожие модели — та же категория, соседние по цене. */
export function relatedTo(product: Product, limit = 4) {
  return PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug,
  )
    .sort(
      (a, b) =>
        Math.abs(a.price - product.price) - Math.abs(b.price - product.price),
    )
    .slice(0, limit);
}

/** «15 300 mdl» — неразрывные пробелы заменены обычными, как в макете. */
export function money(n: number) {
  return `${n.toLocaleString("ru-RU").replace(/ /g, " ")} mdl`;
}
