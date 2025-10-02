import Link from "next/link";
import React, { ReactNode } from "react";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

const CopyrightSocial = ({
  socials,
}: {
  socials: { link: string; icon: ReactNode; title: string }[];
}) => {
  return (
    <ul className="flex gap-[35px] max-md:gap-[15px]">
      {socials.map((social, index) => (
        <li key={index}>
          <Tooltip
            title={social.title}
            arrow
            placement="top"
            slots={{
              transition: Zoom,
            }}
            slotProps={{
              tooltip: {
                sx: {
                  backgroundColor: "#4045ef",
                },
              },
              arrow: {
                sx: {
                  color: "#4045ef",
                },
              },
            }}
          >
            <Link href={social.link} target="_blank" rel="noopener noreferrer">
              {social.icon}
            </Link>
          </Tooltip>
        </li>
      ))}
    </ul>
  );
};

export default CopyrightSocial;
