import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSiteContents } from "./utils/cmsDb";
import { authMe } from "./utils/api";

import Header from "./components/ui/Header";
import HeroSection from "./components/home/HeroSection";
import TickerStrip from "./components/home/TickerStrip";
import FeaturesStrip from "./components/home/FeaturesStrip";
import ProductsSection from "./components/home/ProductsSection";
import WhySection from "./components/home/WhySection";
import FounderSection from "./components/home/FounderSection";
import TestimonialsSection from "./components/home/TestimonialsSection";
import DealerSection from "./components/home/DealerSection";
import HomeBlogsSection from "./components/home/HomeBlogsSection";
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
import Icon from "./utils/Icon";
import FloatingChatbot from "./components/ui/FloatingChatbot";
import ThemeToggle from "./components/ui/ThemeToggle";
import { useTheme } from "./context/ThemeContext";
import Login from "./app/(marketing)/login/page";
import SignUp from "./app/(marketing)/signup/page";
import ForgotPasswordPage from "./app/(marketing)/login/ForgotPasswordPage";
import MyProfile from "./app/(marketing)/my-profile/page";
import Orders from "./app/(marketing)/orders/page";
import Settings from "./app/(marketing)/settings/page";

import "./styles/global.css";
import NanoTek from "./app/(marketing)/dealers/OurDealers/Provience1/NanoTek";
import DynamicDealerProfile from "./app/(marketing)/dealers/DynamicDealerProfile";

/* SEO / marketing pages — lazy-loaded so they don't bloat the main bundle */
const lazyPage = (loader) => React.lazy(loader);
const BlogCategoryAiSecurity = lazyPage(() => import("./app/(marketing)/blog/category/ai-security/page"));
const BlogCategoryBusinessSecurity = lazyPage(() => import("./app/(marketing)/blog/category/business-security/page"));
const BlogCategoryBuyingGuides = lazyPage(() => import("./app/(marketing)/blog/category/buying-guides/page"));
const BlogCategoryHomeSecurity = lazyPage(() => import("./app/(marketing)/blog/category/home-security/page"));
const BlogCategoryInstallationGuides = lazyPage(() => import("./app/(marketing)/blog/category/installation-guides/page"));
const CaseStudiesPage = lazyPage(() => import("./app/(marketing)/case-studies/page"));
const CaseStudyDetail = lazyPage(() => import("./app/(marketing)/case-studies/[slug]/page"));
const CctvInstallationPage = lazyPage(() => import("./app/(marketing)/cctv-installation/page"));
const CctvInstallKathmandu = lazyPage(() => import("./app/(marketing)/cctv-installation/kathmandu/page"));
const CctvInstallLalitpur = lazyPage(() => import("./app/(marketing)/cctv-installation/lalitpur/page"));
const CctvInstallBhaktapur = lazyPage(() => import("./app/(marketing)/cctv-installation/bhaktapur/page"));
const CctvInstallPokhara = lazyPage(() => import("./app/(marketing)/cctv-installation/pokhara/page"));
const CctvInstallChitwan = lazyPage(() => import("./app/(marketing)/cctv-installation/chitwan/page"));
const CctvInstallButwal = lazyPage(() => import("./app/(marketing)/cctv-installation/butwal/page"));
const CctvInstallBiratnagar = lazyPage(() => import("./app/(marketing)/cctv-installation/biratnagar/page"));
const CompanyPage = lazyPage(() => import("./app/(marketing)/company/page"));
const CareersPage = lazyPage(() => import("./app/(marketing)/company/careers/page"));
const MediaPage = lazyPage(() => import("./app/(marketing)/company/media/page"));
const MissionPage = lazyPage(() => import("./app/(marketing)/company/mission/page"));
const ComparePage = lazyPage(() => import("./app/(marketing)/compare/page"));
const DealerBenefitsPage = lazyPage(() => import("./app/(marketing)/dealers/benefits/page"));
const DealerSuccessStoriesPage = lazyPage(() => import("./app/(marketing)/dealers/success-stories/page"));
const DealerTrainingPage = lazyPage(() => import("./app/(marketing)/dealers/training/page"));
const ReviewsPage = lazyPage(() => import("./app/(marketing)/reviews/page"));
const SolutionsPage = lazyPage(() => import("./app/(marketing)/solutions/page"));
const SolutionHomeSecurity = lazyPage(() => import("./app/(marketing)/solutions/home-security/page"));
const SolutionHospitalSecurity = lazyPage(() => import("./app/(marketing)/solutions/hospital-security/page"));
const SolutionHotelSecurity = lazyPage(() => import("./app/(marketing)/solutions/hotel-security/page"));
const SolutionOfficeSecurity = lazyPage(() => import("./app/(marketing)/solutions/office-security/page"));
const SolutionRetailSecurity = lazyPage(() => import("./app/(marketing)/solutions/retail-security/page"));
const SolutionSchoolSecurity = lazyPage(() => import("./app/(marketing)/solutions/school-security/page"));
const SolutionWarehouseSecurity = lazyPage(() => import("./app/(marketing)/solutions/warehouse-security/page"));
const SupportFaqPage = lazyPage(() => import("./app/(marketing)/support/faq/page"));
const SupportManualsPage = lazyPage(() => import("./app/(marketing)/support/manuals/page"));

