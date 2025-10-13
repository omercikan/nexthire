import { LayoutComponentProps, User } from "@/shared/types";
import { createContext } from "react";
import { useGetUserQuery } from "./services/auth-service";
import Loading from "@/shared/components/ui/Loading";

export interface ContextValue {
  user: User | undefined;
}

export const AuthContext = createContext<ContextValue>({
  user: undefined,
});

export const AuthContextProvider = ({ children }: LayoutComponentProps) => {
  const { data, isLoading } = useGetUserQuery();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{
        user: data,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
