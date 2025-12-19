import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useState } from "react";
import DashboardLinkItem from "./DashboardLinkItem";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";
import { DashboardLinkItem as DashboardLinkItemTypes } from "../../types/dashboard.types";

const DashboardLinks = ({ links }: { links: DashboardLinkItemTypes[] }) => {
  const pathname = usePathname();
  const findLinkIndex = links.findIndex(({ href }) => href === pathname);
  const [activeLink, setActiveLink] = useState({
    pathname: pathname,
    currentHeight: findLinkIndex !== -1 ? 60 * findLinkIndex : 0,
  });
  const collapseMenu = useSelector(
    (state: RootState) => state.userDashboard.collapseMenu
  );

  const handleActiveLink = (href: string, index: number) => {
    setActiveLink({
      pathname: href,
      currentHeight: 60 * index,
    });
  };

  return (
    <div className="relative overflow-auto h-[calc(100vh-91.43px)]">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          position: "absolute",
          top: activeLink.currentHeight,
          left: 0,
          width: "6px",
          height: "60px",
          borderTopRightRadius: "200px",
          borderBottomRightRadius: "200px",
          backgroundColor: "#1814F3",
        }}
      />

      <ul className={`p-4 pe-0 pt-0 text-center ${collapseMenu ? "ps-3" : ""}`}>
        {links
          .filter(({ isRender }) => Boolean(isRender))
          .map(
            ({ linkId, href, icon: Icon, linkText, isRender = true }, index) =>
              isRender && (
                <DashboardLinkItem
                  key={linkId}
                  href={href}
                  icon={Icon}
                  linkId={linkId}
                  linkText={linkText}
                  activeLinkFunc={() => handleActiveLink(href, index)}
                  pathname={activeLink.pathname}
                />
              )
          )}
      </ul>
    </div>
  );
};

export default DashboardLinks;
