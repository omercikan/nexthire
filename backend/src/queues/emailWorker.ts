import { connectRabbitMQ } from "../config/rabbit.ts";
import { sendMail } from "../shared/services/emailService.ts";
import crypto from "crypto";
import { Otp } from "../shared/models/Otp.ts";
import bcrypt from "bcrypt";
import { connectDatabase } from "../config/db.ts";
import config from "../config/index.ts";

(async () => {
  await connectDatabase();

  const channel = await connectRabbitMQ("emailQueue");

  channel.consume("emailQueue", async (msg) => {
    if (!msg) return;

    try {
      const data = JSON.parse(msg!.content.toString());
      const { userId, email, fullname } = data;

      const token = crypto.randomBytes(10).toString("hex");
      const expiration = Date.now() + 5 * 60 * 1000;
      const code = Math.floor(10000 + Math.random() * 900000);

      const hashedCode = await bcrypt.hash(String(code), 8);

      await Otp.create({
        userId,
        token,
        expiration,
        code: hashedCode,
      });

      await sendMail(email, "NextHire - Hesap Doğrulama Kodu", "otp", {
        fullname,
        code,
        verificationLink: `${config.client_url}/sifre-sifirla?vt=${token}`,
        year: "2025",
      });

      channel.ack(msg);
    } catch (err) {
      console.error("error:", err);
      channel.nack(msg, false, false);
    }
  });
})();
