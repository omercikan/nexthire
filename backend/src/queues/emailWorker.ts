import { rabbitMQService } from "../config/rabbit";
import { sendMail } from "../shared/services/emailService";
import { connectDatabase } from "../config/db";
import config from "../config/index";
import { runWorker } from "../shared/utils/runWorker";

const startConsumer = async () => {
  await connectDatabase();

  const channel = await rabbitMQService.getChannel("emailQueue");

  channel.consume("emailQueue", async (msg) => {
    if (!msg) return;

    try {
      const data = JSON.parse(msg!.content.toString());
      const { code, token, email, fullname, description } = data;

      await sendMail(email, "NextHire - Hesap Doğrulama Kodu", "otp", {
        fullname,
        description,
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
};

runWorker("EmailWorker", startConsumer);
