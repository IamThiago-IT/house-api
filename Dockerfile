FROM node:20-alpine AS base
WORKDIR /app

# Instalar dependências de produção separadamente
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm fetch

# Build em stage separado
FROM base AS builder
COPY --from=deps /root/.pnpm-store /root/.pnpm-store
COPY package.json pnpm-lock.yaml tsconfig.json ./
COPY prisma ./prisma
COPY src ./src
RUN corepack enable && corepack prepare pnpm@latest --activate
RUN pnpm install --frozen-lockfile --offline || pnpm install --frozen-lockfile
RUN pnpm exec prisma generate || true
RUN pnpm run build

# Runtime
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY prisma ./prisma
EXPOSE 3333
CMD ["node", "dist/server.js"]
