import mongoose from "mongoose";
import config from "./index.ts";

export async function connectDatabase() {
  try {
    await mongoose.connect(config.database_uri, {
      dbName: config.database_name,
      serverSelectionTimeoutMS: 5000,
    });

    mongoose.connection.on("connected", () => {
      console.log("connected the mongoose db");
    });

    mongoose.connection.on("error", (err) => {
      console.error("mongoose connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("mongoose connection lost");
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      console.log(
        "The application has closed, the MongoDB connection has been terminated."
      );
      process.exit(0);
    });
  } catch (error) {
    console.error("database connection error:", error);
    process.exit(1);
  }
}
