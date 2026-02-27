import "./globals.css";
import { Jost } from "next/font/google";
import { defaultMetadata } from "@/shared/data/seo";
import Providers from "@/shared/components/Providers";
import { Metadata } from "next";
import Chat from "@/features/chat/components/Chat";

const jost = Jost({
  subsets: ["latin-ext"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  fallback: ["sans-serif"],
});

const { title, description, keywords, openGraph, twitter } = defaultMetadata;

export const metadata: Metadata = {
  title: title,
  description: description,
  keywords: keywords,
  openGraph: {
    title: openGraph?.title,
    description: openGraph?.description,
    images:
      "https://res.cloudinary.com/dvolwkh6r/image/upload/v1744909581/nexthire_d27rhv.png",
  },
  twitter: {
    card: "summary_large_image",
    title: twitter?.title,
    description: twitter?.description,
    images:
      "https://res.cloudinary.com/dvolwkh6r/image/upload/v1744909581/nexthire_d27rhv.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={jost.className}>
        <Providers>
          {children}

          <Chat />
        </Providers>
      </body>
    </html>
  );
}
