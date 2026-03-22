# atk.kg

Монорепозиторий сайта **Агротехнического колледжа**: фронтенд (Next.js) и бэкенд (Django).

## Структура

| Каталог        | Описание                          |
|----------------|-----------------------------------|
| `atk-front/`   | Next.js 14 (App Router), UI сайта |
| `college-back/`| Django REST API, админка          |

## Требования

- **Node.js** 18+ (для фронта)
- **Python** 3.11+ и **Docker** (для бэка через docker-compose) или локальный PostgreSQL

## Быстрый старт

### Бэкенд (`college-back`)

1. Скопируйте настройки окружения (секреты не хранятся в Git):

   ```bash
   cd college-back
   cp .env.example .env
   ```

2. Запуск через Docker:

   ```bash
   docker-compose up --build
   ```

   API по умолчанию: `http://localhost:8000`, админка: `http://localhost:8000/admin/`.

### Фронтенд (`atk-front`)

```bash
cd atk-front
npm install
npm run dev
```

Сайт: `http://localhost:3000` (редирект на `/ru`).

При необходимости создайте `atk-front/.env.local`:

```env
NEXT_PUBLIC_API_BASE=http://localhost:8000/ru/api/v1
```

Если переменная не задана, используется тот же URL по умолчанию в коде.

## Выгрузка на GitHub

1. Создайте **пустой** репозиторий на GitHub (без README, если уже есть локальный).
2. В корне `atk.kg`:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<USER>/<REPO>.git
   git push -u origin main
   ```

3. Убедитесь, что **не закоммичены** файлы `.env`, `.env.local`, `node_modules/`, `.next/`, `.venv/`, `media/`.

> **Монорепозиторий:** если раньше в `atk-front/` или `college-back/` был свой `.git`, его нужно удалить (оставить один Git только в корне `atk.kg`), иначе Git воспримет папки как submodule и не добавит файлы.

## Документация фронта

См. `atk-front/FRONTEND_TECHNICAL_SPEC.md`.

## Лицензия

Укажите лицензию при необходимости.
