import { connectRedis } from "../../config/redis";

const TTL = 60 * 15;

const getRedis = () => connectRedis.getClient();

export const setUserCache = async (userId: string, user: object) => {
  await getRedis().set(`user:${userId}`, JSON.stringify(user), "EX", TTL);
};

export const getUserCache = async (userId: string) => {
  const cached = await getRedis().get(`user:${userId}`);
  return cached ? JSON.parse(cached) : null;
};

export const deleteUserCache = async (userId: string) => {
  await getRedis().del(`user:${userId}`);
};
