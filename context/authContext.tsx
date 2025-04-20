import { auth, db } from "@/app/api/firebase/firebaseConfig";
import { LayoutComponentProps, User } from "@/types";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";

export interface ContextValue {
  user: User | undefined;
  loading: boolean;
}

export const AuthContext = createContext<ContextValue>({
  user: undefined,
  loading: false,
});

export const AuthContextProvider = ({ children }: LayoutComponentProps) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, "users", user?.uid);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            setCurrentUser(docSnap.data() as User);
          }
          setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user: currentUser, loading: loading }}>
      {children}
    </AuthContext.Provider>
  );
};
