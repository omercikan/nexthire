import { rateLimit } from "express-rate-limit";

export const limitter = (windowMs: number, limit: number) => {
  return rateLimit({
    windowMs,
    limit,
    message: `Çok fazla deneme yaptınız, lütfen ${(windowMs / 60).toString().slice(0, 2)} dakika sonra tekrar deneyin.`,
    standardHeaders: true,
    legacyHeaders: false,
  });
};
