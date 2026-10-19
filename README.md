# Ботакөз-2022 — сайт балабақшасы

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · lucide-react.

Сайт состоит из двух самостоятельно спроектированных интерфейсов — **для компьютеров** и **для телефонов** — которые открываются по **одному адресу**.

## Структура

```text
botagoz-2022-kindergarten/
├── website/          ← Next.js-приложение (единая точка входа, деплоится на Vercel)
│   ├── public/       ← все фотографии (общие для обеих версий)
│   └── src/
│       ├── app/
│       │   ├── layout.tsx          корневой layout: шрифты, язык, SEO, JSON-LD
│       │   ├── (desktop)/          десктопные страницы + desktop.css
│       │   └── mobile/             точка монтирования мобильной версии (внутренний путь)
│       ├── components/             десктопные компоненты (motion, мозаика галереи и т.д.)
│       └── middleware.ts           выбор версии по cookie
├── mobile-website/   ← мобильный интерфейс (свои страницы, компоненты и стили)
│   └── src/
│       ├── app/                    page.tsx, about/page.tsx, mobile.css
│       └── components/             Hero, About, Info, Gallery, Lightbox, Contacts…
├── shared/           ← общее для обеих версий — единственный источник данных
│   └── src/
│       ├── config/                 site.ts (контакты, адрес, часы), view.ts (переключение версий)
│       ├── i18n/                   переводы KZ / RU и LanguageProvider
│       ├── lib/                    загрузка фото, SEO
│       ├── decor/ ui/              SVG-цветочки, волны, логотип, иконки
│       └── styles/theme.css        фирменная палитра и шрифты (@theme)
├── package.json      ← npm workspaces
└── eslint.config.mjs
```

Данные, переводы и фотографии существуют в одном экземпляре (`shared/` и `website/public/`), поэтому версии не расходятся.

## Как выбирается версия

Адрес один: `/` и `/about`.

1. `website/src/middleware.ts` смотрит cookie `botakoz-view`. При первом визите версия угадывается по User-Agent; телефон сразу получает мобильную версию.
2. Небольшой встроенный скрипт (`shared/src/ui/ViewSync.tsx`) проверяет **реальную ширину окна**: до 767 px — мобильная, от 768 px — десктопная. Если версия не совпала, он записывает cookie и один раз перезагружает страницу (адрес и якорь сохраняются). При изменении размера окна через границу версия тоже переключается.
3. Мобильная версия внутри приложения живёт по пути `/mobile`, но посетитель этот путь не видит: middleware переписывает `/` → `/mobile`, а прямой заход на `/mobile` перенаправляет на `/`.

Каждая версия загружает только свои стили и скрипты: мобильная не подключает библиотеку анимаций `motion` и десктопный CSS.

Если cookie заблокированы, показывается десктопная версия — у неё тоже есть адаптивная вёрстка для узких экранов.

## Запуск

```bash
npm install          # из корня репозитория — ставит зависимости всех пакетов
npm run dev          # http://localhost:3000
npm run build        # production-сборка (обе версии собираются вместе)
npm start            # запуск собранного сайта
npm run lint         # ESLint для website, mobile-website и shared
npm run typecheck    # TypeScript
```

Чтобы посмотреть мобильную версию на компьютере, сузьте окно до ширины меньше 768 px или включите эмуляцию устройства в DevTools — сайт переключится сам.

## Публикация на Vercel

Один проект Vercel, один домен.

1. **Settings → General → Root Directory: `website`.** Включите опцию «Include source files outside of the Root Directory in the Build Step» (для новых проектов она включена по умолчанию) — приложение компилирует `../shared` и `../mobile-website`.
2. Framework Preset — Next.js; команды сборки и установки оставьте по умолчанию: Vercel распознаёт npm workspaces и устанавливает зависимости из корня.
3. Переменные окружения — см. `website/.env.example`.

> Если проект на Vercel уже был подключён к этому репозиторию с Root Directory = `./`, после этого обновления Root Directory нужно сменить на `website`, иначе сборка не найдёт приложение.

## Где что менять

| Что | Файл |
| --- | --- |
| Телефон, Instagram, адрес, режим работы, WhatsApp, координаты карты | `shared/src/config/site.ts` |
| Все тексты KZ / RU (обе версии) | `shared/src/i18n/translations.ts` |
| Цвета и шрифты | `shared/src/styles/theme.css`, `website/src/app/layout.tsx` |
| Граница между версиями (767 px) | `shared/src/config/view.ts` |
| Десктопный дизайн | `website/src/components`, `website/src/app/(desktop)/desktop.css` |
| Мобильный дизайн | `mobile-website/src/components`, `mobile-website/src/app/mobile.css` |

## Фотографии

- `website/public/main-page.*` — фото на первом экране;
- `website/public/main-page2.*` — фото в разделе «Балабақша туралы» (показывается целиком, без обрезки);
- все файлы из `website/public/images` (jpg, jpeg, png, webp, avif) автоматически попадают в галерею обеих версий; дубликаты и главные фото пропускаются.

Мобильная галерея раскладывает фото рядами по форме: вертикальные — парами, горизонтальные — парами, панорамы — на всю ширину, поэтому обрезка минимальна. Сначала показываются 4 фото, остальные — по кнопке «Барлығын көрсету».

После добавления фото сделайте новый деплой.

## Переменные окружения (Vercel → Settings → Environment Variables)

- `NEXT_PUBLIC_DOCUMENTS_URL` — ссылка на папку Google Drive с документами. Пока пусто, кнопка «Құжаттарды қарау» скрыта (в обеих версиях).
- `NEXT_PUBLIC_SITE_URL` — домен EDU.KZ после регистрации (например `https://botakoz2022.edu.kz`). Включает canonical, sitemap и абсолютные ссылки Open Graph.

## Карта

Сейчас карта ищет адрес текстом. Когда владелец подтвердит точку, укажите координаты в `shared/src/config/site.ts` → `site.map.coordinates` — карта и ссылки 2GIS / Google Maps будут вести точно на неё.
