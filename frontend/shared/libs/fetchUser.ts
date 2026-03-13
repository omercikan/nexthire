import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
import { User } from "../types";
import { cookies } from "next/headers";

export const fetchUser = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const googleUser = (await getServerSession(authOptions)) as { user: User };

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`,
    {
      credentials: "include",
      headers: { Cookie: cookieHeader },
      cache: "no-store",
    },
  );

  const defaultUser = await response.json();

  return !defaultUser.message ? defaultUser : googleUser?.user;
};
