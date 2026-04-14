import React from "react";
import { LuActivity } from "react-icons/lu";

const EmptyActivity = () => {
  return (
    <div className="flex flex-col justify-center h-[calc(100%-48px)] gap-2 items-center text-center">
      <div className="bg-[#eff2f5] rounded-xl w-10 h-10 max-lg:h-18.75 grid place-content-center">
        <LuActivity className="text-[22px] max-lg:text-[18px]" />
      </div>

      <h3 className="text-lg font-medium text-[#0f171f]">Son aktivite yok</h3>
      <p className="text-[#5b646f] text-sm w-80 max-[425px]:w-auto">
        Adaylar başvurduğunda veya incelendiğinde aktiviteler burada görünecek.
      </p>
    </div>
  );
};

export default EmptyActivity;
