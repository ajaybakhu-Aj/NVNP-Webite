import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSiteContents } from "./utils/cmsDb";

import Header from "./components/ui/Header";
import HomePage from "./app/(marketing)/page";
import GlobalSocialSidebar from "./components/ui/GlobalSocialSidebar";
import GlobalTrafficSidebar from "./components/ui/GlobalTrafficSidebar";
import { defaultTitles, defaultDescs } from "./utils/seoMeta";
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
import CctvSetupPage from "./app/(marketing)/products/CctvSetupPage";

import ProductsIndoorCamerasPage from "./app/(marketing)/products/indoor-cameras/page";
import ProductsOutdoorCamerasPage from "./app/(marketing)/products/outdoor-cameras/page";
import ProductsWirelessCamerasPage from "./app/(marketing)/products/wireless-cameras/page";
import ProductsAiCamerasPage from "./app/(marketing)/products/ai-cameras/page";
import ProductsIpCamerasPage from "./app/(marketing)/products/ip-cameras/page";
import ProductsNvrPage from "./app/(marketing)/products/nvr/page";
import ProductsPoeSwitchPage from "./app/(marketing)/products/poe-switch/page";
import ProductsIndoorOutdoorCamerasPage from "./app/(marketing)/products/indoor-outdoor-cameras/page";
import ProductsHardDiskPage from "./app/(marketing)/products/hard-disk/page";
import ProductsSdCardPage from "./app/(marketing)/products/sd-card/page";

import WhitePearl from "./app/(marketing)/dealers/OurDealers/Provience2/WhitePearl";
import NightVisionDealer from "./app/(marketing)/dealers/OurDealers/Provience3/NightVision";
import SRSuppliers from "./app/(marketing)/dealers/OurDealers/Provience4/SRSuppliers";
import AxeTech from "./app/(marketing)/dealers/OurDealers/Provience6/AxeTech";
import JoshiKyodai from "./app/(marketing)/dealers/OurDealers/Provience7/JoshiKyodai";
import BlogPage from "./app/(marketing)/blog/page";
import BlogDetail from "./app/(marketing)/blog/[slug]/page";
import AuthorPage from "./app/(marketing)/author/[slug]/page";
import AdminDashboard from "./app/(marketing)/admin/AdminDashboard";
import BlogTagsPage from "./app/(marketing)/admin/BlogTagsPage";
import BlogCategoriesPage from "./app/(marketing)/admin/BlogCategoriesPage";
import EventsPage from "./app/(marketing)/events/page";
import EventDetail from "./app/(marketing)/events/EventDetail";
import AppDownloadsPage from "./app/(marketing)/support/downloads/page";
import GalleryPage from "./app/(marketing)/gallery/page";
import TeamPage from "./app/(marketing)/company/team/page";

import PageNotFound from "./app/PageNotFound";
import FloatingChatbot from "./components/ui/FloatingChatbot";
import Login from "./app/(marketing)/login/page";
import SignUp from "./app/(marketing)/signup/page";
import ForgotPasswordPage from "./app/(marketing)/login/ForgotPasswordPage";
import MyProfile from "./app/(marketing)/my-profile/page";
import Orders from "./app/(marketing)/orders/page";
import Settings from "./app/(marketing)/settings/page";

import "./styles/global.css";
import NanoTek from "./app/(marketing)/dealers/OurDealers/Provience1/NanoTek";
import DynamicDealerProfile from "./app/(marketing)/dealers/DynamicDealerProfile";

