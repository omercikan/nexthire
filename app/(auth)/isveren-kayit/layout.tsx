import { LayoutComponentProps } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "NextHire | İşveren Kayıt Ol",
  description:
    "NextHire işveren kayıt sayfasına hoş geldiniz. Hesap oluşturarak iş ilanları yayınlayabilir, adaylarla iletişime geçebilir ve kariyer fırsatları yaratabilirsiniz.",
  keywords:
    "NextHire, işveren kayıt, iş ilanı, aday arama, iş yönetimi, iş bulma, kariyer fırsatları, işveren profili, işveren oluşturma",
};

export default function AuthLayout({ children }: LayoutComponentProps) {
  return <div>{children}</div>;
}
