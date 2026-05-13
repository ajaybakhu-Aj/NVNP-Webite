import React from "react";

import Header from "./components/Home/Header";

import HeroSection from "./components/Home/HeroSection";
import TickerStrip from "./components/Home/TickerStrip";
import FeaturesStrip from "./components/Home/FeaturesStrip";
import ProductsSection from "./components/Home/ProductsSection";
import WhySection from "./components/Home/WhySection";
import FounderSection from "./components/Home/FounderSection";
import TestimonialsSection from "./components/Home/TestimonialsSection";
import DealerSection from "./components/Home/DealerSection";

import "./styles/global.css";

import Footer from "./components/Home/Footer";

function App() {
  return (
    
    <div>
      <Header />

      <main>
        
        <HeroSection />
        <TickerStrip />
        <FeaturesStrip />
        <ProductsSection />
        <WhySection />
        <FounderSection />
        <TestimonialsSection />
        <DealerSection />
      </main>

      <Footer />
    </div>
  );
}

export default App;