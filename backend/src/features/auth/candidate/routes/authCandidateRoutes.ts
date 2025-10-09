import { Router } from "express";
import { validateRequest } from "../../../../shared/middlewares/validateRequest.ts";
import { candidateUserSchema } from "../validators/candidateRequestValidator.ts";
import { limitter } from "../../../../shared/middlewares/limitter.ts";
import {
  createCandidate,
  googleAuth,
  loginCandidate,
} from "../controllers/CandidateController.ts";

const router = Router();
const limitTime = 15 * 60 * 1000;
const limit = 5;

router.post(
  "/register-candidate",
  limitter(limitTime, limit),
  validateRequest(candidateUserSchema),
  createCandidate
);

router.post(
  "/login-candidate",
  limitter(limitTime, limit),
  validateRequest(
    candidateUserSchema.omit({
      fullname: true,
    })
  ),
  loginCandidate
);

router.post(
  "/google",
  limitter(limitTime, limit),
  validateRequest(candidateUserSchema.omit({ password: true })),
  googleAuth
);

export default router;
