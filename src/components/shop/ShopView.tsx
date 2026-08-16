"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { useLang } from "@/components/LangProvider";
import {
  CATEGORIES,
  KINDS,
  PRODUCTS,
  type CategoryId,
  type Kind,
} from "@/lib/catalog";
import { T, models } from "@/lib/i18n";

const PAGE_SIZE = 9;
const PAGE_STEP = 6;

const SORTS = [T.sortPopular, T.sortCheap, T.sortExpensive];

export function ShopView({ category }: { category: CategoryId }) {
  const { lang, t } = useLang();
  const [kind, setKind] = useState<Kind | "all">("all");
  const [sort, setSort] = useState(0);
  const [shown, setShown] = useState(PAGE_SIZE);

  const categoryCopy = CATEGORIES.find((c) => c.id === category)!;

  const list = useMemo(() => {
    const filtered = PRODUCTS.filter(
      (p) => p.category === category && (kind === "all" || p.kind === kind),
    );
    if (sort === 1) return [...filtered].sort((a, b) => a.price - b.price);
    if (sort === 2) return [...filtered].sort((a, b) => b.price - a.price);
    return filtered;
  }, [category, kind, sort]);

  const visible = list.slice(0, shown);
  const rest = list.length - visible.length;

  return (
    <div style={{ position: "relative", background: "var(--bg)", minHeight: "100vh" }}>
      <Header />

      <section className="mb-page">
        <div className="mb-shop-head">
          <div className="mb-crumbs">
            <Link href="/">{t(T.home)}</Link>
            <span>/</span>
            <span className="current">{categoryCopy[lang]}</span>
          </div>

          <div className="mb-shop-tools">
            <span className="mb-count">{models(list.length, lang)}</span>
            <button
              type="button"
              className="mb-sort-btn"
              onClick={() => setSort((s) => (s + 1) % 3)}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flex: "0 0 auto" }}
                aria-hidden
              >
                <path d="M4.6 2.4v12.2" />
                <path d="M1.8 11.8l2.8 2.8 2.8-2.8" />
                <path d="M12.4 14.6V2.4" />
                <path d="M9.6 5.2l2.8-2.8 2.8 2.8" />
              </svg>
              <span>{t(SORTS[sort])}</span>
            </button>
          </div>
        </div>

        {/* Фильтры по типу заведены только для кроватей — как в макете. */}
        {category === "beds" && (
          <div className="mb-chips">
            {KINDS.filter((k) => k.id !== "kids").map((k) => (
              <button
                key={k.id}
                type="button"
                className={`mb-chip${kind === k.id ? " is-active" : ""}`}
                onClick={() => {
                  setKind(k.id);
                  setShown(PAGE_SIZE);
                }}
              >
                {k[lang]}
              </button>
            ))}
          </div>
        )}

        <div className="mb-shop-grid">
          {visible.map((product, i) => (
            <ProductCard
              key={product.slug}
              product={product}
              withTag
              withSwatches
              style={{ animationDelay: `${Math.min(i, 8) * 60}ms` }}
            />
          ))}
        </div>

        <div className="mb-more-wrap">
          <button
            type="button"
            className="mb-outline-btn"
            disabled={rest === 0}
            onClick={() => setShown((s) => s + PAGE_STEP)}
          >
            {rest > 0
              ? `${t(T.showMore)} ${Math.min(PAGE_STEP, rest)}`
              : t(T.allShown)}
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
