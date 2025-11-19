"use client";

import OverviewPage from "@/features/dashboard/candidate/OverviewPage/OverviewPage";
import Profile from "@/features/dashboard/candidate/Profile/Profile";
import CandidateResume from "@/features/dashboard/candidate/Resumes/components/Resume/CandidateResume";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const DashboardContent = () => {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.backgroundColor = "#F5F7FA";
  }, []);

  return (
    <main className="p-8 max-sm:p-4 max-sm:mt-[77.78px] bg-[#F5F7FA] h-[calc(100vh-82.8px)] relative">
      {pathname === "/hesabim/genel-bakis" && <OverviewPage />}
      {pathname === "/hesabim/profilim" && <Profile />}
      {pathname === "/hesabim/ozgecmislerim" && <CandidateResume />}
    </main>
  );
};

export default DashboardContent;
