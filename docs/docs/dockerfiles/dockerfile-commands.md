---
id: dockerfile-commands
title: 🔧 Dockerfile Commands Reference
sidebar_label: Dockerfile Commands
---

# 🧾 Dockerfile Command Reference

Each command in a Dockerfile defines a specific instruction for how to **build a Docker image**. Here's a detailed breakdown:

---

## 1️⃣ `FROM` — Set the Base Image 🏗️

```dockerfile
FROM node:20-alpine
```

✅ **What it does**:
Defines the **base image** your custom image will build on top of.

> 📝 Must be the **first** instruction in the Dockerfile (except `ARG` sometimes).

### **Examples:**
```dockerfile
# Official images
FROM ubuntu:20.04
FROM python:3.9-slim
FROM node:18-alpine

# Custom images
FROM mycompany/base:latest
```

---

## 2️⃣ `WORKDIR` — Set Working Directory 📁

```dockerfile
WORKDIR /app
```

✅ **What it does**:
Sets the **working directory** inside the container where all subsequent commands (`COPY`, `RUN`, etc.) will execute.

> 📝 Automatically creates the directory if it doesn't exist.

### **Examples:**
```dockerfile
# Set working directory
WORKDIR /app

# All subsequent commands run from /app
RUN pwd  # Outputs: /app
COPY . . # Copies to /app
```

---

## 3️⃣ `COPY` — Copy Files into the Image 📦

```dockerfile
COPY package*.json ./
COPY . .
```

✅ **What it does**:
Copies files/directories from your host into the container filesystem.

> 💡 Use `.dockerignore` to exclude unnecessary files.

### **Examples:**
```dockerfile
# Copy single file
COPY package.json /app/

# Copy entire directory
COPY . /app/

# Copy with specific files
COPY src/ /app/src/
COPY *.js /app/
```

---

## 4️⃣ `RUN` — Execute a Shell Command 🛠️

```dockerfile
RUN npm install
RUN apk add --no-cache curl
```

✅ **What it does**:
Runs a command (like installing packages, cleaning up files) at **build time**, and creates a new layer.

> 💡 Combine multiple commands to reduce image size:

```dockerfile
RUN apk add --no-cache curl && npm install
```

### **Examples:**
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

---

## 5️⃣ `CMD` — Default Command to Run on Container Start 🏁

```dockerfile
CMD ["npm", "start"]
```

✅ **What it does**:
Specifies the default command that gets run **when the container starts**.

> 💡 Only one `CMD` allowed — if multiple, only the last is used.

### **Examples:**
```dockerfile
# Shell form
CMD npm start

# Exec form (recommended)
CMD ["npm", "start"]

# With parameters
CMD ["npm", "start", "--host", "0.0.0.0"]
```

---

## 6️⃣ `EXPOSE` — Document the App's Port 🌐

```dockerfile
EXPOSE 8000
```

✅ **What it does**:
Informs Docker that the app runs on a specific port — used for documentation and port binding.

> 💡 Does **not** actually publish the port (use `-p` in `docker run`).

### **Examples:**
```dockerfile
# Expose single port
EXPOSE 3000

# Expose multiple ports
EXPOSE 3000 8080 9000
```

---

## 7️⃣ `ENV` — Set Environment Variables 🧪

```dockerfile
ENV PORT=8000
ENV NODE_ENV=production
```

✅ **What it does**:
Sets environment variables that will be available in the container at runtime.

### **Examples:**
```dockerfile
# Set single variable
ENV NODE_ENV=production

# Set multiple variables
ENV NODE_ENV=production \
    PORT=3000 \
    DATABASE_URL=postgresql://localhost/mydb
```

---

## 8️⃣ `ARG` — Build Arguments 🔧

```dockerfile
ARG VERSION=latest
FROM node:${VERSION}
```

✅ **What it does**:
Defines variables that can be passed at build time using `--build-arg`.

### **Examples:**
```dockerfile
# Define build argument
ARG VERSION=latest

# Use in build
FROM node:${VERSION}

# Pass during build: docker build --build-arg VERSION=16 .
```

---

## 9️⃣ `USER` — Change User 👤

```dockerfile
USER nodejs
```

✅ **What it does**:
Changes the user that subsequent instructions will run as.

### **Examples:**
```dockerfile
# Create user
RUN adduser -D appuser

# Switch to user
USER appuser

# All subsequent commands run as appuser
```

---

## 🔟 `HEALTHCHECK` — Health Monitoring 🏥

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/health || exit 1
```

✅ **What it does**:
Tells Docker how to test that a container is working properly.

### **Examples:**
```dockerfile
# HTTP health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Command health check
HEALTHCHECK CMD pg_isready -U postgres || exit 1
```

---

## 🎯 Complete Example

Here's a complete Dockerfile using all the commands:

```dockerfile
# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first (for better caching)
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

## 🚨 Best Practices

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

## 📚 What's Next?

Now that you understand Dockerfile commands, explore:
- **📈 Best Practices** - Optimization techniques
- **🏗️ Multi-Stage Builds** - Advanced image building
- **⚡ Optimization Guide** - Performance improvements
- **👤 User Management** - Security best practices

---

**Next Up**: [📈 Dockerfile Best Practices](./best-practices) →
