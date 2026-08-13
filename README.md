# Mebelissimo

Новый сайт мебельной компании Mebelissimo (Молдова).
Next.js (App Router) + TypeScript + Tailwind CSS v4 + Supabase, деплой на Vercel.

Разбор текущего сайта — [docs/site-research.md](docs/site-research.md).

## Запуск

```bash
npm install
cp .env.example .env.local   # заполнить ключами Supabase
npm run dev
```

Проверка подключения Supabase: http://localhost:3000/api/health/supabase
→ `{"ok":true,"supabase":"reachable"}`

## Переменные окружения

| Переменная | Где взять |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | там же (anon / publishable key) |

Те же переменные нужно добавить в Vercel → Project → Settings → Environment
Variables для Production, Preview и Development.

## Структура

```
src/
  app/                     маршруты App Router
    api/health/supabase/   smoke-test подключения к Supabase
  lib/supabase/
    client.ts              клиент для Client Components
    server.ts              клиент для Server Components / Route Handlers
    env.ts                 чтение и валидация env-переменных
    types.ts               типы схемы БД (генерируются из Supabase)
```

Типы БД пересоздаются после каждой миграции:

```bash
npx supabase gen types typescript --project-id <ref> > src/lib/supabase/types.ts
```
