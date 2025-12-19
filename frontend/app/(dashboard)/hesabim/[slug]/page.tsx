"use client";

import CandidateOverviewPage from "@/features/dashboard/candidate/OverviewPage/OverviewPage";
import CandidateProfile from "@/features/dashboard/candidate/Profile/Profile";
import CandidateResume from "@/features/dashboard/candidate/Resumes/components/Resume/CandidateResume";
import EmployerShareJob from "@/features/dashboard/employer/ShareJob/ShareJob";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const DashboardContent = () => {
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.backgroundColor = "#F5F7FA";
  }, []);

  const routes = [
    {
      path: "/hesabim/genel-bakis",
      renderComponent: <CandidateOverviewPage />,
      role: "candidate",
    },

    {
      path: "/hesabim/profilim",
      renderComponent: <CandidateProfile />,
      role: "candidate",
    },

    {
      path: "/hesabim/ozgecmislerim",
      renderComponent: <CandidateResume />,
      role: "candidate",
    },

    {
      path: "/hesabim/is-paylas",
      renderComponent: <EmployerShareJob />,
      role: "employer",
    },
  ];

  const activeComponent = routes.find((r) => pathname === r.path);

  return (
    <main className="p-8 max-sm:p-4 max-sm:mt-[77.78px] bg-[#F5F7FA] relative">
      {activeComponent?.renderComponent}

      {/* {pathname === "/hesabim/genel-bakis" && <CandidateOverviewPage />}
      {pathname === "/hesabim/profilim" && <CandidateProfile />}
      {pathname === "/hesabim/ozgecmislerim" && <CandidateResume />} */}
    </main>
  );
};

export default DashboardContent;
