import Link from "next/link";
import React from "react";
import { HeaderNavigationProps } from "../../dashboard.types";

const HeaderNavigation = ({ navigations }: HeaderNavigationProps) => {
  return (
    <div className="flex gap-7">
      {navigations.map(
        ({ href, icon: Icon, iconColor, navigationId, className, ariaLabel }) =>
          href ? (
            <Link
              key={navigationId}
              href={href}
              aria-label={ariaLabel}
              className={`dashboard-navigation-item ${className ?? ""}`}
            >
              <Icon size={25} color={iconColor} />
            </Link>
          ) : (
            <button
              type="button"
              key={navigationId}
              aria-label={ariaLabel}
              className={`dashboard-navigation-item ${className ?? ""}`}
            >
              <Icon
                className="text-[25px] max-[460px]:text-[22px]"
                color={iconColor}
              />
            </button>
          )
      )}
    </div>
  );
};

export default HeaderNavigation;
