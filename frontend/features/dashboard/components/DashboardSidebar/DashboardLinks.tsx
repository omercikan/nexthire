import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import DashboardLinkItem from "./DashboardLinkItem";
import { useSelector } from "react-redux";
import { RootState } from "@/shared/redux/store";
import { DashboardLinkItem as DashboardLinkItemTypes } from "../../types/dashboard.types";

const DashboardLinks = ({ links }: { links: DashboardLinkItemTypes[] }) => {
  const pathname = usePathname();
  const visibleLinks = links.filter((link) => link.isRender !== false);
  const activeIndex = visibleLinks.findIndex(({ href }) => href === pathname);
  const collapseMenu = useSelector(
    (state: RootState) => state.userDashboard.collapseMenu
  );

  return (
    <div className="relative overflow-auto h-[calc(100vh-91.43px)]">
      {activeIndex !== -1 && (
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{
            position: "absolute",
            top: 60 * activeIndex,
            left: 0,
            width: "6px",
            height: "60px",
            borderTopRightRadius: "200px",
            borderBottomRightRadius: "200px",
            backgroundColor: "#1814F3",
          }}
        />
      )}

      <ul className={`p-4 pe-0 pt-0 text-center ${collapseMenu ? "ps-3" : ""}`}>
        {visibleLinks.map(({ linkId, href, icon: Icon, linkText }) => (
          <DashboardLinkItem
            key={linkId}
            href={href}
            icon={Icon}
            linkId={linkId}
            linkText={linkText}
          />
        ))}
      </ul>
    </div>
  );
};

export default DashboardLinks;
