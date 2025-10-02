"use client";

import { usePathname } from "next/navigation";
import React from "react";
import OverviewPage from "../candidate/OverviewPage/OverviewPage";
import Profile from "../candidate/Profile/Profile";

const DashboardClientWrapper = () => {
  const pathname = usePathname();

  return (
    <main className="p-8 max-sm:p-4 max-sm:mt-[77.78px] bg-[#F5F7FA] h-[calc(100%-82.8px)]">
      {pathname === "/hesabim/genel-bakis" && <OverviewPage />}
      {pathname === "/hesabim/profilim" && <Profile />}
    </main>
  );
};

export default DashboardClientWrapper;
