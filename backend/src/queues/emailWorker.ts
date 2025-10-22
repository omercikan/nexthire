import { connectRabbitMQ } from "../config/rabbit.ts";
import { sendMail } from "../shared/services/emailService.ts";
import { connectDatabase } from "../config/db.ts";
import config from "../config/index.ts";

(async () => {
  await connectDatabase();

  const channel = await connectRabbitMQ("emailQueue");

  channel.consume("emailQueue", async (msg) => {
    if (!msg) return;

    try {
      const data = JSON.parse(msg!.content.toString());
      const { code, token, email, fullname } = data;

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
