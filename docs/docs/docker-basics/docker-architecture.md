---
id: docker-architecture
title: 🏗️ Docker Architecture
sidebar_label: Docker Architecture
---

# 🏗️ Docker Architecture

Understanding Docker's architecture is crucial for mastering containerization. Let's explore how Docker works under the hood.

---

## 🏛️ High-Level Architecture

Docker follows a **client-server architecture** with these main components:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Docker CLI    │    │   Docker Daemon  │    │   Docker Hub    │
│   (Client)      │◄──►│   (Server)       │◄──►│   (Registry)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
        │                       │
        │                       │
        ▼                       ▼
┌─────────────────┐    ┌──────────────────┐
│   Images        │    │   Containers     │
│   (Templates)   │    │   (Running Apps) │
└─────────────────┘    └──────────────────┘
```

---

## 🔧 Core Components

### **1. Docker Client (CLI)**
- **Purpose**: Command-line interface for users
- **Function**: Sends commands to Docker daemon
- **Location**: Runs on your local machine

```bash
# Examples of CLI commands
docker run nginx
docker build -t myapp .
docker ps
```

### **2. Docker Daemon**
- **Purpose**: Background service that manages Docker objects
- **Function**: Listens for Docker API requests
- **Location**: Runs on the host system

**What it manages:**
- 🐳 Containers
- 📦 Images
- 🌐 Networks
- 💾 Volumes
- 🔗 Plugins

### **3. Docker Registry**
- **Purpose**: Stores and distributes Docker images
- **Examples**: Docker Hub, AWS ECR, Google Container Registry
- **Function**: Image repository and distribution

---

## 🐳 Docker Objects

### **Images** 📦
- **Definition**: Read-only templates with instructions
- **Purpose**: Create containers
- **Storage**: Local Docker storage or registry

```bash
# Image layers example
┌─────────────────┐
│   Application   │ ← Your app code
├─────────────────┤
│   Dependencies  │ ← npm packages, libraries
├─────────────────┤
│   Runtime       │ ← Node.js, Python, etc.
├─────────────────┤
│   OS Base       │ ← Ubuntu, Alpine, etc.
└─────────────────┘
```

### **Containers** 🐳
- **Definition**: Running instances of images
- **Purpose**: Execute applications
- **Lifecycle**: Create → Start → Stop → Delete

### **Networks** 🌐
- **Purpose**: Enable container communication
- **Types**: Bridge, Host, None, Custom
- **Function**: Isolated network environments

### **Volumes** 💾
- **Purpose**: Persistent data storage
- **Types**: Named volumes, bind mounts, tmpfs
- **Function**: Data persistence across containers

---

## 🔄 How Docker Works

### **1. Image Building Process**
```bash
# When you run: docker build -t myapp .
```

1. **Build Context**: Docker reads files from current directory
2. **Dockerfile Parsing**: Processes each instruction sequentially
3. **Layer Creation**: Each instruction creates a new layer
4. **Image Assembly**: Combines all layers into final image

### **2. Container Creation Process**
```bash
# When you run: docker run nginx
```

1. **Image Pull**: Downloads image if not locally available
2. **Container Creation**: Creates writable container layer
3. **Network Setup**: Assigns network interface
4. **Process Start**: Executes the specified command

### **3. Container Runtime**
```
┌─────────────────────────────────────────┐
│              Host OS                    │
├─────────────────────────────────────────┤
│           Docker Engine                 │
├─────────────────────────────────────────┤
│  Container 1  │  Container 2  │  ...  │
│  (Process)    │  (Process)    │       │
└─────────────────────────────────────────┘
```

---

## 🏗️ Namespace Isolation

Docker uses Linux namespaces to provide isolation:

### **PID Namespace**
- **Purpose**: Process isolation
- **Effect**: Container sees only its own processes
- **Example**: Container can't see host processes

### **Network Namespace**
- **Purpose**: Network isolation
- **Effect**: Container has its own network interface
- **Example**: Container can't access host network directly

### **Mount Namespace**
- **Purpose**: Filesystem isolation
- **Effect**: Container has isolated view of filesystem
- **Example**: Container can't see host files (unless mounted)

### **UTS Namespace**
- **Purpose**: Hostname isolation
- **Effect**: Container can have different hostname
- **Example**: Container hostname independent of host

---

## 🔒 Control Groups (cgroups)

Docker uses cgroups to limit and monitor resource usage:

### **Resource Limits**
```bash
# Memory limit
docker run --memory=512m nginx

