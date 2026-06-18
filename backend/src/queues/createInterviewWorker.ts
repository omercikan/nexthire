import { connectDatabase } from "../config/db";
import { connectRabbitMQ } from "../config/rabbit";
import { sendMail } from "../shared/services/emailService";

(async () => {
  const [_, channel] = await Promise.all([
    connectDatabase(),
    connectRabbitMQ("interview:create"),
  ]);

  channel.consume("interview:create", async (msg) => {
    if (!msg) return;

    try {
      const data = JSON.parse(msg.content.toString());

      const mailContext = {
        action: "create",
        positionTitle: data.positionTitle,
        scheduledAt: data.scheduledAt,
        scheduledTime: data.scheduledTime,
        type: data.type,
        meetingLink: data.meetingLink,
        location: data.location,
        notes: data.notes,
        year: new Date().getFullYear(),
      };

      await Promise.all([
        sendMail(
          data.candidateEmail,
          "NextHire - Mülakatınız Planlandı",
          "interview",
          {
            fullname: data.candidateName,
            ...mailContext,
          },
        ),
        sendMail(
          data.interviewerEmail,
          "NextHire - Mülakat Oluşturuldu",
          "interview",
          {
            fullname: data.interviewerName,
            ...mailContext,
          },
        ),
      ]);

      channel.ack(msg);
    } catch (err) {
      console.error("error:", err);
      channel.nack(msg, false, false);
    }
  });
})();
