import axios from "axios";
import { signOut } from "next-auth/react";

export const handleLogout = async () => {
  try {
    await axios.post("/api/auth/logout");
    await signOut({ callbackUrl: "/" });
  } catch (err) {
    console.error("Logout error:", err);
  }
};
