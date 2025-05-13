import { auth, provider } from "@/app/api/firebase/firebaseConfig";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { setUserDatabase } from "./setUserDatabase";

export const signInWithGoogleRedirect = async () => {
  await signInWithRedirect(auth, provider);
};

export const SignInWithGooglePopup = async () => {
  try {
    const credential = await signInWithPopup(auth, provider);

    if (credential.user) {
      toast.success(
        window.location.pathname === "/aday-uye-ol"
          ? "Kayıt başarılı!"
          : "Giriş başarılı!"
      );

      document.cookie = `VV9SVA=${btoa(credential.user.refreshToken)}`;

      const createdData = {
        cid: credential.user.uid,
        displayName: credential.user.displayName,
        acceptedTerms: `${credential.user.displayName} adlı Kullanıcı, kullanım şartlarını kabul ettiğini ve bu şartlara uygun hareket edeceğini beyan eder.`,
        email: credential.user.email,
        candidatePhoto: credential.user.photoURL,
        emailVerified: credential.user.emailVerified,
        createdWith: "Google Provider",
        role: "candidate",
      };

      await setUserDatabase("candidates", credential, createdData);
      await setUserDatabase("users", credential, createdData);

      setTimeout(() => {
        redirect("/");
      }, 2000);
    }
  } catch (error) {
    if (error instanceof Error)
      switch (error.message) {
        case "Firebase: Error (auth/popup-closed-by-user).":
          return toast.error(
            window.location.pathname === "/aday-uye-ol"
              ? "Kayıt başarısız!"
              : "Giriş başarısız!"
          );
      }
  }
};
