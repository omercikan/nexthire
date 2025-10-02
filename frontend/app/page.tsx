import Brands from "@/features/home/components/Brands/Brands";
import HeroSection from "@/features/home/components/hero-section/HeroSection";
import FeaturedJobs from "@/features/home/components/FeaturedJobs";
import SubscribeSection from "@/features/home/components/Subscribe/SubscribeSection";
import BlogSection from "@/features/home/components/Blogs/BlogSection";
import TrendingKeywords from "@/features/home/components/TrendingKeywords/TrendingKeywords";
import Testimonials from "@/features/home/components/testimonials/Testimonials";
import StepCards from "@/features/home/components/StepCard/StepCardList";
import BestCompanies from "@/features/home/components/BestCompany/BestCompanies";
import CitiesCategory from "@/features/home/components/CitiesCategory";
import PostingJob from "@/features/home/components/PostingJob";
import Categories from "@/features/home/components/Categories";

export default function Home() {
  return (
    <main>
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
      <BlogSection />
      <SubscribeSection />
    </main>
  );
}
