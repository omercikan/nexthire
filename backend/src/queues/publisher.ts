import { rabbitMQService } from "../config/rabbit";

export const publisher = async (queue: string, data: unknown) => {
  const channel = await rabbitMQService.getChannel(queue);
  const message = JSON.stringify(data);
  channel.sendToQueue(queue, Buffer.from(message), { persistent: true });
};
