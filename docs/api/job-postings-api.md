# 📝 Job Listings API Documentation

## POST `/api/firebase/job-postings`

Fetches and filters open job listings from Firestore based on various criteria like mode of work, experience, position level, keywords, and location. Supports pagination and sorting.

---

### 📥 Request Body

| Field              | Type     | Required | Description                                        |
| ------------------ | -------- | -------- | -------------------------------------------------- |
| `modeOfWork`       | string   | ✅ Yes   | Filter by mode of work (e.g., "Remote", "On-site") |
| `experienceTime`   | string[] | ✅ Yes   | Array of experience levels to filter by            |
| `positionLevel`    | string[] | ✅ Yes   | Array of position levels to filter by              |
| `jobKeywords`      | string[] | ✅ Yes   | Array of keywords to search in job title/category  |
| `locationKeywords` | string[] | ✅ Yes   | Array of location keywords to filter job locations |
| `pageValue`        | string   | ✅ Yes   | Current page or pagination value (e.g., "Tümü")    |

---

### 🔍 Query Parameters (URL search params)

| Parameter | Type   | Required | Description                                   |
| --------- | ------ | -------- | --------------------------------------------- |
| `sort`    | string | Optional | Sort order for creation date: "asc" or "desc" |
| `start`   | number | Optional | Start index for slicing jobs (pagination)     |
| `end`     | number | Optional | End index for slicing jobs (pagination)       |

---

### 📤 Response

```json
{
 - Example Job Object (Mock Data)
  "jobs": [
    {
      "postId": "218974918274ASQDFÇsgfanf",
      "jobTitle": "UI/UX Designer",
      "category": "Tasarım",
      "location": "İzmir",
      "modeOfWork": "Yarı Zamanlı",
      "workModel": "Hibrit",
      "positionLevel": "Orta Seviye",
      "experienceTime": "2 Yıl",
      "educationLevel": ["Ön Lisans", "Lisans"],
      "applicationDeadlineDate": "2025-12-15T00:00:00Z",
      "jobAbout": "Yaratıcı arayüzler tasarlayacak ve kullanıcı deneyimini geliştirecek bir UI/UX tasarımcısı arıyoruz.",
      "requirements": [
        "Figma ve Adobe XD araçlarını iyi derecede kullanabilmek",
        "Responsive tasarım konusunda deneyimli olmak",
        "Tasarım trendlerini takip etmek",
        "Takım çalışmasına yatkın olmak"
      ],
      "responsibilities": [
        "Kullanıcı arayüzü tasarımlarını oluşturmak",
        "Tasarım dökümanlarını hazırlamak",
        "Geliştirici ekibiyle birlikte çalışmak"
      ],
      "companyInformations": {
        "companyName": "DesignHub Studio",
        "companyLogo": "https://example.png",
        "location": "İzmir",
        "numberOfEmployees": "50-100",
        "companyId": "zxc123vbn456asd789"
      }
    }
  ],
  "countJobs": 1
}
```

- jobs: Array of filtered or paginated job objects.

- countJobs: Total number of jobs matching the filter criteria or total jobs available.

### 🔄 Job Filtering & Behavior Summary

- Queries **all employers** who have `openJobs` in Firestore.

- Sorts jobs by `createdAt` date:

  - `"asc"` for ascending (default)
  - `"desc"` for descending

- Filters jobs based on:

  - **`modeOfWork`**  
    Exact match (case-insensitive)

  - **`experienceTime`**  
    Matches any of the values in the provided array

  - **`positionLevel`**  
    Matches any of the values in the provided array

  - **`jobKeywords`**  
    Matches if the keyword exists in:

    - `jobTitle`
    - `category`  
      Supports Turkish characters and normalization

  - **`locationKeywords`**  
    Matches if the location includes the keyword  
    Supports Turkish characters and normalization

- If **no filters** are applied:

  - Results are paginated using `start` and `end` query parameters.

- If **filters are applied**:
  - Returns **all matching jobs** (pagination is ignored).

## ❌ Error Response

| Status | Message       | Description                                                                    |
| ------ | ------------- | ------------------------------------------------------------------------------ |
| 200    | `{ message }` | Returns error message on failure (status 200 due to NextResponse.json default) |

### 💡 Notes

