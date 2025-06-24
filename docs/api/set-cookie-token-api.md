# 🍪 Set Token API

## POST `/api/auth/session`

Sets a secure, HTTP-only cookie with a provided key and token.  
Used for securely storing session or authentication data on the client.

---

### 🔐 Authorization

- ❌ No authentication required

---

### 📥 Request Body

| Field   | Type   | Required | Description                                                             |
| ------- | ------ | -------- | ----------------------------------------------------------------------- |
| `key`   | string | ✅ Yes   | The name of the cookie to set                                           |
| `token` | string | ✅ Yes   | The token value to store (Base64-encoded before being stored in cookie) |

---

### 📤 Response

#### ✅ Success

```json
{
  "message": "Token stored successfully"
}
```

- Status: 200 OK

#### ❌ Error

```json
{
  "message": "An error occurred while setting the cookie"
}
```

- Status: 400 Bad Request

### 🛡️ Cookie Settings

- The cookie is created with the following security options:

| Option     | Value      | Description                                       |
| ---------- | ---------- | ------------------------------------------------- |
| `httpOnly` | `true`     | Inaccessible to JavaScript to prevent XSS attacks |
| `secure`   | `true`     | Only sent over HTTPS connections                  |
| `sameSite` | `"strict"` | Prevents cross-site requests                      |
| `maxAge`   | `86400`    | Cookie expires in 1 day (24 hours)                |

### 📦 Example Request (JSON)

```json
{
  "key": "session_id",
  "token": "abc123secureToken"
}
```

### 💡 Notes

- This endpoint is intended for securely storing short-lived tokens (e.g., session or auth tokens) in cookies.
- The provided `token` is Base64 encoded before being stored.
- Cookies are set with secure, HTTP-only, and strict SameSite policies.
- Ideal for protecting sensitive data from client-side access (e.g., via JavaScript).

## 📚 Related APIs

- [🔐 Reset Password API](./reset-password-api.md) – Sends a Firebase reset email to the user.
- [🔁 Favorites Toggle API](./favorites-api.md) – Adds or removes a company/job from the user's favorites list.
- [📄 Job Detail API](./job-detail-api.md) – Retrieves detailed information about a specific job posting.
