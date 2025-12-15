export interface User {
  _id: string;
  fullname: string;
  email: String;
  password: string;
  phoneNumber: string;
  failedAttempts: number;
  city: string;
  failedTime: number;
}
