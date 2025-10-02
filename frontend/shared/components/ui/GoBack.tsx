"use client";

import { GoBackProps } from "@/shared/types";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { HiOutlineArrowLeft } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

const GoBack = ({ position, url }: GoBackProps) => {
  const router = useRouter();
  const pathaname = usePathname();

  return (
    <div
      className={`absolute max-[1026px]:top-12 max-[1026px]:right-6 rounded-full z-30 ${
        position ? position : ""
      }`}
    >
      <button
        onClick={() =>
          pathaname === "/sifre-sifirla"
            ? router.back()
            : router.replace(String(url))
        }
      >
        {pathaname === "/sifre-sifirla" ? (
          <HiOutlineArrowLeft
            className="text-[28px] max-[1026px]:text-[46px]"
            color="899CC9"
          />
        ) : (
          <IoClose
            className="text-[32px] max-[1026px]:text-[46px]"
            color="899CC9"
          />
        )}
      </button>
    </div>
  );
};

export default GoBack;
