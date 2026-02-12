<p align="center">
 <img width="355" height="112" alt="NextHire (3)-Photoroom" src="https://github.com/user-attachments/assets/81cc2882-ff3a-445e-8084-d82e34f55f9f" />
</p>

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

### 🚀 Planned Features
- AI integration  
- Company scores (based on candidate feedback)  
- Smart job recommendations  
- Transparent interview flow  
- Mobile App (iOS & Android after web release)  

---

## ⚙️ Technologies Used

### 🎨 Frontend
- **React 19**  
- **Next.js 15.5.3 (App Router + Turbopack)**  
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
- **Jest + React Testing Library**

### ⚙️ Backend
- **Node.js**  
- **Express.js 5**  
- **TypeScript**  
- **MongoDB**  
- **Nodemon**  
- **CORS**  
- **Dotenv**
- **Helmet – Security headers for HTTP**
- **ESLint + Prettier**

### 🐳 DevOps
- **Docker**
- **Docker Compose (Development Environment)**

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

## 1️⃣ Clone Repository

```bash
git clone https://github.com/omercikan/nexthire-job-platform.git
cd nexthire-job-platform
```

## 2️⃣ Start Backend Services with Docker

### This will start:

- Backend API (Node.js + Express)
- RabbitMQ (Message Broker with Management UI)

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

## 🧠 Architecture Note

### The development environment is intentionally hybrid:

- Backend → Dockerized
- Frontend (Next.js) → Local Development

> This setup ensures optimal developer experience, faster hot reload, and better performance.

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

## Issues

If you encounter any bugs or have feature requests, please open an issue on the [GitHub Issues page](https://github.com/omercikan/nexthire-job-platform/issues).

## Security 

Please see the [Security Policy](SECURITY.md) for details on reporting vulnerabilities.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
