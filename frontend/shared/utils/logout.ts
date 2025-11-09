import axios from "axios";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

export const handleLogout = async (provider: "Google" | "Form") => {
  try {
    switch (provider) {
      case "Google":
        await signOut({ callbackUrl: "/" });
        break;
      case "Form":
        const response = await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
          {
            withCredentials: true,
          }
        );

        if (response.status === 200) {
          window.location.href = "/";
        } else {
          toast.error("Oturum kapatılamadı, lütfen tekrar deneyin.");
        }
        break;
      default:
        toast.error("Uygunsuz çıkış tespit edildi.");
        break;
    }
  } catch (err) {
    console.error("Logout error:", err);
    toast.error("Oturum kapatılamadı, lütfen tekrar deneyin.");
  }
};
