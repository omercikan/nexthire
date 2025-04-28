"use client";

import Image from "next/image";
import React, { useContext } from "react";
import PostingJobImage from "@/img/home/employer-banner.png";
import { GoArrowUpRight } from "react-icons/go";
import Link from "next/link";
import { AuthContext } from "@/context/authContext";

const PostingJob = () => {
  const { user } = useContext(AuthContext);

  return (
    <section className="bg-[#f5f2ea] pt-[100px] max-lg:pt-[30px] pb-[20px] max-lg:pb-0">
      <div className="flex max-md:flex-col items-center max-md:items-start justify-center gap-[80px] max-lg:gap-5 max-md:gap-4">
        <Image src={PostingJobImage} alt="İş ilanı ver" className="px-[15px]" />

        <div className="p-[15px]">
          <h1 className="text-[#202124] text-[40px] max-lg:text-[25px] font-medium mb-5">
            İş İlanı Vermek İstiyorum
          </h1>

          <p className="text-[#202124] text-[15px] mb-5 max-[1060px]:w-[350px] max-md:w-full">
            Tüm açık iş fırsatlarını keşfedin, size uygun maaş aralığını{" "}
            <br className="max-[1060px]:hidden" />
            öğrenin ve şirketler hakkında gerçek çalışan yorumlarını
            <br className="max-[1060px]:hidden" />
            okuyarak kariyerinizi şekillendirin.
          </p>

          <Link
            href={user && user.id ? "/dashboard/ilan-ver" : "/isveren-giris"}
          >
            <button
              className="hero-section-form__button flex items-center justify-center gap-x-2 !w-max max-lg:!rounded-lg max-md:!px-5"
              aria-label="İş ilanı verin"
            >
              Bir İş İlanı Verin
              <GoArrowUpRight size={20} />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PostingJob;
