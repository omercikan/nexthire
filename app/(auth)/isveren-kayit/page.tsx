import React from "react";
import EmployerForm from "../components/employer/EmployerForm";
import EmployeProcessSection from "../components/employer/EmployeProcessSection";

const EmpolyerSignup = () => {
  return (
    <main className="flex max-[1025px]:flex-col">
      <EmployeProcessSection />

      <EmployerForm />
    </main>
  );
};

export default EmpolyerSignup;
