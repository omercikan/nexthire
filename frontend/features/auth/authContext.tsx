import { auth, db } from "@/app/api/firebase/firebaseConfig";
import { LayoutComponentProps, User } from "@/shared/types";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export interface ContextValue {
  user: User | undefined;
}

export const AuthContext = createContext<ContextValue>({
  user: undefined,
});

export const AuthContextProvider = ({ children }: LayoutComponentProps) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      const q = query(collection(db, "users"), where("id", "==", user?.uid));

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setCurrentUser(doc.data() as User);
        });
      });

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
