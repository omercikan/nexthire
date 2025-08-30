import { ReactNode } from "react";
import DashboardHeader from "../components/DashboardHeader/DashboardHeader";
import DashboardSidebar from "../components/DashboardSidebar/DashboardSidebar";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  fallback: ["sans-serif"],
});

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={`flex flex-row-reverse ${inter.className}`}>
      <div className="flex-[calc(100%-250px)]">
        <DashboardHeader />
        {children}
      </div>
      <DashboardSidebar />
    </div>
  );
}

export default Layout;
