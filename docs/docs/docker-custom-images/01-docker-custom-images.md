---
id: docker-custom-images
title: 🏗️ 01. Docker Custom Images
sidebar_label: 01. Docker Custom Images
---

# 🏗️ Docker Custom Images

Creating custom Docker images is a fundamental skill for Docker users. This guide covers everything you need to know about building, optimizing, and managing your own Docker images.

---

## 🎯 What You'll Learn

- **Image Building Basics** - Understanding the Docker build process
- **Dockerfile Best Practices** - Writing efficient and secure Dockerfiles
- **Multi-Stage Builds** - Advanced image optimization techniques
- **Image Publishing** - Sharing your images with the world
- **Security Considerations** - Building secure production images

---

## 🚀 Quick Start

### **Basic Image Building**
```bash
# Build an image from a Dockerfile
docker build -t myapp:latest .

# Build with a specific tag
docker build -t myapp:v1.0.0 .

# Build from a different context
docker build -t myapp:latest /path/to/context
```

### **Running Your Custom Image**
```bash
# Run your custom image
docker run -p 3000:3000 myapp:latest

# Run with environment variables
docker run -e NODE_ENV=production myapp:latest

# Run with volume mounting
docker run -v $(pwd):/app myapp:latest
```

---

## 🏗️ Image Building Process

### **1. Dockerfile Creation**
Every custom image starts with a Dockerfile:

```dockerfile
# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

### **2. Build Context**
The build context includes all files in the directory:

```bash
# Current directory as context
docker build -t myapp .

# Specific directory as context
docker build -t myapp /path/to/app

# URL as context (Git repository)
docker build -t myapp https://github.com/user/repo.git
```

### **3. Build Cache**
Docker uses layer caching for faster builds:

```dockerfile
# These layers are cached separately
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install

# This layer changes most frequently
COPY . .
```

---

## 🔧 Advanced Techniques

### **Multi-Stage Builds**
Reduce final image size with multi-stage builds:

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
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
EXPOSE 3000
CMD ["npm", "start"]
```

### **Build Arguments**
Make your images configurable:

```dockerfile
ARG NODE_VERSION=18
ARG NPM_VERSION=latest

FROM node:${NODE_VERSION}-alpine
RUN npm install -g npm@${NPM_VERSION}
```

### **Environment Variables**
Configure your application at runtime:

```dockerfile
ENV NODE_ENV=production
ENV PORT=3000
ENV DATABASE_URL=postgresql://localhost/mydb
```

---

## 📦 Image Optimization

### **Layer Optimization**
Combine RUN commands to reduce layers:

```dockerfile
# ❌ Bad: Multiple layers
RUN apt-get update
RUN apt-get install -y python3
RUN apt-get install -y python3-pip

# ✅ Good: Single layer
RUN apt-get update && \
    apt-get install -y python3 python3-pip
```

### **Copy Optimization**
Copy files in the right order for better caching:

```dockerfile
# Copy dependencies first (rarely change)
COPY package*.json ./
RUN npm install

# Copy source code last (changes frequently)
COPY . .
```

### **Base Image Selection**
Choose the right base image:

```dockerfile
# ❌ Bad: Large base image
FROM ubuntu:20.04

# ✅ Good: Minimal base image
FROM node:18-alpine

# ✅ Better: Distroless image
FROM gcr.io/distroless/nodejs18
```

---

## 🚀 Publishing Your Images

### **Docker Hub**
```bash
# Tag your image
docker tag myapp:latest username/myapp:latest

# Push to Docker Hub
docker push username/myapp:latest

# Pull from Docker Hub
docker pull username/myapp:latest
```

### **Private Registries**
```bash
# Tag for private registry
docker tag myapp:latest registry.company.com/myapp:latest

# Push to private registry
docker push registry.company.com/myapp:latest
```

### **Image Tags**
Use meaningful tags:

```bash
# Version tags
docker tag myapp:latest myapp:v1.0.0
docker tag myapp:latest myapp:v1.0

# Environment tags
docker tag myapp:latest myapp:production
docker tag myapp:latest myapp:staging

# Latest tag (always points to most recent)
docker tag myapp:latest myapp:latest
```

---

## 🔒 Security Best Practices

### **Non-Root User**
```dockerfile
# Create non-root user
RUN addgroup -g 1001 -S appuser
RUN adduser -S appuser -u 1001

# Switch to non-root user
USER appuser
```

### **Minimal Base Images**
```dockerfile
# Use minimal base images
FROM alpine:3.18

# Or distroless images
FROM gcr.io/distroless/static:nonroot
```

### **Security Scanning**
```bash
# Scan for vulnerabilities
docker scan myapp:latest

# Use Docker Scout
docker scout cves myapp:latest
```

---

## 📚 What's Next?

Now that you understand Docker Custom Images, explore:
- **🔧 Dockerfile Commands** - Complete command reference
- **📈 Image Optimization** - Performance improvements
- **🏗️ Multi-Stage Builds** - Advanced building techniques
- **👤 User Management** - Security best practices
- **🌐 Port Mapping** - Network configuration
- **📦 Layer Management** - Understanding image layers

---

**Next Up**: [🔧 Dockerfile Commands](../dockerfiles/dockerfile-commands) →
