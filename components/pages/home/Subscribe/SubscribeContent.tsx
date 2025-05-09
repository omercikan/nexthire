import React from "react";

const SubscribeContent = () => {
  return (
    <div className="flex-[1.7] max-[1280px]:flex-[1.5] text-[#202124]">
      <h1 className="text-3xl max-lg:text-[25px] font-medium">
        📬 Kariyer Bültenimize Katılın
      </h1>

      <p className="text-[15px] mt-3">
        En güncel iş ilanları, kariyer ipuçları ve özel fırsatlarla dolu
        bültenimizi kaçırmayın.
        <br className="max-[1280px]:hidden" /> Sadece e-postanızı bırakın,
        gerisini biz halledelim.
      </p>
    </div>
  );
};

export default SubscribeContent;
