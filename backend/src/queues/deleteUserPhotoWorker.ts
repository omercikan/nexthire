import { v2 as cloud } from "cloudinary";
import config from "../config";
import { connectDatabase } from "../config/db";
import { rabbitMQService } from "../config/rabbit";
import logger from "../shared/utils/logger";
import { User } from "../shared/models/User";
import { runWorker } from "../shared/utils/runWorker";

const queue = "deletePhoto";

const {
  cloudinary: { cloud_name, api_key, api_secret },
} = config;

cloud.config({ cloud_name, api_key, api_secret });

const startConsumer = async () => {
  await connectDatabase();
  const channel = await rabbitMQService.getChannel(queue);

  channel.consume(
    queue,
    async (msg) => {
      if (!msg) return;

      try {
        const { userID, oldPhotoID, newPhotoID, profilePhoto } = JSON.parse(
          msg.content.toString(),
        );

        await Promise.all([
          cloud.uploader.destroy(oldPhotoID),
          User.updateOne(
            { _id: userID },
            { profilePhotoId: newPhotoID, profilePhoto },
          ),
        ]);

        channel.ack(msg);
      } catch (error) {
        console.error("RabbitMQ consumer delete user photo error:", error);
        logger.error(error);
        channel.nack(msg, false, false);
      }
    },
    { noAck: false },
  );
};

runWorker("DeleteResumeWorker", startConsumer);
