import { User } from "@/shared/types";
import { createContext, ReactNode } from "react";

export interface ContextValue {
  user: User | undefined;
}

export const AuthContext = createContext<ContextValue>({
  user: undefined,
});

export const AuthContextProvider = ({
  children,
  user,
}: {
  children: ReactNode;
  user: User;
}) => {
  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
};