- ✅ Filtering is performed **server-side** in the API route before returning results to the client.

- 🔤 Location and keyword filters use string normalization to correctly handle Turkish characters (e.g., `ı`, `İ`, `ş`, `Ş`).

- 📄 If `pageValue` is `"Tümü"` or if any filter is active, the API returns **all matching jobs** without pagination.

- 📌 Pagination (via `start` and `end` query parameters) is applied **only when no filters are active**.

<br>

# 📄 Job Postings API (RTK Query)

An API to fetch and filter job postings from Firestore using **Redux Toolkit Query**.

---

## ⚙️ Base Configuration

- **Base URL:** `/api/firebase/`
- **Reducer Path:** `postingJobs`

---

## 📥 Endpoint: `getJobPostings`

Fetches the first 10 job postings without any filters.

### ✅ Request Parameters (Defaults)

| Parameter          | Type       | Default | Description                                |
| ------------------ | ---------- | ------- | ------------------------------------------ |
| `sort`             | `string`   | `"asc"` | Sort by creation date: `"asc"` or `"desc"` |
| `start`            | `number`   | `0`     | Start index for pagination                 |
| `end`              | `number`   | `10`    | End index for pagination                   |
| `modeOfWork`       | `string`   | `""`    | Work mode (exact match)                    |
| `experienceTime`   | `string[]` | `[]`    | Filters by experience time                 |
| `positionLevel`    | `string[]` | `[]`    | Filters by position level                  |
| `jobKeywords`      | `string[]` | `[]`    | Match against job title or category        |
| `locationKeywords` | `string[]` | `[]`    | Match against location name                |

### 🧪 Usage

```tsx
const { data, isLoading } = useGetJobPostingsQuery();
```

## 🔍 Endpoint: filterJobPostings

Fetches job postings based on filters and sorting options.

### ✅ Request Parameters

| Parameter          | Type       | Description                                        |
| ------------------ | ---------- | -------------------------------------------------- |
| `sort`             | `string`   | `"asc"` or `"desc"` for sorting by creation date   |
| `start`            | `number`   | Start index (used when no filters applied)         |
| `end`              | `number`   | End index (used when no filters applied)           |
| `modeOfWork`       | `string`   | Exact match with job’s work mode                   |
| `experienceTime`   | `string[]` | Matches if job’s experience time is in the array   |
| `positionLevel`    | `string[]` | Matches if job’s level is in the array             |
| `jobKeywords`      | `string[]` | Match with job title or category                   |
| `locationKeywords` | `string[]` | Match with job location (Turkish locale supported) |
| `pageValue`        | `string`   | If `"Tümü"`, disables pagination                   |

## 🧪 Usage

```ts
const [filterJobPostings, { data, isLoading }] = useFilterJobPostingsMutation();

filterJobPostings({
  sort: "asc",
  start: 0,
  end: 10,
  modeOfWork: "Remote",
  experienceTime: ["1-3 years"],
  positionLevel: ["Junior"],
  jobKeywords: ["React"],
  locationKeywords: ["Ankara"],
  pageValue: "Tümü",
});
```

## 🔁 API Behavior

- ✅ **Filters Applied:** Pagination (`start`, `end`) is ignored and **all matching results** are returned.
- 🟨 **If `pageValue === "Tümü"`:** All results are returned **without slicing**.
- 🔤 **Turkish character support** (e.g., `ş`, `ı`, `ğ`) for keyword and location filtering.
- ✅ **Filtering is handled server-side** for better performance and accuracy.

### ✅ Example Response

```json
{
  "jobs": [
    {
      "jobTitle": "Frontend Developer",
      "category": "Software",
      "location": "İstanbul",
      "companyInformations": {
        "companyName": "XYZ Tech",
        "companyLogo": "https://example.png",
        "location": "İstanbul",
        "numberOfEmployees": 25
      }
    }
  ],
  "countJobs": 1
}
```

## 💡 Notes

- 🔍 **Filtering is server-side**, not client-side.
- **Turkish character handling** is supported (`ç`, `ö`, `ü`, `ğ`, `ş`, `ı`).
- 🧠 When **no filters are applied**, results are **paginated** using `start` and `end`.
- 🆓 If `pageValue` is `"Tümü"`, **pagination is disabled** and **all jobs** are returned.
