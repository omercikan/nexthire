"use client";

import ListItem from "@/components/helpers/ListItem";
import SectionHeader from "@/components/SectionHeader";
import { categories } from "@/data/categories";
import { routeFormatter } from "@/lib/routeFormat";
import { RootState } from "@/lib/store";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const Categories = () => {
  const { employers } = useSelector((state: RootState) => state.employers);

  return (
    <div className="container pt-[70px] pb-[100px]">
      <SectionHeader
        title="Kategorilere Göz At"
        subtitle="Farklı alanlardaki iş fırsatlarını keşfedin ve size en uygun olanı bulun."
        linkText="Tümünü Gör"
        link="/is-ilanlari"
      />

      <ul className="category-list x-scrollbar">
        {categories.map((category) => (
          <Link
            href={`/is-ilanlari/?${new URLSearchParams({
              meslek: routeFormatter(category.name),
            })}`} 
            key={category.id}
            className="w-full"
          >
            <ListItem
              itemClass="category-list-item group"
              itemWrapperClass="category-list-item-wrapper"
              itemTextClass="category-item-text"
              content={{
                name: category.name,
                icon: category.icon,
              }}
              subtext={`${
                employers.filter(
                  (employer) => employer.serviceArea == category.name
                ).length
              } açık pozisyon`}
              subTextClass="category-subtext"
            />
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
