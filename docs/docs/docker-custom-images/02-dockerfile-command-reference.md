---
id: dockerfile-command-reference
title: 🔧 02. Dockerfile Command Reference
sidebar_label: 02. Dockerfile Command Reference
---

# 🔧 Dockerfile Command Reference

A comprehensive reference for all Dockerfile commands and instructions. This guide covers every command you need to build efficient and secure Docker images.

---

## 📋 Command Overview

| Command | Purpose | Example |
|---------|---------|---------|
| `FROM` | Set base image | `FROM node:18-alpine` |
| `WORKDIR` | Set working directory | `WORKDIR /app` |
| `COPY` | Copy files into image | `COPY . .` |
| `RUN` | Execute commands | `RUN npm install` |
| `CMD` | Default command | `CMD ["npm", "start"]` |
| `EXPOSE` | Document ports | `EXPOSE 3000` |
| `ENV` | Set environment variables | `ENV NODE_ENV=production` |
| `ARG` | Build arguments | `ARG VERSION=latest` |
| `USER` | Change user | `USER nodejs` |
| `HEALTHCHECK` | Health monitoring | `HEALTHCHECK CMD curl -f /health` |

---

## 🏗️ `FROM` - Base Image

### **Basic Usage**
```dockerfile
FROM node:18-alpine
FROM ubuntu:20.04
FROM python:3.9-slim
```

### **Advanced Usage**
```dockerfile
# Use specific version
FROM node:18.17.0-alpine

# Use digest for security
FROM node:18-alpine@sha256:abc123...

# Multi-platform
FROM --platform=linux/amd64 node:18-alpine
```

---

## 📁 `WORKDIR` - Working Directory

### **Basic Usage**
```dockerfile
WORKDIR /app
WORKDIR /var/www/html
```

### **Relative Paths**
```dockerfile
WORKDIR app
WORKDIR ../parent
WORKDIR ./subdirectory
```

---

## 📦 `COPY` - Copy Files

### **Basic Copy**
```dockerfile
# Copy single file
COPY package.json /app/

# Copy entire directory
COPY . /app/

# Copy specific files
COPY *.js /app/
COPY src/ /app/src/
```

### **Advanced Copy**
```dockerfile
# Copy with wildcards
COPY package*.json ./

# Copy with exclusions
COPY --exclude=*.log . /app/

# Copy from different source
COPY --from=builder /app/dist ./dist
```

---

## 🛠️ `RUN` - Execute Commands

### **Basic Commands**
```dockerfile
RUN npm install
RUN apt-get update
RUN pip install -r requirements.txt
```

### **Chained Commands**
```dockerfile
# Single line
RUN apt-get update && apt-get install -y python3

# Multi-line for readability
RUN apt-get update \
    && apt-get install -y \
        python3 \
        python3-pip \
    && pip3 install requests
```

### **Shell Commands**
```dockerfile
# Use specific shell
RUN ["/bin/bash", "-c", "echo $HOME"]

# Shell form
RUN echo "Hello from shell"
```

---

## 🏁 `CMD` - Default Command

### **Exec Form (Recommended)**
```dockerfile
CMD ["npm", "start"]
CMD ["python", "app.py"]
CMD ["nginx", "-g", "daemon off;"]
```

### **Shell Form**
```dockerfile
CMD npm start
CMD python app.py
```

### **Parameterized Commands**
```dockerfile
CMD ["npm", "start", "--host", "0.0.0.0"]
CMD ["python", "-u", "app.py"]
```

---

## 🌐 `EXPOSE` - Document Ports

### **Single Port**
```dockerfile
EXPOSE 3000
EXPOSE 80
```

### **Multiple Ports**
```dockerfile
EXPOSE 3000 8080 9000
```

### **Protocol Specification**
```dockerfile
EXPOSE 3000/tcp
EXPOSE 53/udp
```

---

## 🧪 `ENV` - Environment Variables

### **Single Variable**
```dockerfile
ENV NODE_ENV=production
ENV PORT=3000
```

