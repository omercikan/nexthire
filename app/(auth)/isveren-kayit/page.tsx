import React from "react";
import EmployerForm from "../components/employer/EmployerForm";
import EmployeProcessSection from "../components/employer/EmployeProcessSection";
import GoBack from "@/components/GoBack";

const EmpolyerSignup = () => {
  return (
    <main className="flex max-[1025px]:flex-col">
      <GoBack position="top-[20px] right-[30px]" url="/" />

      <EmployeProcessSection />

      <EmployerForm />
    </main>
  );
};

export default EmpolyerSignup;
