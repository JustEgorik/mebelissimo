"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/components/CartProvider";
import { useLang } from "@/components/LangProvider";
import {
  CATEGORIES,
  KIND_TAG,
  money,
  type Product,
} from "@/lib/catalog";
import { T } from "@/lib/i18n";
import { FABRICS, SIZES } from "@/lib/options";

export function ProductView({
  product,
  related,
}: {
  product: Product;
  related: Product[];
}) {
  const { lang, t } = useLang();
  const { add } = useCart();

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(1);
  const [fabric, setFabric] = useState(0);
  const [tab, setTab] = useState(0);
  const [added, setAdded] = useState(false);

  const name = lang === "ro" ? product.nameRo : product.name;
  const model = product.name.split(" ").slice(-1)[0];
  const categoryCopy = CATEGORIES.find((c) => c.id === product.category)!;
  const unitPrice = product.price + SIZES[size].add;

  return (
    <div style={{ position: "relative", background: "var(--bg)", minHeight: "100vh" }}>
      <Header />

      <section className="mb-page" style={{ paddingTop: "clamp(30px, 5vh, 54px)" }}>
        <div className="mb-crumbs">
          <Link href="/">{t(T.home)}</Link>
          <span>/</span>
          <Link href={`/shop?c=${product.category}`}>{categoryCopy[lang]}</Link>
          <span>/</span>
          <span className="current">{model}</span>
        </div>

        <div className="mb-prod-grid">
          <div className="mb-gallery">
            <div className="mb-gallery-main">
              <Image
                src={product.image}
                alt={name}
                fill
                sizes="(max-width: 900px) 100vw, 55vw"
                priority
              />
            </div>
            {/* На старом сайте у товара одна фотография; сетка миниатюр
                оставлена под будущий набор снимков. */}
            <div className="mb-thumbs">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="mb-thumb" />
              ))}
            </div>
          </div>

          <div className="mb-prod-side">
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <span className="mb-prod-kicker">
                {KIND_TAG[product.kind][lang]}
              </span>
              <h1 className="mb-prod-h1">{name}</h1>
              <span className="mb-prod-price">{money(unitPrice * qty)}</span>
            </div>

            <div className="mb-specs">
              <span className="mb-field-cap">{t(T.manufacturer)}</span>
              <span>Mebelissimo</span>
              <span className="mb-field-cap">{t(T.model)}</span>
              <span>{model}</span>
              <span className="mb-field-cap">{t(T.availability)}</span>
              <span>{t(T.preorder)}</span>
              <span className="mb-field-cap">{t(T.production)}</span>
              <span>{t(T.productionTerm)}</span>
            </div>

            <div className="mb-field">
              <span className="mb-field-cap">{t(T.size)}</span>
              <div className="mb-options">
                {SIZES.map((s, i) => (
                  <button
                    key={s.label}
                    type="button"
                    className={`mb-size-btn${i === size ? " is-active" : ""}`}
                    onClick={() => {
                      setSize(i);
                      setAdded(false);
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-field">
              <span className="mb-field-cap">
                {t(T.fabric)} — {FABRICS[fabric][lang]}
              </span>
              <div className="mb-options">
                {FABRICS.map((f, i) => (
                  <button
                    key={f.ru}
                    type="button"
                    title={f[lang]}
                    aria-label={f[lang]}
                    className={`mb-fabric-btn${i === fabric ? " is-active" : ""}`}
                    style={{ background: f.color }}
                    onClick={() => setFabric(i)}
                  />
                ))}
              </div>
            </div>

            <div className="mb-buy-row">
              <div className="mb-qty">
                <button
                  type="button"
                  aria-label="−"
                  onClick={() => {
                    setQty((q) => Math.max(1, q - 1));
                    setAdded(false);
                  }}
                >
                  −
                </button>
                <span>{qty}</span>
                <button
                  type="button"
                  aria-label="+"
                  onClick={() => {
                    setQty((q) => q + 1);
                    setAdded(false);
                  }}
                >
                  +
                </button>
              </div>
              <button
                type="button"
                className="mb-buy-btn"
                onClick={() => {
                  add({
                    slug: product.slug,
                    qty,
                    price: unitPrice,
                    size: SIZES[size].label,
                    fabricId: fabric,
                  });
                  setAdded(true);
                }}
              >
                {added ? t(T.added) : t(T.addToCart)}
              </button>
            </div>

            <p className="mb-note">{t(T.madeToMeasure)}</p>
          </div>
        </div>
      </section>

      <section
        style={{
          padding: "0 var(--pad-x) clamp(60px, 9vh, 96px)",
        }}
      >
        <div className="mb-tabs">
          {[T.tabDescription, T.tabReviews].map((copy, i) => (
            <button
              key={i}
              type="button"
              className={`mb-tab${i === tab ? " is-active" : ""}`}
              onClick={() => setTab(i)}
            >
              {t(copy)}
            </button>
          ))}
        </div>

        {tab === 0 ? (
          <div className="mb-desc-grid">
            <p>{t(T.desc1)}</p>
            <p>{t(T.desc2)}</p>
            <p>{t(T.desc3)}</p>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 26,
              paddingTop: 40,
              maxWidth: "60ch",
            }}
          >
            <p className="mb-note" style={{ fontSize: 15 }}>
              {t(T.noReviews)}
            </p>
            <button
              type="button"
              className="mb-outline-btn"
              style={{ alignSelf: "flex-start", padding: "16px 32px" }}
            >
              {t(T.writeReview)}
            </button>
          </div>
        )}
      </section>

      <section className="mb-terms">
        <div className="mb-terms-grid">
          <div className="mb-term">
            <span className="mb-term-cap">{t(T.payment)}</span>
            <p>{t(T.paymentText)}</p>
          </div>
          <div className="mb-term">
            <span className="mb-term-cap">{t(T.credit)}</span>
            <p>{t(T.creditText)}</p>
          </div>
          <div className="mb-term">
            <span className="mb-term-cap">{t(T.delivery)}</span>
            <p>{t(T.deliveryText)}</p>
          </div>
          <div className="mb-term">
            <span className="mb-term-cap">{t(T.installation)}</span>
            <p>{t(T.installationText)}</p>
          </div>
        </div>
      </section>

      <section
        style={{
          padding:
            "clamp(60px, 10vh, 100px) var(--pad-x) clamp(70px, 11vh, 110px)",
        }}
      >
        <div className="mb-section-head" style={{ paddingBottom: 34 }}>
          <h2 className="mb-h2" style={{ fontSize: "clamp(28px, 3vw, 46px)" }}>
            {t(T.similar)}
          </h2>
          <Link href={`/shop?c=${product.category}`} className="mb-back-link">
            {t(T.wholeCatalog)}
          </Link>
        </div>
        <div className="mb-related-grid">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
