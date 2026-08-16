"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

import { useLang } from "@/components/LangProvider";
import type { Lang } from "@/lib/i18n";

/** Тёмная «капля» скользит под активной подписью с коротким сжатием. */
export function LangSwitch() {
  const { lang, setLang } = useLang();
  const ruRef = useRef<HTMLButtonElement>(null);
  const roRef = useRef<HTMLButtonElement>(null);
  const knobRef = useRef<HTMLSpanElement>(null);
  const squashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /** Только DOM: капля встаёт под нужную подпись. */
  const positionKnob = useCallback((next: Lang) => {
    const knob = knobRef.current;
    const target = next === "ro" ? roRef.current : ruRef.current;
    if (!knob || !target) return;

    knob.style.left = `${target.offsetLeft}px`;
    knob.style.top = `${target.offsetTop}px`;
    knob.style.width = `${target.offsetWidth}px`;
    knob.style.height = `${target.offsetHeight}px`;
  }, []);

  // Позиция зависит от ширины подписей, поэтому считаем до отрисовки.
  useLayoutEffect(() => {
    positionKnob(lang);
  }, [lang, positionKnob]);

  useEffect(() => {
    const onResize = () => positionKnob(lang);
    window.addEventListener("resize", onResize);
    // Шрифты меняют метрику подписей — пересчитываем после их загрузки.
    document.fonts?.ready.then(onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [lang, positionKnob]);

  useEffect(() => {
    return () => {
      if (squashTimer.current) clearTimeout(squashTimer.current);
    };
  }, []);

  const choose = (next: Lang) => {
    const knob = knobRef.current;
    if (knob) {
      knob.style.transform = "scale(1.16, .82)";
      if (squashTimer.current) clearTimeout(squashTimer.current);
      squashTimer.current = setTimeout(() => {
        knob.style.transform = "scale(1, 1)";
      }, 200);
    }
    positionKnob(next);
    setLang(next);
  };

  return (
    <div className="mb-lang">
      <span ref={knobRef} className="mb-lang-knob" />
      <button
        ref={ruRef}
        type="button"
        onClick={() => choose("ru")}
        className={`mb-lang-opt${lang === "ru" ? " is-active" : ""}`}
      >
        RU
      </button>
      <button
        ref={roRef}
        type="button"
        onClick={() => choose("ro")}
        className={`mb-lang-opt${lang === "ro" ? " is-active" : ""}`}
      >
        RO
      </button>
    </div>
  );
}
