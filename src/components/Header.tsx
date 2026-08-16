"use client";

import Link from "next/link";

import { useCart } from "@/components/CartProvider";
import { useLang } from "@/components/LangProvider";
import { LangSwitch } from "@/components/LangSwitch";
import { Logo } from "@/components/Logo";
import { T } from "@/lib/i18n";

/**
 * На главной шапка лежит поверх героя без подложки; на внутренних страницах
 * она липкая с размытым фоном.
 */
export function Header({ variant = "sticky" }: { variant?: "fixed" | "sticky" }) {
  const { t } = useLang();
  const { count } = useCart();

  return (
    <header
      className={`mb-header ${variant === "fixed" ? "is-fixed" : "is-sticky"}`}
    >
      <Logo />
      <nav className="mb-nav">
        <Link href="/shop">{t(T.navShop)}</Link>
        <a>{t(T.navDesigners)}</a>
        <a>{t(T.navContacts)}</a>
      </nav>
      <div className="mb-header-right">
        <LangSwitch />
        <Link href="/cart" className="mb-cart-link">
          <span>{t(T.cart)}</span>
          <span className="mb-cart-badge">{count}</span>
        </Link>
      </div>
    </header>
  );
}
