import React from "react";
import EmployerForm from "@/features/auth/components/employer/EmployerForm";
import EmployeProcessSection from "@/features/auth/components/employer/EmployeProcessSection";
import GoBack from "@/shared/components/ui/GoBack";

const EmployerLogin = () => {
  return (
    <main className="flex max-[1025px]:flex-col">
      <EmployeProcessSection />

      <div className="flex-[1] relative">
        <GoBack position="top-[60px] left-[25px] max-sm:top-[25px] max-sm:left-[10px]" url="/" />
        <EmployerForm />
      </div>
    </main>
  );
};

export default EmployerLogin;
