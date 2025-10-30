import { ClientSession } from "mongoose";
import { User } from "../models/User.ts";

export const createUser = async <T>(data: T, session?: ClientSession) => {
  const user = new User(data);
  await user.save({ session });
  return user;
};
