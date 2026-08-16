/**
 * Маленькое хранилище поверх localStorage под `useSyncExternalStore`.
 *
 * Читать localStorage в эффекте и звать setState нельзя — это лишний каскад
 * рендеров. Здесь снапшот берётся синхронно, а на сервере отдаётся fallback,
 * поэтому первый рендер на клиенте и на сервере совпадают.
 */
export function createPersistentStore<T>(key: string, fallback: T) {
  let cache: T = fallback;
  let cachedRaw: string | null | undefined;
  const listeners = new Set<() => void>();

  const notify = () => listeners.forEach((listener) => listener());

  const getSnapshot = (): T => {
    if (typeof window === "undefined") return fallback;
    const raw = window.localStorage.getItem(key);
    // Снапшот обязан быть стабильным по ссылке, пока данные не менялись.
    if (raw === cachedRaw) return cache;
    cachedRaw = raw;
    if (raw === null) {
      cache = fallback;
      return cache;
    }
    try {
      cache = JSON.parse(raw) as T;
    } catch {
      cache = fallback;
    }
    return cache;
  };

  return {
    subscribe(listener: () => void) {
      listeners.add(listener);
      // Синхронизация между вкладками.
      window.addEventListener("storage", listener);
      return () => {
        listeners.delete(listener);
        window.removeEventListener("storage", listener);
      };
    },
    getSnapshot,
    getServerSnapshot: () => fallback,
    set(next: T) {
      window.localStorage.setItem(key, JSON.stringify(next));
      cachedRaw = undefined;
      notify();
    },
  };
}
