import express from "express";
import authCandidateRoutes from "./features/auth/candidate/routes/authCandidateRoutes";
import authEmployerRoutes from "./features/auth/employer/routes/authEmployerRoutes";
import otpRoutes from "./features/auth/otp/otpRoutes";
import passwordRoutes from "./features/auth/password/passwordRoutes";
import userRoutes from "./features/users/routes/userRoutes";
import emailAuthRoutes from "./features/auth/emails/emails.routes";
import logoutRoutes from "./features/auth/logout/logout.routes";
import candidateDashboardRoutes from "./features/dashboard/candidate/routes/general.route";
import employerDashboardRoutes from "./features/dashboard/employer/routes/general.route";
import jobRoutes from "./features/jobs/job.routes";
import jobApplicationRoutes from "./features/jobs/application/application.routes";
import { errorHandler } from "./shared/middlewares/errorHandler";
import { applyGlobalMiddlewares } from "./shared/middlewares/index";

// express app
const app = express();
app.set("trust proxy", 1);

// Global Middleware
applyGlobalMiddlewares(app);

app.use("/api/auth", authCandidateRoutes);
app.use("/api/auth", authEmployerRoutes);
app.use("/api/auth", otpRoutes);
app.use("/api/auth", passwordRoutes);
app.use("/api/auth/email", emailAuthRoutes);
app.use("/api/auth", logoutRoutes);
app.use("/api/dashboard/candidate", candidateDashboardRoutes);
app.use("/api/dashboard/employer", employerDashboardRoutes);

app.use("/api/jobs", jobRoutes);
app.use("/api/jobs", jobApplicationRoutes);
app.use("/api/users", userRoutes);

// global error handler after requests
app.use(errorHandler);

export default app;
