"use client";

import React from "react";
import { HEADER_ICONS } from "../../icons/header-icons";
import HeaderNavigation from "./HeaderNavigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { FiMenu } from "react-icons/fi";
import { setSmallScreenMenu } from "@/lib/redux/features/dashboard/userDashboardSlice";

const DashboardHeader = () => {
  const { activeText, breakpoint } = useSelector(
    (state: RootState) => state.userDashboard
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleSmallScreenMenu = () => {
    document.body.style.overflow = "hidden";
    dispatch(setSmallScreenMenu());
  };

  return (
    <header className="flex items-center justify-between border-b border-[#E6EFF5] p-4 h-max max-sm:fixed max-sm:left-0 bg-white w-full z-10">
      {breakpoint < 640 && (
        <button
          onClick={handleSmallScreenMenu}
          aria-label="Menüyü Aç"
          className="min-sm:hidden"
        >
          <FiMenu color="343C6A" size={24} />
        </button>
      )}

      <h1 className="text-[#343C6A] font-medium text-[28px] max-[375px]:text-xl max-[460px]:text-[24px] sm:ps-4">
        {activeText}
      </h1>

      <HeaderNavigation
        navigations={[
          {
            navigationId: 1,
            href: "/hesabim/ayarlar",
            icon: HEADER_ICONS.setting,
            iconColor: "#718EBF",
            ariaLabel: "Ayarlara Git",
            className: "max-sm:!hidden",
          },

          {
            navigationId: 2,
            icon: HEADER_ICONS.notification,
            iconColor: "#FE5C73",
            ariaLabel: "Bildirimleri Gör",
            className: "max-sm:!hidden",
          },

          {
            navigationId: 3,
            icon: HEADER_ICONS.user,
            iconColor: "#374151",
            ariaLabel: "Profilime Git",
            className: "max-[460px]:!w-[45px] max-[460px]:!h-[45px]",
          },
        ]}
      />
    </header>
  );
};

export default DashboardHeader;
