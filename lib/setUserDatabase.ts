import { db } from "@/app/api/firebase/firebaseConfig";
import { User } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";

export const setUserDatabase = async (
  pathname: string,
  userCredential: { user: User },
  ...data: object[]
) => {
  await setDoc(
    doc(db, pathname, userCredential?.user.uid),
    {
      ...data[0],
      createdAt: new Date(Timestamp.now().seconds * 1000).toLocaleDateString(
        "tr"
      ),
    },
    { merge: true }
  );
};
