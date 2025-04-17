import { LayoutComponentProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextHire | Aday Üye Ol",
  description:
    "NextHire aday üye ol sayfasına hoş geldiniz. Hesabınızı oluşturup, iş fırsatlarına başvurabilir ve kariyer yolculuğunuzu başlatabilirsiniz.",
  keywords:
    "NextHire, aday üye ol, iş başvurusu, iş arama, kariyer fırsatları, aday profili, iş bulma, iş arayanlar",
};

export default function AuthLayout({ children }: LayoutComponentProps) {
  return <div>{children}</div>;
}
