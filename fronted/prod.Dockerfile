# Step 1. Rebuild the source code only when needed
FROM node:16-alpine AS builder

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
# Omit --production flag for TypeScript devDependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi
COPY . .

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030

ARG NEXT_PUBLIC_HOME_URL
ENV NEXT_PUBLIC_HOME_URL=${NEXT_PUBLIC_HOME_URL}
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ARG NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
ARG NEXT_PUBLIC_USE_HTTPS
ENV NEXT_PUBLIC_USE_HTTPS=${NEXT_PUBLIC_USE_HTTPS}
ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=https://www.zizdlp.com/
# Uncomment the following line to disable telemetry at build time
# ENV NEXT_TELEMETRY_DISABLED 1

RUN yarn build

# Step 2. Production image, copy all the files and run next
FROM node:16-alpine AS runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Environment variables must be redefined at run time

ARG NEXT_PUBLIC_HOME_URL
ENV NEXT_PUBLIC_HOME_URL=${NEXT_PUBLIC_HOME_URL}
ARG NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_BACKEND_URL=${NEXT_PUBLIC_BACKEND_URL}
ARG NEXT_PUBLIC_SERVER_URL
ENV NEXT_PUBLIC_SERVER_URL=${NEXT_PUBLIC_SERVER_URL}
ARG NEXT_PUBLIC_USE_HTTPS
ENV NEXT_PUBLIC_USE_HTTPS=${NEXT_PUBLIC_USE_HTTPS}
ARG NEXTAUTH_URL
ENV NEXTAUTH_URL=${NEXTAUTH_URL}

# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

CMD node server.js
