# Candidate Login API Documentation

## 👤 Candidate Login

### POST `/api/firebase/candidate-login`

Authenticate an existing candidate user using email and password. On successful login, a refresh token cookie (`VV9SVA`) is set.

---

### 🔐 Authorization

❌ No authentication required

---

### 📥 Request Body

| Field      | Type   | Required | Description          |
| ---------- | ------ | -------- | -------------------- |
| `email`    | string | ✅       | User's email address |
| `password` | string | ✅       | User's password      |

---

### 🧪 Example Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "123456"
}
```

### ✅ Success Response

```json
{
  "user": {
    "uid": "ASDKL1234SADQS091",
    "email": "john.doe@example.com"
  }
}
```

### ❌ Error Responses

| Status | Message                                      |
| ------ | -------------------------------------------- |
| 400    | "Firebase: Error (auth/invalid-credential)." |
| 400    | "Firebase: Error (auth/too-many-requests)."  |
| 400    | Other Firebase authentication error messages |

### 📌 Notes

- On successful login, a cookie named `VV9SVA` is set with the user's refresh token (base64 encoded).
- The API uses Firebase's `signInWithEmailAndPassword` method.
- No prior authentication is required to call this endpoint.
- Common error messages from Firebase are passed back in the response with status `400`.

### 🧪 Example Usage (Candidate Login)

```ts
await axios.post("/api/firebase/candidate-login", {
  email: "john.doe@example.com",
  password: "123456",
});
```

## 🔐 Fields & Validation Rules

| Field      | Type   | Required | Validation Rules                                                              |
| ---------- | ------ | -------- | ----------------------------------------------------------------------------- |
| `email`    | string | ✅ Yes   | - Must be a valid email format <br> - Max 50 characters <br> - Regex enforced |
| `password` | string | ✅ Yes   | - Cannot be empty                                                             |
