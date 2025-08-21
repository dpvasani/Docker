---
title: 02. Compose Networking
sidebar_label: 02. Compose Networking
---

## Service Discovery
- Services on the same default network can reach each other via service name (DNS).
- Example: `api` can call `http://db:5432`.

## Example
```yaml
version: "3.9"
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_PASSWORD: secret
    networks:
      - app

  api:
    build: ./api
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgres://postgres:secret@db:5432/app
    depends_on:
      - db
    networks:
      app:
        aliases: [api.local]

  web:
    build: ./web
    ports:
      - "3000:3000"
    depends_on:
      - api
    networks: [app]

networks:
  app:
    driver: bridge
```

## Multiple Networks
```yaml
services:
  proxy:
    image: nginx:alpine
    networks: [edge, app]

networks:
  edge: {driver: bridge}
  app:  {driver: bridge}
```

## Ports vs. Internal Networking
- `ports` exposes to host; internal service-to-service calls should use the container port and service DNS, not localhost.

## Advanced Options
- Custom subnets, IPAM, and `internal: true` networks (no outbound access).
- Extra hosts and DNS settings via `extra_hosts`, `dns`, `dns_search`.
