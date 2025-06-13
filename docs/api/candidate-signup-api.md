# Candidate Registration API Documentation

## 👤 Candidate Registration

### POST `/api/firebase/candidate-signup`

Creates a new candidate account using email and password authentication. Upon successful registration, the user is stored in both `candidates` and `users` collections in the Firebase Firestore.

---

### 🔐 Authorization

❌ No authentication required

---

### 📥 Request Body

| Field           | Type   | Required | Description                            |
| --------------- | ------ | -------- | -------------------------------------- |
| `name`          | string | ✅       | User's first name                      |
| `surname`       | string | ✅       | User's last name                       |
| `acceptedTerms` | string | ✅       | Confirmation text for terms acceptance |
| `email`         | string | ✅       | User's email address                   |
| `password`      | string | ✅       | User's password                        |

---

### 🧪 Example Request Body

```json
{
  "name": "John",
  "surname": "Doe",
  "acceptedTerms": "John Doe accepted the terms and agrees to comply with them.",
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

### 🧾 Stored User Data Example (in Firestore)

```json
{
  "cid": "ASDKL1234SADQS091",
  "name": "John Doe",
  "acceptedTerms": "John Doe accepted the terms and agrees to comply with them.",
  "email": "john.doe@example.com",
  "emailVerified": false,
  "createdWith": "Email/Password Provider",
  "createdAt": "13.05.2025",
  "role": "candidate"
}
```

### ❌ Error Responses

| Status | Message                                        |
| ------ | ---------------------------------------------- |
| 400    | "Firebase: Error (auth/email-already-in-use)." |
| 400    | "Firebase: Error (auth/invalid-email)."        |
| 400    | "Firebase: Error (auth/weak-password)."        |

### 📌 Notes

- On successful registration, the user is saved in two Firestore collections:
  - `candidates`
  - `users`
- A cookie named `VV9SVA` is set with the user's refresh token.
- Default role assigned: `"candidate"`
- The registration uses Firebase's `createUserWithEmailAndPassword` method.

### 🧪 Example Usage (Frontend)

```ts
await axios.post("/api/firebase/candidate-signup", {
  name: "John",
  surname: "Doe",
  acceptedTerms: "John Doe accepted the terms and agrees to comply with them.",
  email: "john.doe@example.com",
  password: "123456",
});
```

# ✍️ User Signup Validation Schema

This schema defines the validation rules for the user registration form using **Yup**.

---

## 🔐 Fields & Validation Rules

| Field             | Type    | Required | Validation Rules                                                                               |
| ----------------- | ------- | -------- | ---------------------------------------------------------------------------------------------- |
| `name`            | string  | ✅ Yes   | - Min 3, Max 30 characters <br> - Only letters and spaces <br> - No special characters         |
| `surname`         | string  | ✅ Yes   | - Min 3, Max 30 characters <br> - Only letters and spaces                                      |
| `email`           | string  | ✅ Yes   | - Must be valid email format <br> - Max 50 characters <br> - Regex pattern enforced            |
| `password`        | string  | ✅ Yes   | - Min 8 characters <br> - Must include: 1 digit, 1 lowercase, 1 uppercase, 1 special character |
| `confirmPassword` | string  | ✅ Yes   | - Must match the `password` field                                                              |
| `checkbox`        | boolean | ✅ Yes   | - Must be checked (i.e., `true`)                                                               |

---
