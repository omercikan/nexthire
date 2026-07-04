import amqp, { Channel, ChannelModel } from "amqplib";
import { EventEmitter } from "events";
import config from "./index";
import logger from "../shared/utils/logger";

class RabbitMQService extends EventEmitter {
  private connection: ChannelModel | null = null;
  private channels: Map<string, Channel> = new Map();
  private reconnectAttempts: number = 0;
  private readonly maxReconnectDelay: number = 30000;
  private isReconnecting: boolean = false;
  private isShuttingDown = false;

  async connect() {
    if (this.connection) return;

    try {
      this.connection = await amqp.connect(config.rabbit_url);
      this.reconnectAttempts = 0;
      this.registerConnectionEvents();
      logger.info("RabbitMQ connected");

      if (this.isReconnecting) {
        this.isReconnecting = false;
        this.emit("reconnected");
      }
    } catch (err) {
      logger.error("RabbitMQ connection failed:", err);
      this.scheduleReconnect();
      throw err;
    }
  }

  private registerConnectionEvents() {
    if (!this.connection) return;

    this.connection.on("error", (err) => {
      logger.error(`RabbitMQ connection error: ${err}`);
    });

    this.connection.on("close", () => {
      if (this.isShuttingDown) return;

      logger.warn("RabbitMQ connection closed unexpectedly");
      this.connection = null;
      this.channels.clear();
      this.scheduleReconnect();
    });
  }

  private scheduleReconnect() {
    if (this.isReconnecting) return;

    this.isReconnecting = true;
    const delay = Math.min(
      1000 * 2 ** this.reconnectAttempts,
      this.maxReconnectDelay,
    );

    logger.info(`Reconnecting to RabbitMQ in ${delay}ms...`);

    setTimeout(async () => {
      this.reconnectAttempts++;

      try {
        await this.connect();
      } catch (error) {
        this.isReconnecting = false;
        this.scheduleReconnect();
      }
    }, delay);
  }

  async getChannel(queueName: string) {
    if (!this.connection) await this.connect();

    const cached = this.channels.get(queueName);
    if (cached) return cached;

    if (!this.connection) {
      logger.error("RabbitMQ connection is not available");
      throw new Error("RabbitMQ connection is not available");
    }

    const channel = await this.connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });

    channel.on("close", () => {
      this.channels.delete(queueName);
    });

    this.channels.set(queueName, channel);
    return channel;
  }

  async close() {
    this.isShuttingDown = true;

    for (const channel of this.channels.values()) {
      try {
        await channel.close();
      } catch (err) {
        logger.error("Error closing channel:", err);
      }
    }

    this.channels.clear();

    if (this.connection) {
      try {
        await this.connection.close();
      } catch (err) {
        logger.error("Error closing connection:", err);
      }

      this.connection = null;
    }

    logger.info("RabbitMQ connection closed gracefully");
  }

  isConnected(): boolean {
    return this.connection !== null;
  }
}

export const rabbitMQService = new RabbitMQService();
