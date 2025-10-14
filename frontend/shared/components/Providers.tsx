"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { AuthContextProvider } from "@/features/auth/authContext";
import { SessionProvider } from "next-auth/react";
import AppLayout from "./layout/MainLayout";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <SessionProvider>
        <AuthContextProvider>
          <AppLayout>{children}</AppLayout>
        </AuthContextProvider>
      </SessionProvider>
    </Provider>
  );
};

export default Providers;
