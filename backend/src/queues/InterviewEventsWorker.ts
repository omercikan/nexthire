import { connectDatabase } from "../config/db";
import { connectRabbitMQ } from "../config/rabbit";
import { sendMail } from "../shared/services/emailService";

const QUEUE_NAME = "interview:events";

(async () => {
  const [_, channel] = await Promise.all([
    connectDatabase(),
    connectRabbitMQ(QUEUE_NAME),
  ]);

  channel.consume(QUEUE_NAME, async (msg) => {
    if (!msg) return;

    try {
      const data = JSON.parse(msg.content.toString());

      const mailContext = {
        action: data.action,
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
        sendMail(data.candidateEmail, data.candidateSubject, "interview", {
          fullname: data.candidateName,
          ...mailContext,
        }),
        sendMail(data.interviewerEmail, data.interviewerSubject, "interview", {
          fullname: data.interviewerName,
          ...mailContext,
        }),
      ]);

      channel.ack(msg);
    } catch (err) {
      console.error("error:", err);
      channel.nack(msg, false, false);
    }
  });
})();
