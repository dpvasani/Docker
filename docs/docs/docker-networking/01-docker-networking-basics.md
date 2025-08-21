---
id: docker-networking-basics
title: 🌐 01. Docker Networking Basics
sidebar_label: 01. Docker Networking Basics
---

# 🌐 Docker Networking A2Z – Masterclass for Developers & DevOps

Docker networking allows containers to communicate with each other, the host machine, and the external internet. This comprehensive guide covers everything you need to know about Docker networking.

---

## 📦 What is Docker Networking?

> 🧠 Docker networking allows **containers to communicate** with:

* Each other 📞
* The host machine 🖥️
* The external internet 🌍

Docker automatically creates networks and connects containers based on mode.

---

## 🧠 Key Terms

| Term        | Meaning                            | Emoji |
| ----------- | ---------------------------------- | ----- |
| **Network** | Virtual connection b/w containers  | 🛣️   |
| **Bridge**  | Default, isolated internal network | 🌉    |
| **Host**    | Shares host's network stack        | 🏠    |
| **None**    | No network access                  | 🚫    |
| **Overlay** | Cross-host communication (Swarm)   | 🕸️   |

---

## 🌉 Bridge Mode (Default)

> 🧱 **Bridge network** is like a **private switch** where containers talk to each other.

### 🧵 Created Automatically:

```bash
docker network ls
```

Look for: `bridge`

---

## 🛠 How it works:

* Containers get **private IPs** (like `172.17.0.x`)
* They **can access the internet** via NAT
* But **cannot be accessed from outside** without `-p` port mapping

---

### 🧪 Try it:

```bash
docker run -d --name container1 nginx
docker run -d --name container2 busybox sleep 9999

# Ping container1 from container2 by IP
docker exec -it container2 ping 172.17.0.x
```

❌ By default, they **can't talk by name** unless in **custom network**

---

## 🧱 Custom Bridge Network (Recommended)

> 🎯 Custom networks support **container name resolution (DNS)**!

---

### 📦 Create a custom bridge:

```bash
docker network create my-network
```

---

### 🚀 Launch containers into it:

```bash
docker run -d --name app1 --network my-network nginx
docker run -it --name app2 --network my-network busybox sh
```

Now, inside `app2`:

```bash
ping app1
```

✅ Works! 🎉 Containers can **ping by name**!

---

## ✅ Why Use Custom Bridge?

| Feature        | Benefit                                  |
| -------------- | ---------------------------------------- |
| 🧠 DNS         | Resolve container names                  |
| 🔒 Isolation   | Separate networks for different apps    |
| 🌐 Custom IPs  | Control IP address ranges               |
| 🔧 Advanced    | Custom drivers and options               |

---

## 🏠 Host Mode

> 🏠 **Host mode** shares the host's network stack directly.

### 🚀 Usage:

```bash
docker run --network host nginx
```

### ✅ Benefits:

* **Best performance** (no NAT overhead)
* **Direct access** to host ports
* **Real IP addresses**

### ❌ Drawbacks:

* **Port conflicts** with host services
* **Less isolation** from host
* **Security concerns**

---

## 🚫 None Mode

> 🚫 **None mode** gives containers no network access.

### 🚀 Usage:

```bash
docker run --network none alpine
```

### ✅ Use Cases:

* **Security-focused** containers
* **Offline processing** tasks
* **Testing** network isolation

---

## 🕸️ Overlay Networks

> 🕸️ **Overlay networks** enable cross-host communication in Docker Swarm.

### 🚀 Create overlay network:

```bash
docker network create -d overlay my-overlay
```

### ✅ Features:

* **Multi-host** communication
* **Service discovery** across hosts
* **Load balancing** built-in

---

## 🔧 Network Management Commands

### **List Networks**
```bash
# List all networks
docker network ls

# List with details
docker network ls --format "table {{.ID}}\t{{.Name}}\t{{.Driver}}\t{{.Scope}}"
```

### **Create Network**
```bash
# Basic custom bridge
docker network create my-network

# With custom subnet
docker network create --subnet=172.20.0.0/16 my-network

# With custom gateway
docker network create --subnet=172.20.0.0/16 --gateway=172.20.0.1 my-network
```

### **Inspect Network**
```bash
# Get network details
docker network inspect my-network

# Get specific information
docker network inspect -f '{{range .Containers}}{{.Name}} {{end}}' my-network
```

### **Remove Network**
```bash
# Remove unused network
docker network rm my-network

# Remove all unused networks
docker network prune
```

---

## 🌐 Container Network Operations

### **Connect Container to Network**
```bash
# Connect running container
docker network connect my-network container1

# Connect multiple containers
docker network connect my-network container1 container2
```

### **Disconnect Container from Network**
```bash
# Disconnect container
docker network disconnect my-network container1
```

### **Run Container with Network**
```bash
# Run with specific network
docker run -d --name app1 --network my-network nginx

# Run with multiple networks
docker run -d --name app1 --network my-network --network other-network nginx
```

---

## 🔍 Network Troubleshooting

### **Check Container Network**
```bash
# Inspect container network
docker inspect container1 | grep -A 20 "NetworkSettings"

# Get container IP
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' container1
```

### **Test Connectivity**
```bash
# Test ping between containers
docker exec container1 ping container2

# Test port connectivity
docker exec container1 nc -zv container2 80

# Test DNS resolution
docker exec container1 nslookup container2
```

### **Common Issues**
```bash
# Container can't reach internet
docker run --rm alpine ping google.com

# Port binding issues
docker run -p 8080:80 nginx

# Network conflicts
docker network prune
```

---

## 🎯 Real-World Examples

### **Web Application Stack**
```bash
# Create network for web app
docker network create webapp-network

# Run database
docker run -d --name db --network webapp-network \
  -e POSTGRES_PASSWORD=secret postgres:13

# Run web application
docker run -d --name webapp --network webapp-network \
  -p 3000:3000 -e DATABASE_URL=postgresql://db:5432/myapp myapp:latest
```

### **Microservices Architecture**
```bash
# Create network for microservices
docker network create microservices

# Run API service
docker run -d --name api --network microservices \
  -p 8000:8000 api-service:latest

# Run worker service
docker run -d --name worker --network microservices \
  worker-service:latest

# Run frontend
docker run -d --name frontend --network microservices \
  -p 3000:3000 frontend:latest
```

---

## 🔒 Security Considerations

### **Network Isolation**
```bash
# Separate networks for different environments
docker network create production-network
docker network create staging-network
docker network create development-network
```

### **Firewall Rules**
```bash
# Restrict network access
docker run --network none --cap-drop=NET_RAW alpine

# Use custom bridge with restricted access
docker network create --internal restricted-network
```

---

## 📚 What's Next?

Now that you understand Docker Networking basics, explore:
- **🌐 Advanced Networking** - Custom drivers and configurations
- **🔧 Network Troubleshooting** - Common issues and solutions
- **🕸️ Overlay Networks** - Multi-host communication
- **🔒 Network Security** - Best practices and hardening

---

**Next Up**: [🌐 Advanced Networking](./02-advanced-networking) →
