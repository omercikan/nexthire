<p align="center">
 <img width="355" height="112" alt="NextHire (3)-Photoroom" src="https://github.com/user-attachments/assets/81cc2882-ff3a-445e-8084-d82e34f55f9f" />
</p>

<h1 align="center">NextHire</h1>

<p align="center">
  <a href="[https://opensource.org/licenses/MIT](https://camo.githubusercontent.com/6581c31c16c1b13ddc2efb92e2ad69a93ddc4a92fd871ff15d401c4c6c9155a4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d626c75652e737667)"><img src="https://camo.githubusercontent.com/6581c31c16c1b13ddc2efb92e2ad69a93ddc4a92fd871ff15d401c4c6c9155a4/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d626c75652e737667" alt="MIT License"/></a>
  <a href="https://www.netlify.com/"><img src="https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white" alt="Netlify"/></a>
  <a href="https://firebase.google.com/"><img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black" alt="Firebase"/></a>
  <a href="https://jestjs.io/"><img src="https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white" alt="Jest"/></a>
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js"/></a>
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js"/></a>
  <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express-000000?style=flat-square&logo=express&logoColor=white" alt="Express"/></a>
  <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB"/></a>
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
- **Firebase (Auth & Firestore)**  
- **Material UI (MUI)**  
- **Formik + Yup**  
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
- **ESLint + Prettier**  

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/omercikan/nexthire-job-platform.git
cd nexthire-job-platform
```
### 2. Install Dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
npm install
```

### 3. Setup Firebase Environment (Frontend)
- Create a .env.local file at the root of frontend/:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> ⚠️ Make sure you set up your own Firebase project.
You can refer to the official <a href="https://firebase.google.com/docs/web/setup">Firebase Web Setup Documentation</a> to configure your project properly.

### 4. Start Development

#### Frontend or Backend
```bash
npm run dev
```

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
