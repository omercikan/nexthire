import { Jost } from "next/font/google";
import HeroSection from "@/components/pages/home/HeroSection";
import Brands from "@/components/pages/home/Brands";
import FeaturedJobs from "@/components/pages/home/FeaturedJobs";
import Categories from "@/components/pages/home/Categories";
import PostingJob from "@/components/pages/home/PostingJob";
import CitiesCategory from "@/components/pages/home/CitiesCategory";
import BestCompanies from "@/components/pages/home/BestCompanies";
import StepCards from "@/components/pages/home/stepCard/StepCardList";
import Testimonials from "@/components/pages/home/testimonials/Testimonials";
import TrendingKeywords from "@/components/pages/home/TrendingKeywords/TrendingKeywords";

const jost = Jost({
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export default function Home() {
  return (
    <main className={jost.className}>
      <HeroSection />
      <Brands />
      <FeaturedJobs />
      <Categories />
      <PostingJob />
      <CitiesCategory />
      <BestCompanies />
      <StepCards />
      <Testimonials />
      <TrendingKeywords />
    </main>
  );
}
