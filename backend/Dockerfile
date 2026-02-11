# --------------------
# Base image
# --------------------
FROM node:20-alpine AS base

LABEL maintainer="Omer Cikan, project=NextHire"

# --------------------
# Dependencies
# --------------------
FROM base AS deps
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

# --------------------
# Builder
# --------------------
FROM base AS builder
WORKDIR /usr/src/app
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY . .

RUN npm run build

# --------------------
# Runner (production)
# --------------------
FROM base AS runner
WORKDIR /usr/src/app

RUN addgroup -S nexthire && adduser -S -G nexthire nexthire

COPY --from=builder /usr/src/app/ ./
COPY --from=builder /usr/src/app/dist ./dist

USER nexthire
EXPOSE 5000
CMD ["node", "dist/server.js"]