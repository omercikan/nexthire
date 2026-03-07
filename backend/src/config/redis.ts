import Redis from "ioredis";
import logger from "../shared/utils/logger";
import config from "./index";

class ConnectRedis {
  private client: Redis | null = null;

  connect() {
    this.client = new Redis(config.redis_url)
      .on("error", (err) => logger.error(`Redis error: ${err}`))
      .on("connect", () => logger.info("Connected to Redis"));

    return this.client;
  }

  getClient() {
    if (!this.client) throw new Error("Redis has not yet connected");
    return this.client;
  }
}

export const connectRedis = new ConnectRedis();
