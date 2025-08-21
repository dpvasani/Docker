---
id: dockerfile-basics
title: 📝 Dockerfile Basics
sidebar_label: Dockerfile Basics
---

# 📝 Dockerfile Basics

A **Dockerfile** is a text file that contains instructions for building a Docker image. It's like a recipe that tells Docker how to create your application's environment.

---

## 🏗️ What is a Dockerfile?

Think of a Dockerfile as:
- 📋 **Instructions** for building an image
- 🧱 **Blueprint** for your container environment
- 🔧 **Automation** script for consistent deployments

---

## 📝 Basic Dockerfile Structure

```dockerfile
# Base image
FROM ubuntu:20.04

# Set working directory
WORKDIR /app

# Copy application files
COPY . /app

# Install dependencies
RUN apt-get update && apt-get install -y python3

# Expose port
EXPOSE 3000

# Default command
CMD ["python3", "app.py"]
```

---

## 🔑 Essential Dockerfile Instructions

### **1. FROM - Base Image**
```dockerfile
# Official images
FROM ubuntu:20.04
FROM python:3.9-slim
FROM node:16-alpine

# Custom images
FROM mycompany/base:latest
```

**Best Practices:**
- ✅ Use specific versions (not `latest`)
- ✅ Choose minimal base images (`alpine`, `slim`)
- ✅ Use official images when possible

### **2. WORKDIR - Working Directory**
```dockerfile
# Set working directory for subsequent instructions
WORKDIR /app

# All following commands run from /app
RUN pwd  # Outputs: /app
```

**Benefits:**
- 📁 Creates directory if it doesn't exist
- 🔄 Changes working directory for all subsequent commands
- 🧹 Cleaner Dockerfile structure

### **3. COPY - Copy Files**
```dockerfile
# Copy single file
COPY package.json /app/

# Copy entire directory
COPY . /app/

# Copy with specific files
COPY src/ /app/src/
COPY *.js /app/
```

**Important Notes:**
- 📍 Source is relative to build context
- 🚫 Destination must be absolute or relative to WORKDIR
- 🔒 Files are copied during build time

### **4. RUN - Execute Commands**
```dockerfile
# Single command
RUN apt-get update

# Multiple commands (chained)
RUN apt-get update && \
    apt-get install -y python3 && \
    pip3 install requests

# Multi-line for readability
RUN apt-get update \
    && apt-get install -y \
        python3 \
        python3-pip \
    && pip3 install requests
```

**Best Practices:**
- 🔗 Chain commands with `&&` to reduce layers
- 🧹 Clean up package manager cache
- 📦 Install only necessary packages

### **5. EXPOSE - Document Ports**
```dockerfile
# Expose single port
EXPOSE 3000

# Expose multiple ports
EXPOSE 3000 8080 9000
```

**Note:** EXPOSE is documentation only - doesn't actually publish ports

### **6. CMD - Default Command**
```dockerfile
# Shell form
CMD python3 app.py

# Exec form (recommended)
CMD ["python3", "app.py"]

# With parameters
CMD ["python3", "app.py", "--host", "0.0.0.0"]
```

**CMD vs RUN:**
- **RUN**: Executes during build time
- **CMD**: Default command when container starts

---

## 🎯 Complete Example: Node.js Application

```dockerfile
# Use official Node.js runtime as base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
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

## 🔧 Advanced Instructions

### **ENV - Environment Variables**
```dockerfile
# Set single variable
ENV NODE_ENV=production

# Set multiple variables
ENV NODE_ENV=production \
    PORT=3000 \
    DATABASE_URL=postgresql://localhost/mydb
```

### **ARG - Build Arguments**
```dockerfile
# Define build argument
ARG VERSION=latest

# Use in build
FROM node:${VERSION}

# Pass during build: docker build --build-arg VERSION=16 .
```

### **USER - Change User**
```dockerfile
# Create user
RUN adduser -D appuser

# Switch to user
USER appuser

# All subsequent commands run as appuser
```

### **HEALTHCHECK - Health Monitoring**
```dockerfile
# HTTP health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Command health check
HEALTHCHECK CMD pg_isready -U postgres || exit 1
```

---

## 🚀 Multi-Stage Builds

```dockerfile
# Build stage
FROM node:16-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Benefits:**
- 📦 Smaller final image
- 🔒 No build tools in production
- ⚡ Faster builds with caching

---

## 🎯 Best Practices

### **1. Layer Optimization**
```dockerfile
# ❌ Bad: Creates unnecessary layers
RUN apt-get update
RUN apt-get install -y python3
RUN apt-get install -y python3-pip

# ✅ Good: Single layer
RUN apt-get update && \
    apt-get install -y python3 python3-pip
```

### **2. Copy Order for Caching**
```dockerfile
# Copy dependency files first
COPY package*.json ./
RUN npm install

# Then copy source code
COPY . .
```

### **3. Use .dockerignore**
```dockerignore
node_modules
npm-debug.log
.git
.env
*.md
```

### **4. Security Considerations**
```dockerfile
# Use non-root user
RUN adduser -D appuser
USER appuser

# Don't run as root
USER 1000:1000
```

---

## 🔍 Common Patterns

### **Development vs Production**
```dockerfile
# Development
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "dev"]

# Production
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
CMD ["npm", "start"]
```

### **Python Application**
```dockerfile
FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "app.py"]
```

### **Java Application**
```dockerfile
FROM openjdk:11-jre-slim
WORKDIR /app
COPY target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
```

---

## 🆘 Troubleshooting

### **Common Issues**

1. **Build Context Too Large**
   ```bash
   # Use .dockerignore
   # Copy only necessary files
   ```

2. **Permission Issues**
   ```dockerfile
   # Fix ownership
   RUN chown -R appuser:appuser /app
   USER appuser
   ```

3. **Cache Invalidation**
   ```dockerfile
   # Copy dependencies first
   # Use specific base image versions
   ```

---

## 📚 What's Next?

Now that you understand Dockerfile basics, explore:
- **🔧 Dockerfile Commands** - All available instructions
- **📈 Best Practices** - Optimization techniques
- **🏗️ Multi-Stage Builds** - Advanced image building
- **⚡ Optimization Guide** - Performance improvements

---

**Next Up**: [🔧 Dockerfile Commands](./dockerfile-commands) →
