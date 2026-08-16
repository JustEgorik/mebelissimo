"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

import { createPersistentStore } from "@/lib/persistent-store";

export type CartLine = {
  slug: string;
  qty: number;
  /** Цена за штуку на момент добавления — с надбавкой за размер. */
  price: number;
  size: string;
  /** Индекс в FABRICS: обивку показываем на языке интерфейса, а не на том,
   *  который был включён при добавлении. */
  fabricId: number;
};

const EMPTY: CartLine[] = [];
const cartStore = createPersistentStore<CartLine[]>("mb-cart", EMPTY);

type CartContextValue = {
  lines: CartLine[];
  count: number;
  add: (line: CartLine) => void;
  setQty: (index: number, delta: number) => void;
  remove: (index: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const lines = useSyncExternalStore(
    cartStore.subscribe,
    cartStore.getSnapshot,
    cartStore.getServerSnapshot,
  );

  const add = useCallback((line: CartLine) => {
    const prev = cartStore.getSnapshot();
    // Тот же товар в том же размере и обивке — увеличиваем количество.
    const i = prev.findIndex(
      (l) =>
        l.slug === line.slug &&
        l.size === line.size &&
        l.fabricId === line.fabricId,
    );
    cartStore.set(
      i === -1
        ? [...prev, line]
        : prev.map((l, j) => (j === i ? { ...l, qty: l.qty + line.qty } : l)),
    );
  }, []);

  const setQty = useCallback((index: number, delta: number) => {
    cartStore.set(
      cartStore
        .getSnapshot()
        .map((l, j) =>
          j === index ? { ...l, qty: Math.max(1, l.qty + delta) } : l,
        ),
    );
  }, []);

  const remove = useCallback((index: number) => {
    cartStore.set(cartStore.getSnapshot().filter((_, j) => j !== index));
  }, []);

  const count = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty, 0),
    [lines],
  );

  const value = useMemo(
    () => ({ lines, count, add, setQty, remove }),
    [lines, count, add, setQty, remove],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
