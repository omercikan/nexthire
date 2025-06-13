# Employer Signup API Documentation

## Endpoint

`POST /api/firebase/employer-signup`

---

## Description

This endpoint allows a new employer to register on the platform. It creates a Firebase Authentication user with the provided email and a default password, sends a password reset email, and stores the employer's detailed company and contact information in the database.

---

## Request Body

The request must be sent in JSON format with the following fields:

| Field            | Type   | Required | Description                           | Validation                                                                                   |
| ---------------- | ------ | -------- | ------------------------------------- | -------------------------------------------------------------------------------------------- |
| `nameAndSurname` | string | ✅       | Full name of the employer             | Minimum 4 characters, must include both first and last name, only letters and spaces allowed |
| `email`          | string | ✅       | Employer's email address              | Must be a valid email format                                                                 |
| `phoneNumber`    | string | ✅       | Employer's phone number               | Turkish phone number format. Example: (0555) 555 55 55                                       |
| `companyName`    | string | ✅       | Name of the employer's company        | Minimum 2 characters                                                                         |
| `city`           | string | ✅       | City where the company is located     | Cannot be "İl Seçiniz" (Select City)                                                         |
| `district`       | string | ✅       | District where the company is located | Cannot be "İlçe Seçiniz" (Select District)                                                   |
| `TaxOfficieCity` | string | ✅       | City of the tax office                | Cannot be "Vergi Dairesi İli Seçiniz" (Select Tax Office City)                               |
| `TaxOffice`      | string | ✅       | Name of the tax office                | Cannot be "Vergi Dairesi Seçiniz" (Select Tax Office)                                        |
| `taxNumber`      | string | ✅       | Tax identification number             | Exactly 10 digits                                                                            |

---

## Request Example

```json
{
  "companyInformations": {
    "companyName": "Bright Future Solutions",
    "email": "contact@brightfuture.com",
    "location": {
      "city": "San Francisco",
      "district": "Downtown",
      "taxNumber": "9876543210",
      "taxOffice": "Bay Area Tax Office",
      "taxOfficieCity": "San Francisco"
    },
    "name": "Alice Johnson",
    "phoneNumber": "(415) 555 1234"
  },
  "createdAt": "06.13.2025",
  "eid": "a1B2c3D4e5F6g7H8i9J0kL1mN2",
  "emailVerified": false,
  "role": "employer"
}
```

## Responses

| Status Code | Response Body                               | Description                                                 |
| ----------- | ------------------------------------------- | ----------------------------------------------------------- |
| 200         | `{ user: { ...userData }, status: 200 }`    | Successful registration. Returns Firebase user data.        |
| 400         | `{ message: "Error message", status: 400 }` | Bad request or error occurred (e.g., email already in use). |

## Error Handling

- If the email address is already in use, the response will contain:

```json
{
  "message": "Firebase: Error (auth/email-already-in-use).",
  "status": 400
}
```

-Other Firebase authentication errors will also return with a 400 status and an appropriate message.

## Frontend Usage Example: Employer Signup Form Submission

This is an example of how the frontend submits employer signup data to the API endpoint `/api/firebase/employer-signup` using Axios and handles possible responses:

```typescript
const onSubmit = async (
  values: EmployerSignupFormFields,
  actions: FormikHelpers<EmployerSignupFormFields>
) => {
  try {
    const response = await axios.post(
      "/api/firebase/employer-signup",
      JSON.stringify({
        nameAndSurname: values.nameAndSurname,
        email: values.email,
        phoneNumber: values.phone,
        companyName: values.companyName,
        city: values.selectCity,
        district: values.selectDistricts,
        TaxOfficieCity: values.selectTaxOfficiesCity,
        TaxOffice: values.selectTaxOffice,
        taxNumber: values.taxNumber,
      })
    );

    const data = response.data;

    if (data.message === "Firebase: Error (auth/email-already-in-use).") {
      toast.error("The email address you entered is already in use.");
      return;
    }

    if (data.user) {
      // Successful registration actions
      actions.resetForm();
      // Additional UI updates or redirects can be handled here
    }
  } catch (error) {
    toast.error("An unexpected error occurred. Please try again.");
  }
};
```

## 🔐 Employer Signup - Fields & Validation Rules

| Field                   | Type    | Required | Validation Rules                                                                                           |
| ----------------------- | ------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `nameAndSurname`        | string  | ✅ Yes   | - Min 4 characters <br> - Must include both name and surname (contains space) <br> - Letters & spaces only |
| `phone`                 | string  | ✅ Yes   | - Must match Turkish phone number format (e.g., 0555 555 55 55)                                            |
| `email`                 | string  | ✅ Yes   | - Must be a valid email format                                                                             |
| `companyName`           | string  | ✅ Yes   | - Min 2 characters                                                                                         |
| `selectCity`            | string  | ✅ Yes   | - Must not be "İl Seçiniz" (Select City)                                                                   |
| `selectDistricts`       | string  | ✅ Yes   | - Must not be "İlçe Seçiniz" (Select District)                                                             |
| `selectTaxOfficiesCity` | string  | ✅ Yes   | - Must not be "Vergi Dairesi İli Seçiniz" (Select Tax Office City)                                         |
| `selectTaxOffice`       | string  | ✅ Yes   | - Must not be "Vergi Dairesi Seçiniz" (Select Tax Office)                                                  |
| `taxNumber`             | string  | ✅ Yes   | - Exactly 10 digits <br> - Numbers only                                                                    |
| `checkboxSecond`        | boolean | ✅ Yes   | - Must be checked (consent to personal data processing)                                                    |
