---
title: 03. Image Optimization
sidebar_label: 03. Image Optimization
---

## Choose the Right Base
- Prefer minimal images: alpine, debian-slim, distroless (when static).
- Pin to digest for reproducibility.

## Remove Build-Time Bloat
- Use multi-stage builds to keep only runtime artifacts.
- Clean caches and package lists in the same RUN layer.

## Leverage Caching
- Order Dockerfile to maximize cache hits (deps first).
- Use BuildKit cache mounts for package managers.

## Static Assets and Binaries
- Compile static binaries where suitable and copy into distroless runtime.

## Reduce Layers and Files
- Combine RUN commands; prune docs/tests from dependencies.

## Example Multi-Stage
```dockerfile
FROM golang:1.22-alpine AS build
WORKDIR /src
COPY . .
RUN CGO_ENABLED=0 go build -o app ./cmd/app

FROM gcr.io/distroless/static:nonroot
COPY --from=build /src/app /app
USER nonroot
ENTRYPOINT ["/app"]
```

## Metadata and SBOM
- Add OCI labels and generate SBOM (Docker Scout/Syft).

## Test and Scan
- Run container-level tests; scan images for CVEs in CI.
