<p align="center">
  <img src="https://res.cloudinary.com/dvolwkh6r/image/upload/v1746880573/NextHire-3_wj0va1.png" alt="NextHire Logo" width="300"/>
</p>

<h1 align="center">NextHire</h1>

<p align="center">
  <a href="https://www.netlify.com/"><img src="https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white" alt="Netlify"/></a>
  <a href="https://firebase.google.com/"><img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black" alt="Firebase"/></a>
  <a href="https://jestjs.io/"><img src="https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white" alt="Jest"/></a>
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React"/></a>
  <a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"/></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/></a>
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js"/></a>
</p>

<p align="center">
  A modern, responsive job platform built with Next.js, Firebase, and TypeScript, connecting employers and candidates through an interactive interface.
</p>

---

## 📌 About the Project

**NextHire** is a comprehensive job platform that bridges the gap between job seekers and employers.

- 🧑‍💼 Candidates can browse, filter, and apply to job listings.
- 🏢 Employers can create and manage job postings, track applications, and contact applicants.
- Acts as a **professional bridge** between both roles.

**Why NextHire?**  
Finding the right job or candidate can be time-consuming and inefficient. NextHire simplifies this process by providing an intuitive, centralized platform that connects qualified candidates with employers efficiently and transparently.

**Problem Solved**  
Traditional job searching and hiring often involve scattered information, lack of communication, and delays. NextHire addresses these issues by offering real-time application tracking, effective communication channels, and streamlined job posting and application workflows.

> This project is actively being developed. Every push automatically triggers a build on Netlify.

---

## ⚙️ Technologies Used

NextHire is built using a modern tech stack:

- **Next.js 15.2.4** (using **App Router** and **Turbopack** for development)
- **TypeScript 5.8.2**
- **Tailwind CSS 4.x** & **SCSS 1.86.2**
- **Redux Toolkit 2.6.1**
- **Firebase 11.6.0** (Auth & Firestore)
- **MUI (Material UI) 7.0.1**
- **Formik 2.4.6** + **Yup 1.6.1**
- **Axios 1.8.4**
- **Framer Motion 12.11.0**
- **React Hot Toast 2.5.2**
- **Lottie Animations (@lottiefiles/dotlottie-react 0.14.4)**
- **Swiper 11.2.6**
- **React Icons 5.5.0**
- **DayJS 1.11.13**
- **Jest 29.7.0** & **React Testing Library 16.3.0** – for unit and component testing

> For full details, see `package.json`.

---

## 🚀 Getting Started

To run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/omercikan/nexthire-job-platform.git
cd nexthire-job-platform
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Firebase Environment

This project requires Firebase configuration to be set up in your environment variables.
Create a .env.local file at the root of your project with the following keys:

```ts
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

> ⚠️ Make sure you set up your own Firebase project.
You can refer to the official <a href="https://firebase.google.com/docs/web/setup">Firebase Web Setup Documentation</a> to configure your project properly.

### 4. Start the Development Server
```bash
npm run dev
```

> Uses Turbopack for fast refresh and build performance.

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Generate a production build
npm start            # Start production server
npm run lint         # Lint codebase
npm run test         # Run tests using Jest
npm run test:watch   # Run tests in watch mode
npm run type-check   # Run TypeScript type checking
```

## 🌟 Features

- 🧑‍💼 **Candidate Registration / Login**
- 🏢 **Employer Registration / Login**
- 📱 **Fully Responsive Design**
- 🔍 **Job Search with Filter System**
- 📄 **Resume Upload & Application Flow**
- 📬 **Application Tracking for Employers**
- 👤 **Profile Management for Users**
- 🛠️ Admin Panel for Platform Management
- 📢 **Job Posting Creation & Editing**
- ✉️ **Communication Channel Between Parties**
- 🧪 **Unit & Component Testing**

---

## API Documentation

You can find detailed documentation for all API endpoints under the [`docs/api`](docs/api) directory.

## Issues

If you encounter any bugs or have feature requests, please open an issue on the [GitHub Issues page](https://github.com/omercikan/nexthire-job-platform/issues).

## Security

Please see the [Security Policy](SECURITY.md) for details on reporting vulnerabilities.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.
