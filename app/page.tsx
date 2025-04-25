import { Jost } from "next/font/google";
import HeroSection from "@/components/pages/home/HeroSection";
import Brands from "@/components/pages/home/Brands";

const jost = Jost({
  display: "swap",
  weight: ["500", "600", "700"],
});

export default function Home() {
  return (
    <main className={jost.className}>
      <HeroSection />
      <Brands />
    </main>
  );
}
