// Import global styles and fonts
import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "404 - Sayfa Bulunamadı",
  description: "Aradığınız sayfa mevcut değil.",
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className="p-[4rem] text-center flex flex-col justify-center items-center h-screen">
          <h1 className="text-3xl font-semibold mb-3">Sayfa bulunamadı</h1>
          <p className="font-medium">Aradığınız sayfa mevcut değil.</p>
        </div>
      </body>
    </html>
  );
}
