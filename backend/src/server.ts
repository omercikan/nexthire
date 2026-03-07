import app from "./app";
import { connectDatabase } from "./config/db";
import config from "./config/index";
import { connectRedis } from "./config/redis";
import { initSocket } from "./config/socketManager";
import logger from "./shared/utils/logger";
import http from "http";

const startServer = async () => {
  try {
    await connectDatabase();
    connectRedis.connect();

    // Create http server with express app
    const server = http.createServer(app);

    // Socket.io init
    initSocket(server);
    await import("./queues/llmResponseWorker");

    // Healtch check
    app.get("/health", (_req, res) => {
      res.status(200).send("Ok");
    });

    // listen to server
    server.listen(config.port, "0.0.0.0", () => {
      console.info(`✅ The Express application starts at port ${config.port}`);
      logger.info(`✅ The Express application starts at port ${config.port}`);
    });
  } catch (err) {
    console.error(err);
    logger.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
