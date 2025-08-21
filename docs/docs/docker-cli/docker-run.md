---
id: docker-run
title: 🚀 Docker Run Command
sidebar_label: Docker Run
---

# 🚀 Docker Run Command

The `docker run` command is one of the most fundamental Docker commands. It creates and starts a new container from an image.

---

## 🔍 **What happens when you run `docker run ubuntu`?**

1. **Check for the Image Locally**:
   Docker first checks if the `ubuntu` image exists on your local machine.

   * If **not found**, Docker will **pull** the latest Ubuntu image from [Docker Hub](https://hub.docker.com/_/ubuntu) (official registry).
   * If **found**, it skips pulling and uses the local version.

2. **Create and Start a Container**:
   Docker creates a new **container instance** from the Ubuntu image and **runs the default command**.

   * The **default command** in the Ubuntu image is usually:

     ```bash
     CMD ["bash"]
     ```
   * But since you didn't pass `-it`, **you won't see an interactive shell**, and the container will likely **exit immediately** because there's nothing to keep it running.

---

## 🧠 So why does it exit immediately?

* Containers need a **foreground process** (like a shell or server).
* Without `-it`, the container runs `bash`, but since no input/output is attached, it just runs and **exits right away**.

---

## ✅ The Role of `-it` (Very Important!)

Here's what happens when you run:

```bash
docker run -it ubuntu
```

### 🧩 Breaking down `-it`:

| Flag | Full Form     | What it does                                                                                      |
| ---- | ------------- | ------------------------------------------------------------------------------------------------- |
| `-i` | --interactive | Keeps STDIN open, so you can **send input** (like typing into a shell).                           |
| `-t` | --tty         | Allocates a pseudo-TTY (like a terminal), so the output looks **human-readable** and interactive. |

🌀 **Together, `-it` means**:

* You get an **interactive terminal session** inside the container.
* It **attaches your keyboard and screen** to the container's terminal.

### ✅ Example with `-it`:

```bash
docker run -it ubuntu
```

* This will:

  * Pull Ubuntu image if not already present.
  * Create a container.
  * Run the default shell (`bash`) in interactive mode.
  * Give you a terminal prompt like:

    ```bash
    root@a1b2c3d4e5:/#
    ```

---

## 🧪 You can also run specific commands:

```bash
docker run -it ubuntu bash
```

* Explicitly tells Docker to run `bash` shell interactively.
* Useful if you want to ensure you're in a shell and not relying on image defaults.

---

## 🛠 Other Common `docker run` Flags:

| Flag     | Purpose                                                |
| -------- | ------------------------------------------------------ |
| `--rm`   | Automatically remove the container when it exits.      |
| `-d`     | Run container in detached mode (in the background).    |
| `-p`     | Publish container port to host (e.g., `-p 8080:80`).   |
| `--name` | Give the container a specific name.                    |
| `-v`     | Mount volumes (e.g., `-v /host/path:/container/path`). |

---

## 📦 Summary:

| Command                           | What it does                                                              |
| --------------------------------- | ------------------------------------------------------------------------- |
| `docker run ubuntu`               | Runs Ubuntu container with default CMD, but exits immediately (no `-it`). |
| `docker run -it ubuntu`           | Launches Ubuntu in an interactive terminal (`bash`).                      |
| `docker run -it ubuntu bash`      | Explicitly runs `bash` interactively.                                     |
| `docker run -it --rm ubuntu bash` | Interactive session that cleans up the container after exit.              |

---

## 🎯 Practical Examples

### **Basic Container Execution**
```bash
# Run a simple command
docker run ubuntu echo "Hello, Docker!"

# Run with interactive shell
docker run -it ubuntu bash

# Run in background
docker run -d nginx
```

### **Port Mapping**
```bash
# Map host port 8080 to container port 80
docker run -p 8080:80 nginx

# Map multiple ports
docker run -p 8080:80 -p 3000:3000 myapp
```

### **Volume Mounting**
```bash
# Mount current directory to container
docker run -v $(pwd):/app ubuntu ls /app

# Use named volume
docker run -v mydata:/data ubuntu
```

### **Environment Variables**
```bash
# Set environment variable
docker run -e DEBUG=true myapp

# Use .env file
docker run --env-file .env myapp
```

---

## 🚨 Common Mistakes

### **1. Forgetting `-it` for Interactive Sessions**
```bash
# ❌ Wrong - will exit immediately
docker run ubuntu

# ✅ Correct - interactive session
docker run -it ubuntu
```

### **2. Not Specifying Port Mapping**
```bash
# ❌ Wrong - container port not accessible from host
docker run nginx

# ✅ Correct - port mapped to host
docker run -p 8080:80 nginx
```

### **3. Not Cleaning Up Containers**
```bash
# ❌ Wrong - container remains after exit
docker run ubuntu echo "hello"

# ✅ Correct - container removed after exit
docker run --rm ubuntu echo "hello"
```

---

## 🔧 Advanced Usage

### **Resource Limits**
```bash
# Limit memory usage
docker run --memory=512m ubuntu

# Limit CPU usage
docker run --cpus=1.0 ubuntu

# Set memory and swap limits
docker run --memory=1g --memory-swap=2g ubuntu
```

### **Network Configuration**
```bash
# Use specific network
docker run --network=mynetwork ubuntu

# Use host network
docker run --network=host ubuntu
```

### **User and Group**
```bash
# Run as specific user
docker run --user=1000:1000 ubuntu

# Run as root (default)
docker run --user=root ubuntu
```

---

## 📚 What's Next?

Now that you understand `docker run`, explore:
- **🐳 Container Lifecycle** - Start, stop, restart containers
- **📦 Image Commands** - Pull, build, and manage images
- **🌐 Networking** - Connect containers to networks
- **💾 Volumes** - Persistent data storage

---

**Next Up**: [🐳 Container Lifecycle](./container-lifecycle) →
