# Что делать прямо сейчас (демо на DigitalOcean + домен)

Идея: **Docker только для бэкенда** (Postgres + Django). **Фронт (Next.js)** проще запустить на самой машине через Node — меньше возни с одним большим Docker-образом.

Ниже — порядок «сверху вниз». Домен и IP подставь свои (пример: `kjsdhfb.xyz`, `164.92.121.45`).

---

## 1. DNS (GoDaddy)

- Запись **A**: имя **@** → IP дроплета.
- Запись **A**: имя **www** → тот же IP.

Подожди 5–30 минут, пока `ping твой-домен` начнёт отвечать этим IP.

---

## 2. Зайти на сервер

С ноутбука:

```bash
ssh root@ТВОЙ_IP
```

Дальше все команды — **на сервере**, если не сказано иначе.

---

## 3. Установить Docker и утилиты

```bash
apt update && apt upgrade -y
apt install -y docker.io docker-compose-v2 git nginx certbot python3-certbot-nginx ufw
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable
systemctl enable --now docker
```

---

## 4. Склонировать проект

```bash
mkdir -p /var/www && cd /var/www
git clone https://github.com/ТВОЙ_ЛОГИН/college-site.git
cd college-site
```

(Если репозиторий приватный — настрой SSH-ключ на GitHub или используй HTTPS с токеном.)

---

## 5. Файл `college-back/.env` на сервере

Создай файл:

```bash
nano /var/www/college-site/college-back/.env
```

Минимум так (подставь свои значения БД и домен):

```env
DEBUG=False
SECRET_KEY=придумай-длинную-случайную-строку

ALLOWED_HOSTS=kjsdhfb.xyz,www.kjsdhfb.xyz,127.0.0.1,164.92.121.45
CORS_ALLOWED_ORIGINS=https://kjsdhfb.xyz,https://www.kjsdhfb.xyz
CSRF_TRUSTED_ORIGINS=https://kjsdhfb.xyz,https://www.kjsdhfb.xyz
USE_TLS_BEHIND_PROXY=True

POSTGRES_DB=atk_db
POSTGRES_USER=atk_user
POSTGRES_PASSWORD=надежный-пароль-для-бд
POSTGRES_HOST=db
POSTGRES_PORT=5432

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
```

Сохрани (Ctrl+O, Enter, Ctrl+X).

**Важно:** если раньше на дроплете уже крутилась старая база в Docker с **другим** логином/паролем — либо совпадай `.env` с тем, что уже в volume, либо удали volume и подними заново (данные в БД пропадут). Для чистого первого деплоя проще удалить старые контейнеры/volume или использовать новые `POSTGRES_*`.

---

## 6. Запустить бэкенд в Docker (с Gunicorn)

```bash
cd /var/www/college-site/college-back
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
docker compose logs -f web
```

Пока не увидишь, что Gunicorn слушает порт 8000 без ошибок — Ctrl+C из логов.

Проверка с сервера:

```bash
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:8000/ru/api/v1/news/news/
```

Должно быть `200`.

---

## 7. Node.js и фронт (Next.js)

```bash
apt install -y ca-certificates curl
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs
cd /var/www/college-site/atk-front
nano .env.production
```

Внутри **одна строка** (подставь домен):

```env
NEXT_PUBLIC_API_BASE=https://kjsdhfb.xyz/ru/api/v1
NEXT_PUBLIC_IMAGE_HOSTS=kjsdhfb.xyz,www.kjsdhfb.xyz
```

Сборка и запуск на порту 3000 **только на localhost**:

```bash
npm ci
npm run build
nohup npx next start -p 3000 -H 127.0.0.1 > /var/log/next-college.log 2>&1 &
```

Проверка:

```bash
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000/ru
```

Должно быть `200`.

---

## 8. Nginx + HTTPS

Скопируй пример из репозитория и поправь пути, если у тебя не `/var/www/college-site`:

```bash
cp /var/www/college-site/deploy/digitalocean/nginx-site.conf.example /etc/nginx/sites-available/kjsdhfb.xyz
ln -sf /etc/nginx/sites-available/kjsdhfb.xyz /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx
```

Сертификат:

```bash
certbot --nginx -d kjsdhfb.xyz -d www.kjsdhfb.xyz
```

После этого открой в браузере: `https://kjsdhfb.xyz`

---

## 9. Что проверить глазами

- Главная открывается.
- В DevTools → Network: запросы к API идут на `https://твой-домен/ru/api/v1/...` и отвечают 200.
- Картинки из админки грузятся (если нет — проверь `NEXT_PUBLIC_IMAGE_HOSTS` и пересобери фронт).

---

## Коротко: Docker или нет?

| Что | Как лучше для демо |
|-----|---------------------|
| Postgres + Django | **Да, Docker** — как у тебя локально, плюс `docker-compose.prod.yml` с Gunicorn |
| Next.js | **Проще без Docker** — `npm run build` и `next start` на сервере |

Если хочешь **вообще всё в Docker** — это отдельный `docker-compose` с фронтом и nginx; для «пары дней» обычно не окупается.

---

## Если что-то упало

```bash
cd /var/www/college-site/college-back
docker compose -f docker-compose.yml -f docker-compose.prod.yml logs --tail=100 web
tail -50 /var/log/next-college.log
journalctl -u nginx -n 50 --no-pager
```
