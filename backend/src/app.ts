import express from "express";
import cors from "cors";
import authCandidateRoutes from "./features/auth/candidate/routes/authCandidateRoutes.ts";
import authEmployerRoutes from "./features/auth/employer/routes/authEmployerRoutes.ts";
import otpRoutes from "./features/auth/otp/otpRoutes.ts";
import passwordRoutes from "./features/auth/password/passwordRoutes.ts";
import userRoutes from "./features/users/routes/userRoutes.ts";
import emailAuthRoutes from "./features/auth/emails/emails.routes.ts";
import { errorHandler } from "./shared/middlewares/errorHandler.ts";
import cookieParser from "cookie-parser";
import config from "./config/index.ts";
import { Role } from "./shared/types/user/role.ts";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: Role;
      };
    }
  }
}

// express app
const app = express();

// global middleware
app.use(express.json());
app.use(cors({ credentials: true, origin: config.client_url }));
app.use(cookieParser());

app.use("/api/auth", authCandidateRoutes);
app.use("/api/auth", authEmployerRoutes);
app.use("/api/auth", otpRoutes);
app.use("/api/auth", passwordRoutes);
app.use("/api/auth/email", emailAuthRoutes);

app.use("/api/users", userRoutes);

// global error handler after requests
app.use(errorHandler);

export default app;
