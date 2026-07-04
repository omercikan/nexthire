import { rabbitMQService } from "../../config/rabbit";
import logger from "./logger";

export const runWorker = (
  workerName: string,
  startConsumer: () => Promise<void>,
) => {
  (async () => {
    try {
      await startConsumer();
    } catch (err) {
      logger.error(
        `[${workerName}] Initial consumer start failed, will retry via reconnect:`,
        err,
      );
    }

    rabbitMQService.on("reconnected", () => {
      logger.info(`[${workerName}] Re-registering consumer after reconnect`);
      startConsumer().catch((err) =>
        logger.error(`[${workerName}] Consumer restart failed:`, err),
      );
    });
  })();
};
