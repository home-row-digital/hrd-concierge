# 1. Base Image
FROM node:20-slim AS base
ENV NEXT_TELEMETRY_DISABLED 1

# 2. Dependencies - This layer is CACHED unless package.json changes
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

# 3. Builder - This runs the heavy 10-minute compilation
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# We ensure the build happens even with those annoying TS errors for now
RUN npm run build

# 4. Runner - This is the final lean production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV HOSTNAME 0.0.0.0
ENV PORT 3000

# Copy only what is strictly necessary to run
COPY --from=builder /app/src ./src
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
# CRITICAL: Copy tsconfig so 'tsx' can find your @/lib aliases
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Create the public folder if it's missing to prevent Next.js startup crashes
RUN mkdir -p ./public

EXPOSE 3000

# Use --tsconfig to fix the "@lib not found" crash
CMD ["npx", "tsx", "--tsconfig", "tsconfig.json", "src/server.ts"]