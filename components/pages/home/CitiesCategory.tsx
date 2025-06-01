"use client";

import SectionHeader from "@/components/SectionHeader";
import { citiesCategory } from "@/data/citiesCategory";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { useGetFeaturedJobsQuery } from "@/lib/redux/services/featuredJobsApi";
import ItemFilterText from "@/components/ItemFilterText";
import useItemFilterText from "@/hooks/useItemFilterText";

const CitiesCategory = () => {
  const { data } = useGetFeaturedJobsQuery("");
  const { applyItemFilter } = useItemFilterText();

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
              <ItemFilterText
                redirect="/is-ilanlari"
                handleClick={() => applyItemFilter(city?.cityName, false, true)}
                linkClassName="inline-block w-full"
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
              </ItemFilterText>
            </li>
          ))}
        </ul>
      </div>
    </motion.section>
  );
};

export default CitiesCategory;
