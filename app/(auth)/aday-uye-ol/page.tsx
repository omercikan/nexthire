"use client";

import React, { useState } from "react";
import AuthImage from "../components/AuthImage";
import TermsModal from "../components/TermsModal";
import GoBack from "@/components/GoBack";
import CandidateForm from "../components/candidate/CandidateForm";

const CandidateSignup = () => {
  const [termsModal, setTermsModal] = useState<boolean>(false);

  return (
    <>
      <div className="flex max-[1026px]:flex-col gap-x-16 max-[1026px]:bg-[#F1F6FF] max-[1026px]:h-screen">
        <GoBack position="top-[25px] right-[100px]" url="/" />

        <AuthImage text="Kariyer Yolculuğuna Bizimle Başla" />

        <CandidateForm setTermsModal={setTermsModal} />
      </div>

      <TermsModal termsModal={termsModal} setTermsModal={setTermsModal} />
    </>
  );
};

export default CandidateSignup;
