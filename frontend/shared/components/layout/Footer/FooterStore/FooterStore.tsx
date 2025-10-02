import React, { useContext } from "react";
import { FaApple } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import StoreItem from "./StoreItem";
import StoreContent from "./StoreContent";
import { AuthContext } from "@/features/auth/authContext";

const FooterStore = () => {
  const { user } = useContext(AuthContext);

  return (
    <div
      className={`text-white max-xl:w-full mt-[20px] ${
        user ? "min-xl:flex-[1.5]" : ""
      }`}
    >
      <StoreContent />
      <div className="mt-5">
        <StoreItem
          icon={<FaApple size={30} />}
          storeLink="https://www.apple.com/tr/app-store/"
          storeText="App Store"
        />

        <StoreItem
          icon={<BiLogoPlayStore size={30} />}
          storeLink="https://play.google.com/store/"
          storeText="Play Store"
        />
      </div>
    </div>
  );
};

export default FooterStore;
