import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: "800",
});

const AuthImage = ({ text }: { text: string }) => {
  return (
    <section className="auth__image auth-bg-image">
      <div className="relative h-screen select-none">
        <h1 className={`${inter.className} auth__title gradient-text`}>
          {text}
        </h1>
      </div>
    </section>
  );
};

export default AuthImage;
