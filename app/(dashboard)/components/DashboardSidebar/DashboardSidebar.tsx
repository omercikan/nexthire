"use client";

import React, { useEffect } from "react";
import { DASHBOARD_ICONS } from "../../icons/dashboard-icons";
import DashboardLinks from "./DashboardLinks";
import DashboardCollapse from "./DashboardCollapse";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { motion } from "framer-motion";
import {
  setSmallBreakpoint,
  setSmallScreenMenu,
} from "@/lib/redux/features/dashboard/userDashboardSlice";
import SidebarImage from "./SidebarImage";
import { IoClose } from "react-icons/io5";

const DashboardSidebar = () => {
  const { collapseMenu, breakpoint, smallScreenMenu } = useSelector(
    (state: RootState) => state.userDashboard
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleSmallScreenMenu = () => {
    document.body.style.overflow = "visible";
    dispatch(setSmallScreenMenu());
  };

  useEffect(() => {
    const onResize = () => {
      dispatch(setSmallBreakpoint(window.innerWidth));
    };

    onResize();
    window.addEventListener("resize", onResize);

    return () => {
      onResize();
      window.removeEventListener("resize", onResize);
    };
  }, [dispatch]);

  return (
    <motion.aside
      initial={{ width: collapseMenu ? 76 : 250 }}
      animate={{ width: collapseMenu ? 76 : 250 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`border-e border-e-[#E6EFF5] relative flex-none sidebar-full max-sm:fixed left-0 max-sm:h-full max-sm:!w-full max-sm:transition-all max-sm:duration-300 max-[992px]:!w-[76px] z-20 bg-white ${
        smallScreenMenu ? "max-sm:left-0" : "max-sm:-left-full"
      } `}
    >
      <DashboardCollapse />

      <div className="py-4 pb-8 max-sm:flex max-sm:justify-between">
        {collapseMenu ? (
          <SidebarImage
            isSmallLogo={true}
            width={32}
            height={32}
            imageClassName="ms-[27px]"
            linkClassName="max-[992px]:hidden"
          />
        ) : (
          <SidebarImage
            isSmallLogo={false}
            width={153}
            height={53}
            imageClassName="mx-auto"
            linkClassName="max-[992px]:hidden"
          />
        )}

        <SidebarImage
          isSmallLogo={true}
          width={32}
          height={32}
          imageClassName="ms-[27px]"
          linkClassName="min-[992px]:hidden max-sm:hidden"
        />

        <SidebarImage
          isSmallLogo={false}
          width={153}
          height={53}
          imageClassName="ms-[27px]"
          linkClassName="min-sm:hidden"
        />

        {breakpoint < 640 && (
          <button
            className="pe-8 min-sm:hidden"
            aria-label="Menüyü Kapat"
            onClick={handleSmallScreenMenu}
          >
            <IoClose size={28} />
          </button>
        )}
      </div>

      <DashboardLinks
        links={[
          {
            linkId: 1,
            href: "/hesabim/genel-bakis",
            icon: DASHBOARD_ICONS.home,
            linkText: "Genel Bakış",
          },

          {
            linkId: 2,
            href: "/hesabim/profilim",
            icon: DASHBOARD_ICONS.profile,
            linkText: "Profilim",
          },

          {
            linkId: 3,
            href: "/hesabim/ozgecmislerim",
            icon: DASHBOARD_ICONS.resume,
            linkText: "Özgeçmişlerim",
          },

          {
            linkId: 4,
            href: "/hesabim/basvurularim",
            icon: DASHBOARD_ICONS.megaphone,
            linkText: "Başvurularım",
          },

          {
            linkId: 5,
            href: "/hesabim/favorilerim",
            icon: DASHBOARD_ICONS.favorite,
            linkText: "Favorilerim",
          },

          {
            linkId: 6,
            href: "/hesabim/is-uyarilari",
            icon: DASHBOARD_ICONS.alert,
            linkText: "Uyarılar",
          },

          {
            linkId: 7,
            href: "/hesabim/mesajlar",
            icon: DASHBOARD_ICONS.messages,
            linkText: "Mesajlar",
          },

          {
            linkId: 8,
            href: "/hesabim/toplantilar",
            icon: DASHBOARD_ICONS.meet,
            linkText: "Toplantılar",
          },

          {
            linkId: 9,
            href: "/hesabim/ayarlar",
            icon: DASHBOARD_ICONS.settings,
            linkText: "Ayarlar",
          },
        ]}
      />
    </motion.aside>
  );
};

export default DashboardSidebar;
