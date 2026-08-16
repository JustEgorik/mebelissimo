"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

/**
 * Знак-диван виден наверху страницы; после 48px прокрутки он уходит вверх,
 * а снизу с задержкой поднимается надпись. Оба SVG — маски, цвет наследуется.
 */
export function Logo() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Link
      href="/"
      className={`mb-logo${scrolled ? " is-scrolled" : ""}`}
      aria-label="Mebelissimo"
    >
      <span className="mb-logo-mark" />
      <span className="mb-logo-word" />
    </Link>
  );
}
