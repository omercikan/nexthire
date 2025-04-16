"use client";

import React, { useState } from "react";
import AuthImage from "../components/AuthImage";
import TermsModal from "../components/TermsModal";
import GoBack from "@/components/GoBack";
import { IoClose } from "react-icons/io5";
import CandidateForm from "../components/candidate/CandidateForm";

const CandidateSignup = () => {
  const [termsModal, setTermsModal] = useState<boolean>(false);

  return (
    <>
      <div className="flex max-[1026px]:flex-col gap-x-16 max-[1026px]:bg-[#F1F6FF] max-[1026px]:h-screen">
        <GoBack
          icon={
            <IoClose
              className="text-[32px] max-[1026px]:text-[46px]"
              color="899CC9"
            />
          }
          position="top-[25px] right-[100px]"
        />

        <AuthImage text="Kariyer Yolculuğuna Bizimle Başla" />

        <CandidateForm setTermsModal={setTermsModal} />
      </div>

      <TermsModal termsModal={termsModal} setTermsModal={setTermsModal} />
    </>
  );
};

export default CandidateSignup;