# CPU limit
docker run --cpus=1.0 nginx

# Disk I/O limit
docker run --device-read-bps=/dev/sda:1mb nginx
```

### **Resource Monitoring**
```bash
# View container resource usage
docker stats

# Output example:
# CONTAINER ID   CPU %   MEM USAGE / LIMIT   MEM %   NET I/O   BLOCK I/O
# abc123def45    0.00%   2.5MiB / 512MiB     0.49%   0B / 0B   0B / 0B
```

---

## 🌐 Docker Networking

### **Default Bridge Network**
```
┌─────────────────────────────────────────┐
│              Host Machine               │
├─────────────────────────────────────────┤
│           Docker Bridge                │
│         (172.17.0.0/16)               │
├─────────────────────────────────────────┤
│  Container 1  │  Container 2  │  ...  │
│  172.17.0.2   │  172.17.0.3   │       │
└─────────────────────────────────────────┘
```

### **Custom Networks**
```bash
# Create custom network
docker network create mynetwork

# Run container on custom network
docker run --network=mynetwork nginx
```

---

## 💾 Storage Drivers

Docker supports different storage drivers for managing image layers:

### **Overlay2 (Default)**
- **Best for**: Most use cases
- **Performance**: Good
- **Compatibility**: Linux kernel 4.0+

### **AUFS**
- **Best for**: Older systems
- **Performance**: Good
- **Compatibility**: Limited

### **Device Mapper**
- **Best for**: Production environments
- **Performance**: Good
- **Compatibility**: RHEL/CentOS

---

## 🔍 Docker API

Docker provides a REST API for programmatic access:

### **API Endpoints**
```bash
# List containers
GET /containers/json

# Create container
POST /containers/create

# Start container
POST /containers/{id}/start

# Stop container
POST /containers/{id}/stop
```

### **API Usage**
```bash
# Enable API access
dockerd -H tcp://0.0.0.0:2375

# Use API from client
docker -H tcp://host:2375 ps
```

---

## 🚀 Performance Considerations

### **Image Optimization**
- **Multi-stage builds**: Reduce final image size
- **Layer caching**: Optimize build times
- **Base image selection**: Choose minimal images

### **Container Performance**
- **Resource limits**: Prevent resource exhaustion
- **Volume mounting**: Optimize I/O performance
- **Network configuration**: Minimize latency

---

## 🆘 Troubleshooting Architecture Issues

### **Common Problems**

1. **Daemon Not Responding**
   ```bash
   # Check daemon status
   sudo systemctl status docker
   
   # Restart daemon
   sudo systemctl restart docker
   ```

2. **Storage Space Issues**
   ```bash
   # Check Docker storage usage
   docker system df
   
   # Clean up unused resources
   docker system prune
   ```

3. **Network Connectivity**
   ```bash
   # Check network configuration
   docker network ls
   
   # Inspect network details
   docker network inspect bridge
   ```

---

## 📚 What's Next?

Now that you understand Docker architecture, explore:
- **📦 Containers vs VMs** - Detailed comparison
- **🌐 Docker Hub** - Image registry and distribution
- **🔧 Docker CLI Commands** - Practical usage
- **📝 Dockerfiles** - Building custom images

---

**Next Up**: [📦 Containers vs Virtual Machines](./containers-vs-vms) →
