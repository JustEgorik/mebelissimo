"use client";

import Link from "next/link";

import { useLang } from "@/components/LangProvider";
import { T } from "@/lib/i18n";

const PHONE = "+(373) 6-90-38-380";
const EMAIL = "mebelissimo@mail.ru";

/**
 * На главной подвал шире — добавляется колонка «Мы на связи» и кнопка
 * личного кабинета; на внутренних страницах колонок три.
 */
export function Footer({ wide = false }: { wide?: boolean }) {
  const { t } = useLang();

  return (
    <footer className="mb-footer">
      <div className={`mb-footer-grid${wide ? "" : " cols-3"}`}>
        <div className="mb-footer-brand">
          <div className="mb-footer-word">Mebelissimo</div>
          <p className="mb-footer-about">{t(T.about)}</p>
        </div>

        <div className="mb-footer-col">
          <div className="mb-footer-cap">{t(T.catalog)}</div>
          <Link href="/shop?c=beds" className="mb-footer-link">
            Кровати
          </Link>
          <Link href="/shop?c=kids" className="mb-footer-link">
            Кровати детские
          </Link>
          <Link href="/shop?c=sofas" className="mb-footer-link">
            Диваны
          </Link>
          {wide && <a className="mb-footer-link">{t(T.heroPartners)}</a>}
        </div>

        {wide && (
          <div className="mb-footer-col">
            <div className="mb-footer-cap">{t(T.inTouch)}</div>
            <a className="mb-footer-link">Facebook</a>
            <a className="mb-footer-link">Instagram</a>
            <a className="mb-footer-link">{t(T.navContacts)}</a>
          </div>
        )}

        <div className="mb-footer-col">
          <div className="mb-footer-cap">{t(T.navContacts)}</div>
          <a href="tel:+37369038380" className="mb-footer-phone">
            {PHONE}
          </a>
          <a href={`mailto:${EMAIL}`} className="mb-footer-link">
            {EMAIL}
          </a>
          {wide && (
            <button type="button" className="mb-footer-btn">
              {t(T.account)}
            </button>
          )}
        </div>
      </div>

      <div className="mb-footer-bottom">
        <span>Mebelissimo © 2026</span>
        <span>Chișinău, Moldova</span>
      </div>
    </footer>
  );
}
