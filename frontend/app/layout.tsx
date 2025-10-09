"use client";

import "./globals.css";
import { Jost } from "next/font/google";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./api/firebase/firebaseConfig";
import { usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useMemo } from "react";
import { Provider } from "react-redux";
import { store } from "@/shared/redux/store";
import { defaultMetadata } from "@/shared/data/seo";
import { AuthContextProvider } from "@/features/auth/authContext";
import MobileUserModal from "@/shared/components/layout/Header/MobileUserModal";
import Header from "@/shared/components/layout/Header";
import Footer from "@/shared/components/layout/Footer";
import { SessionProvider } from "next-auth/react";

const inter = Jost({
  subsets: ["latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  fallback: ["sans-serif"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const [user] = useAuthState(auth);

  const authPages = useMemo(() => {
    return ["/aday-giris", "/aday-uye-ol", "/isveren-giris", "/isveren-kayit"];
  }, []);

  useEffect(() => {
    if (authPages.includes(pathname) && user) router.replace("/");
  }, [authPages, pathname, router, user]);

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
      <body className={inter.className}>
        <Provider store={store}>
          <AuthContextProvider>
            {!authPages.includes(pathname) &&
              pathname !== "/sifre-sifirla" &&
              !pathname.includes("/hesabim") && (
                <Suspense>
                  <Header />
                </Suspense>
              )}

            <SessionProvider>{children}</SessionProvider>

            {!authPages.includes(pathname) && pathname !== "/sifre-sifirla" && (
              <MobileUserModal />
            )}

            {!authPages.includes(pathname) && pathname !== "/sifre-sifirla" && (
              <Suspense>
                <Footer />
              </Suspense>
            )}
          </AuthContextProvider>
        </Provider>
      </body>
    </html>
  );
}
