# Деплой на DigitalOcean (Ubuntu 24.04) + домен (GoDaddy)

Краткий план: DNS → сервер (nginx, SSL) → PostgreSQL → Django (Gunicorn) → Next.js → переменные окружения.

## Безопасность (сделайте в первую очередь)

- **Не храните пароли в чате и в Git.** Если пароль root уже где‑то светился — **смените его** на дроплете и включите вход по **SSH‑ключу**, отключите парольный вход по SSH.
- Файлы `.env` на сервере создаются вручную, права `chmod 600`.

## 1. DNS в GoDaddy

Для домена (пример: `kjsdhfb.xyz`):

| Тип | Имя | Значение | TTL |
|-----|-----|----------|-----|
| A   | @   | IP дроплета (например `164.92.121.45`) | 600 |
| A   | www | тот же IP | 600 |

Подождите распространения DNS (от минут до пары часов). Проверка: `ping kjsdhfb.xyz` или `dig kjsdhfb.xyz +short`.

## 2. Сервер: пакеты

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx certbot python3-certbot-nginx ufw git
```

Firewall (минимум):

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## 3. Пользователь и каталог приложения

```bash
sudo adduser --disabled-password deploy
sudo mkdir -p /var/www/college-site
sudo chown deploy:deploy /var/www/college-site
```

Дальше работайте под `deploy` или через `sudo -u deploy`.

## 4. Клонирование и ветка

```bash
cd /var/www/college-site
git clone <URL-вашего-репозитория> .
# при необходимости: git checkout main
```

## 5. PostgreSQL

Вариант A — **Docker только для БД** (как у вас локально), вариант B — `apt install postgresql`. Ниже — логика одинаковая: нужны `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, хост `localhost` или имя сервиса Docker.

Создайте `/var/www/college-site/college-back/.env` по образцу `college-back/.env.example` и заполните **реальные** значения:

- `DEBUG=False`
- `SECRET_KEY=` новый длинный случайный ключ
- `ALLOWED_HOSTS=kjsdhfb.xyz,www.kjsdhfb.xyz,127.0.0.1`
- `CORS_ALLOWED_ORIGINS=https://kjsdhfb.xyz,https://www.kjsdhfb.xyz`  
  (или временно `*` — в коде включится `CORS_ALLOW_ALL_ORIGINS`; для продакшена лучше явные URL)
- `CSRF_TRUSTED_ORIGINS=https://kjsdhfb.xyz,https://www.kjsdhfb.xyz`
- `USE_TLS_BEHIND_PROXY=True`
- `POSTGRES_HOST=...` (часто `db` в Docker Compose или `127.0.0.1`)

Примените миграции и статику (из каталога `college-back`):

```bash
cd /var/www/college-site/college-back
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
```

## 6. Django через Gunicorn

Пример unit-файла см. `systemd/gunicorn.service.example`. Порт **127.0.0.1:8000** — наружу не открывать, только nginx.

```bash
sudo systemctl enable --now gunicorn-college
```

## 7. Next.js

На сервере нужен Node.js 20 LTS (через nvm или NodeSource).

```bash
cd /var/www/college-site/atk-front
npm ci
```

Создайте `atk-front/.env.production` (или экспортируйте переменные перед сборкой):

```env
NEXT_PUBLIC_API_BASE=https://kjsdhfb.xyz/ru/api/v1
NEXT_PUBLIC_IMAGE_HOSTS=kjsdhfb.xyz,www.kjsdhfb.xyz
```

```bash
npm run build
```

Запуск через systemd: см. `systemd/nextjs.service.example` (порт **127.0.0.1:3000**).

## 8. Nginx

- Скопируйте `nginx-site.conf.example` в `/etc/nginx/sites-available/`, подставьте домен и пути к `media`/`static`.
- Проверка: `sudo nginx -t && sudo systemctl reload nginx`

## 9. SSL (Let’s Encrypt)

```bash
sudo certbot --nginx -d kjsdhfb.xyz -d www.kjsdhfb.xyz
```

После выпуска сертификатов убедитесь, что в `.env` бэкенда включены `USE_TLS_BEHIND_PROXY=True` и правильные `CSRF_TRUSTED_ORIGINS`.

## 10. Проверка

- Сайт: `https://kjsdhfb.xyz` → открывается Next.js.
- API: `https://kjsdhfb.xyz/ru/api/v1/news/news/` → JSON 200.
- Админка: `https://kjsdhfb.xyz/admin/` (в проекте админка без языкового префикса).

## Частые проблемы

- **CORS / куки** — в проде только явные origin в `CORS_ALLOWED_ORIGINS`.
- **Картинки из API** — задайте `NEXT_PUBLIC_IMAGE_HOSTS` и пересоберите фронт.
- **Медиа** — каталог `media` должен быть доступен nginx `alias` или отдаётся Django только для отладки; в проде лучше nginx.
