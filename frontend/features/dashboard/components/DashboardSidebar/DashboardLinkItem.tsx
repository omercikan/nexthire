import { AppDispatch, RootState } from "@/shared/redux/store";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DashboardLinkItemProps } from "../../types/dashboard.types";
import { setActiveText } from "../../slices/userDashboardSlice";

const DashboardLinkItem = ({
  linkId,
  href,
  linkText,
  icon: Icon,
  activeLinkFunc,
  pathname,
}: DashboardLinkItemProps) => {
  const { collapseMenu, breakpoint } = useSelector(
    (state: RootState) => state.userDashboard
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const findActiveText = href === pathname ? linkText : "";
    if (findActiveText) {
      dispatch(setActiveText(findActiveText));
    }
  }, [dispatch, href, pathname, linkText]);

  return (
    <li key={linkId}>
      <Link
        href={href}
        aria-label={`${linkText} Bölümüne Git`}
        className={`h-[60px] ps-4 w-full flex items-center gap-5 font-medium text-lg transition-colors duration-300 hover:text-[#1814F3] ${
          pathname === href ? "text-[#1814F3]" : "text-[#55557C]"
        }`}
        onClick={activeLinkFunc}
      >
        <Icon size={25} />

        {!collapseMenu && (
          <strong className="text-[16px] font-medium max-[992px]:hidden">
            {linkText}
          </strong>
        )}

        {breakpoint < 640 && (
          <strong className="text-[16px] font-medium min-sm:hidden">
            {linkText}
          </strong>
        )}
      </Link>
    </li>
  );
};

export default DashboardLinkItem;
