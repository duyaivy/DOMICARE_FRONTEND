

# ---------- Stage 1: Build ----------
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .

ARG VITE_API_URL
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_GOOGLE_CLIENT_SECRET
ARG VITE_REDIRECT_URI
ARG VITE_GOOGLE_URL
ARG VITE_TMN_CODE
ARG VITE_SECURE_HASH
ARG VITE_VNP_URL
ARG VITE_VNP_RETURN_URL
ARG VITE_CLIENT_URL
ARG NODE_ENV

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID
ENV VITE_GOOGLE_CLIENT_SECRET=$VITE_GOOGLE_CLIENT_SECRET
ENV VITE_REDIRECT_URI=$VITE_REDIRECT_URI
ENV VITE_GOOGLE_URL=$VITE_GOOGLE_URL
ENV VITE_TMN_CODE=$VITE_TMN_CODE
ENV VITE_SECURE_HASH=$VITE_SECURE_HASH
ENV VITE_VNP_URL=$VITE_VNP_URL
ENV VITE_VNP_RETURN_URL=$VITE_VNP_RETURN_URL
ENV VITE_CLIENT_URL=$VITE_CLIENT_URL
ENV NODE_ENV=$NODE_ENV

# Build project
RUN yarn build

# ---------- Stage 2: Production ----------
FROM node:20-alpine AS production
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --production --frozen-lockfile

# Copy built assets
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

EXPOSE 3000

# Health check (optional)
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "dist/server/server.js"]
