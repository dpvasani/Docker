---
title: 02. Dockerfile Best Practices
sidebar_label: 02. Best Practices
---

## Keep Images Small
- Prefer minimal bases (alpine, debian-slim, distroless if feasible).
- Remove build tools and caches in the same RUN layer.

```dockerfile
# Good: single RUN layer
RUN apt-get update && apt-get install -y --no-install-recommends build-essential \
 && npm ci \
 && apt-get purge -y build-essential \
 && rm -rf /var/lib/apt/lists/*
```

## Use Multi-Stage Builds
```dockerfile
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm ci --omit=dev
USER node
EXPOSE 3000
CMD ["node", "dist/server.js"]
```

## Optimize Layer Caching
- COPY dependency manifests first; install deps before copying sources.
- Group commands to avoid invalidating the cache unnecessarily.

## .dockerignore Matters
```
node_modules
.git
*.log
.env
coverage
/tmp
```

## Security
- Run as a non-root user via USER.
- Use read-only root filesystem where possible.
- Add HEALTHCHECK for basic liveness.
- Pin versions and verify checksums for downloads.

```dockerfile
RUN addgroup -g 10001 app && adduser -G app -u 10001 -D app
USER 10001:10001
HEALTHCHECK --interval=30s --timeout=5s CMD curl -f http://localhost:3000/health || exit 1
```

## Reproducibility
- Pin base images to digests.
- Avoid dynamic downloads during build or pin their versions.
- Use ARGs to control variability.

## Build Performance
- Use BuildKit, cache mounts, and target stages.
- Leverage remote cache: `--cache-from` with registries.

## Observability
- Annotate images with labels: build date, commit, source.

```dockerfile
LABEL org.opencontainers.image.source="https://github.com/org/repo" \
      org.opencontainers.image.revision="$GIT_SHA" \
      org.opencontainers.image.created="$BUILD_DATE"
```

## Common Pitfalls
- Multiple CMD/ENTRYPOINT (only last applies).
- Using latest tags in production.
- Bloated layers due to separate RUNs and leftover caches.
