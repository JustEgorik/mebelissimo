"use client";

import { useLang } from "@/components/LangProvider";
import { T } from "@/lib/i18n";

/**
 * Пустой слот под фотографию — как в Claude Design до заливки снимка.
 * «or browse files» здесь декоративный: сам конструктор даёт туда
 * перетащить картинку, на живом сайте это просто текст-заглушка.
 */
export function PhotoSlot({
  className = "",
  compact = false,
}: {
  className?: string;
  /** Для мелких слотов (миниатюры, фото в корзине) — без подписи-ссылки. */
  compact?: boolean;
}) {
  const { t } = useLang();

  return (
    <div
      className={`mb-photo-slot${compact ? " is-compact" : ""} ${className}`.trim()}
    >
      <svg
        width={compact ? "18" : "26"}
        height={compact ? "18" : "26"}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span className="cap">{t(T.photo)}</span>
      {!compact && <span className="browse">{t(T.browseFiles)}</span>}
    </div>
  );
}
