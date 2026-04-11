"use client";

import { AuthContext } from "@/features/auth/authContext";
import CandidateOverviewPage from "@/features/dashboard/candidate/OverviewPage/OverviewPage";
import CandidateProfile from "@/features/dashboard/candidate/Profile/CandidateProfile";
import CandidateResume from "@/features/dashboard/candidate/Resumes/components/Resume/CandidateResume";
import EmployerOverview from "@/features/dashboard/employer/Overview/components/Overview";
import EmployerProfile from "@/features/dashboard/employer/Profile/EmployerProfile";
import EmployerShareJob from "@/features/dashboard/employer/ShareJob/ShareJob";
import { usePathname } from "next/navigation";
import { useContext, useEffect } from "react";

const DashboardContent = () => {
  const pathname = usePathname();
  const { user } = useContext(AuthContext);

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
      path: "/hesabim/genel-bakis",
      renderComponent: <EmployerOverview />,
      role: "employer",
    },

    {
      path: "/hesabim/profilim",
      renderComponent: <CandidateProfile />,
      role: "candidate",
    },

    {
      path: "/hesabim/profilim",
      renderComponent: <EmployerProfile />,
      role: "employer",
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

  const activeComponent = routes.find(
    (r) => pathname === r.path && user?.role === r.role,
  );

  return (
    <main className="p-8 max-sm:p-4 max-sm:mt-[77.78px] bg-[#F5F7FA] relative">
      {activeComponent?.renderComponent}
    </main>
  );
};

export default DashboardContent;
