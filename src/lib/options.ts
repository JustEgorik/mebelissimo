import type { Copy } from "@/lib/i18n";

/** Размеры спального места и надбавка к цене — из макета товара. */
export const SIZES = [
  { label: "140 × 200", add: 0 },
  { label: "160 × 200", add: 0 },
  { label: "180 × 200", add: 1400 },
];

/** Индекс в этом списке хранится в корзине, поэтому порядок менять нельзя. */
export const FABRICS: (Copy & { color: string })[] = [
  { ru: "Велюр, беж", ro: "Catifea, bej", color: "#cbb79c" },
  { ru: "Лён, песок", ro: "In, nisip", color: "#d9cab3" },
  { ru: "Шенилл, орех", ro: "Șenil, nuc", color: "#8a6a4b" },
  { ru: "Велюр, олива", ro: "Catifea, măslin", color: "#6f7a63" },
  { ru: "Рогожка, серый", ro: "Rogojină, gri", color: "#9a978f" },
  { ru: "Шенилл, графит", ro: "Șenil, grafit", color: "#3b3630" },
];
