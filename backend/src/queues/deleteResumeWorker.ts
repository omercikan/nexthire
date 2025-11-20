import { v2 as cloud } from "cloudinary";
import { connectRabbitMQ } from "../config/rabbit";
import { connectDatabase } from "../config/db";
import config from "../config";
import logger from "../shared/utils/logger";

const {
  cloudinary: { cloud_name, api_key, api_secret },
} = config;

cloud.config({ cloud_name, api_key, api_secret });

(async () => {
  await connectDatabase();

  const channel = await connectRabbitMQ("deleteResumesQueue");

  channel.consume("deleteResumesQueue", async (msg) => {
    if (!msg) return;

    try {
      const publicIds: string[] = JSON.parse(msg.content.toString());

      if (Array.isArray(publicIds) && publicIds.length > 0) {
        await Promise.all([publicIds.map((id) => cloud.uploader.destroy(id))]);
      }

      channel.ack(msg);
    } catch (error) {
      console.error("RabbitMQ consumer delete resume error:", error);
      logger.error(error);
      channel.nack(msg, false, false);
    }
  });
})();
