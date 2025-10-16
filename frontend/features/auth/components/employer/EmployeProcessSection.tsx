"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FeatureItem from "../FeatureItem";

const EmployeProcessSection = () => {
  const pathname: string = usePathname();

  return (
    <section className="bg-[#F2F4F7] flex-[1] flex flex-col justify-center py-12 px-8 max-sm:px-4 max-sm:hidden">
      <h1 className="text-5xl max-[430px]:text-3xl font-bold">
        <span className="text-[#4045ef]">NextHire </span>
        ile İşe Alım Sürecinizi Kolaylaştırın
      </h1>

      <ul className="my-6">
        <FeatureItem
          text={
            pathname === "/isveren-kayit"
              ? "Hızlı ve etkili aday seçimi yapın"
              : "İlanlarınızı yönetin ve başvuruları takip edin"
          }
        />
        <FeatureItem
          text={
            pathname === "/isveren-kayit"
              ? "İş ilanlarınızı anında yayınlayın"
              : "Adaylara hızlıca dönüş yapın"
          }
        />
        <FeatureItem
          text={
            pathname === "/isveren-kayit"
              ? "Aday başvurularını kolayca yönetebilirsiniz"
              : "Panel üzerinden işe alım sürecinizi yönetin"
          }
        />
        {pathname === "/isveren-kayit" && (
          <FeatureItem text="Uygun adaylarla hemen iletişime geçin" />
        )}
      </ul>

      <p className="text-[#344054] max-[430px]:text-sm">
        {pathname === "/isveren-kayit"
          ? "Bir sorun mu yaşıyorsunuz?"
          : "Girişte sorun mu yaşıyorsunuz?"}
        <Link href="#" className="text-[#4045ef] font-semibold cursor-pointer">
          {" "}
          Yardım merkezimizle
        </Link>{" "}
        hemen iletişime geçin.
      </p>
    </section>
  );
};

export default EmployeProcessSection;
