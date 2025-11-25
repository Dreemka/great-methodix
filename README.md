# Great Methodix

Минимальный каркас приложения на Vite + Vue 3 + TypeScript с настроенными Pinia, Vue Router и vue-i18n.

## Возможности

- Готовый светлый layout на Ant Design Vue (`Layout`, `Menu`, `Segmented`) с боковой навигацией и иконками.
- Навигация между страницами `Home`, `Table`, `About` через Vue Router.
- Счетчик на Pinia, демонстрирующий глобальное состояние.
- Пример таблицы на Ant Design (`a-table`) с локализованными колонками и тегами статуса.
- Две локали (en/ru) и переключатель языка через AntD `Segmented`.
- Структура каталогов для `views`, `stores`, `router`, `plugins`, `locales`, готовая к расширению.
- Общие CSS-переменные вынесены в `src/styles/variables.css`, что упрощает поддержку темы.

## Требования

- Node.js `>=20.19` или `>=22.12` (из-за ограничений Vite 7).
- npm 10+.

## Быстрый старт

```bash
npm install
npm run dev
```

## Скрипты

- `npm run dev` — запуск дев-сервера.
- `npm run build` — сборка production-версии (требует совместимой версии Node).
- `npm run preview` — предпросмотр собранного приложения.
