---
id: cli-cheat-sheet
title: ⚡ Docker CLI Cheat Sheet
sidebar_label: CLI Cheat Sheet
---

# 🐳 **Docker CLI Cheat Sheet**

*Your one-stop guide to mastering Docker commands* 🚀

---

## 📦 SECTION 1: Image Commands

| Command                         | Description                      | Example                      |
| ------------------------------- | -------------------------------- | ---------------------------- |
| `docker pull <image>`           | ⬇️ Pull an image from Docker Hub | `docker pull ubuntu`         |
| `docker images`                 | 📸 List all local images         | `docker images`              |
| `docker rmi <image>`            | 🗑️ Remove an image              | `docker rmi ubuntu`          |
| `docker tag <img> <repo>:<tag>` | 🏷️ Tag image for push or rename | `docker tag myimg myrepo:v1` |
| `docker build -t <tag> .`       | 🏗️ Build image from Dockerfile  | `docker build -t myapp .`    |

---

## 🐳 SECTION 2: Container Lifecycle

| Command                  | Description                                | Example                      |
| ------------------------ | ------------------------------------------ | ---------------------------- |
| `docker run <image>`     | 🚀 Run a container                         | `docker run ubuntu`          |
| `docker run -it <image>` | 🖥️ Interactive container with terminal    | `docker run -it ubuntu bash` |
| `docker run -d <image>`  | 🔄 Run in background (detached mode)       | `docker run -d nginx`        |
| `docker ps`              | 📋 List running containers                 | `docker ps`                  |
| `docker ps -a`           | 📋 List all containers (including stopped) | `docker ps -a`               |
| `docker stop <id>`       | 🛑 Stop a running container                | `docker stop 123abc`         |
| `docker start <id>`      | ▶️ Start a stopped container               | `docker start 123abc`        |
| `docker restart <id>`    | 🔁 Restart a container                     | `docker restart 123abc`      |
| `docker rm <id>`         | ❌ Remove a container                       | `docker rm 123abc`           |
| `docker logs <id>`       | 📜 View container logs                     | `docker logs 123abc`         |

---

## 📂 SECTION 3: Volume and Data Management

| Command                       | Description                      | Example                            |
| ----------------------------- | -------------------------------- | ---------------------------------- |
| `docker volume create <name>` | 🗃️ Create a volume              | `docker volume create myvol`       |
| `docker volume ls`            | 📋 List volumes                  | `docker volume ls`                 |
| `docker volume rm <name>`     | 🧹 Delete a volume               | `docker volume rm myvol`           |
| `-v host:container`           | 🔗 Mount volume inside container | `docker run -v $(pwd):/app ubuntu` |

---

## 🌐 SECTION 4: Networking

| Command                                    | Description                         | Example                               |
| ------------------------------------------ | ----------------------------------- | ------------------------------------- |
| `docker network ls`                        | 🌐 List networks                    | `docker network ls`                   |
| `docker network create <name>`             | 🛠️ Create a custom network         | `docker network create mynet`         |
| `docker network connect <net> <container>` | 🔌 Connect a container to a network | `docker network connect mynet webapp` |
| `-p host:container`                        | 🌍 Publish port to host             | `docker run -p 8080:80 nginx`         |

---

## 🧪 SECTION 5: Exec & Inspect

| Command                     | Description                                   | Example                    |
| --------------------------- | --------------------------------------------- | -------------------------- |
| `docker exec -it <id> bash` | 🛠️ Run command inside running container      | `docker exec -it web bash` |
| `docker inspect <id>`       | 🔍 Detailed info on container/image           | `docker inspect 123abc`    |
| `docker stats`              | 📈 Real-time usage (CPU, MEM)                 | `docker stats`             |
| `docker top <id>`           | 👨‍💻 Show running processes inside container | `docker top web`           |

---

## 🔄 SECTION 6: Save, Load, and Export

| Command                           | Description                    | Example                             |
| --------------------------------- | ------------------------------ | ----------------------------------- |
| `docker save -o <file>.tar <img>` | 💾 Save image to `.tar` file   | `docker save -o ubuntu.tar ubuntu`  |
| `docker load -i <file>.tar`       | 📤 Load image from tar file    | `docker load -i ubuntu.tar`         |
| `docker export <id> > file.tar`   | 📦 Export container filesystem | `docker export 123abc > ubuntu.tar` |
| `docker import <file>`            | 🔁 Import tar as image         | `docker import ubuntu.tar`          |

---

## ☁️ SECTION 7: DockerHub Login & Push

| Command                      | Description                | Example                    |
| ---------------------------- | -------------------------- | -------------------------- |
| `docker login`               | 🔐 Login to DockerHub      | `docker login`             |
| `docker logout`              | 🔓 Logout from DockerHub   | `docker logout`            |
| `docker push <user>/<image>` | 📤 Push image to DockerHub | `docker push myuser/myapp` |

---

## 📄 SECTION 8: Dockerfile Related

| Command  | Description                  | Example                  |
| -------- | ---------------------------- | ------------------------ |
| `FROM`   | 📦 Base image                | `FROM node:18`           |
| `COPY`   | 📁 Copy files                | `COPY . /app`            |
| `RUN`    | 🔧 Execute command in build  | `RUN npm install`        |
| `CMD`    | 🚀 Default container command | `CMD ["node", "app.js"]` |
| `EXPOSE` | 🌐 Document exposed port     | `EXPOSE 3000`            |

---

## 🎯 Pro Tips

### **Container Naming**
```bash
# Always name your containers for easy management
docker run --name my-web-server -d nginx

# Remove by name instead of ID
docker rm my-web-server
```

### **Port Mapping Best Practices**
```bash
# Use specific host ports in development
docker run -p 3000:3000 myapp

# Use random host ports in production
docker run -P myapp
```

### **Volume Mounting**
```bash
# Mount current directory for development
docker run -v $(pwd):/app -w /app node:16 npm start

# Use named volumes for production data
docker run -v mydata:/var/lib/mysql mysql:8
```

### **Resource Limits**
```bash
# Limit memory and CPU usage
docker run --memory=512m --cpus=1.0 myapp

# Set memory and swap limits
docker run --memory=1g --memory-swap=2g myapp
```

## 🚀 Quick Reference Commands

### **Daily Operations**
```bash
# Start development environment
docker-compose up -d

# View logs
docker-compose logs -f

# Stop everything
docker-compose down

# Rebuild and restart
docker-compose up --build
```

### **Troubleshooting**
```bash
# Check container status
docker ps -a

# View container logs
docker logs <container_name>

# Inspect container details
docker inspect <container_name>

# Execute into running container
docker exec -it <container_name> /bin/bash
```

---

**Next Up**: [📦 Image Commands](./image-commands) →
