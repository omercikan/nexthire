"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { AuthContextProvider } from "@/features/auth/authContext";
import { SessionProvider } from "next-auth/react";
import AppLayout from "./layout/MainLayout";
import { User } from "../types";

const Providers = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) => {
  return (
    <Provider store={store}>
      <SessionProvider>
        <AuthContextProvider user={user}>
          <AppLayout>{children}</AppLayout>
        </AuthContextProvider>
      </SessionProvider>
    </Provider>
  );
};

export default Providers;
