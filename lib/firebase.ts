import { auth, db, provider } from "@/app/api/firebase/firebaseConfig";
import { signInWithPopup, signInWithRedirect } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export const signInWithGoogleRedirect = async () => {
  await signInWithRedirect(auth, provider);
};

export const SignInWithGooglePopup = async () => {
  await signInWithPopup(auth, provider)
    .then((credential) => {
      if (credential?.user) {
        document.cookie = `VV9SVA=${btoa(credential.user.refreshToken)}`;

        setDoc(doc(db, "candidates", credential.user.uid), {
          cid: credential.user.uid,
          displayName: credential.user.displayName,
          acceptedTerms: `${credential.user.displayName} adlı Kullanıcı, kullanım şartlarını kabul ettiğini ve bu şartlara uygun hareket edeceğini beyan eder.`,
          email: credential.user.email,
          candidatePhoto: credential.user.photoURL,
          createdAt: new Date(
            Timestamp.now().seconds * 1000
          ).toLocaleDateString("tr"),
          emailVerified: credential.user.emailVerified,
          createdWith: "Google Provider",
        });

        setTimeout(() => {
          redirect("/");
        }, 2000);
      }
    })
    .catch(() => toast.error("Kayıt başarısız!"));
};
