import React from "react";
import EmployerForm from "@/features/auth/components/employer/EmployerForm";
import EmployeProcessSection from "@/features/auth/components/employer/EmployeProcessSection";
import GoBack from "@/shared/components/ui/GoBack";

const EmployerLogin = () => {
  return (
    <main className="flex max-[1025px]:flex-col">
      <GoBack position="top-[60px] right-[60px]" url="/" />
      <EmployeProcessSection />
      <EmployerForm />
    </main>
  );
};

export default EmployerLogin;
