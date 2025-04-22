import { Jost } from "next/font/google";
import HeroSection from "@/components/pages/home/HeroSection";

const jost = Jost({
  display: "swap",
  weight: ["500", "600", "700"],
});

export default function Home() {
  return (
    <main className={jost.className}>
      <HeroSection />
    </main>
  );
}
