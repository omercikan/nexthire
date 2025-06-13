# ⭐ Favorites API Documentation

## POST `/api/favorites`

Adds or removes a company from the candidate's favorite list in Firestore.

---

### 🔐 Authorization

✅ Requires user with role `"candidate"`

---

### 📥 Request Body

| Field             | Type   | Required | Description                                                                     |
| ----------------- | ------ | -------- | ------------------------------------------------------------------------------- |
| `data`            | object | ✅ Yes   | The company data object to add or remove from favorites                         |
| `id`              | string | ✅ Yes   | The unique company EID to identify the favorite company                         |
| `user`            | object | ✅ Yes   | The authenticated user object, must contain `role` and `id` or `cid`            |
| `updatedData`     | object | ✅ Yes   | Current user data with favorite fields                                          |
| `setFavoritePath` | string | ✅ Yes   | Firestore collection path where favorites are stored                            |
| `fieldName`       | string | ✅ Yes   | The name of the array field in Firestore to update (e.g. `"favoriteCompanies"`) |

---

### 📤 Response

| Field     | Type   | Description                   |
| --------- | ------ | ----------------------------- |
| `message` | string | Success or error message      |
| `status`  | number | HTTP status code (200 or 400) |

---

### 🧪 Example Request Body

```json
{
  "data": {
    "companyEID": "abc123",
    "name": "Example Company",
    "industry": "Tech"
  },
  "id": "abc123",
  "user": {
    "role": "candidate",
    "id": "user123"
  },
  "updatedData": {
    "favoriteCompanies": [
      {
        "companyEID": "abc123",
        "name": "Example Company",
        "industry": "Tech"
      }
    ]
  },
  "setFavoritePath": "candidatesFavorites",
  "fieldName": "favoriteCompanies"
}
```

## ✅ Success Response

```json
{
  "message": "Başarılı",
  "status": 200
}
```

## ❌ Error Response

| Status | Message       | Description                      |
| ------ | ------------- | -------------------------------- |
| 400    | Error message | Error details in case of failure |

## 🔄 Behavior

- If the company is already in the favorites list, it will be **removed**.
- If the company is not in the favorites list, it will be **added**.
- The update is performed in two Firestore collections/paths concurrently: one at `setFavoritePath`, and one at `"users"`.

<br/>

# 🚀 Redux Toolkit Query: Favorites API

## API Slice: `favoritesApi`

- **Base URL:** `/api/firebase/`
- **Reducer Path:** `favoritesApi`

---

## Endpoint: `addFavorite`

Adds or removes a company from the candidate's favorites list.

### Request

- **Method:** `POST`
- **URL:** `/api/firebase/favorites`
- **Body Parameters:**

| Parameter     | Type                 | Description                                                  |
| ------------- | -------------------- | ------------------------------------------------------------ |
| `data`        | `FavoriteDataFields` | The favorite item data to add or remove                      |
| `id`          | `string`             | Company ID to be added or removed from favorites             |
| `user`        | `Candidate`          | The current logged-in candidate user                         |
| `updatedData` | `Candidate`          | Candidate's current data including favorites                 |
| `fieldName`   | `string`             | The field name in the Firestore document (e.g., "favorites") |

### Response

- Returns an object with status and message indicating success or failure.

---

## ⭐ FavoriteCompany React Component

This component provides a UI button to add or remove a company from the candidate user's favorites list.

---

## Features

- Displays a filled bookmark icon if the company is already favorited.
- Displays an outlined bookmark icon if not favorited.
- Shows a loading spinner while the favorite/unfavorite request is in progress.
- Only renders for users with role `"candidate"` or if the role is undefined but loading is complete.
- Disables button while processing the favorite toggle.

---

## Props

| Prop         | Type     | Description                                                       |
| ------------ | -------- | ----------------------------------------------------------------- |
| `data`       | `object` | Company data including `eid` and `dataField` (favorite item data) |
| `fieldName`  | `string` | Firestore field name for favorites list (e.g., `"favorites"`)     |
| `extraField` | `any`    | Additional data to include when adding to favorites               |

---

## ⭐ Example Usage of `<FavoriteCompany />` Component

Here's a practical example of how to use the `FavoriteCompany` component in your React app, passing job-related data and favorite field info.

```tsx
import FavoriteCompany from "@/components/FavoriteCompany";
import { FavoriteField } from "@/types/favorite";

function JobCard({ job }) {
  return (
    <div>
      <h3>{job.jobTitle}</h3>
      <FavoriteCompany
        data={{
          dataField: {
            companyEID: job?.postId,
            companyLocation: job?.companyInformations?.location,
            numberOfEmployees: job?.companyInformations?.numberOfEmployees,
            companyLogo: job?.companyInformations?.companyLogo,
            companyName: job?.companyInformations?.companyName,
          },
          eid: job?.postId,
        }}
        fieldName={FavoriteField.Jobs}
        extraField={job.jobTitle}
      />
    </div>
  );
}
```

### Explanation:

- data.dataField includes all necessary company details for the favorite item.

- data.eid uniquely identifies the company/job post.

- fieldName specifies the Firestore array field that stores favorites (FavoriteField.Jobs).

- extraField passes additional contextual info, here the job title.
