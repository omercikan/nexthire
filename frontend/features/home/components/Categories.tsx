"use client";

import React from "react";
import { motion } from "framer-motion";
import useItemFilterText from "@/shared/hooks/useItemFilterText";
import { useGetFeaturedJobsQuery } from "@/shared/redux/services/featuredJobsApi";
import SectionHeader from "@/shared/components/SectionHeader/SectionHeader";
import ItemFilterText from "@/shared/components/ItemFilterText";
import { categories } from "@/shared/data/categories";

const Categories = () => {
  const { data } = useGetFeaturedJobsQuery("");
  const { applyItemFilter } = useItemFilterText();

  return (
    <motion.div
      className="container pt-[70px] max-lg:pt-[20px] max-lg:pb-[35px] pb-[100px]"
      initial={{ translateY: 50, scale: 0.8, opacity: 0 }}
      whileInView={{ translateY: 0, scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <SectionHeader
        title="Kategorilere Göz At"
        subtitle="Farklı alanlardaki iş fırsatlarını keşfedin ve size en uygun olanı bulun."
        linkText="Tümünü Gör"
        link="/is-ilanlari"
      />

      <ul className="category-list x-scrollbar max-md:mask-x-from-70%">
        {categories.map((category) => (
          <li key={category.id} className="group">
            <ItemFilterText
              handleClick={() => applyItemFilter(category?.name, true, false)}
              redirect="/is-ilanlari"
              linkClassName="category-list-item w-full"
            >
              <div className="category-list-item-wrapper">
                <category.icon size={40} color="202124" />
              </div>
              <h1 className="category-item-text">{category?.name}</h1>
              <span className="category-subtext">
                ({" "}
                {`${
                  data?.employers.filter(
                    (employer) =>
                      employer.companyInformations.serviceArea == category.name
                  ).length
                } açık pozisyon`}{" "}
                )
              </span>
            </ItemFilterText>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Categories;
