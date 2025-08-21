---
title: 02. Advanced Networking
sidebar_label: 02. Advanced Networking
slug: /docker-networking/02-advanced-networking
---

## Custom Bridge with Subnet
```bash
# Create network with custom subnet/gateway
docker network create \
  --driver bridge \
  --subnet 172.25.0.0/16 \
  --gateway 172.25.0.1 \
  app-net
```

## Internal Networks (No Egress)
```bash
docker network create --internal private-net
```
Containers on `private-net` cannot reach the internet.

## DNS Options
```bash
docker run --dns 1.1.1.1 --dns-search svc.local nginx:alpine
```

## Macvlan (Direct L2 Attachment)
```bash
# Parent NIC = eth0
ip link add link eth0 name macvlan0 type macvlan mode bridge
ip addr add 192.168.1.10/24 dev macvlan0
ip link set macvlan0 up

docker network create -d macvlan \
  --subnet=192.168.1.0/24 \
  --gateway=192.168.1.1 \
  -o parent=eth0 macvlan-net

docker run --network macvlan-net --ip 192.168.1.50 nginx
```

## Host Networking
- Pros: lowest latency, no NAT.
- Cons: port conflicts, fewer isolation guarantees.

## Overlay (Swarm)
- Multi-host networking with built-in service discovery and load balancing.
- Requires Swarm mode; consider Kubernetes CNI in k8s environments.

## Troubleshooting
```bash
# Show conntrack/iptables (Linux)
sudo iptables -t nat -L -n -v

# Inspect container networks
docker inspect -f '{{json .NetworkSettings}}' container | jq

# Test DNS within network
docker exec -it app getent hosts db
```
