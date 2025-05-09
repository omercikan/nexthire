import React from "react";
import SubscribeForm from "./SubscribeForm";
import SubscribeContent from "./SubscribeContent";

const SubscribeSection = () => {
  return (
    <section className="bg-[#f5f2ea] py-[45px] max-lg:py-5">
      <div className="container flex max-lg:flex-col max-lg:gap-y-[25px] justify-between">
        <SubscribeContent />
        <SubscribeForm />
      </div>
    </section>
  );
};

export default SubscribeSection;
