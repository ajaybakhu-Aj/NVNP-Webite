import React from "react";

import { Routes, Route, } from "react-router-dom";

import Header from "./components/Home/Header";

import HeroSection from "./components/Home/HeroSection";
import TickerStrip from "./components/Home/TickerStrip";
import FeaturesStrip from "./components/Home/FeaturesStrip";
import ProductsSection from "./components/Home/ProductsSection";
import WhySection from "./components/Home/WhySection";
import FounderSection from "./components/Home/FounderSection";
import TestimonialsSection from "./components/Home/TestimonialsSection";
import DealerSection from "./components/Home/DealerSection";
import Footer from "./components/Home/Footer";

import AboutUs from "./components/Home/AboutUs";
import ContactUs from "./components/Home/ContactUs";
import Product from "./components/Home/Product";
import Cart from "./components/Home/Cart";

import "./styles/global.css";

/* HOME PAGE */
function HomePage() {
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
    </main>
  );
}

function App() {
  return (
    <div
      style={{
        background: "#131313",
        minHeight: "100vh",
      }}
    >
      <Header />

      <Routes>
        {/* HOME PAGE */}
        <Route path="/" element={<HomePage />} />

        {/* ABOUT PAGE */}
        <Route path="/about" element={<AboutUs />} />

        {/* CONTACT PAGE */}
        <Route path="/contact" element={<ContactUs />} />

        {/* PRODUCT PAGE */}
        <Route path="/product" element={<Product />} />

        {/* CART PAGE */}
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;