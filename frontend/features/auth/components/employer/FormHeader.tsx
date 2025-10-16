import Image from "next/image";
import React from "react";

const FormHeader = ({ pathname }: { pathname: string }) => {
  return (
    <div className="text-center">
      <Image
        src="https://res.cloudinary.com/dvolwkh6r/image/upload/v1744909581/nexthire_d27rhv.png"
        alt="Next Hire"
        className="mx-auto"
        quality={100}
        width={153}
        height={60}
      />

      <h2 className="text-2xl text-[#101828] font-semibold mt-6 mb-2">
        {pathname === "/isveren-kayit" ? "Kayıt Ol" : "İşveren Girişi"}
      </h2>

      <p className="text-[#475467]">
        {pathname === "/isveren-kayit"
          ? "İşveren hesabınızı oluşturmak için bilgilerinizi girin"
          : "Hesabınıza erişmek için giriş bilgilerinizi girin"}
      </p>
    </div>
  );
};

export default FormHeader;
