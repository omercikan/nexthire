import { LayoutComponentProps } from "@/shared/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "NextHire | Şifreni Sıfırla",
  description:
    "NextHire platformunda şifrenizi sıfırlayın ve yeniden hesabınıza güvenli bir şekilde erişin. Kolay ve hızlı şifre sıfırlama işlemi ile iş arayışınıza devam edin.",
  keywords:
    "şifre sıfırlama, güvenli şifre değiştirme, NextHire, iş platformu şifre, şifre kurtarma",
};

const ResetPasswordLayout = ({ children }: LayoutComponentProps) => {
  return <div>{children}</div>;
};

export default ResetPasswordLayout;