const routeLoadingFallback = (
  <main style={{ minHeight: "60vh", display: "flex", justifyContent: "center", alignItems: "center", color: "#94da32", fontFamily: "Space Grotesk, sans-serif" }}>
    LOADING MODULE...
  </main>
);

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
      <HomeBlogsSection />
    </main>
  );
}

function GlobalSocialSidebar() {
  const siteContents = useSiteContents();
  const facebook = siteContents.socialFacebook || "https://www.facebook.com/nightvisioninterprises";
  const instagram = siteContents.socialInstagram || "https://www.instagram.com/nightvision_nepal/";
  const linkedin = siteContents.socialLinkedin || "https://linkedin.com/";
  const tiktok = siteContents.socialTiktok || "https://www.tiktok.com/@nvnightvisionnp?lang=en";
  const x = siteContents.socialX || "https://x.com/";
  const youtube = siteContents.socialYoutube || "https://www.youtube.com/@nvnightvisionnp";

  const [footerVisible, setFooterVisible] = React.useState(false);

  React.useEffect(() => {
    const footer = document.querySelector(".app-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="global-social-sidebar"
      style={{
        opacity: footerVisible ? 0 : 1,
        pointerEvents: footerVisible ? "none" : "all",
        transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      }}
    >
      <a
        href={facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="global-social-btn btn-facebook"
        title="Facebook"
      >
        <Icon name="facebook" size={18} />
      </a>
      <a
        href={instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="global-social-btn btn-instagram"
        title="Instagram"
      >
        <Icon name="instagram" size={18} />
      </a>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="global-social-btn btn-linkedin"
        title="LinkedIn"
      >
        <Icon name="linkedin" size={18} />
      </a>
      <a
        href={tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className="global-social-btn btn-tiktok"
        title="TikTok"
      >
        <Icon name="tiktok" size={18} />
      </a>
      <a
        href={x}
        target="_blank"
        rel="noopener noreferrer"
        className="global-social-btn btn-x"
        title="X"
      >
        <Icon name="x" size={18} />
      </a>
      <a
        href={youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="global-social-btn btn-youtube"
        title="YouTube"
      >
        <Icon name="youtube" size={18} />
      </a>
    </div>
  );
}



function App() {
  const location = useLocation();
  const siteContents = useSiteContents();
  const { theme: C } = useTheme();
  const hideHeaderFooter =
    location.pathname === "/checkout" ||
    location.pathname === "/admin" ||
    location.pathname === "/cms";

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // The Django session is the source of truth for authentication.
    // localStorage only caches the user for instant UI display.
    const checkAdmin = () => {
      authMe()
        .then((res) => {
          if (res.authenticated) {
            setIsAdmin(res.user.role === "Admin");
            localStorage.setItem(
              "user",
              JSON.stringify({ ...res.user, loginTime: new Date().toISOString() })
            );
          } else {
            setIsAdmin(false);
            localStorage.removeItem("user");
          }
        })
        .catch(() => {
          // Backend unreachable — fall back to the cached user for UI only.
          try {
            const savedUser = JSON.parse(localStorage.getItem("user") || "null");
            setIsAdmin(savedUser?.role === "Admin" || savedUser?.role === "Super Admin");
          } catch {
            setIsAdmin(false);
          }
        });
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

    const defaultTitles = {
      home: "NightVision - Advanced surveillance for peace of mind",
      products: "Explore Security Products - NightVision Nepal",
      about: "About Us - NightVision Surveillance",
      contact: "Contact Us - NightVision Specialists",
      cart: "Shopping Cart - NightVision Security",
      founder: "Founder Rozil Thapa - NightVision",
      dealership: "Dealers & Partners - NightVision Network",
      support: "Technical Support Center - NightVision",
      warranty: "Ironclad Warranty Policy - NightVision",
      terms: "Terms of Service - NightVision",
      privacy: "Privacy Protocol Policy - NightVision",
      blog: "Security Intelligence Blog - NightVision",
      gallery: "Perimeter Installation Gallery - NightVision",
      team: "Meet Our Team - NightVision"
    };

    const defaultDescs = {
      home: "Smart AI-powered surveillance systems engineered for continuous monitoring, encrypted live streaming, and real-time security response in Nepal.",
      products: "Browse high-quality CCTV cameras, NVR networks, PoE switches, and surveillance hard disks engineered for uncompromising vigilance.",
      about: "Nepal’s next-generation surveillance and security monitoring brand built for industrial security, intelligent detection, and operational reliability.",
      contact: "Get in touch with NightVision surveillance experts in Nepal for custom security consultations, quotes, and product support.",
      cart: "View items in your surveillance equipment shopping cart. Complete your order with secure checkout.",
      founder: "The vision behind NightVision Nepal by founder Rozil Thapa. Architecting Nepal's most resilient security infrastructure.",
      dealership: "Find authorized NightVision dealers across Nepal or apply to become an official security partner.",
      support: "Access manuals, software downloads, and contact our 24/7 technical surveillance support helpline.",
      warranty: "Every NightVision unit is forged for endurance. Read about our 1-Year Ironclad Warranty and device support policy.",
      terms: "Terms and conditions governing the use of NightVision surveillance hardware, digital applications, and services.",
      privacy: "Learn how we protect data captured by NightVision surveillance systems. Secure encryption and privacy standards.",
      blog: "Read latest updates, security tutorials, threat reports, and CCTV guides from NightVision experts.",
      gallery: "Browse active drone feeds, operations matrix centers, and night vision installation mockups across Nepal.",
      team: "The visionaries and engineers behind NightVision's uncompromising security ecosystem.",
      events: "Explore the latest news coverage, event details, and product announcements from NightVision.",
      checkout: "Finalize your order of enterprise-grade security cameras, NVR networks, and storage packages.",
      login: "Access your operator terminal dashboard to manage security devices and order history.",
      signup: "Create a NightVision security operator profile to track warranties, orders, and configurations.",
      forgot_password: "Request a secure password reset token to recover access to your security terminal.",
      my_profile: "Manage your registered profile details, delivery addresses, and security settings.",
      orders: "Review active and past security device dispatch records, order statuses, and invoices.",
      settings: "Configure terminal preferences, alert methods, and security profile parameters.",
      cctv_setup: "Estimate surveillance infrastructure costs by specifying camera quantities, NVR channels, switches, and storage size."
    };

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
        background: C.bg,
        minHeight: "100vh",
        transition: "background-color 0.3s ease",
      }}
    >
      {!hideHeaderFooter && <Header />}
      {!hideHeaderFooter && <GlobalSocialSidebar />}
      {!hideHeaderFooter && <FloatingChatbot />}
      <ThemeToggle />

      <React.Suspense fallback={routeLoadingFallback}>
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

        {/* BLOG CATEGORY LANDING PAGES */}
        <Route path="/blog/category/ai-security" element={<BlogCategoryAiSecurity />} />
        <Route path="/blog/category/business-security" element={<BlogCategoryBusinessSecurity />} />
        <Route path="/blog/category/buying-guides" element={<BlogCategoryBuyingGuides />} />
        <Route path="/blog/category/home-security" element={<BlogCategoryHomeSecurity />} />
        <Route path="/blog/category/installation-guides" element={<BlogCategoryInstallationGuides />} />

        {/* CASE STUDIES */}
        <Route path="/case-studies" element={<CaseStudiesPage />} />
        <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />

        {/* LOCAL SEO: CCTV INSTALLATION CITY PAGES */}
        <Route path="/cctv-installation" element={<CctvInstallationPage />} />
        <Route path="/cctv-installation/kathmandu" element={<CctvInstallKathmandu />} />
        <Route path="/cctv-installation/lalitpur" element={<CctvInstallLalitpur />} />
        <Route path="/cctv-installation/bhaktapur" element={<CctvInstallBhaktapur />} />
        <Route path="/cctv-installation/pokhara" element={<CctvInstallPokhara />} />
        <Route path="/cctv-installation/chitwan" element={<CctvInstallChitwan />} />
        <Route path="/cctv-installation/butwal" element={<CctvInstallButwal />} />
        <Route path="/cctv-installation/biratnagar" element={<CctvInstallBiratnagar />} />

        {/* COMPANY */}
        <Route path="/company" element={<CompanyPage />} />
        <Route path="/company/about" element={<AboutUs />} />
        <Route path="/company/careers" element={<CareersPage />} />
        <Route path="/company/founder" element={<Founder />} />
        <Route path="/company/media" element={<MediaPage />} />
        <Route path="/company/mission" element={<MissionPage />} />
        <Route path="/company/team" element={<TeamPage />} />

        {/* COMPARE & REVIEWS */}
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/reviews" element={<ReviewsPage />} />

        {/* DEALERS */}
        <Route path="/dealers" element={<Dealership />} />
        <Route path="/dealers/apply" element={<ApplyDealersPage />} />
        <Route path="/dealers/benefits" element={<DealerBenefitsPage />} />
        <Route path="/dealers/success-stories" element={<DealerSuccessStoriesPage />} />
        <Route path="/dealers/training" element={<DealerTrainingPage />} />

        {/* SOLUTIONS */}
        <Route path="/solutions" element={<SolutionsPage />} />
        <Route path="/solutions/home-security" element={<SolutionHomeSecurity />} />
        <Route path="/solutions/hospital-security" element={<SolutionHospitalSecurity />} />
        <Route path="/solutions/hotel-security" element={<SolutionHotelSecurity />} />
        <Route path="/solutions/office-security" element={<SolutionOfficeSecurity />} />
        <Route path="/solutions/retail-security" element={<SolutionRetailSecurity />} />
        <Route path="/solutions/school-security" element={<SolutionSchoolSecurity />} />
        <Route path="/solutions/warehouse-security" element={<SolutionWarehouseSecurity />} />

        {/* SUPPORT */}
        <Route path="/support/faq" element={<SupportFaqPage />} />
        <Route path="/support/manuals" element={<SupportManualsPage />} />
        <Route path="/support/warranty" element={<Warranty />} />

        {/* CANONICAL PRODUCT DETAIL (matches backend /products/<slug>/ redirects) */}
        <Route path="/products/:slug" element={<ProductSlug />} />

        {/* FALLBACK 404 PAGE */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      </React.Suspense>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;