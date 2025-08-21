---
id: compose-basics
title: 🧩 Docker Compose Basics
sidebar_label: Compose Basics
---

# 🧩 Docker Compose – Full DevOps Power in One File

---

## 📘 What is Docker Compose?

> **Docker Compose** is a tool for defining and managing **multi-container** Docker applications using a simple YAML file.

Instead of running `docker run` commands multiple times, Compose lets you:

✅ Define containers, networks, volumes, and environment variables
✅ Start everything with **`docker compose up`**
✅ Manage dependencies, ports, and data easily

---

## ⚙️ Basic Syntax of `docker-compose.yml`

```yaml
version: "3.9"         # Compose file version
services:              # Define all containers here
  service1:            # A named service (container)
    image: nginx       # Use this image
    ports:
      - "8080:80"      # host:container
```

---

## 🧠 Why Use Docker Compose?

| Feature 💡              | Why It Helps 🚀                      |
| ----------------------- | ------------------------------------ |
| 🧱 Declarative Setup    | All infra defined in one YAML file   |
| 🔗 Built-in Networking  | Services can talk by name (like DNS) |
| 🧳 Volume Integration   | Persistent data made easy            |
| 🔄 Auto-Dependency Mgmt | Start db before app, cache, etc.     |
| 🔥 Dev & Prod Configs   | Easy environment switching           |

---

## 🚀 Basic Example: Web App + Database

```yaml
version: "3.9"

services:
  web:
    image: nginx:alpine
    ports:
      - "8080:80"
    depends_on:
      - db
    environment:
      - DB_HOST=db
      - DB_PORT=5432

  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### **What This Does:**
1. **Web Service**: Nginx web server on port 8080
2. **Database Service**: PostgreSQL database
3. **Dependencies**: Web waits for database to start
4. **Environment Variables**: Configuration passed to containers
5. **Volume**: Persistent database storage

---

## 🎯 Key Concepts

### **Services** 🐳
- Each service becomes a container
- Services can reference each other by name
- Dependencies are automatically managed

### **Networks** 🌐
- All services share a default network
- Services can communicate using service names
- Custom networks can be defined

### **Volumes** 💾
- Persistent data storage
- Shared between containers
- Survive container restarts

### **Environment Variables** 🔧
- Configuration for containers
- Can use `.env` files
- Support for different environments

---

## 🛠️ Essential Commands

### **Starting Services**
```bash
# Start all services in background
docker compose up -d

# Start with rebuild
docker compose up --build

# Start specific service
docker compose up web
```

### **Managing Services**
```bash
# View running services
docker compose ps

# View logs
docker compose logs

# Follow logs in real-time
docker compose logs -f web
```

### **Stopping Services**
```bash
# Stop all services
docker compose down

# Stop and remove volumes
docker compose down -v

# Stop specific service
docker compose stop web
```

### **Service Operations**
```bash
# Restart service
docker compose restart web

# Scale service
docker compose up --scale web=3

# Execute command in service
docker compose exec web sh
```

---

## 📁 Project Structure

```
my-app/
├── docker-compose.yml
├── docker-compose.override.yml
├── docker-compose.prod.yml
├── .env
├── web/
│   ├── Dockerfile
│   └── src/
└── db/
    └── init.sql
```

### **Multiple Compose Files**
- **`docker-compose.yml`**: Base configuration
- **`docker-compose.override.yml`**: Development overrides
- **`docker-compose.prod.yml`**: Production configuration

---

## 🔧 Environment Configuration

### **Using .env Files**
```bash
# .env
DB_PASSWORD=secret123
API_KEY=abc123
DEBUG=true
```

```yaml
# docker-compose.yml
services:
  web:
    environment:
      - DB_PASSWORD=${DB_PASSWORD}
      - API_KEY=${API_KEY}
      - DEBUG=${DEBUG}
```

### **Environment-Specific Files**
```bash
# Development
docker compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production
docker compose -f docker-compose.yml -f docker-compose.prod.yml up
```

---

## 🎯 Best Practices

### **1. Service Naming**
```yaml
# Good: Descriptive names
services:
  web_server:
  database:
  redis_cache:

# Avoid: Generic names
services:
  app:
  db:
  cache:
```

### **2. Port Mapping**
```yaml
# Development: Fixed ports
ports:
  - "3000:3000"

# Production: Random ports
ports:
  - "3000"
```

### **3. Health Checks**
```yaml
services:
  web:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

### **4. Resource Limits**
```yaml
services:
  web:
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
        reservations:
          memory: 256M
          cpus: '0.25'
```

---

## 🚀 Advanced Features

### **Service Dependencies**
```yaml
services:
  web:
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
```

### **Service Discovery**
```yaml
services:
  web:
    environment:
      - DB_URL=postgresql://user:pass@db:5432/myapp
      - REDIS_URL=redis://redis:6379
```

### **Custom Networks**
```yaml
networks:
  frontend:
  backend:

services:
  web:
    networks:
      - frontend
      - backend
  db:
    networks:
      - backend
```

---

## 🎯 Common Use Cases

### **Full-Stack Application**
```yaml
version: "3.9"
services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp

  db:
    image: postgres:13
    environment:
      - POSTGRES_DB=myapp
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

### **Microservices Architecture**
```yaml
version: "3.9"
services:
  api-gateway:
    image: nginx:alpine
    ports:
      - "80:80"
    depends_on:
      - user-service
      - order-service

  user-service:
    build: ./user-service
    environment:
      - DB_HOST=user-db

  order-service:
    build: ./order-service
    environment:
      - DB_HOST=order-db

  user-db:
    image: postgres:13

  order-db:
    image: postgres:13
```

---

## 🆘 Troubleshooting

### **Common Issues**

1. **Port Already in Use**
   ```bash
   # Check what's using the port
   lsof -i :8080
   
   # Change port in compose file
   ports:
     - "8081:80"
   ```

2. **Service Won't Start**
   ```bash
   # Check logs
   docker compose logs service_name
   
   # Check service status
   docker compose ps
   ```

3. **Volume Permission Issues**
   ```yaml
   # Add user mapping
   services:
     web:
       user: "1000:1000"
   ```

---

## 📚 What's Next?

Now that you understand Docker Compose basics, explore:
- **🌐 Networking in Docker Compose** - Service communication
- **💾 Volumes in Docker Compose** - Data persistence
- **🔧 Environment Management** - Dev vs production
- **📖 Real Examples** - Complete application setups

---

**Next Up**: [🌐 Networking in Docker Compose](./compose-networking) →
