import Link from "next/link";
import { JSX } from "react";

export const FAVORITE_ERRORS: Record<
  number | "defaultMessage",
  string | JSX.Element
> = {
  401: (
    <div>
      <p>Favorilere eklemek için giriş yapmalısınız.</p>
      <Link
        href="/aday-giris"
        className="block text-[#4045ef] hover:underline w-max"
      >
        Giriş Yap
      </Link>
    </div>
  ),
  defaultMessage: "İlan favorilere eklenemedi, lütfen tekrar deneyin.",
};