### **Multiple Variables**
```dockerfile
ENV NODE_ENV=production \
    PORT=3000 \
    DATABASE_URL=postgresql://localhost/mydb
```

### **Variable Expansion**
```dockerfile
ENV VERSION=1.0.0
ENV APP_NAME=myapp
ENV FULL_NAME=${APP_NAME}:${VERSION}
```

---

## 🔧 `ARG` - Build Arguments

### **Basic Arguments**
```dockerfile
ARG VERSION=latest
ARG NODE_VERSION=18
```

### **Using Arguments**
```dockerfile
ARG VERSION=latest
FROM node:${VERSION}-alpine

ARG BUILD_DATE
LABEL build-date=$BUILD_DATE
```

### **Scope Rules**
```dockerfile
# Global ARG (available in FROM)
ARG VERSION=latest
FROM node:${VERSION}-alpine

# Local ARG (only in this stage)
ARG LOCAL_VAR=default
```

---

## 👤 `USER` - Change User

### **Username**
```dockerfile
USER nodejs
USER www-data
USER 1000
```

### **User and Group**
```dockerfile
USER 1000:1000
USER appuser:appgroup
```

### **Creating Users**
```dockerfile
# Create user first
RUN adduser -D appuser
USER appuser

# Or use existing user
USER nobody
```

---

## 🏥 `HEALTHCHECK` - Health Monitoring

### **HTTP Health Check**
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

### **Command Health Check**
```dockerfile
HEALTHCHECK CMD pg_isready -U postgres || exit 1
HEALTHCHECK CMD nginx -t || exit 1
```

### **Health Check Options**
```dockerfile
HEALTHCHECK --interval=30s \
            --timeout=10s \
            --start-period=40s \
            --retries=3 \
            CMD curl -f http://localhost:3000/health || exit 1
```

---

## 🏷️ `LABEL` - Metadata

### **Basic Labels**
```dockerfile
LABEL version="1.0"
LABEL maintainer="dev@company.com"
```

### **Multiple Labels**
```dockerfile
LABEL version="1.0" \
      maintainer="dev@company.com" \
      description="My application"
```

---

## 🔄 `ENTRYPOINT` - Container Entrypoint

### **Basic Entrypoint**
```dockerfile
ENTRYPOINT ["nginx", "-g", "daemon off;"]
```

### **Entrypoint with CMD**
```dockerfile
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["postgres"]
```

---

## 📝 `VOLUME` - Declare Volumes

### **Basic Volume**
```dockerfile
VOLUME ["/var/lib/mysql"]
VOLUME ["/app/data"]
```

### **Multiple Volumes**
```dockerfile
VOLUME ["/var/lib/mysql", "/var/log/mysql"]
```

---

## 🎯 Complete Example

Here's a production-ready Dockerfile using multiple commands:

```dockerfile
# Build arguments
ARG NODE_VERSION=18
ARG NPM_VERSION=latest

# Base image
FROM node:${NODE_VERSION}-alpine AS base

# Install dependencies
RUN apk add --no-cache curl

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install npm packages
RUN npm ci --only=production

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001
USER nodejs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["npm", "start"]
```

---

## 🚨 Best Practices

### **1. Layer Ordering**
```dockerfile
# ✅ Good: Dependencies first, code last
COPY package*.json ./
RUN npm install
COPY . .

# ❌ Bad: Code first, dependencies last
COPY . .
COPY package*.json ./
RUN npm install
```

### **2. Multi-Stage Builds**
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production
COPY --from=builder /app/dist ./dist
```

### **3. Security**
```dockerfile
# Use non-root user
RUN adduser -D appuser
USER appuser

# Don't run as root
USER 1000:1000
```

---

## 📚 What's Next?

Now that you understand Dockerfile commands, explore:
- **📈 Image Optimization** - Performance improvements
- **🏗️ Multi-Stage Builds** - Advanced building techniques
- **👤 User Management** - Security best practices
- **🌐 Port Mapping** - Network configuration
- **📦 Layer Management** - Understanding image layers

---

**Next Up**: [📈 Image Optimization](./03-image-optimization) →
