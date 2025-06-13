# 📩 Subscription API

## POST `/api/firebase/subscribe`

Adds a new subscriber's email to the Firestore `subscriptions` collection.

---

### 📥 Request Body

| Field | Type   | Required | Description                |
| ----- | ------ | -------- | -------------------------- |
| email | string | ✅ Yes   | Email address to subscribe |

---

### 📤 Response

#### ✅ Success

```json
{
  "message": "successful"
}
```

#### ❌ Error

```json
{
  "message": "Error message here"
}
```

## 📋 API Behavior

- Adds a document to the subscriptions collection in Firestore.

- The document includes:

  - email: The subscriber's email.

  - createdAt: Subscription date formatted as ISO 8601 UTC string (e.g. "2025-06-13T13:45:30Z").

## ⚠️ Notes

- Ensure the email field is validated before sending the request.

- On success, the response contains a confirmation message.

- On failure, the error message is returned.

<br>

# 📧 Subscription Form Submission (Frontend) - Overview

This function handles adding a user's email to the subscription system and sending a confirmation email.

---

## Workflow Steps

1. **Email Validation**

   - Validates email format using regex (only `.com` and `.co` domains allowed).

2. **Subscription Check**

   - Queries Firestore `subscriptions` collection to check if the email is already subscribed.

3. **New Subscription**

   - If not subscribed:
     - Sends a POST request to the API endpoint `/api/firebase/subscribe` to save the email in Firestore.
     - Uses EmailJS to send a confirmation email to the user.
     - Shows a success toast notification on completion.

4. **Already Subscribed**

   - If email exists, shows an error toast indicating the email is already subscribed.

5. **Invalid Email Format**
   - If the email fails validation, triggers a visual form error animation.

---

## Key Points

- Firestore query is used to prevent duplicate subscriptions.
- API call and email sending are asynchronous operations.
- User feedback is provided via toast notifications.
- Invalid form input triggers a short CSS animation for visual feedback.

---

## Example API Call (Simplified)

```ts
await axios.post("/api/firebase/subscribe", JSON.stringify({ email: email }));
```
