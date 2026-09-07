import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_TITLES = {
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
  team: "Meet Our Team - NightVision",
  events: "Explore News & Events - NightVision",
  checkout: "Finalize Checkout - NightVision",
  login: "Operator Terminal Login - NightVision",
  signup: "Operator Registration - NightVision",
  forgot_password: "Reset Password - NightVision",
  my_profile: "My Profile - NightVision",
  orders: "Order Dispatch - NightVision",
  settings: "Security Settings - NightVision",
  cctv_setup: "CCTV Setup Cost Estimator - NightVision",
};

const DEFAULT_DESCS = {
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
  cctv_setup: "Estimate surveillance infrastructure costs by specifying camera quantities, NVR channels, switches, and storage size.",
};

const ROUTE_KEYS = [
  { prefix: "/products", key: "products" },
  { prefix: "/product", key: "products" },
  { prefix: "/about", key: "about" },
  { prefix: "/contact", key: "contact" },
  { prefix: "/cart", key: "cart" },
  { prefix: "/founder", key: "founder" },
  { prefix: "/dealership", key: "dealership" },
  { prefix: "/apply-dealers", key: "dealership" },
  { prefix: "/dealer/", key: "dealership" },
  { prefix: "/support", key: "support" },
  { prefix: "/warranty", key: "warranty" },
  { prefix: "/terms", key: "terms" },
  { prefix: "/privacy", key: "privacy" },
  { prefix: "/blog", key: "blog" },
  { prefix: "/author/", key: "blog" },
  { prefix: "/gallery", key: "gallery" },
  { prefix: "/team", key: "team" },
  { prefix: "/events", key: "events" },
  { prefix: "/checkout", key: "checkout" },
  { prefix: "/login", key: "login" },
  { prefix: "/signup", key: "signup" },
  { prefix: "/forgot-password", key: "forgot_password" },
  { prefix: "/my-profile", key: "my_profile" },
  { prefix: "/orders", key: "orders" },
  { prefix: "/settings", key: "settings" },
  { prefix: "/cctv-setup", key: "cctv_setup" },
];

export function usePageMetadata(siteContents) {
  const location = useLocation();

  useEffect(() => {
    if (!siteContents) return;

    const path = location.pathname;
    const matched = ROUTE_KEYS.find((r) => path.startsWith(r.prefix));
    const pageKey = matched ? matched.key : "home";

    document.title = siteContents[`metaTitle_${pageKey}`] || DEFAULT_TITLES[pageKey] || DEFAULT_TITLES.home;

    const metaDesc = siteContents[`metaDesc_${pageKey}`] || DEFAULT_DESCS[pageKey] || DEFAULT_DESCS.home;
    let metaTag = document.querySelector('meta[name="description"]');
    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("name", "description");
      document.head.appendChild(metaTag);
    }
    metaTag.setAttribute("content", metaDesc);
  }, [location.pathname, siteContents]);
}
