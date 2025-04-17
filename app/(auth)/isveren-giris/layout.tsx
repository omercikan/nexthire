import { LayoutComponentProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextHire | İşveren Giriş Yap",
  description:
    "NextHire işveren giriş sayfasına hoş geldiniz. Hesabınıza giriş yaparak adayları inceleyebilir, iş ilanları yayınlayabilir ve başvuruları yönetebilirsiniz.",
  keywords:
    "NextHire, işveren girişi, iş ilanı, aday inceleme, iş başvurusu, kariyer fırsatları, işveren profili, iş bulma, iş yönetimi",
};

export default function AuthLayout({ children }: LayoutComponentProps) {
  return <div>{children}</div>;
}
