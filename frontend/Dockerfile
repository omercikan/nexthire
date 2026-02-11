# --------------------
# Base image
# --------------------
FROM node:20-alpine AS base

LABEL maintainer="Omer Cikan, project=NextHire"

# --------------------
# Dependencies
# --------------------
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

# --------------------
# Builder
# --------------------
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# --------------------
# Runner (production)
# --------------------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup -S nexthire && adduser -S -G nexthire nexthire

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nexthire:nexthire /app/.next/standalone ./
COPY --from=builder --chown=nexthire:nexthire /app/.next/static ./.next/static

USER nexthire
EXPOSE 3000
CMD ["node", "server.js"]