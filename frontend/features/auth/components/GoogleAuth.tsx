import { usePathname } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

const GoogleAuth = () => {
  const pathname = usePathname();

  const handleSignInGoogle = () => {
    signIn("google", {
      callbackUrl: "/",
    });
  };

  return (
    <div className="mt-5 min-[1026]:mr-40">
      <button
        className="relative py-2.5 border border-[#4045EF] text-[#4045EF] hover:bg-[#E3E3FF] transition duration-300 w-full rounded-full"
        onClick={handleSignInGoogle}
      >
        <FcGoogle
          className="absolute left-3 top-[50%] -translate-y-[50%] drop-shadow-2xl"
          size={20}
        />
        {pathname === "/aday-uye-ol"
          ? "Google ile kaydol"
          : "Google ile giriş yap"}
      </button>
    </div>
  );
};

export default GoogleAuth;
