# ---------- Stage 1: Dependencies ----------
FROM node:20-alpine AS deps
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# ---------- Stage 2: Production ----------
FROM node:20-alpine AS production
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package.json yarn.lock ./

COPY dist ./dist

# ENV cho runtime
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ENV PORT=3000

EXPOSE 3000

CMD ["node", "dist/server/server.js"]
