---
id: docker-volumes-basics
title: 📦 01. Docker Volumes Basics
sidebar_label: 01. Docker Volumes Basics
---

# 📦 Docker Volumes – A2Z Storage Guide 🐳

Docker volumes provide persistent storage that survives container restarts and can be shared between containers. This comprehensive guide covers everything you need to know about Docker volumes.

---

## 🔍 What is a Docker Volume?

> A **Docker volume** is a persistent storage mechanism managed by Docker **outside** the container filesystem.

✅ Volumes **survive container restarts**
✅ Volumes are **managed by Docker**
✅ They're perfect for **storing databases, logs, user uploads, and config files**

---

## 📁 Real-World Analogy:

> 🧳 Think of a volume as a **USB stick plugged into your container**.

* You can eject the container 💣
* The USB (volume) still has all your files 💾

---

## 🧠 Why Use Volumes?

| ✅ Benefit                | 💬 Why It's Awesome                        |
| ------------------------ | ------------------------------------------ |
| Persistent Storage       | Data stays even after container dies       |
| Decoupled                | Separate from container logic              |
| Shared Access            | Mount same volume into multiple containers |
| Backup Friendly          | Easy to archive/export                     |
| Safe from image rebuilds | Won't be deleted accidentally              |

---

## 🔌 Types of Docker Volume Mounts

| Type            | Syntax Example                      | Use Case                       |
| --------------- | ----------------------------------- | ------------------------------ |
| 🐳 Named Volume | `-v my-volume:/app/data`            | Default, managed by Docker     |
| 🗂️ Host Bind   | `-v /host/folder:/container/folder` | Use host machine's file system |
| 🧪 Anonymous    | `-v /app/data`                      | Randomly named, temporary      |

---

## 🔧 1. Using a **Named Volume**

```bash
docker volume create mydata

docker run -d \
  --name db \
  -v mydata:/var/lib/mysql \
  mysql
```

✅ The data is stored in:

```
/var/lib/docker/volumes/mydata/_data
```

---

## 🗂️ 2. Attaching Host Folders (Bind Mounts)

```bash
docker run -d \
  --name webapp \
  -v /home/user/project:/usr/src/app \
  node:alpine
```

✅ Mounts a host folder directly inside the container.

> ⚠️ **Bind mounts** are powerful but risk exposing sensitive host files if misused.

---

## 🔥 Differences: Volume vs Bind Mount

| Feature           | Volume (Docker-managed) | Bind Mount (Host folder) |
| ----------------- | ----------------------- | ------------------------ |
| Managed by Docker | ✅ Yes                   | ❌ No                     |
| Host portability  | ✅ Portable              | ❌ Host-specific          |
| Data safety       | ✅ Isolated              | ❌ Depends on host path   |
| Security          | ✅ Better                | ⚠️ Potentially risky     |

---

## 🔁 3. Share Volume Between Multiple Containers

### 🧪 Example:

```bash
docker volume create shared-data

docker run -d --name writer \
  -v shared-data:/data \
  busybox sh -c "echo hello > /data/file.txt && sleep 9999"
```

---

## 🚀 Volume Management Commands

### **Create Volume**
```bash
# Create named volume
docker volume create mydata

# Create with specific driver
docker volume create --driver local mydata

# Create with labels
docker volume create --label env=production --label app=webapp mydata
```

### **List Volumes**
```bash
# List all volumes
docker volume ls

# List with filters
docker volume ls --filter "label=env=production"

# List with format
docker volume ls --format "table {{.Name}}\t{{.Driver}}\t{{.Labels}}"
```

### **Inspect Volume**
```bash
# Get volume details
docker volume inspect mydata

# Get specific information
docker volume inspect -f '{{.Mountpoint}}' mydata
```

### **Remove Volume**
```bash
# Remove specific volume
docker volume rm mydata

# Remove all unused volumes
docker volume prune

# Remove with confirmation
docker volume prune --force
```

---

## 🔧 Volume Usage Examples

### **Database Persistence**
```bash
# Create volume for database
docker volume create postgres-data

# Run PostgreSQL with volume
docker run -d --name postgres \
  -e POSTGRES_PASSWORD=secret \
  -v postgres-data:/var/lib/postgresql/data \
  postgres:13

# Data persists even after container restart
docker restart postgres
```

### **Application Data**
```bash
# Create volume for app data
docker volume create app-data

# Run application with volume
docker run -d --name myapp \
  -v app-data:/app/data \
  -p 3000:3000 \
  myapp:latest

# Upload files persist in volume
docker exec myapp ls /app/data
```

### **Configuration Files**
```bash
# Mount config file from host
docker run -d --name nginx \
  -v /etc/nginx/nginx.conf:/etc/nginx/nginx.conf:ro \
  -p 80:80 \
  nginx:alpine

# Read-only mount for security
```

---

## 🔒 Volume Security Best Practices

### **Read-Only Mounts**
```bash
# Mount volume as read-only
docker run -d --name app \
  -v config-data:/app/config:ro \
  myapp:latest

# Container cannot modify read-only volume
```

### **User Permissions**
```bash
# Run container as specific user
docker run -d --name app \
  -v app-data:/app/data \
  --user 1000:1000 \
  myapp:latest

# Volume files owned by user 1000
```

### **Volume Isolation**
```bash
# Separate volumes for different environments
docker volume create prod-db-data
docker volume create staging-db-data
docker volume create dev-db-data
```

---

## 🔍 Volume Troubleshooting

### **Check Volume Contents**
```bash
# Inspect volume mount point
docker volume inspect mydata

# Browse volume contents (Linux)
sudo ls -la /var/lib/docker/volumes/mydata/_data

# Browse volume contents (macOS/Windows)
docker run --rm -v mydata:/data alpine ls -la /data
```

### **Volume Size and Usage**
```bash
# Check volume disk usage
docker system df -v

# Find large volumes
docker volume ls --format "table {{.Name}}\t{{.Driver}}\t{{.Labels}}"
```

### **Common Issues**
```bash
# Volume not accessible
docker volume inspect mydata

# Permission denied
docker run --rm -v mydata:/data alpine ls -la /data

# Volume not found
docker volume ls | grep mydata
```

---

## 🎯 Real-World Use Cases

### **Web Application Stack**
```bash
# Create volumes for web app
docker volume create webapp-data
docker volume create webapp-logs
docker volume create webapp-config

# Run web application
docker run -d --name webapp \
  -v webapp-data:/app/data \
  -v webapp-logs:/app/logs \
  -v webapp-config:/app/config \
  -p 3000:3000 \
  webapp:latest
```

### **Development Environment**
```bash
# Mount source code for development
docker run -d --name dev-app \
  -v $(pwd):/app \
  -v node_modules:/app/node_modules \
  -p 3000:3000 \
  node:18-alpine npm run dev

# Source code changes reflect immediately
```

### **Backup and Restore**
```bash
# Backup volume data
docker run --rm -v mydata:/data -v $(pwd):/backup \
  alpine tar czf /backup/mydata-backup.tar.gz -C /data .

# Restore volume data
docker run --rm -v mydata:/data -v $(pwd):/backup \
  alpine tar xzf /backup/mydata-backup.tar.gz -C /data
```

---

## 📚 What's Next?

Now that you understand Docker Volumes basics, explore:
- **🔧 Volume Drivers** - Advanced storage backends
- **📊 Volume Performance** - Optimization techniques
- **🔄 Volume Migration** - Moving data between systems
- **🔒 Volume Security** - Advanced security practices

---

**Next Up**: [🔧 Volume Drivers](./02-volume-drivers) →
