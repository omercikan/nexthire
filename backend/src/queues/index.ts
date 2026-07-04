import "./emailWorker";
import "./deleteResumeWorker";
import "./replaceResumeWorker";
import "./deleteUserPhotoWorker";
import "./InterviewEventsWorker";
import logger from "../shared/utils/logger";
import { rabbitMQService } from "../config/rabbit";

const shutdown = async (signal: string) => {
  logger.info(`${signal} received, shutting down gracefully...`);

  try {
    await rabbitMQService.close();
    process.exit(0);
  } catch (err) {
    logger.error("Error during shutdown:", err);
    process.exit(1);
  }
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
