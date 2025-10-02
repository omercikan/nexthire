import { LayoutComponentProps } from "@/shared/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextHire | Aday Giriş Yap",
  description:
    "NextHire aday giriş sayfasına hoş geldiniz. Hesabınıza giriş yaparak iş fırsatlarına göz atabilir ve başvurularınızı takip edebilirsiniz.",
  keywords:
    "NextHire, aday girişi, iş başvurusu, iş arama, kariyer fırsatları, aday profili, iş bulma",
};

export default function AuthLayout({ children }: LayoutComponentProps) {
  return <div>{children}</div>;
}
