# Деплой atk.kg — всё в Docker, одной командой

Идея: **весь стек в Docker** — nginx + Next.js (фронт) + Django/Gunicorn (бэкенд) + Postgres.
Поднимается одной командой `docker compose`. На хост-машину ставится только Docker.

Домен и IP подставь свои (пример: `kjsdhfb.xyz`, `164.92.121.45`).

---

## 1. (Опционально) DNS

Если есть домен (GoDaddy и т.п.):
- Запись **A**: `@` → IP сервера.
- Запись **A**: `www` → тот же IP.

Без домена сайт будет доступен по `http://IP/`.

---

## 2. Зайти на сервер

```bash
ssh root@ТВОЙ_IP
```

Дальше все команды — **на сервере**.

---

## 3. Установить Docker и закрыть фаервол

```bash
apt update && apt upgrade -y
apt install -y docker.io docker-compose-v2 git ufw
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
systemctl enable --now docker
```

> Порты `8000` (Django) и `5432` (Postgres) наружу **не** открываем — в `docker-compose.yml`
> они забиндены на `127.0.0.1`, наружу торчит только nginx на `:80`.

---

## 4. Склонировать проект

```bash
mkdir -p /var/www && cd /var/www
git clone https://github.com/ТВОЙ_ЛОГИН/college-site.git
cd college-site
```

(Приватный репозиторий — настрой SSH-ключ на GitHub или HTTPS с токеном.)

---

## 5. Файл `college-back/.env`

```bash
nano /var/www/college-site/college-back/.env
```

Минимум (подставь свои значения):

```env
DEBUG=False
SECRET_KEY=придумай-длинную-случайную-строку

# домены + IP сервера; если домена нет — оставь IP и 127.0.0.1
ALLOWED_HOSTS=kjsdhfb.xyz,www.kjsdhfb.xyz,127.0.0.1,164.92.121.45
CORS_ALLOWED_ORIGINS=https://kjsdhfb.xyz,https://www.kjsdhfb.xyz
CSRF_TRUSTED_ORIGINS=https://kjsdhfb.xyz,https://www.kjsdhfb.xyz
# USE_TLS_BEHIND_PROXY=True   # включить ТОЛЬКО после настройки HTTPS (см. п.8)

POSTGRES_DB=atk_db
POSTGRES_USER=atk_user
POSTGRES_PASSWORD=надёжный-пароль-для-бд
POSTGRES_HOST=db
POSTGRES_PORT=5432

EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
```

> Фронт по умолчанию ходит на API по **относительному** пути `/ru/api/v1` (тот же origin, что nginx),
> поэтому домен в сборку фронта зашивать не нужно — работает и по IP, и по домену.
> Картинки из админки (медиа) отдаёт сам nginx с `/media/`, отдельный `NEXT_PUBLIC_IMAGE_HOSTS` не требуется.

---

## 6. Поднять весь стек одной командой

```bash
cd /var/www/college-site/college-back
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

Поднимутся 4 контейнера: `nginx_container` (:80) → `nextjs_container` + `django_container` + `postgres_container`.
Бэкенд на старте сам делает `migrate` и `collectstatic`.

Проверка с сервера:

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1/ru                       # 200 — фронт
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1/ru/api/v1/news/news/      # 200 — API
```

Открой в браузере: `http://ТВОЙ_IP/` (или домен).

---

## 7. Суперпользователь для админки

```bash
docker exec -it django_container python manage.py createsuperuser
```

Админка: `http://ТВОЙ_IP/admin/`.

---

## 8. HTTPS (когда есть домен)

Самый простой путь — поставить certbot на хост и временно отдать ему `:80`, либо
использовать companion-контейнер (`nginx-proxy` + `acme-companion`). Для первого демо
можно остаться на `http://IP`. Когда дойдём до HTTPS — добавим 443-server-block в
`college-back/nginx/default.conf`, том с сертификатами и certbot; тогда же выставить
`USE_TLS_BEHIND_PROXY=True` в `.env` и пересобрать стек.

> Альтернатива «nginx/Node на хосте» (systemd) лежит в `deploy/digitalocean/` —
> это legacy-вариант, для контейнерного деплоя он не нужен.

---

## Обновление после изменений в коде

```bash
cd /var/www/college-site
git pull
cd college-back
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build
```

---

## Если что-то упало

```bash
cd /var/www/college-site/college-back
P="-f docker-compose.yml -f docker-compose.prod.yml"
docker compose $P ps
docker compose $P logs --tail=100 nginx
docker compose $P logs --tail=100 frontend
docker compose $P logs --tail=100 web
```
