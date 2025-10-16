import Success from "@/shared/components/ui/Success";
import Link from "next/link";
import React from "react";
import { HiMiniCheckCircle } from "react-icons/hi2";

const RegisteredMessage = () => {
  return (
    <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-center w-full px-7 max-sm:px-4">
      <Success
        icon={
          <HiMiniCheckCircle
            className="rounded-full w-full"
            color="17A31A"
            size={66}
          />
        }
        title="Başvurunuz başarıyla alındı!"
        subtitle="Kayıt işlemini tamamlamak için e-posta adresinize gönderdiğimiz bağlantıya tıklayarak şifrenizi belirleyin."
      />

      <Link href="/isveren-giris">
        <button className="custom__button w-full mt-4">Giriş Yap</button>
      </Link>
    </div>
  );
};

export default RegisteredMessage;
