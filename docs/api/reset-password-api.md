# 🔐 Reset Password API

## POST `/api/firebase/reset-password`

Sends a password reset email to the given user email using **Firebase Authentication**.

---

### 📥 Request Body

| Field | Type   | Required | Description               |
| ----- | ------ | -------- | ------------------------- |
| email | string | ✅ Yes   | Email address of the user |

---

### 📤 Response

#### ✅ Success

```json
{
  "data": null,
  "message": "Şifre sıfırlama bağlantısı user@example.com adresinize gönderildi. Lütfen gelen kutunuzu kontrol edin.",
  "status": 200
}
```

### ❌ Error

Example error messages based on Firebase error codes:

| Firebase Error Code      | Message (English)                            |
| ------------------------ | -------------------------------------------- |
| `auth/invalid-email`     | "Invalid email format."                      |
| `auth/too-many-requests` | "Too many requests. Please try again later." |
| Other (default)          | "An error occurred. Please try again."       |

## Example JSON:

```json
{
  "message": "Too many requests have been made. Please try again after a while..",
  "status": 400
}
```

### 🔒 Reset Password Validation Schema

Yup schema for validating email input on the reset password form.

```ts
import * as Yup from "yup";

export const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .required("Please enter your email address.")
    .email("Please enter a valid email address.")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please enter a valid email address."
    )
    .max(50, "Email must be at most 50 characters long.")
    .trim(),
});
```

## Validation Rules for Email

- **Required:** Email is mandatory.
- **Format:** Must be a valid email format.
- **Pattern:** Matches typical email regex pattern.
- **Max Length:** Maximum 50 characters.
- **Trim:** Removes whitespace from start and end.

## 🔄 Reset Password API Request Example (Frontend)

To send a password reset request, make a POST request to `/api/firebase/reset-password` with the user's email in the request body as JSON.

### Example Using Axios

```ts
const response = await axios.post(
  "/api/firebase/reset-password",
  JSON.stringify({ email: userEmail })
);

const data = response.data;

if (data.status === 200) {
  // Password reset email sent successfully
  // Handle UI update here (e.g., show success message)
} else {
  // Handle error based on data.message
}
```

### 💡 User-friendly Error Handling (Frontend)

Handle Firebase error messages in your UI using `data.message` with a switch-case:

```ts
switch (data.message) {
  case "Firebase: Error (auth/invalid-email).":
    // Show user-friendly error for invalid email format
    break;
  case "Firebase: Error (auth/too-many-requests).":
    // Inform user about rate limiting
    break;
  default:
  // General fallback error message
}
```

## Important Notes

- The request body must include the `email` field as JSON.

- Check `data.status` and `data.message` for success or error handling.

- Handle errors such as rate limiting (`auth/too-many-requests`) appropriately in your UI.
