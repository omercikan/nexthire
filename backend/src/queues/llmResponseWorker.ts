import { connectRabbitMQ } from "../config/rabbit";
import { getIO } from "../config/socketManager";
import logger from "../shared/utils/logger";

const io = getIO();

(async () => {
  const channel = await connectRabbitMQ("ai:response");

  channel.consume(
    "ai:response",
    (msg) => {
      if (!msg) return;

      try {
        const response = JSON.parse(msg.content.toString());

        if (response.error) {
          io.emit("chat:error", response.error);
        } else {
          io.emit("chat:message", response.ai_response);
        }

        channel.ack(msg);
      } catch (error) {
        logger.error(error);
        channel.nack(msg, false, false);
      } finally {
        io.emit("chat:isLoading", false);
      }
    },
    { noAck: false },
  );
})();
