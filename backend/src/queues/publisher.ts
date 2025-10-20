import { connectRabbitMQ } from "../config/rabbit.ts";

export const publisher = async (queue: string, data: unknown) => {
  const channel = await connectRabbitMQ(queue);
  const message = JSON.stringify(data);
  channel.sendToQueue(queue, Buffer.from(message));
};
