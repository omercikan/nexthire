"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./api/firebase/firebaseConfig";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/ui/Loading";
import { defaultMetadata } from "@/lib/seo";

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
          <title>{defaultMetadata.title as string}</title>
          <meta
            name="description"
            content={defaultMetadata.description as string}
          />
          <meta name="keywords" content={defaultMetadata.keywords as string} />
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
        <title>{defaultMetadata.title as string}</title>
        <meta
          name="description"
          content={defaultMetadata.description as string}
        />
        <meta name="keywords" content={defaultMetadata.keywords as string} />
        <meta
          property="og:title"
          content={defaultMetadata.openGraph?.title as string}
        />
        <meta
          property="og:description"
          content={defaultMetadata.openGraph?.description as string}
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dvolwkh6r/image/upload/v1744909581/nexthire_d27rhv.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={defaultMetadata.twitter?.title as string}
        />
        <meta
          name="twitter:description"
          content={defaultMetadata.twitter?.description as string}
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/dvolwkh6r/image/upload/v1744909581/nexthire_d27rhv.png"
        />
        <meta name="robots" content="index, follow" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
