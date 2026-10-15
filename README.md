# Ботакөз-2022 — сайт балабақшасы

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · motion · lucide-react.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Где что менять

| Что | Файл |
| --- | --- |
| Телефон, Instagram, адрес, режим работы, WhatsApp, координаты карты | `src/config/site.ts` |
| Все тексты KZ / RU | `src/i18n/translations.ts` |
| Цвета и шрифты | `src/app/globals.css` (`@theme`), `src/app/layout.tsx` |

## Фотографии

Положите файлы в `public/images` (jpg, jpeg, png, webp, avif):

- `main-page.*` — фото на первом экране;
- `main-page2.*` — фото в разделе «Балабақша туралы» (показывается целиком, без обрезки);
- все остальные файлы автоматически попадают в галерею (дубликаты пропускаются).

Пока фото нет, вместо них показываются аккуратные иллюстрации. После добавления фото сделайте новый деплой.

## Переменные окружения (Vercel → Settings → Environment Variables)

См. `.env.example`.

- `NEXT_PUBLIC_DOCUMENTS_URL` — ссылка на папку Google Drive с документами. Пока пусто, кнопка «Құжаттарды қарау» скрыта.
- `NEXT_PUBLIC_SITE_URL` — домен EDU.KZ после регистрации (например `https://botakoz2022.edu.kz`). Включает canonical, sitemap и абсолютные ссылки Open Graph.

## Карта

Сейчас карта ищет адрес текстом. Когда владелец подтвердит точку, укажите координаты в `site.map.coordinates` — карта и ссылки 2GIS / Google Maps будут вести точно на неё.
