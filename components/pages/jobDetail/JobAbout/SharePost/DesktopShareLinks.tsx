import { Tooltip } from "@mui/material";
import Link from "next/link";
import React, { ReactNode } from "react";

const DesktopShareLinks = ({
  links,
}: {
  links: {
    url: string;
    platform: string;
    icon: ReactNode;
    className: string;
    tooltipTitle: string;
  }[];
}) => {
  return (
    <div className="flex gap-x-1.5">
      {links.map(({ platform, url, icon, className, tooltipTitle }) => (
        <Tooltip
          key={platform}
          title={tooltipTitle}
          arrow
          placement="top"
          slotProps={{
            tooltip: {
              sx: {
                backgroundColor: "#000",
              },
            },
            arrow: {
              sx: {
                color: "#000",
              },
            },
          }}
        >
          <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center px-7 py-2 rounded-lg text-sm text-white gap-x-2 ${
              className ?? ""
            }`}
          >
            {icon}
            {platform}
          </Link>
        </Tooltip>
      ))}
    </div>
  );
};

export default DesktopShareLinks;
