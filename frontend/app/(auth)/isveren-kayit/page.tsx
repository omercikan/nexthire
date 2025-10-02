import React from "react";
import EmployeProcessSection from "@/features/auth/components/employer/EmployeProcessSection";
import EmployerForm from "@/features/auth/components/employer/EmployerForm";
import GoBack from "@/shared/components/ui/GoBack";

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
