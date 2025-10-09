import React from "react";
import Header from "./Header";
import MobileUserModal from "./Header/MobileUserModal";
import Footer from "./Footer";
import { usePathname } from "next/navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  const protectedRoutes = [
    "/aday-giris",
    "/aday-uye-ol",
    "/isveren-giris",
    "/isveren-kayit",
    "/hesabim",
    "/sifre-sifirla",
  ];

  const startsProtectedRoute = protectedRoutes.some((val) =>
    pathname.startsWith(val)
  );

  return (
    <>
      {!startsProtectedRoute && <Header />}
      {children}
      {!startsProtectedRoute && <MobileUserModal />}
      {!startsProtectedRoute && <Footer />}
    </>
  );
};

export default MainLayout;
