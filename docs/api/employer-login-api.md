# 🧑‍💼 Employer Login API Documentation

## POST `/api/firebase/employer-login`

Logs in an employer using email and password with Firebase Authentication.

---

### 🔐 Authorization

❌ No authentication required

---

### 📥 Request Body

| Field      | Type   | Required | Description         |
| ---------- | ------ | -------- | ------------------- |
| `email`    | string | ✅ Yes   | Employer's email    |
| `password` | string | ✅ Yes   | Employer's password |

---

### 🧪 Example Request Body

```json
{
  "email": "employer@example.com",
  "password": "Password123!"
}
```

### ✅ Success Response

```json
{
  "user": {
    "uid": "EMPLOYER123UID",
    "email": "employer@example.com"
  },
  "status": 200,
  "message": "Login Successful"
}
```

### ❌ Error Responses

| Status | Message                                      | Description                   |
| ------ | -------------------------------------------- | ----------------------------- |
| 400    | "Firebase: Error (auth/invalid-credential)." | Invalid email or password     |
| 400    | "Firebase: Error (auth/too-many-requests)."  | Too many login attempts       |
| 400    | Other Firebase error messages                | Any other Firebase auth error |

### 🍪 Cookie

On success, a cookie is set with the following details:

| Name    | Value                                 | Secure                         |
| ------- | ------------------------------------- | ------------------------------ |
| VVLOPQS | Base64 encoded Firebase refresh token | Only in production environment |

### 🧪 Example Request (Frontend)

```ts
await axios.post("/api/firebase/employer-login", {
  email: "employer@example.com",
  password: "Password123!",
});
```

## 🔐 Employer Login Validation Schema

| Field      | Type   | Required | Validation Rules                                    |
| ---------- | ------ | -------- | --------------------------------------------------- |
| `email`    | string | ✅ Yes   | - Valid email format <br> - Max 50 characters       |
| `password` | string | ✅ Yes   | - Required <br> - No additional complexity enforced |
