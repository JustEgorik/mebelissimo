"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { useCart } from "@/components/CartProvider";
import { useLang } from "@/components/LangProvider";
import { money, productBySlug } from "@/lib/catalog";
import { T, positions } from "@/lib/i18n";
import { FABRICS } from "@/lib/options";

const PROMO_CODE = "MEBEL10";
const FREE_DELIVERY_FROM = 20000;
const DELIVERY_FEE = 450;

export function CartView() {
  const { lang, t } = useLang();
  const { lines, count, setQty, remove } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const [promo, setPromo] = useState<string | null>(null);

  const rows = lines.map((line) => {
    const product = productBySlug(line.slug);
    // Позиции, сохранённые до появления поля price, считаем по базовой цене.
    const unit = line.price ?? product?.price ?? 0;
    return { line, product, unit };
  });

  const subtotal = rows.reduce((sum, r) => sum + r.unit * r.line.qty, 0);
  const delivery = subtotal > FREE_DELIVERY_FROM ? 0 : DELIVERY_FEE;
  const discount = promo === PROMO_CODE ? Math.round(subtotal * 0.1) : 0;

  return (
    <div style={{ position: "relative", background: "var(--bg)", minHeight: "100vh" }}>
      <Header />

      <section className="mb-page">
        <div className="mb-crumbs">
          <Link href="/">{t(T.home)}</Link>
          <span>/</span>
          <Link href="/shop">{t(T.navShop)}</Link>
          <span>/</span>
          <span className="current">{t(T.cart)}</span>
        </div>

        <div
          className="mb-shop-head"
          style={{ borderBottom: "1px solid var(--line)", paddingBottom: 30 }}
        >
          <h1 className="mb-shop-title">{t(T.yourCart)}</h1>
          <span
            style={{
              fontSize: 11.5,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            {positions(count, lang)}
          </span>
        </div>

        <div className="mb-cart-grid">
          <div style={{ display: "flex", flexDirection: "column" }}>
            {rows.length === 0 && (
              <p className="mb-note" style={{ padding: "40px 0" }}>
                {t(T.emptyCart)}
              </p>
            )}

            {rows.map(({ line, product, unit }, i) => {
              if (!product) return null;
              const name = lang === "ro" ? product.nameRo : product.name;

              return (
                <div
                  key={`${line.slug}-${line.size}-${line.fabricId}-${i}`}
                  className="mb-cart-line"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <div className="mb-cart-photo">
                    <Image src={product.image} alt={name} fill sizes="128px" />
                  </div>

                  <div className="mb-cart-info">
                    <Link href={`/product/${product.slug}`} className="mb-cart-name">
                      {name}
                    </Link>
                    <div className="mb-cart-meta">
                      <span>{line.size}</span>
                      <span>{FABRICS[line.fabricId]?.[lang]}</span>
                      <span>{t(T.productionTerm)}</span>
                    </div>
                    <div className="mb-cart-controls">
                      <div className="mb-cart-qty">
                        <button
                          type="button"
                          aria-label="−"
                          onClick={() => setQty(i, -1)}
                        >
                          −
                        </button>
                        <span>{line.qty}</span>
                        <button
                          type="button"
                          aria-label="+"
                          onClick={() => setQty(i, 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="mb-remove"
                        onClick={() => remove(i)}
                      >
                        {t(T.remove)}
                      </button>
                    </div>
                  </div>

                  <div className="mb-cart-sum">
                    <span className="total">{money(unit * line.qty)}</span>
                    <span className="unit">
                      {money(unit)}
                      {t(T.perPiece)}
                    </span>
                  </div>
                </div>
              );
            })}

            <div className="mb-cart-foot">
              <Link href="/shop" className="mb-back-link">
                {t(T.keepShopping)}
              </Link>
              <div className="mb-promo">
                <input
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  placeholder={t(T.promo)}
                  aria-label={t(T.promo)}
                />
                <button
                  type="button"
                  onClick={() => setPromo(promoInput.trim().toUpperCase())}
                >
                  {t(T.apply)}
                </button>
              </div>
            </div>
            <div className="mb-promo-note">
              {promo === PROMO_CODE
                ? t(T.promoOk)
                : promo
                  ? t(T.promoBad)
                  : ""}
            </div>
          </div>

          <aside className="mb-aside">
            <h2>{t(T.order)}</h2>
            <div className="mb-sums">
              <div className="mb-sum-row">
                <span>{t(T.goods)}</span>
                <span style={{ whiteSpace: "nowrap" }}>{money(subtotal)}</span>
              </div>
              <div className="mb-sum-row">
                <span>{t(T.deliveryChisinau)}</span>
                <span style={{ whiteSpace: "nowrap" }}>
                  {delivery === 0 ? t(T.free) : money(delivery)}
                </span>
              </div>
              <div className="mb-sum-row accent">
                <span>{t(T.discount)}</span>
                <span style={{ whiteSpace: "nowrap" }}>
                  {discount ? `− ${money(discount)}` : "—"}
                </span>
              </div>
            </div>
            <div className="mb-total-row">
              <span className="cap">{t(T.total)}</span>
              <span className="val">
                {money(subtotal + delivery - discount)}
              </span>
            </div>
            <button type="button" className="mb-checkout-btn">
              {t(T.checkout)}
            </button>
            <p>{t(T.checkoutNote)}</p>
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}
