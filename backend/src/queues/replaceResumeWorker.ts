import { connectDatabase } from "../config/db";
import { connectRabbitMQ } from "../config/rabbit";
import { Resume } from "../shared/models/Resume";
import logger from "../shared/utils/logger";
import { v2 as cloud } from "cloudinary";

(async () => {
  await connectDatabase();

  const channel = await connectRabbitMQ("replaceResumeQueue");

  channel.consume("replaceResumeQueue", async (msg) => {
    if (!msg) return;

    try {
      const {
        fileId,
        publicId,
        file: { originalname, path, size, filename },
      } = JSON.parse(msg.content.toString());

      await Resume.findByIdAndUpdate(fileId, {
        originalName: originalname,
        fileName: filename,
        fileUrl: path,
        size,
      });

      await cloud.uploader.destroy(publicId);
    } catch (error) {
      console.error("RabbitMQ consumer replace resume error:", error);
      logger.error(error);
      channel.nack(msg, false, false);
    }
  });
})();
