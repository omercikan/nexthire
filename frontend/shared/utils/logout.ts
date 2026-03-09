import axios from "axios";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

export const handleLogout = async (userId: string) => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
      { withCredentials: true, headers: { "x-user-id": userId } },
    );

    if (response.status === 200) {
      if (response.data.provider === "Google") {
        await signOut({ callbackUrl: "/" });
      } else {
        window.location.replace("/");
      }
    } else {
      toast.error("Oturum kapatılamadı, lütfen tekrar deneyin.");
    }
  } catch (error) {
    console.error(error);
    toast.error("Oturum kapatılamadı, lütfen tekrar deneyin.");
  }
};
