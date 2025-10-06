import mongoose from "mongoose";
import config from "./index.ts";
import logger from "../shared/utils/logger.ts";

export async function connectDatabase() {
  try {
    await mongoose.connect(config.database_uri, {
      dbName: config.database_name,
      serverSelectionTimeoutMS: 5000,
    });

    mongoose.connection.on("connected", () => {
      logger.info("✅ Connected to MongoDB successfully");
    });

    mongoose.connection.on("error", (err) => {
      logger.error("❌ Mongoose connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("⚠️ Mongoose connection lost");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      logger.info("🛑 App terminated — MongoDB connection closed.");
      process.exit(0);
    });
  } catch (error) {
    logger.error("❌ Database connection error:", error);
    process.exit(1);
  }
}
