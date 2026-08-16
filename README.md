# Mebelissimo

Новый сайт мебельной компании Mebelissimo (Кишинёв).
Next.js 16 (App Router) + TypeScript + Tailwind v4 + Supabase, деплой на Vercel.

- Разбор старого сайта — [docs/site-research.md](docs/site-research.md)
- Дизайн-хендофф из Claude Design — [design/design_handoff_mebelissimo](design/design_handoff_mebelissimo/README.md)

## Запуск

```bash
npm install
npm run dev
```

Supabase пока не нужен для работы страниц. Когда дойдём до базы:
скопировать `.env.example` в `.env.local`, заполнить и проверить
`/api/health/supabase` → `{"ok":true,"supabase":"reachable"}`.

## Страницы

| Маршрут | Что это |
| --- | --- |
| `/` | Главная: фиксированный герой, полоса категорий, наезжающая коллекция, отзывы |
| `/shop?c=beds\|kids\|sofas` | Каталог с фильтрами по типу, сортировкой и «показать ещё» |
| `/product/[slug]` | Карточка товара: размеры, обивка, количество, вкладки, похожие |
| `/cart` | Корзина: количество, удаление, промокод `MEBEL10` (−10%) |

## Как всё устроено

```
src/
  app/                     маршруты App Router
  components/
    Header/Footer/Logo     общая обвязка, логотип со сменой знака при скролле
    LangProvider           язык RU/RO, хранится в localStorage
    CartProvider           корзина, хранится в localStorage
    home|shop|product|cart экранные компоненты
  lib/
    catalog.ts             74 товара: названия, цены и фото с mebelissimo.md
    i18n.ts                словарь RU/RO
    options.ts             размеры и обивки
    persistent-store.ts    localStorage под useSyncExternalStore
    supabase/              клиенты для браузера и сервера
```

Дизайн-токены и все стили компонентов — в [src/app/globals.css](src/app/globals.css),
значения перенесены из хендоффа один в один.

## Что осталось сделать

- **Фотографии.** Сейчас берутся со старого сайта через оптимизатор Next
  (`next.config.ts` → `remotePatterns`) в разрешении 262×262 — этого мало для
  крупных блоков. Нужны оригиналы от заказчика.
- **Характеристики товаров.** Тип кровати и набор тканей на старом сайте не
  заведены — в `catalog.ts` они проставлены формулой как заглушка.
- **Каталог в Supabase** вместо статического `catalog.ts` + админка.
- **i18n на уровне маршрутов** (`/ru`, `/ro`) вместо клиентского словаря —
  сейчас поисковики видят только русскую версию.
- **Страницы «Дизайнерам» и «Контакты»** — в макете ссылки без адресов.
- **Оформление заказа** — кнопка есть, обработчика нет.
