import React from "react";
import EmployerForm from "../components/employer/EmployerForm";
import EmployeProcessSection from "../components/employer/EmployeProcessSection";

const EmployerLogin = () => {
  return (
    <main className="flex max-[1025px]:flex-col">
      <EmployeProcessSection />

      <EmployerForm />
    </main>
  );
};

export default EmployerLogin;
