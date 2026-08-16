"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef } from "react";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ProductCard } from "@/components/ProductCard";
import { useLang } from "@/components/LangProvider";
import { countByCategory, type Product } from "@/lib/catalog";
import { T, models } from "@/lib/i18n";

/** Настройки перехода между экранами — из data-props макета. */
const PANEL_FADE = 260;
const HERO_DIM = 0.45;
const HERO_BLUR = 3;

/** Сила подъёма плиток: крайние идут сильнее, центральная слабее. */
const LIFT = [0.34, 0.22, 0.13, 0.22, 0.34];
const LEAD = [0, 0.05, 0.1, 0.05, 0];

/** min-height пружинящего спейсера между текстом героя и полосой плиток. */
const SPACER_MIN = 12;

const REVIEWS = [
  {
    ru: "Кровать сделали точно по нашим размерам, обивку подбирали вместе с дизайнером. Через год выглядит как новая.",
    ro: "Patul a fost făcut exact pe dimensiunile noastre, tapiseria am ales-o împreună cu designerul. După un an arată ca nou.",
    nameRu: "Ирина",
    nameRo: "Irina",
  },
  {
    ru: "Заказывали шкаф-купе в прихожую и детскую кровать. Сроки не сдвинулись ни на один день.",
    ro: "Am comandat un dulap glisant pentru hol și un pat pentru copii. Termenele nu s-au mișcat cu nicio zi.",
    nameRu: "Андрей",
    nameRo: "Andrei",
  },
  {
    ru: "Приятно, что образцы тканей привезли домой. Выбрали спокойный беж — попали в интерьер.",
    ro: "Ne-a plăcut că mostrele de textile au fost aduse acasă. Am ales un bej calm — s-a potrivit perfect.",
    nameRu: "Мария",
    nameRo: "Maria",
  },
];

function smoothstep(p: number) {
  return p * p * (3 - 2 * p);
}

