# Replicafs

Replicafs is a distributed file storage backend prototype built using Node.js, Express, Redis, BullMQ, and asynchronous worker pipelines.

The project demonstrates how modern distributed storage systems process large files using chunk-based architectures, asynchronous queues, replication strategies, and recovery mechanisms.

---

# Features

- File upload API
- Chunk-based file splitting
- Redis-backed asynchronous queue processing
- BullMQ worker orchestration
- Distributed chunk replication across storage nodes
- Metadata persistence for chunk tracking
- Fault recovery mechanism for missing replicas
- Retry handling with exponential backoff
- Modular backend architecture using routes, controllers, and services

---

# Tech Stack

- Node.js
- Express.js
- Redis
- BullMQ
- Docker
- JavaScript

---

# System Architecture

```text
Client
   ↓
Express API
   ↓
Redis Queue
   ↓
BullMQ Workers
   ↓
Chunk Processing
   ↓
Replica Storage (nodeA / nodeB)
   ↓
Metadata Persistence
