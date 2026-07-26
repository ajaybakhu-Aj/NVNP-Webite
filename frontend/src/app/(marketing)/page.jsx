import React from "react";
import HeroSection from "../../components/home/HeroSection";
import TickerStrip from "../../components/home/TickerStrip";
import FeaturesStrip from "../../components/home/FeaturesStrip";
import ProductsSection from "../../components/home/ProductsSection";
import WhySection from "../../components/home/WhySection";
import FounderSection from "../../components/home/FounderSection";
import TestimonialsSection from "../../components/home/TestimonialsSection";
import DealerSection from "../../components/home/DealerSection";
import HomeBlogsSection from "../../components/home/HomeBlogsSection";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <TickerStrip />
      <FeaturesStrip />
      <ProductsSection />
      <WhySection />
      <FounderSection />
      <TestimonialsSection />
      <DealerSection />
      <HomeBlogsSection />
    </main>
  );
}
