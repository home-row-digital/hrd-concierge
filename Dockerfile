# 1. Base Image
FROM node:20-slim AS base
ENV NEXT_TELEMETRY_DISABLED 1

# 2. Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
# We use 'install' instead of 'ci' to ensure tsx is available
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

# We copy the WHOLE src folder because tsx needs to read the .ts files at runtime
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# No dist folder needed anymore!

EXPOSE 3000
ENV PORT 3000

# Run using npx tsx so it can read your server.ts directly
CMD ["npx", "tsx", "src/server.ts"]