export function HomeView({ featured }: { featured: Product[] }) {
  const { lang, t } = useLang();

  const heroRef = useRef<HTMLElement>(null);
  const heroInnerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const fanRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  /** Целевой подъём каждой плитки в пикселях, пересчитывается по размерам. */
  const liftPx = useRef<number[]>([0, 0, 0, 0, 0]);
  const progress = useRef(0);
  const queued = useRef(false);

  const applyFan = useCallback((p: number) => {
    const cells = fanRef.current?.children;
    if (!cells) return;
    for (let i = 0; i < cells.length; i++) {
      const s = Math.max(0, Math.min(1, (p - LEAD[i]) / (1 - LEAD[i])));
      const y = liftPx.current[i] * smoothstep(s);
      (cells[i] as HTMLElement).style.transform = `translateY(${y.toFixed(1)}px)`;
    }
  }, []);

  const measureFan = useCallback(() => {
    const hero = heroRef.current;
    const heroInner = heroInnerRef.current;
    const row = fanRef.current;
    const stats = statsRef.current;
    if (!hero || !heroInner || !row) return;

    // rowTop нельзя мерить через row.offsetParent-цепочку: между текстом
    // героя и полосой плиток стоит пружинящий спейсер (flex: 1 1 12px),
    // который сам растягивается, съедая весь свободный остаток высоты —
    // а после того как мы выставим row.style.height, offsetTop плиток
    // будет включать уже этот подогнанный спейсер. Получится замкнутый
    // круг: «сколько места осталось» будет зависеть от высоты, которую
    // мы только что сами поставили, и застрянет на минимуме. Меряем
    // вместо этого от конца текстового блока героя — он не зависит от
    // высоты полосы.
    const heroInnerBottom = heroInner.offsetTop + heroInner.offsetHeight;
    const available = hero.clientHeight - heroInnerBottom - SPACER_MIN;

    // Высота полосы по ширине — как утвердил заказчик (1/5 ширины экрана),
    // но не выше, чем реально остаётся места в герое: иначе на широких
    // невысоких экранах (например 1280×720) низ плитки вместе с подписью
    // уезжает за overflow:hidden героя и подпись становится невидимой.
    row.style.height = `${Math.max(
      96,
      Math.min(window.innerWidth / 5, available),
    )}px`;

    const cells = row.children;
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i] as HTMLElement;
      const h = cell.getBoundingClientRect().height || 200;
      const label = cell.querySelector<HTMLElement>(".mb-tile-label");

      // Подписи не должны налезать на строку статистики.
      let cap = 1e4;
      if (stats && label) {
        let statsBottom = stats.offsetHeight;
        for (let n: HTMLElement | null = stats; n && n !== hero; n = n.offsetParent as HTMLElement | null) {
          statsBottom += n.offsetTop;
        }
        let cellTop = 0;
        for (let n: HTMLElement | null = cell; n && n !== hero; n = n.offsetParent as HTMLElement | null) {
          cellTop += n.offsetTop;
        }
        cap = cellTop + label.offsetTop - statsBottom - 12;
      }
      cap = Math.max(24, cap);
      liftPx.current[i] = -Math.round(
        Math.min(h * LIFT[i], cap * (LIFT[i] / 0.34)),
      );
    }

    applyFan(progress.current);
  }, [applyFan]);

  const tick = useCallback(() => {
    queued.current = false;
    const hero = heroRef.current;
    const panel = panelRef.current;
    if (!hero || !panel) return;

    const vh = window.innerHeight || 1;
    const raw = (vh - panel.getBoundingClientRect().top) / vh;
    const p = Math.max(0, Math.min(1, raw));
    const e = smoothstep(p);

    hero.style.opacity = String(1 - HERO_DIM * e);
    hero.style.filter = `blur(${(HERO_BLUR * e).toFixed(2)}px)`;

    // Верхняя кромка панели — градиент прозрачности, он сжимается при наезде.
    const mask = `linear-gradient(180deg, rgba(0,0,0,0) 0px, rgba(0,0,0,1) ${Math.round(
      PANEL_FADE * (1 - 0.42 * e),
    )}px)`;
    panel.style.maskImage = mask;
    panel.style.webkitMaskImage = mask;

    progress.current = Math.max(0, Math.min(1, p / 0.88));
    applyFan(progress.current);

    const reveal = (root: HTMLElement | null, threshold: number) => {
      root?.querySelectorAll<HTMLElement>(":scope > *").forEach((el) => {
        if (el.dataset.shown) return;
        if (el.getBoundingClientRect().top < vh * threshold) {
          el.dataset.shown = "1";
          el.classList.add("is-shown");
        }
      });
    };

    reveal(gridRef.current, 0.92);
    reveal(reviewsRef.current, 0.9);
  }, [applyFan]);

  useEffect(() => {
    const onScroll = () => {
      if (queued.current) return;
      queued.current = true;
      requestAnimationFrame(tick);
    };
    const onResize = () => {
      measureFan();
      onScroll();
    };

    measureFan();
    tick();
    // Метрика зависит от шрифтов и от первой раскладки — меряем ещё раз.
    requestAnimationFrame(measureFan);
    document.fonts?.ready.then(measureFan);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [measureFan, tick]);

  const tiles = [
    { label: T.statBeds, href: "/shop?c=beds", photo: "/tiles/beds.jpg" },
    {
      label: { ru: "Кровати детские", ro: "Paturi pentru copii" },
      href: "/shop?c=kids",
      photo: "/tiles/kids.jpg",
    },
    { label: T.statSofas, href: "/shop?c=sofas", photo: "/tiles/sofas.jpg" },
    { label: T.wardrobes, href: "/shop", photo: "/tiles/wardrobes.jpg" },
    { label: T.kitchens, href: "/shop", photo: "/tiles/kitchens.jpg" },
  ];

  return (
    <div style={{ position: "relative", background: "var(--bg)" }}>
      <Header variant="fixed" />

      <div className="mb-runway">
        <section ref={heroRef} className="mb-hero">
          <div ref={heroInnerRef} className="mb-hero-inner">
            <div
              className="mb-kicker"
              style={{ animation: "mb-rise 1s var(--ease-in) .25s both" }}
            >
              {t(T.heroKicker)}
            </div>

            <h1 className="mb-h1">
              <span style={{ animation: "mb-rise 1.1s var(--ease-in) .38s both" }}>
                {t(T.heroLine1)}
              </span>
              <span
                className="accent"
                style={{ animation: "mb-rise 1.1s var(--ease-in) .5s both" }}
              >
                {t(T.heroLine2)}
              </span>
            </h1>

            <p
              className="mb-lead"
              style={{ animation: "mb-rise 1.1s var(--ease-in) .62s both" }}
            >
              {t(T.about)}
            </p>

            <div
              className="mb-hero-actions"
              style={{ animation: "mb-rise 1.1s var(--ease-in) .74s both" }}
            >
              <Link href="/shop" className="mb-cta">
                <span>{t(T.heroCta)}</span>
                <span style={{ fontSize: 15, lineHeight: 1 }}>→</span>
              </Link>
              <a className="mb-textlink">{t(T.heroPartners)}</a>
            </div>

            <div
              ref={statsRef}
              className="mb-stats"
              style={{ animation: "mb-rise 1.1s var(--ease-in) .86s both" }}
            >
              <Link href="/shop?c=beds" className="mb-stat">
                <span className="mb-stat-num">{countByCategory("beds")}</span>
                <span className="mb-stat-cap">{t(T.statBeds)}</span>
              </Link>
              <span className="mb-stat-sep" />
              <Link href="/shop?c=kids" className="mb-stat">
                <span className="mb-stat-num">{countByCategory("kids")}</span>
                <span className="mb-stat-cap">{t(T.statKids)}</span>
              </Link>
              <span className="mb-stat-sep" />
              <Link href="/shop?c=sofas" className="mb-stat">
                <span className="mb-stat-num">{countByCategory("sofas")}</span>
                <span className="mb-stat-cap">{t(T.statSofas)}</span>
              </Link>
              <span className="mb-stat-sep" />
              <div className="mb-stat">
                <span className="mb-stat-num italic">{t(T.fabricPick)}</span>
                <span className="mb-stat-cap">{t(T.fabricAny)}</span>
              </div>
            </div>
          </div>

          <div style={{ flex: "1 1 12px", minHeight: 12 }} />

          <div ref={fanRef} className="mb-fan">
            {tiles.map((tile, i) => (
              <div key={i} className="mb-fan-cell">
                <Link
                  href={tile.href}
                  className="mb-tile"
                  style={{
                    animation: `mb-fade 1.3s ease ${0.95 + i * 0.035}s both`,
                  }}
                >
                  <div className="mb-tile-photo">
                    <Image
                      src={tile.photo}
                      alt=""
                      fill
                      sizes="20vw"
                      priority={i < 3}
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="mb-tile-scrim" />
                  <div className="mb-tile-dim" />
                  <div className="mb-tile-label">{tile.label[lang]}</div>
                </Link>
              </div>
            ))}
          </div>

          <div className="mb-cue">
            <span />
            {t(T.scrollCue)}
          </div>
        </section>
      </div>

      <section ref={panelRef} className="mb-panel">
        <div className="mb-section-head">
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="mb-eyebrow">
              {lang === "ro" ? "Colecție" : "Коллекция"} ·{" "}
              {models(countByCategory("beds"), lang)}
            </div>
            <h2 className="mb-h2">{t(T.statBeds)}</h2>
          </div>
          <Link href="/shop" className="mb-link-arrow">
            {t(T.seeAll)}
            <span>→</span>
          </Link>
        </div>

        <div ref={gridRef} className="mb-grid-3">
          {featured.map((product, i) => (
            <ProductCard
              key={product.slug}
              product={product}
              className="mb-reveal"
              style={{ transitionDelay: `${(i % 3) * 110}ms` }}
            />
          ))}
        </div>
      </section>

      <section className="mb-reviews">
        <div className="mb-section-head">
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="mb-eyebrow">{t(T.reviewsKicker)}</div>
            <h2 className="mb-h2" style={{ fontSize: "clamp(32px, 3.6vw, 58px)" }}>
              {t(T.reviewsTitle)}
            </h2>
          </div>
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--muted)",
            }}
          >
            {t(T.since)}
          </span>
        </div>

        <div ref={reviewsRef} className="mb-reviews-grid">
          {REVIEWS.map((review, i) => (
            <figure
              key={i}
              className="mb-review"
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="mb-stars">
                {"★★★★★".split("").map((star, j) => (
                  <span key={j}>{star}</span>
                ))}
              </div>
              <blockquote className="mb-quote">{review[lang]}</blockquote>
              <figcaption className="mb-review-cap">
                <span />
                <span>{lang === "ro" ? review.nameRo : review.nameRu}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Footer wide />
    </div>
  );
}
