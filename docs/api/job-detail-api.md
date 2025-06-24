# 📄 Job Detail Fetch API

## POST `/api/firebase/job-detail`

Fetches a specific job posting detail based on the provided `postID`. This endpoint is used primarily to render the **Job Detail Page** for authenticated employers.

---

## 🔐 Authentication & Access Control

- This API reads the employer ID from a Base64-encoded cookie named `CIDVSD`.
- It **does not enforce strict authentication**; users without a valid session can still access job details.
- Typically, this endpoint is accessed by:
  - Unauthenticated users (guests), or
  - Users with the role `"candidate"`.
- There is no role-based restriction enforced at the API level for this route.

---

### 📥 Request Body

| Field    | Type   | Required | Description                         |
| -------- | ------ | -------- | ----------------------------------- |
| `postID` | string | ✅ Yes   | Unique job posting ID to be fetched |

---

### 📤 Response

| Field    | Type   | Description                                         |
| -------- | ------ | --------------------------------------------------- |
| `job`    | object | The matched job posting from the employer           |
| `status` | number | HTTP status code: `200` for success, `400` on error |

---

### 🧪 Example Fetch Request

```ts
const response = await fetch("/api/firebase/job-detail", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ postID: "post_abc123" }),
});

const data = await response.json();
```

---

## 🛠 RTK Query Endpoint Definition

Define the `jobDetailApi` service with an endpoint for fetching job details:

```ts
import { EmployerOpenJobs } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const jobDetailApi = createApi({
  reducerPath: "jobDetailApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/firebase/",
  }),
  endpoints: (builder) => ({
    getJobDetail: builder.query<
      { job: EmployerOpenJobs; status: number },
      { postID: string }
    >({
      query: ({ postID }) => ({
        url: "job-detail",
        method: "POST",
        body: {
          postID,
        },
      }),
    }),
  }),
});

export const { useGetJobDetailQuery } = jobDetailApi;
```

## 📌 Notes

- `baseUrl` is set to `/api/firebase/` to target the Next.js API routes.
- `getJobDetail` sends a `POST` request to the `job-detail` route with `postID` in the body.
- Response includes the matching job object and a status code.

### ✅ Example Success Response

```json
{
  "job": {
    "postId": "post_abc123",
    "jobTitle": "Frontend Developer",
    "location": "Remote",
    "jobType": "Full-time",
    "description": "...",
    "requirements": ["React", "TypeScript"],
    ...
  },
  "status": 200
}
```

### ❌ Error Response

```json
{
  "message": "Invalid token or job not found.",
  "status": 400
}
```

### 🔄 Behavior Summary

- The API **decodes** the company ID from a cookie named `CIDVSD`.
- It **queries** the `employers` Firestore collection using the decoded `eid`.
- It **filters** the `openJobs` array to find the job that matches the provided `postID`.
- If a match is found, it **returns** the job details.
- If no match is found or an error occurs, it **returns** a `400` status with an error message.

## 📚 Related APIs

- [📃 Job Postings API](./job-postings-api.md)
- [📝 Employer Login API](./employer-login-api.md)
- [🔐 Set Cookie Token API](./set-cookie-token-api.md)
