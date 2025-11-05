import amqp from "amqplib";
import config from "./index";

export const connectRabbitMQ = async (queueName: string) => {
  const connection = await amqp.connect(config.rabbit_url);
  const channel = await connection.createChannel();
  await channel.assertQueue(queueName);

  return channel;
};
