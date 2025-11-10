export interface User {
  _id: string;
  fullname: string;
  email: String;
  password: string;
  failedAttempts: number;
  failedTime: number;
}
