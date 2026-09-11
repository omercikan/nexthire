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
  <a href="https://spring.io/projects/spring-boot"><img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white" alt="Spring Boot"/></a>
  <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" alt="PostgreSQL"/></a>
  <a href="https://firebase.google.com/"><img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black" alt="Firebase"/></a>
</p>

<p align="center">
  NextHire is a modern job platform designed to make recruitment more secure, transparent, and fair.
</p>

---

## 📌 About the Project

**NextHire** is a comprehensive job platform (Turkish market, UI in Turkish) designed to make the recruitment process more secure, transparent, and fair.

Traditional job platforms often keep listings open for months, sometimes for promotion or audience growth, and volunteer-based or inactive postings can clutter candidate dashboards unnecessarily. NextHire addresses these issues by providing a centralized system where employers can post jobs, candidates can apply, and all interactions are managed efficiently.

The platform supports **role-based access** (Candidate, Employer), **smart job filtering & favorites**, **resume uploads**, **end-to-end application & interview tracking**, and a **built-in AI career assistant**, ensuring that both candidates and employers have a smooth and reliable experience.

The system is evolving from a two-service (backend + AI) setup into a **microservice architecture**: a dedicated **Identity Service** (Java/Spring Boot) is currently being built out alongside the existing Node.js backend to own authentication and identity concerns going forward (see [Identity Service](#-identity-service-in-progress) below).

---

## 🌟 Features

### ✅ Current Features
- Role-based authentication (Candidate, Employer) with JWT access/refresh tokens stored in HTTP-only cookies
- Google sign-in (NextAuth + Google OAuth) that auto-registers candidates on the backend
- Smart job filtering, favorites, and featured job listings
- Job detail pages with an embedded location map (Leaflet)
- Resume upload/replace/delete (Cloudinary storage) and application tracking
- Employer dashboard: job posting, applicant management, interview scheduling with automated email notifications, and stats overview
- Candidate dashboard: profile management, resume management, application overview
- OTP-based email verification & password reset
- Real-time updates via Socket.IO
- AI career assistant (chat widget with file upload) backed by a Python/FastAPI microservice, with a two-layer guard (keyword filter + LLM intent classification) that keeps the assistant on job/career topics
- Asynchronous processing with RabbitMQ (emails, resume/photo cleanup, interview notifications, AI chat) consumed by dedicated Node.js and Python workers
- Redis-based caching
- Newsletter subscription, blog content, and featured companies served via Firebase/Firestore
- CI/CD pipeline (GitHub Actions) that builds and publishes Docker images for frontend, backend, and AI service

### 🧪 In Progress
- **Identity Service** — standalone Spring Boot microservice (own PostgreSQL database) for auth/identity, publishing `candidate.created` / `employer.created` events over RabbitMQ. It is not yet wired into the Node.js backend or frontend, and is not part of the production Docker Compose / CI pipeline yet.

### 🚀 Planned Features
- Wiring the Identity Service into the rest of the platform (backend event consumers, frontend calls) and retiring the duplicated auth logic in the Node backend
- Company scores (based on candidate feedback)
- Smart, AI-driven job recommendations
- Transparent interview flow
- Mobile App (iOS & Android after web release)

---

## ⚙️ Technologies Used

### 🎨 Frontend
- **React 19.2.8**
- **Next.js 16.3.4 (App Router + Turbopack)**
- **TypeScript 5.8.2**
- **Tailwind CSS 4** + **SCSS**
- **Redux Toolkit + React Redux**
- **Material UI (MUI)** + **MUI X Charts**
- **React Hook Form + Zod** (+ Formik/Yup used in some legacy forms)
- **NextAuth** – Google OAuth sign-in
- **Firebase (Auth/Firestore)** – blogs, featured companies, newsletter subscriptions
- **Axios**
- **Leaflet + React-Leaflet** – job location maps
- **pdfjs-dist** – in-browser resume/CV preview
- **Framer Motion**
- **React Hot Toast**
- **Lottie Animations**
- **Swiper**
- **React Icons**
- **DayJS**
- **EmailJS**
- **Socket.IO Client** – Real-time bidirectional communication
- **Jest + React Testing Library**

### ⚙️ Backend
- **Node.js**
- **Express.js 5**
- **TypeScript**
- **MongoDB (Mongoose)**
- **Socket.IO** – Real-time event-driven communication
- **Redis (ioredis)** – Caching & session management
- **RabbitMQ (amqplib)** – Message broker for async task queuing, consumed by dedicated worker processes
- **JWT + bcrypt** – Authentication (access/refresh tokens)
- **Cloudinary + Multer** – Resume/photo storage
- **Nodemailer + express-handlebars** – Templated transactional emails (OTP, interview notifications)
- **Winston** – Logging
- **Zod** – Validation
- **express-rate-limit + Helmet** – API hardening
- **ESLint + Prettier**

### 🆔 Identity Service (in progress)

A standalone microservice under `services/identity-service`, intended to own authentication/identity going forward and gradually replace the auth logic currently living in the Node backend.

- **Java 26**
- **Spring Boot 4.1** (Web, Security, Validation, Data JPA, Spring Cloud OpenFeign)
- **PostgreSQL** – dedicated identity database
- **JJWT** – JWT issuing/parsing
- **Spring AMQP** – publishes `candidate.created` / `employer.created` events to RabbitMQ
- **Maven**

### 🤖 AI Service

NextHire includes a Python/FastAPI AI service responsible for the AI career-assistant chat.

It exposes a synchronous REST endpoint (`POST /api/v1/ai/ask`) and also consumes chat requests asynchronously from RabbitMQ, pushing responses back to the frontend in real time via the backend's Socket.IO layer. A two-layer guard (keyword pre-filter + LLM-based intent classification) keeps the assistant scoped to job/career topics.

Future updates will expand its capabilities to include:

- Resume analysis
- Candidate scoring
- Job matching
- AI-powered recommendations

Technologies:

- Python 3.11
- FastAPI + Uvicorn (served via Gunicorn in production)
- OpenAI SDK (pointed at an OpenAI-compatible LLM router; model: `moonshotai/Kimi-K2-Instruct-0905`)
- Tenacity – retry handling for LLM calls
- Pika (RabbitMQ client)

### 🐳 DevOps
- **Docker**
- **Docker Compose** (development & production environments)
- **GitHub Actions** – CI/CD, builds and pushes Docker images for frontend, backend, and AI service
- **Dependabot** – automated dependency updates
- **RedisInsight** – Redis GUI for development

---

## 🏗️ System Architecture

NextHire follows a **microservice-oriented architecture** with asynchronous task processing using RabbitMQ and background workers.

The system separates real-time user operations from heavy processing tasks such as AI analysis and background jobs. A dedicated **Identity Service** (Java/Spring Boot) is being introduced alongside the Node.js backend; it currently runs independently with its own PostgreSQL database and publishes identity events to RabbitMQ, ahead of being wired into the rest of the system.

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT (Browser)                    │
│              Next.js 16 + Socket.IO Client               │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP / WebSocket
┌──────────────────────────▼──────────────────────────────┐
│                BACKEND (Node.js / Express 5)            │
│         REST API + Socket.IO + RabbitMQ Producer        │
│                    Redis Cache Layer                     │
└──────────┬─────────────────────────────┬────────────────┘
           │ AMQP (RabbitMQ)             │ AMQP (RabbitMQ)
┌──────────▼──────────┐     ┌────────────▼─────────────────┐
│   Node.js Worker    │     │     AI Service (Python)      │
│  (RabbitMQ Consumer)│     │  FastAPI + Pika LLM Worker   │
└─────────────────────┘     └──────────────────────────────┘
           │
┌──────────▼──────────┐
│  MongoDB Atlas      │
│  (Cloud Database)   │
└─────────────────────┘

┌─────────────────────────────────────────────────────────┐
│         IDENTITY SERVICE (Java / Spring Boot)            │
│     Auth REST API + RabbitMQ Producer (own DB)           │
│              ── standalone, in progress ──               │
└──────────────────────────┬──────────────────────────────┘
                           │
                ┌──────────▼──────────┐
                │  PostgreSQL         │
                │  (identity_db)      │
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

| Service           | Technology              | Port(s)        | Description                              |
|--------------------|-------------------------|----------------|-------------------------------------------|
| `identity-service` | Java + Spring Boot      | `8081`         | Standalone auth/identity microservice (in progress) |
| `identity-db`      | PostgreSQL 16           | `5435`         | Database for `identity-service`           |
| `backend`          | Node.js + Express       | `5000`         | REST API + Socket.IO server               |
| `worker`           | Node.js (ts-node)       | —              | RabbitMQ consumer for backend tasks       |
| `ai-service`       | Python + FastAPI        | `8000`         | AI processing service (REST + async)      |
| `ai-worker`        | Python + Pika           | —              | Python RabbitMQ consumer for AI chat      |
| `rabbitmq`         | RabbitMQ 4 Management   | `5672` `15672` | Message broker + management UI            |
| `redis`            | Redis Latest            | `6379`         | Cache & session store                     |
| `redisinsight`     | RedisInsight            | `5540`         | Redis GUI for development                 |

> ℹ️ `identity-service` and `identity-db` run in the development Compose file but are **not yet integrated** with the backend/frontend, and are **not yet part of the production Compose file or CI pipeline**.

---

## 1️⃣ Clone Repository

```bash
git clone https://github.com/omercikan/nexthire-job-platform.git
cd nexthire-job-platform
```

## 2️⃣ Configure Environment Variables

The Docker Compose setup expects env files that are not committed to the repo:

- `backend/.env.dev` – backend environment variables
- `ai-service/.env` – AI service environment variables (LLM provider `BASE_URL` / `HF_TOKEN`, `RABBITMQ_URL`, etc.)
- Root `.env` (or exported shell vars) for the Identity Service and its database: `IDENTITY_DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `JWT_SECRET`

Create these based on what each service reads from `process.env` / `getenv()` before starting Docker Compose.

## 3️⃣ Start Backend Services with Docker

### This will start:

- Identity Service (Java/Spring Boot) + its PostgreSQL database — **standalone, not yet wired into the rest of the app**
- Backend API (Node.js + Express + Socket.IO)
- Node.js Worker (RabbitMQ Consumer)
- AI Service (Python/FastAPI)
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

## 4️⃣ Run Frontend Locally

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
| Identity Service     | http://localhost:8081                  |
| AI Service           | http://localhost:8000                  |
| RabbitMQ Management  | http://localhost:15672                 |
| RedisInsight         | http://localhost:5540                  |

> RabbitMQ Management credentials: `nexthire` / `nexthire`

## 📂 Project Structure

```
nexthire-job-platform
│
├── frontend
│   ├── app                    # Next.js App Router pages (routes are in Turkish)
│   ├── features               # Feature-based UI modules (auth, jobs, dashboard, chat, home, job-detail)
│   ├── shared                 # Shared components, hooks, utils, Redux slices
│   ├── public                 # Static assets
│   ├── Dockerfile             # Production container config
│   └── package.json
│
├── backend
│   ├── src
│   │   ├── features           # Domain-based modules (auth, dashboard, jobs, users)
│   │   │   ├── auth            # Candidate/employer register+login, Google auth, OTP, password reset
│   │   │   ├── dashboard       # Candidate & employer dashboards (profile, resumes, jobs, applicants, interviews)
│   │   │   └── jobs            # Job listings, filters, favorites, applications
│   │   ├── queues             # RabbitMQ producers / consumers (email, resume/photo cleanup, interviews, AI chat)
│   │   │
│   │   └── shared
│   │   |   ├── middlewares    # Express middlewares (auth, role, rate limiting, validation)
│   │   |   ├── models         # Mongoose models (User, Job, Application, Resume, Interviews, Otp, ...)
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
│   │   ├── api/v1              # FastAPI routers (chat "ask" endpoint)
│   │   ├── core                # Configuration
│   │   ├── services             # LLM client, guard/intent filtering, RabbitMQ client
│   │   ├── workers              # RabbitMQ consumer for async AI chat
│   │   └── main.py
│   │
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   └── requirements.txt
│
├── services
│   └── identity-service        # Java/Spring Boot auth microservice (in progress, standalone)
│       ├── src/main/java/com/nexthire/identity
│       │   ├── config           # Security & password config
│       │   ├── controller       # AuthController (login/register/logout/refresh)
│       │   ├── service          # Auth, JWT, refresh-token services
│       │   ├── entity           # Identity, RefreshToken (JPA)
│       │   ├── repository       # Spring Data JPA repositories
│       │   └── messaging        # RabbitMQ config, producer, and events (candidate/employer created)
│       ├── src/main/resources/application.yaml
│       ├── Dockerfile
│       └── pom.xml
│
├── docker-compose.dev.yml     # Development environment
├── docker-compose.prod.yml    # Production environment (frontend, backend, rabbitmq)
├── .github/workflows          # CI/CD (Docker image build & push, Dependabot auto-merge)
├── README.md
├── SECURITY.md
└── LICENSE
```
---

## 🧠 Architecture Note

### The development environment is intentionally hybrid:

- **Backend (Node.js)** → Dockerized
- **Identity Service (Java/Spring Boot)** → Dockerized, standalone (own Postgres DB, not yet consumed by other services)
- **AI Service (Python/FastAPI)** → Dockerized
- **Workers (Node.js + Python)** → Dockerized
- **RabbitMQ + Redis** → Dockerized
- **Frontend (Next.js)** → Local development

> This setup ensures optimal developer experience, faster hot reload, and better performance for the frontend.
>
> ⚠️ **Note on production:** `docker-compose.prod.yml` currently only defines `frontend`, `backend`, and `rabbitmq`. The Identity Service, AI service, and Redis are not yet part of the production Compose file or the CI image-build pipeline — treat them as development/in-progress until that catches up.

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
npm run dev            # Start development with nodemon
npm run build          # Compile TypeScript (+ copy email templates)
npm start              # Start production server
npm run lint           # Run ESLint checks
npm run type-check     # Run TypeScript type checking in watch mode
npm run start-worker   # Start the RabbitMQ worker process (compiled)
```

#### AI Service

```bash
uvicorn app.main:app --reload        # Start the FastAPI dev server (REST "ask" endpoint)
python -m app.workers.llm_consumer   # Start the RabbitMQ LLM consumer worker
```

#### Identity Service

```bash
mvn spring-boot:run   # Start the Spring Boot dev server (as used in docker-compose.dev.yml)
mvn clean package      # Build the executable jar (as used in the Dockerfile)
```

---

## Issues

If you encounter any bugs or have feature requests, please open an issue on the [GitHub Issues page](https://github.com/omercikan/nexthire-job-platform/issues).

## Security

Please see the [Security Policy](SECURITY.md) for details on reporting vulnerabilities.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
