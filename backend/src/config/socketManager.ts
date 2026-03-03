import { Server } from "socket.io";
import http from "http";
import config from "./index";
import logger from "../shared/utils/logger";

const { nodeEnv, client_url } = config;

let io: Server | null = null;

export const initSocket = (server: http.Server): Server => {
  io = new Server(server, {
    cors: {
      origin: nodeEnv === "development" ? "http://localhost:3000" : client_url,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    logger.info(`Client connected: ${socket.id}`);

    socket.on("chat:message", async (data) => {
      const { publisher } = await import("../queues/publisher");
      io?.emit("chat:isLoading", true);
      await publisher("ai:message", data);
    });

    socket.on("disconnect", () => {
      logger.info(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    throw new Error(
      "Socket.io has not been initialized. Call initSocket first.",
    );
  }

  return io;
};
