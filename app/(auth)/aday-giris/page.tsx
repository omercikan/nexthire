"use client";

import React from "react";
import AuthImage from "../components/AuthImage";
import AuthForm from "../components/AuthForm";
import GoBack from "@/components/GoBack";
import { IoClose } from "react-icons/io5";

const CandidateLogin = () => {
  return (
    <div className="flex max-[1026px]:flex-col gap-x-16 max-[1026px]:bg-[#F1F6FF] max-[1026px]:h-screen">
      <GoBack
        icon={
          <IoClose
            className="text-[32px] max-[1026px]:text-[46px]"
            color="899CC9"
          />
        }
        url="/"
        position="top-[60px] right-[100px]"
      />

      <AuthImage text="Tekrar Hoş Geldin! Kariyerin Seni Bekliyor" />

      <AuthForm />
    </div>
  );
};

export default CandidateLogin;
