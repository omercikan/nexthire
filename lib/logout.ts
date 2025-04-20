import { auth } from "@/app/api/firebase/firebaseConfig";
import { signOut } from "firebase/auth";
import { DeleteCookie } from "./deleteCookie";

export const handleLogout = async () => {
  await signOut(auth);
  DeleteCookie("VV9SVA", "VVLOPQS");
  window.location.href = "/isveren-giris";
};
