"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./api/firebase/firebaseConfig";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/ui/Loading";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [_user, loading] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (
        pathname === "/aday-giris" ||
        pathname === "/aday-uye-ol" ||
        pathname === "/isveren-giris" ||
        pathname === "/isveren-kayit"
      ) {
        if (user) router.replace("/");
      }
      setIsLoading(false);
    });
  }, [pathname, router]);

  if (isLoading || loading) {
    return (
      <html lang="tr" suppressHydrationWarning>
        <head>
          <title>NextHire | Doğru iş, Doğru Aday</title>
          <meta
            name="description"
            content="NextHire, iş arayanlar ve işverenler için doğru iş ve doğru adayları bulma platformudur. En iyi kariyer fırsatları ve adaylarla hızlıca tanışın."
          />
          <meta
            name="keywords"
            content="NextHire, iş ilanları, kariyer fırsatları, iş bulma, adaylar, işverenler, iş başvurusu, iş arama platformu, iş ve kariyer"
          />
        </head>
        <body suppressHydrationWarning>
          <Loading />
        </body>
      </html>
    );
  }

  return (
    <html lang="tr">
      <head>
        <title>NextHire | Doğru iş, Doğru Aday</title>
        <meta
          name="description"
          content="NextHire, iş arayanlar ve işverenler için doğru iş ve doğru adayları bulma platformudur. En iyi kariyer fırsatları ve adaylarla hızlıca tanışın."
        />
        <meta
          name="keywords"
          content="NextHire, iş ilanları, kariyer fırsatları, iş bulma, adaylar, işverenler, iş başvurusu, iş arama platformu, iş ve kariyer"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
