"use client";

import Image from "next/image";
import Link from "next/link";

import { useCart } from "@/components/CartProvider";
import { useLang } from "@/components/LangProvider";
import { KIND_TAG, money, type Product } from "@/lib/catalog";
import { T, fabrics } from "@/lib/i18n";
import { SIZES } from "@/lib/options";

type Props = {
  product: Product;
  /** Тег категории в углу фото — только в магазине. */
  withTag?: boolean;
  /** Кружки тканей под ценой — только в магазине. */
  withSwatches?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

export function ProductCard({
  product,
  withTag = false,
  withSwatches = false,
  className = "",
  style,
}: Props) {
  const { lang, t } = useLang();
  const { add } = useCart();

  const name = lang === "ro" ? product.nameRo : product.name;

  return (
    <Link
      href={`/product/${product.slug}`}
      className={`mb-card ${className}`.trim()}
      style={style}
    >
      <div className="mb-card-photo">
        <Image
          src={product.image}
          alt={name}
          fill
          sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
        />
        {withTag && (
          <span className="mb-tag">{KIND_TAG[product.kind][lang]}</span>
        )}
        <button
          type="button"
          className="mb-card-btn"
          onClick={(e) => {
            // Карточка целиком — ссылка на товар, кнопка не должна уводить.
            e.preventDefault();
            add({
              slug: product.slug,
              qty: 1,
              price: product.price,
              size: SIZES[1].label,
              fabricId: 0,
            });
          }}
        >
          <span>{t(T.addToCart)}</span>
          <span style={{ fontSize: 13, lineHeight: 1 }}>+</span>
        </button>
      </div>

      <div className="mb-card-row">
        <span className="mb-card-name">{name}</span>
        <span className="mb-card-price">{money(product.price)}</span>
      </div>

      {withSwatches && (
        <div className="mb-swatches">
          {product.swatches.map((color) => (
            <span
              key={color}
              className="mb-swatch"
              style={{ background: color }}
            />
          ))}
          <span className="mb-swatch-cap">
            {fabrics(product.fabricCount, lang)}
          </span>
        </div>
      )}
    </Link>
  );
}
