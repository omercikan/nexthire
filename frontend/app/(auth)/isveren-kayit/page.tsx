import React from "react";
import EmployeProcessSection from "@/features/auth/components/employer/EmployeProcessSection";
import EmployerForm from "@/features/auth/components/employer/EmployerForm";
import GoBack from "@/shared/components/ui/GoBack";

const EmpolyerSignup = () => {
  return (
    <main className="flex max-[1025px]:flex-col">
      <EmployeProcessSection />

      <div className="flex-[1] relative">
        <GoBack position="top-[20px] max-sm:top-[15px] max-sm:bg-white w-max max-sm:left-[10px] left-[25px]" url="/" />
        <EmployerForm />
      </div>
    </main>
  );
};

export default EmpolyerSignup;
