<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/user-attachments/assets/48bcaf97-1ebe-4050-ac4f-706d699a3ba8" />
    <source media="(prefers-color-scheme: light)" srcset="https://github.com/user-attachments/assets/138ff2fa-f7f9-4b0e-90c5-4d058890cea2" />
    <img width="350" alt="NextHire Logo" src="https://github.com/user-attachments/assets/2bffa3ca-69b6-4375-9211-9da097f70f5a" />
  </picture>
</p>

---

<p align="center">
  <a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT License"/></a>
  <a href="https://www.docker.com/"><img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white" alt="Docker"/></a>
  <a href="https://jestjs.io/"><img src="https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white" alt="Jest"/></a>
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js"/></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js"/></a>
  <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" alt="Express"/></a>
  <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white" /></a>
  <a href="https://fastapi.tiangolo.com/"><img src="https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white" alt="FastAPI"/></a>
  <a href="https://redis.io/"><img src="https://img.shields.io/badge/Redis-DC382D?style=flat-square&logo=redis&logoColor=white" alt="Redis"/></a>
  <a href="https://socket.io/"><img src="https://img.shields.io/badge/Socket.io-010101?style=flat-square&logo=socket.io&logoColor=white" alt="Socket.IO"/></a>
  <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white" alt="Python"/></a>
  <a href="https://www.rabbitmq.com/"><img src="https://img.shields.io/badge/RabbitMQ-FF6600?style=flat-square&logo=rabbitmq&logoColor=white" alt="RabbitMQ"/></a>
</p>

<p align="center">
  NextHire is a modern job platform designed to make recruitment more secure, transparent, and fair.
</p>

---

## 📌 About the Project

**NextHire** is a comprehensive job platform designed to make the recruitment process more secure, transparent, and fair.

Traditional job platforms often keep listings open for months, sometimes for promotion or audience growth, and volunteer-based or inactive postings can clutter candidate dashboards unnecessarily. NextHire addresses these issues by providing a centralized system where employers can post jobs, candidates can apply, and all interactions are managed efficiently.

The platform supports **role-based access** (Candidate, Employer, Admin), **smart job filtering**, **resume uploads**, **application tracking**, and a **subscription system**, ensuring that both candidates and employers have a smooth and reliable experience.

---

## 🌟 Features

### ✅ Current Features
- Role-based authentication (Candidate, Employer, Admin)
- Smart filtering & featured job listings
- Resume upload & application system
- Subscription system
- Dashboard
- Real-time communication via Socket.IO
- AI-powered features via Python microservice
- Asynchronous job processing with RabbitMQ + Pika
- Redis-based caching and session management

### 🚀 Planned Features
- AI integration (expanded)
- Company scores (based on candidate feedback)
- Smart job recommendations
- Transparent interview flow
- Mobile App (iOS & Android after web release)

---

## ⚙️ Technologies Used

### 🎨 Frontend
- **React 19.2.3**
- **Next.js 16.1.6 (App Router + Turbopack)**
- **TypeScript 5.8.2**
- **Tailwind CSS 4** + **SCSS**
- **Redux Toolkit + RTK Query**
- **Material UI (MUI)**
- **React Hook Form + Zod**
- **Axios**
- **Framer Motion**
- **React Hot Toast**
- **Lottie Animations**
- **Swiper**
- **React Icons**
- **DayJS**
- **Socket.IO Client** – Real-time bidirectional communication
- **Jest + React Testing Library**

### ⚙️ Backend
- **Node.js**
- **Express.js 5**
- **TypeScript**
- **MongoDB**
- **Socket.IO** – Real-time event-driven communication
- **Redis** – Caching & session management
- **RabbitMQ** – Message broker for async task queuing
- **Nodemon**
- **CORS**
- **Dotenv**
- **Helmet** – Security headers for HTTP
- **ESLint + Prettier**

### 🤖 AI Service

NextHire includes a Python-based AI service responsible for asynchronous AI workloads.

Currently, the service supports chat interactions. Future updates will expand its capabilities to include:

- Resume analysis
- Candidate scoring
- Job matching
- AI-powered recommendations

Technologies:

- Python
- Pika (RabbitMQ client)
- RabbitMQ
- FastAPI *(API layer – planned)*
- Uvicorn *(ASGI server – planned)*

### 🐳 DevOps
- **Docker**
- **Docker Compose (Development Environment)**
- **RedisInsight** – Redis GUI for development

---

## 🏗️ System Architecture

NextHire follows a **microservice-oriented architecture** with asynchronous task processing using RabbitMQ and background workers.

The system separates real-time user operations from heavy processing tasks such as AI analysis and background jobs.

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                    │
│              Next.js 16 + Socket.IO Client              │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP / WebSocket
┌──────────────────────────▼──────────────────────────────┐
│                BACKEND (Node.js / Express 5)            │
│         REST API + Socket.IO + RabbitMQ Producer        │
│                    Redis Cache Layer                    │
└──────────┬─────────────────────────────┬────────────────┘
           │ AMQP (RabbitMQ)             │ AMQP (RabbitMQ)
┌──────────▼──────────┐     ┌────────────▼─────────────────┐
│   Node.js Worker    │     │     AI Service (Python)      │
│  (RabbitMQ Consumer)│     │   Pika LLM Consumer Worker   │
└─────────────────────┘     └──────────────────────────────┘
           │
