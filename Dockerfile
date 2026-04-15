# 1. Base Image
FROM node:20-slim AS base
ENV NEXT_TELEMETRY_DISABLED 1

# 2. Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

# 3. Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 4. Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

# Copy necessary files only
COPY --from=builder /app/src ./src
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# CRITICAL: This creates an empty public folder if yours is missing 
# so the Next.js server doesn't complain, without failing the build.
RUN mkdir -p ./public

EXPOSE 3000
ENV PORT 3000

# Run using npx tsx to handle the server.ts
CMD ["npx", "tsx", "src/server.ts"]