function App() {
  const location = useLocation();
  const siteContents = useSiteContents();
  const hideHeaderFooter =
    location.pathname === "/checkout" ||
    location.pathname === "/admin" ||
    location.pathname === "/cms";

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = () => {
      try {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          setIsAdmin(parsed.role === "Admin" || parsed.role === "Super Admin");
        } else {
          setIsAdmin(false);
        }
      } catch (e) {
        setIsAdmin(false);
      }
    };
    checkAdmin();
    window.addEventListener("storage", checkAdmin);
    return () => {
      window.removeEventListener("storage", checkAdmin);
    };
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    if (!siteContents) return;

    let path = location.pathname;
    let pageKey = "home";

    if (path === "/" || path === "") {
      pageKey = "home";
    } else if (path.startsWith("/products") || path.startsWith("/product")) {
      pageKey = "products";
    } else if (path.startsWith("/about")) {
      pageKey = "about";
    } else if (path.startsWith("/contact")) {
      pageKey = "contact";
    } else if (path.startsWith("/cart")) {
      pageKey = "cart";
    } else if (path.startsWith("/founder")) {
      pageKey = "founder";
    } else if (path.startsWith("/dealership") || path.startsWith("/apply-dealers") || path.startsWith("/dealer/")) {
      pageKey = "dealership";
    } else if (path.startsWith("/support")) {
      pageKey = "support";
    } else if (path.startsWith("/warranty")) {
      pageKey = "warranty";
    } else if (path.startsWith("/terms")) {
      pageKey = "terms";
    } else if (path.startsWith("/privacy")) {
      pageKey = "privacy";
    } else if (path.startsWith("/blog") || path.startsWith("/author/")) {
      pageKey = "blog";
    } else if (path.startsWith("/gallery")) {
      pageKey = "gallery";
    } else if (path.startsWith("/team")) {
      pageKey = "team";
    } else if (path.startsWith("/events")) {
      pageKey = "events";
    } else if (path.startsWith("/checkout")) {
      pageKey = "checkout";
    } else if (path.startsWith("/login")) {
      pageKey = "login";
    } else if (path.startsWith("/signup")) {
      pageKey = "signup";
    } else if (path.startsWith("/forgot-password")) {
      pageKey = "forgot_password";
    } else if (path.startsWith("/my-profile")) {
      pageKey = "my_profile";
    } else if (path.startsWith("/orders")) {
      pageKey = "orders";
    } else if (path.startsWith("/settings")) {
      pageKey = "settings";
    } else if (path.startsWith("/cctv-setup")) {
      pageKey = "cctv_setup";
    } else {
      pageKey = "home";
    }

    const metaTitle = siteContents[`metaTitle_${pageKey}`] || defaultTitles[pageKey];
    document.title = metaTitle;

    const metaDesc = siteContents[`metaDesc_${pageKey}`] || defaultDescs[pageKey];
    let metaDescriptionTag = document.querySelector('meta[name="description"]');
    if (!metaDescriptionTag) {
      metaDescriptionTag = document.createElement('meta');
      metaDescriptionTag.setAttribute('name', 'description');
      document.head.appendChild(metaDescriptionTag);
    }
    metaDescriptionTag.setAttribute('content', metaDesc);
  }, [location.pathname, siteContents]);

  return (
    <div
      style={{
        background: "#131313",
        minHeight: "100vh",
      }}
    >
      {!hideHeaderFooter && <Header />}
      {!hideHeaderFooter && <GlobalSocialSidebar />}
      {!hideHeaderFooter && <FloatingChatbot />}

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

        {/* TEAM PAGE */}
        <Route path="/team" element={<TeamPage />} />

        {/* FOUNDER PAGE */}
        <Route path="/founder" element={<Founder />} />

        {/* DEALERSHIP PAGE */}
        <Route path="/dealership" element={<Dealership />} />

        <Route
          path="/products"
          element={<Product />}
        />
        <Route path="/products/indoor-cameras" element={<ProductsIndoorCamerasPage />} />
        <Route path="/products/outdoor-cameras" element={<ProductsOutdoorCamerasPage />} />
        <Route path="/products/wireless-cameras" element={<ProductsWirelessCamerasPage />} />
        <Route path="/products/ai-cameras" element={<ProductsAiCamerasPage />} />
        <Route path="/products/ip-cameras" element={<ProductsIpCamerasPage />} />
        <Route path="/products/nvr" element={<ProductsNvrPage />} />
        <Route path="/products/poe-switch" element={<ProductsPoeSwitchPage />} />
        <Route path="/products/indoor-outdoor-cameras" element={<ProductsIndoorOutdoorCamerasPage />} />
        <Route path="/products/hard-disk" element={<ProductsHardDiskPage />} />
        <Route path="/products/sd-card" element={<ProductsSdCardPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/support/app-download" element={<AppDownloadsPage />} />
        <Route path="/support/downloads" element={<AppDownloadsPage />} />
        <Route path="/apply-dealers" element={<ApplyDealersPage />} />
        <Route path="/warranty" element={<Warranty />} />
        <Route path="/terms" element={<TermService />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:slug" element={<ProductSlug />} />
        <Route path="/products/:slug" element={<ProductSlug />} />
        <Route path="/cctv-setup" element={<CctvSetupPage />} />
        <Route path="/dealer/nanotek" element={<NanoTek />} />
        <Route path="/dealer/whitepearl" element={<WhitePearl />} />
        <Route path="/dealer/night-vision" element={<NightVisionDealer />} />
        <Route path="/dealer/srsuppliers" element={<SRSuppliers />} />
        <Route path="/dealer/axetech" element={<AxeTech />} />
        <Route path="/dealer/joshi-kyodai" element={<JoshiKyodai />} />
        <Route path="/dealer/:slug" element={<DynamicDealerProfile />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogDetail />} />
        <Route path="/author/:slug" element={<AuthorPage />} />
        <Route path="/admin/blog-tags" element={<BlogTagsPage />} />
        <Route path="/admin/blog-categories" element={<BlogCategoriesPage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/cms" element={<AdminDashboard />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:slug" element={<EventDetail />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/settings" element={<Settings />} />

        {/* FALLBACK 404 PAGE */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;