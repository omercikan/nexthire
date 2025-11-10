import express from "express";
import cors from "cors";
import authCandidateRoutes from "./features/auth/candidate/routes/authCandidateRoutes";
import authEmployerRoutes from "./features/auth/employer/routes/authEmployerRoutes";
import otpRoutes from "./features/auth/otp/otpRoutes";
import passwordRoutes from "./features/auth/password/passwordRoutes";
import userRoutes from "./features/users/routes/userRoutes";
import emailAuthRoutes from "./features/auth/emails/emails.routes";
import logoutRoutes from "./features/auth/logout/logout.routes";
import { errorHandler } from "./shared/middlewares/errorHandler";
import cookieParser from "cookie-parser";
import config from "./config/index";
import { Role } from "./shared/types/user/role";

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
app.set("trust proxy", 1);

// global middleware
app.use(express.json());
app.use(cors({ credentials: true, origin: config.client_url }));
app.use(cookieParser());

app.use("/api/auth", authCandidateRoutes);
app.use("/api/auth", authEmployerRoutes);
app.use("/api/auth", otpRoutes);
app.use("/api/auth", passwordRoutes);
app.use("/api/auth/email", emailAuthRoutes);
app.use("/api/auth", logoutRoutes);

app.use("/api/users", userRoutes);

// global error handler after requests
app.use(errorHandler);

export default app;