┌──────────▼──────────┐
│  MongoDB Atlas      │
│  (Cloud Database)   │
└─────────────────────┘
```

---

# 🚀 Getting Started (Docker Development)

## 🐳 Development Environment (Recommended)

NextHire uses **Docker Compose** for backend development.

> ⚠️ The frontend (Next.js) is intentionally **NOT containerized** for development.
>
> The Next.js team recommends running it locally for better performance and faster HMR (Hot Module Replacement).
>
> 🔗 Reference:
> <a href="https://nextjs.org/docs/app/guides/local-development#1-check-your-computers-antivirus" target="_blank">
> Next.js Local Development Recommendation
> </a>

---

> 🗄️ **MongoDB is also NOT containerized.**
>
> The project uses **MongoDB Atlas (Cloud Database)** instead of a local Docker MongoDB instance.
>
> This ensures:
> - Better alignment with production infrastructure
> - No need for local database setup
> - Cloud scalability and monitoring support

---

> ℹ️ Make sure Docker Desktop is running before executing the commands.

## 🐳 Docker Services Overview

| Service        | Technology              | Port(s)        | Description                          |
|----------------|-------------------------|----------------|--------------------------------------|
| `backend`      | Node.js + Express       | `5000`         | REST API + Socket.IO server          |
| `worker`       | Node.js (ts-node)       | —              | RabbitMQ consumer for backend tasks  |
| `ai-service`   | Python                  | —              | Python AI processing service         |
| `ai-worker`    | Python + Pika           | —              | Python RabbitMQ consumer for AI tasks|
| `rabbitmq`     | RabbitMQ 3 Management   | `5672` `15672` | Message broker + management UI       |
| `redis`        | Redis Latest            | `6379`         | Cache & session store                |
| `redisinsight` | RedisInsight            | `5540`         | Redis GUI for development            |

---

## 1️⃣ Clone Repository

```bash
git clone https://github.com/omercikan/nexthire-job-platform.git
cd nexthire-job-platform
```

## 2️⃣ Start Backend Services with Docker

### This will start:

- Backend API (Node.js + Express + Socket.IO)
- Node.js Worker (RabbitMQ Consumer)
- AI Service (Python + Pika RabbitMQ Consumer)
- AI Worker (Python + Pika RabbitMQ Consumer)
- RabbitMQ (Message Broker with Management UI)
- Redis (Cache)
- RedisInsight (Redis GUI)

### Run in attached mode

```bash
docker compose -f docker-compose.dev.yml up --build
```

### Run in detached mode (recommended)

```bash
docker compose -f docker-compose.dev.yml up --build -d
```

### 📜 View Logs

```bash
docker compose -f docker-compose.dev.yml logs -f
```

### 🛑 Stop Services

```bash
docker compose -f docker-compose.dev.yml down
```

### ♻️ Full Reset (Remove volumes)

```bash
docker compose -f docker-compose.dev.yml down -v
```

## 3️⃣ Run Frontend Locally

```bash
cd frontend
npm install
npm run dev
```

> Frontend runs locally for optimal development performance

## 🔗 Service URLs (Development)

| Service              | URL                                    |
|----------------------|----------------------------------------|
| Frontend (Next.js)   | http://localhost:3000                  |
| Backend API          | http://localhost:5000                  |
| RabbitMQ Management  | http://localhost:15672                 |
| RedisInsight         | http://localhost:5540                  |

> RabbitMQ Management credentials: `nexthire` / `nexthire`

## 📂 Project Structure

```
nexthire-job-platform
│
├── frontend
│   ├── app                    # Next.js App Router pages
│   ├── features               # Feature-based UI modules
│   ├── shared                 # Shared components, hooks, utils
│   ├── public                 # Static assets
│   ├── Dockerfile             # Production container config
│   └── package.json
│
├── backend
│   ├── src
│   │   ├── features           # Domain-based modules (auth, jobs, users, etc.)
│   │   ├── queues             # RabbitMQ producers / consumers
│   │   │
│   │   └── shared
│   │   |   ├── middlewares    # Express middlewares
│   │   |   ├── models         # Mongoose models
│   │   |   ├── services       # Shared business services
│   │   |   ├── utils          # Helper utilities
│   │   |   └── config         # App configuration
│   │   |
│   │   └── server.ts
│   │
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   └── package.json
│
├── ai-service
│   ├── app
│   │   ├── workers            # RabbitMQ consumers for AI tasks
│   │   ├── services           # AI processing logic
│   │   └── main.py
│   │
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   └── requirements.txt
│
├── docker-compose.dev.yml     # Development environment
├── README.md
└── LICENSE
```
---

## 🧠 Architecture Note

### The development environment is intentionally hybrid:

- **Backend (Node.js)** → Dockerized
- **AI Service (Python/FastAPI)** → Dockerized
- **Workers (Node.js + Python)** → Dockerized
- **RabbitMQ + Redis** → Dockerized
- **Frontend (Next.js)** → Local development

> This setup ensures optimal developer experience, faster hot reload, and better performance for the frontend.

---

### 📦 Available Scripts

#### Frontend

```bash
npm run dev          # Start development server
npm run build        # Generate a production build
npm start            # Start production server
npm run lint         # Lint codebase
npm run test         # Run tests using Jest
npm run test:watch   # Run tests in watch mode
npm run type-check   # Run TypeScript type checking
```

#### Backend

```bash
npm run dev      # Start development with nodemon
npm run build    # Compile TypeScript
npm start        # Start production server
npm run lint     # Run ESLint checks
```

#### AI Service

```bash
python -m app.workers.llm_consumer  # Start RabbitMQ LLM consumer worker
```

---

## Issues

If you encounter any bugs or have feature requests, please open an issue on the [GitHub Issues page](https://github.com/omercikan/nexthire-job-platform/issues).

## Security

Please see the [Security Policy](SECURITY.md) for details on reporting vulnerabilities.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
