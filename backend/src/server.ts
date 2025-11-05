import app from "./app";
import { connectDatabase } from "./config/db";
import config from "./config/index";
import logger from "./shared/utils/logger";

app.listen(config.port, (err) => {
  if (err) {
    logger.error("❌ Server error:", err);
  }

  logger.info(`✅ The Express application starts at port ${config.port}`);
});

connectDatabase();
