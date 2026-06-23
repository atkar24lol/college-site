# syntax=docker/dockerfile:1
# Многоступенчатая сборка Next.js в самодостаточный образ (output: 'standalone').

# ---- Стадия зависимостей ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# ---- Стадия сборки ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* вшиваются в бандл на этапе build.
# По умолчанию API-base относительный (/ru/api/v1) — образ работает на любом
# домене/IP, http или https, БЕЗ пересборки, т.к. вызовы идут на тот же origin.
ARG NEXT_PUBLIC_API_BASE=/ru/api/v1
ARG NEXT_PUBLIC_IMAGE_HOSTS=
ARG NEXT_PUBLIC_SITE_URL=http://atk.kg
ENV NEXT_PUBLIC_API_BASE=$NEXT_PUBLIC_API_BASE
ENV NEXT_PUBLIC_IMAGE_HOSTS=$NEXT_PUBLIC_IMAGE_HOSTS
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ---- Стадия запуска ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
# Биндим на 0.0.0.0, иначе nginx из compose-сети не достучится до контейнера
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# standalone НЕ включает public/ и .next/static — копируем явно, иначе 404 на CSS/JS и эмблему
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
