"use client";

import SectionHeader from "@/components/SectionHeader";
import { citiesCategory } from "@/data/citiesCategory";
import { routeFormatter } from "@/lib/routeFormat";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { useGetFeaturedJobsQuery } from "@/lib/redux/services/featuredJobs";

const CitiesCategory = () => {
  const { data } = useGetFeaturedJobsQuery("");

  return (
    <motion.section
      initial={{ translateY: 25, scale: 0.8, opacity: 0 }}
      whileInView={{ translateY: 0, scale: 1, opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="container py-[100px] max-lg:py-[30px]">
        <SectionHeader
          title="Popüler Şehirler"
          subtitle="Farklı şehirlerdeki iş imkanlarını keşfedin"
          link="/is-ilanlari"
          linkText="Tüm İşlere Göz Atın"
        />

        <ul className="grid grid-cols-6 max-lg:grid-cols-3 max-md:grid-cols-2 gap-3 items-center justify-between">
          {citiesCategory.map((city) => (
            <li key={city.id} className="group">
              <Link
                className="inline-block w-full"
                href={`/is-ilanlari/?${new URLSearchParams({
                  konum: routeFormatter(city.cityName),
                })}`}
              >
                <div className="pb-[15px] w-full">
                  <Image
                    src={city.cityImage}
                    alt={city.cityName}
                    width={189.99}
                    height={219.89}
                    className="w-full h-[219.89px] max-sm:!h-[160px] object-cover rounded-[18px] group-hover:opacity-90 transition duration-500"
                  />
                </div>
                <h1 className="category-item-text !text-left text-[18px]">
                  {city.cityName}
                </h1>
                <span className="category-subtext !text-[#202124]">
                  {
                    data?.employers.filter((employer) =>
                      employer.companyInformations.location.city.includes(
                        city.cityName
                      )
                    ).length
                  }{" "}
                  aktif iş
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

export default CitiesCategory;
