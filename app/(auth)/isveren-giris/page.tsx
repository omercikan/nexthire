import React from "react";
import EmployerForm from "../components/employer/EmployerForm";
import EmployeProcessSection from "../components/employer/EmployeProcessSection";
import GoBack from "@/components/GoBack";

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
