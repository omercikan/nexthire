import app from "./app.ts";
import { connectDatabase } from "./config/db.ts";
import config from "./config/index.ts";
import logger from "./shared/utils/logger.ts";

app.listen(config.port, (err) => {
  if (err) {
    logger.error("❌ Server error:", err);
  }

  logger.info(`✅ The Express application starts at port ${config.port}`);
});

connectDatabase();
