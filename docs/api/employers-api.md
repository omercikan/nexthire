# 🧑‍💼 Employer API Documentation

## GET `/api/firebase/employers/[slug]`

Fetches employers from Firestore where the field named by `slug` equals `true`.

---

### 🔐 Authorization

❌ No authentication required

---

### 📥 Request Parameters

| Parameter | Type   | Required | Description                                                        |
| --------- | ------ | -------- | ------------------------------------------------------------------ |
| `slug`    | string | ✅ Yes   | The Firestore field name to filter employers by, e.g. `"isActive"` |

---

### 📤 Response

| Field       | Type         | Description                                   |
| ----------- | ------------ | --------------------------------------------- |
| `employers` | `Employer[]` | Array of employer objects matching the filter |
| `status`    | number       | HTTP status code (200 on success)             |

---

### 🧪 Example Request (Fetch employers where `isActive` is true)

#### GET /api/employers/isActive

---

### 🧪 Example Success Response

```json
{
  "employers": [
    {
      "bestCompany": true,
      "createdAt": "20.04.2025",
      "eid": "aksjd921LADASK2134",
      "emailVerified": false,
      "featured": true,
      "role": "employer"
    }
  ],
  "status": 200
}
```

### ❌ Error Response

| Status | Message       | Description                      |
| ------ | ------------- | -------------------------------- |
| 400    | Error message | Error details in case of failure |

# 🚀 Redux Toolkit Query: Featured Jobs API

## API Slice: `featuredJobsApi`

- **Base URL:** `/api/firebase/employers/`
- **Reducer Path:** `featuredJobsApi`

---

## Endpoint: `getFeaturedJobs`

Fetches the list of featured employers (jobs).

### Request

- **Method:** `GET`
- **URL:** `/api/firebase/employers/featured`
- **Parameters:** None

### Response

```ts
{
  employers: Employer[]; // Array of employer objects
  status: number;        // HTTP status code (e.g. 200)
}
```

## 📋 Example Usage: Featured Jobs Component (React)

This React component uses the useGetFeaturedJobsQuery hook from the RTK Query API slice to fetch and display featured employer jobs.

```ts
import { useGetFeaturedJobsQuery } from "@/lib/redux/services/featuredJobsApi";

function FeaturedJobsComponent() {
  const { data, error, isLoading } = useGetFeaturedJobsQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading featured jobs.</div>;

  return (
    <ul>
      {data?.employers.map((job) => (
        <li key={job.id}>{job.name}</li>
      ))}
    </ul>
  );
}
```
