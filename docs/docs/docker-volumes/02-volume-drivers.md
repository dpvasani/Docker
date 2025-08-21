---
title: 02. Volume Drivers
sidebar_label: 02. Volume Drivers
slug: /docker-volumes/02-volume-drivers
---

## Local Driver (Default)
```bash
# Basic
docker volume create data

# With options (tmpfs example on Linux)
docker volume create \
  --driver local \
  --opt type=tmpfs \
  --opt device=tmpfs \
  --opt o=size=256m tmpfs-vol
```

## NFS/CIFS via Local Driver
```bash
# NFS
docker volume create \
  --driver local \
  --opt type=nfs \
  --opt o=addr=10.0.0.10,rw \
  --opt device=:/export/data nfs-data

# CIFS (Windows/SMB)
docker volume create \
  --driver local \
  --opt type=cifs \
  --opt device=//server/share \
  --opt o=username=user,password=pass,uid=1000,gid=1000 file-share
```

## Third-Party/Cloud Drivers
- Use plugins for EBS, Azure Disk/File, NetApp, Portworx, etc.
- Install plugin:
```bash
docker plugin install vieux/sshfs  # example plugin
```

## Compose Example
```yaml
version: "3.9"
services:
  db:
    image: postgres:16
    volumes:
      - db-data:/var/lib/postgresql/data
volumes:
  db-data:
    driver: local
    driver_opts:
      type: nfs
      o: addr=10.0.0.10,rw
      device: ":/exports/db"
```

## Backup and Restore
```bash
# Backup
docker run --rm -v data:/data -v $PWD:/backup alpine \
  tar czf /backup/data-$(date +%F).tgz -C /data .

# Restore
docker run --rm -v data:/data -v $PWD:/backup alpine \
  sh -lc "cd /data && tar xzf /backup/data-2025-01-01.tgz"
```

## Best Practices
- Prefer volumes over bind mounts for portability.
- Use read-only mounts when possible.
- Manage permissions explicitly (UID/GID).
