"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
} from "react";

import type { Copy, Lang } from "@/lib/i18n";
import { createPersistentStore } from "@/lib/persistent-store";

const langStore = createPersistentStore<Lang>("mb-lang", "ru");

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Разворачивает пару RU/RO в строку текущего языка. */
  t: (copy: Copy) => string;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(
    langStore.subscribe,
    langStore.getSnapshot,
    langStore.getServerSnapshot,
  );

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => langStore.set(next), []);
  const t = useCallback((copy: Copy) => copy[lang], [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside <LangProvider>");
  return ctx;
}
