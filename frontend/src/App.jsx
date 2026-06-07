import React, { useEffect } from "react";

import { Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/ui/Header";

import HeroSection from "./components/home/HeroSection";
import TickerStrip from "./components/home/TickerStrip";
import FeaturesStrip from "./components/home/FeaturesStrip";
import ProductsSection from "./components/home/ProductsSection";
import WhySection from "./components/home/WhySection";
import FounderSection from "./components/home/FounderSection";
import TestimonialsSection from "./components/home/TestimonialsSection";
import DealerSection from "./components/home/DealerSection";
import Footer from "./components/ui/Footer";

import AboutUs from "./app/(marketing)/company/about/page";
import ContactUs from "./app/(marketing)/contact/page";
import Product from "./app/(marketing)/products/page";
import Cart from "./app/(marketing)/cart/page";
import Founder from "./app/(marketing)/company/founder/page";
import Dealership from "./app/(marketing)/dealers/page";
import SupportPage from "./app/(marketing)/support/page";
import ApplyDealersPage from "./app/(marketing)/dealers/apply/page";
import Warranty from "./app/(marketing)/support/warranty/page";
import TermService from "./app/(marketing)/terms/page";
import PrivacyPolicy from "./app/(marketing)/privacy/page";
import Checkout from "./app/(marketing)/checkout/page";
import ProductSlug from "./app/(marketing)/products/[slug]/page";
import WhitePearl from "./app/(marketing)/dealers/OurDealers/Provience2/WhitePearl";
import RKServices from "./app/(marketing)/dealers/OurDealers/Province3/RKServices";
import SRSuppliers from "./app/(marketing)/dealers/OurDealers/Provience4/SRSuppliers";
import AxeTech from "./app/(marketing)/dealers/OurDealers/Provience6/AxeTech";
import JoshiKyodai from "./app/(marketing)/dealers/OurDealers/Provience7/JoshiKyodai";
import BlogPage from "./app/(marketing)/blog/page";
import AppDownloadsPage from "./app/(marketing)/support/downloads/page";

import PageNotFound from "./app/PageNotFound";

import "./styles/global.css";
import NanoTek from "./app/(marketing)/dealers/OurDealers/Provience1/NanoTek";

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
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/checkout";

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div
      style={{
        background: "#131313",
        minHeight: "100vh",
      }}
    >
      {!hideHeaderFooter && <Header />}

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

        {/* FOUNDER PAGE */}
        <Route path="/founder" element={<Founder />} />

        {/* DEALERSHIP PAGE */}
        <Route path="/dealership" element={<Dealership />} />

        <Route
          path="/cart"
          element={<Cart />}
        />
        <Route
          path="/products"
          element={<Product />}
        />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/support/app-download" element={<AppDownloadsPage />} />
        <Route path="/support/downloads" element={<AppDownloadsPage />} />
        <Route path="/apply-dealers" element={<ApplyDealersPage />} />
        <Route path="/warranty" element={<Warranty />} />
        <Route path="/terms" element={<TermService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:slug" element={<ProductSlug />} />
        <Route path="/dealer/nanotek" element={<NanoTek />} />
        <Route path="/dealer/whitepearl" element={<WhitePearl />} />
        <Route path="/dealer/rkservices" element={<RKServices />} />
        <Route path="/dealer/srsuppliers" element={<SRSuppliers />} />
        <Route path="/dealer/axetech" element={<AxeTech />} />
        <Route path="/dealer/joshi-kyodai" element={<JoshiKyodai />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/events" element={<BlogPage />} />

        {/* FALLBACK 404 PAGE */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;