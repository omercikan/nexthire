"use client";

import React, { useEffect } from "react";
import GoBack from "@/components/GoBack";
import AuthImage from "../components/AuthImage";
import CandidateForm from "../components/candidate/CandidateForm";
import toast from "react-hot-toast";

const CandidateLogin = () => {
  useEffect(() => {
    toast.dismiss("favorite-toast");
    document.body.style.overflow = "visible";
  }, []);

  return (
    <main className="flex max-[1026px]:flex-col gap-x-16 max-[1026px]:bg-[#F1F6FF] max-[1026px]:h-screen">
      <GoBack position="top-[60px] right-[100px]" url="/" />

      <AuthImage text="Tekrar Hoş Geldin! Kariyerin Seni Bekliyor" />

      <CandidateForm />
    </main>
  );
};

export default CandidateLogin;
