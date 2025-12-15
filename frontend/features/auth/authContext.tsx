import { LayoutComponentProps, User } from "@/shared/types";
import { createContext } from "react";
import { useGetUserQuery } from "./services/auth-service";
import Loading from "@/shared/components/ui/Loading";
import { useSession } from "next-auth/react";
import { skipToken } from "@reduxjs/toolkit/query";

export interface ContextValue {
  user: User | undefined;
  refetch: () => unknown;
}

export const AuthContext = createContext<ContextValue>({
  user: undefined,
  refetch: () => {},
});

export const AuthContextProvider = ({ children }: LayoutComponentProps) => {
  const { data: session, status } = useSession();
  const { data, isLoading, refetch } = useGetUserQuery(
    status === "loading" || status === "authenticated" ? skipToken : ""
  );

  if (isLoading || status === "loading") return <Loading />;

  return (
    <AuthContext.Provider
      value={{
        user: (session?.user as User) || data,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
