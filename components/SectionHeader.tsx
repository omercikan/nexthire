import React from "react";
import HoverStyles from "@/scss/components/hover-animation.module.scss";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { SectionHeaderProps } from "@/types";

const SectionHeader = ({
  title,
  subtitle,
  link,
  linkText,
}: SectionHeaderProps) => {
  return (
    <section className="flex max-sm:flex-col gap-y-[15px] justify-between max-sm:justify-start items-center max-sm:items-start py-[15px]">
      <div className="text-[#202124]">
        <h1 className="text-3xl max-[992px]:text-2xl font-medium">{title}</h1>
        <p className="text-[15px] leading-7">{subtitle}</p>
      </div>

      <div>
        <Link
          href={link}
          className={`${HoverStyles.hoverAnimation} flex items-center gap-1 text-[#202124] text-[15px] whitespace-nowrap`}
        >
          {linkText}
          <GoArrowUpRight />
        </Link>
      </div>
    </section>
  );
};

export default SectionHeader;
