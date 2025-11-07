import app from "./app";
import { connectDatabase } from "./config/db";
import config from "./config/index";
import logger from "./shared/utils/logger";

app.get("/health", (_req, res) => {
  res.status(200).send("Ok");
});

const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(config.port, "0.0.0.0", () => {
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
