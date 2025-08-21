---
title: 03. Image Commands
sidebar_label: 03. Image Commands
---

## Pull and Search
```bash
# Pull image
docker pull nginx:1.27-alpine

# Search registry
docker search alpine
```

## Build Images
```bash
# Build from Dockerfile in current directory
docker build -t myapp:1.0.0 .

# Build with build args and target stage
docker build \
  --build-arg NODE_ENV=production \
  --target production \
  -t myapp:prod .

# Build using BuildKit cache mounts
DOCKER_BUILDKIT=1 docker build -t myapp:cache .
```

## Tag, Inspect, History
```bash
# Tag existing image
docker tag myapp:1.0.0 myrepo/myapp:1.0.0

# Inspect metadata
docker image inspect myrepo/myapp:1.0.0

# Show layer history
docker history myrepo/myapp:1.0.0
```

## Push and Pull from Registries
```bash
# Login and push
docker login
docker push myrepo/myapp:1.0.0

# Pull later
docker pull myrepo/myapp:1.0.0
```

## Save, Load, Export, Import
```bash
# Save image to tar
docker save myrepo/myapp:1.0.0 -o myapp.tar

# Load from tar
docker load -i myapp.tar

# Export container filesystem (no history)
docker export mycontainer -o fs.tar

# Import as new image
docker import fs.tar myapp:from-export
```

## Remove, Prune
```bash
# Remove one image
docker rmi myrepo/myapp:1.0.0

# Remove dangling images
docker image prune

# Aggressive prune (dangling + unused)
docker image prune -a
```

## Scan and SBOM
```bash
# Vulnerability scan (Docker Scout / engine support varies)
docker scout cves myrepo/myapp:1.0.0

# Generate SBOM (if available)
docker scout sbom myrepo/myapp:1.0.0
```

## Tips
- Use semantic tags (e.g., 1.0.0, 1.0, latest).
- Keep images small: multi-stage builds, minimal base images, prune caches.
- Pin base images to digests for reproducibility.
