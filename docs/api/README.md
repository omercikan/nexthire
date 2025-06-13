# 📘 NextHire Job Platform API Overview

Welcome to the NextHire Job Platform's backend API documentation!

This guide is designed to give you a **quick overview of the system**, how it's structured, what tools are used, and how you should navigate the rest of the documentation. If you’re new here, **start from this file before reading any specific endpoint docs**.

---

## 🧱 Project Architecture Summary

- **Backend Framework**: Next.js API Routes
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Frontend**: React + Redux Toolkit Query
- **Email Service**: EmailJS (for subscriptions & password resets)

---

## 📌 API Modules Overview

| Module               | Purpose                                               |
| -------------------- | ----------------------------------------------------- |
| 🔐 **Auth**          | Handles password reset logic using Firebase Auth      |
| 🧑‍💼 **Employers**     | Fetches filtered employer data from Firestore         |
| ⭐ **Favorites**     | Lets candidates favorite/unfavorite companies or jobs |
| 📩 **Subscriptions** | Stores user emails and sends confirmation via EmailJS |

---

## 📬 API Endpoint Patterns

- **Base URL**: All API routes are under `/api/firebase/`
- Routes are RESTful, using `GET` for fetching and `POST` for mutations
- Example: `/api/firebase/employers/featured` fetches featured employers

---

## 🔑 Authentication & Authorization

- Most endpoints **do not** require authentication.
- The **Favorites API** is the only one that checks for a valid user role (`candidate`).
- Firebase Auth handles password reset via email links.

---

## 📦 Firestore Data Model (Simplified)

| Collection            | Purpose                                                             |
| --------------------- | ------------------------------------------------------------------- |
| `subscriptions`       | Stores email addresses of newsletter subscribers                    |
| `users`               | Stores all user data, including favorites                           |
| `candidatesFavorites` | Mirrors favorites for redundancy and fast access                    |
| `employers`           | Employer records, filterable by flags like `featured` or `isActive` |

---

## 🔄 Common Behaviors

- ✅ **Favorites toggle logic**: Adds or removes the same company/job based on presence.
- 🔁 **Subscriptions**: Prevents duplicates before saving, sends confirmation email.
- 📩 **Reset password**: Sends Firebase reset link to provided email.
- 📊 **Employer filter**: Dynamically fetches employers by any boolean field (e.g. `isActive`, `featured`).

---

## 📑 Validation & Error Handling

All APIs follow a consistent response format:

```json
{
  "message": "Description here",
  "status": 200
}
```

## 🧪 Testing the APIs

You can test any route via:

- Postman

- Axios from frontend

- Console tools like curl

## Example:

#### Example Axios

```ts
const res = await axios.post("/api/firebase/subscribe", {
  email: "user@example.com",
});
```

#### Example RTK Query

```ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface SubscribeRequest {
  email: string;
}

interface SubscribeResponse {
  message: string;
  status: number;
}

export const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/firebase/",
  }),
  endpoints: (builder) => ({
    addSubscription: builder.mutation<SubscribeResponse, SubscribeRequest>({
      query: (body) => ({
        url: "subscribe",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAddSubscriptionMutation } = subscriptionApi;
```

## 📚 What's Next?

To dive deeper, explore:

## 🔐 Authentication APIs

- [📝 Employer Signup API](./employer-signup-api.md)
- [📝 Employer Login API](./employer-login-api.md)
- [🔐 Candidate Login API](./candidate-login-api.md)
- [📝 Candidate Signup API](./candidate-signup-api.md)
- [🔁 Reset Password API](./reset-password-api.md)

## 🧑‍💼 Employer APIs

- [📤 Employers Fetch API](./employers-api.md)

## 📄 Job Postings APIs

- [📃 Job Postings API](./job-postings-api.md)

## ⭐ Favorites APIs

- [⭐ Favorites Toggle API](./favorites-api.md)

## 📩 Subscription APIs

- [📧 Email Subscription API](./subscriptions-api.md)

<br>

> Each file includes request/response specs, sample payloads, and React integration examples.

## 🤝 Contribution Notes

- Use **TypeScript** throughout the project.
- Keep **response format consistent** across endpoints.
- Follow **Firestore naming conventions** for collections and fields.
- When adding a new endpoint:
  - Implement the route in `/api/firebase/`
  - Create a corresponding `.md` documentation file under `/docs/api/`

---

## About the Author

> I am Ömer Çıkan, a passionate frontend developer committed to creating intuitive and seamless user experiences. Continuously learning and adapting, I strive to keep up with the latest technologies and best practices in the fast-paced world of software development. While my expertise lies in frontend development, I am actively expanding my skills in backend technologies to become a proficient full-stack developer. My goal is to build scalable, maintainable, secure, and high-performance applications that meet real user needs and business goals.
