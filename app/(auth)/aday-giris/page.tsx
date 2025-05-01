"use client";

import React, { useEffect } from "react";
import GoBack from "@/components/GoBack";
import { IoClose } from "react-icons/io5";
import AuthImage from "../components/AuthImage";
import CandidateForm from "../components/candidate/CandidateForm";
import toast from "react-hot-toast";

const CandidateLogin = () => {
  useEffect(() => {
    toast.dismiss("favorite-toast");
  }, []);

  return (
    <main className="flex max-[1026px]:flex-col gap-x-16 max-[1026px]:bg-[#F1F6FF] max-[1026px]:h-screen">
      <GoBack
        icon={
          <IoClose
            className="text-[32px] max-[1026px]:text-[46px]"
            color="899CC9"
          />
        }
        position="top-[60px] right-[100px]"
      />

      <AuthImage text="Tekrar Hoş Geldin! Kariyerin Seni Bekliyor" />

      <CandidateForm />
    </main>
  );
};

export default CandidateLogin;
