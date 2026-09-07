// Static Seed and Configuration Data for NightVision CMS

export const SEED_DEALERS = [
  {
    id: "nanotek",
    companyName: "Nano Tek",
    businessType: "Surveillance Specialist",
    contactName: "Pawan Shrestha",
    email: "pawan@nanotek.com.np",
    location: "KanchanBari, Biratnagar, Koshi Province, Nepal",
    phone: "+977 9762959446",
    status: "PLATINUM PARTNER",
    isPlatinum: true,
    mapUrl: "https://maps.google.com/?q=KanchanBari,Biratnagar,Nepal",
    brief: "Nano Tek Pvt. Ltd. has been the cornerstone of security infrastructure in Morang for over a decade. As an authorized NV// NIGHTVISION™ partner, they specialize in the deployment of high-tier surveillance systems for both commercial and residential sectors.",
    date: "Jun 08, 2026"
  },
  {
    id: "whitepearl",
    companyName: "White Pearl",
    businessType: "Distributor & Systems Integrator",
    contactName: "Sanjay Dhanusha",
    email: "sanjay@whitepearl.com.np",
    location: "Janakpurdham, Dhanusha, Madhesh Province, Nepal",
    phone: "+977 9845990344",
    status: "PLATINUM PARTNER",
    isPlatinum: true,
    mapUrl: "https://maps.google.com/?q=Janakpurdham,Dhanusha,Nepal",
    brief: "White Pearl is the premier security systems distributor and installation specialist in Dhanusha, Madhesh Province. Specializing in high-performance NV// perimeter networks.",
    date: "Jun 08, 2026"
  },
  {
    id: "night-vision",
    companyName: "Night Vision CCTV",
    businessType: "Certified Installer",
    contactName: "Deepak Bhaktapur",
    email: "deepak@nightvision.com.np",
    location: "Bhaktapur, Bagmati Province, Nepal",
    phone: "+977 9845990344",
    status: "AUTHORIZED",
    isPlatinum: false,
    mapUrl: "https://maps.google.com/?q=Bhaktapur,Nepal",
    brief: "Serving the historic city of Bhaktapur with premium residential surveillance systems, local certified engineers, and 24/7 technical support.",
    date: "Jun 08, 2026"
  },
  {
    id: "srsuppliers",
    companyName: "SR Suppliers",
    businessType: "Technology Vendor",
    contactName: "Siddharth Lumbini",
    email: "sid@srsuppliers.com.np",
    location: "Bardaghat, Nawalparasi, Lumbini Province, Nepal",
    phone: "+977 9960457003",
    status: "AUTHORIZED",
    isPlatinum: false,
    mapUrl: "https://maps.google.com/?q=Bardaghat,Nawalparasi,Nepal",
    brief: "Authorized dealer in Lumbini Province specializing in warehouse security grids, wireless camera links, and high-altitude weatherproofing setups.",
    date: "Jun 08, 2026"
  },
  {
    id: "axetech",
    companyName: "Axe Tech",
    businessType: "Systems Integrator",
    contactName: "Ashish Banke",
    email: "ashish@axetech.com.np",
    location: "Kohalpur, Banke, Lumbini Province, Nepal",
    phone: "+977 9802575215",
    status: "AUTHORIZED",
    isPlatinum: false,
    mapUrl: "https://maps.google.com/?q=Kohalpur,Banke,Nepal",
    brief: "High-grade commercial surveillance and perimeter defense networks in Western Nepal. Deployed in industrial sites, logistics depots, and factories.",
    date: "Jun 08, 2026"
  },
  {
    id: "joshi-kyodai",
    companyName: "Joshi Kyodai",
    businessType: "Certified Dealer",
    contactName: "Joshi Kailali",
    email: "joshi@joshikyodai.com.np",
    location: "Dhangadi, Kailali, Sudurpashchim Province, Nepal",
    phone: "+977 9869049449",
    status: "AUTHORIZED",
    isPlatinum: false,
    mapUrl: "https://maps.app.goo.gl/HYBJZupqQaqkanKR7",
    brief: "Sudurpashchim Province's leading systems integrator for smart IoT security, remote control rooms, and commercial video surveillance architectures.",
    date: "Jun 08, 2026"
  }
];

export const SEED_CONTACTS = [
  {
    id: "msg-201",
    subject: "TECHNICAL_SUPPORT",
    name: "Sanjib Adhikari",
    email: "sanjib@mail.com",
    message: "The NV-DOME-900 starlight mode has noise in low light. Please send setup guidelines.",
    status: "Unread",
    date: "Jun 06, 2026"
  },
  {
    id: "msg-202",
    subject: "GENERAL_INQUIRY",
    name: "Rupa Thapa",
    email: "thaparupa@outlook.com",
    message: "Do you supply warranty covers for residential setups? Interested in 4 cameras.",
    status: "Read",
    date: "Jun 04, 2026"
  }
];

export const SEED_SITE_CONTENTS = {
  id: "site_contents",
  heroTitle: "ADVANCED SURVEILLANCE FOR PEACE OF MIND",
  heroSubtitle: "Smart AI-powered surveillance systems engineered for continuous monitoring, encrypted live streaming, and real-time security response.",
  heroBtnText: "VIEW OUR PRODUCTS",
  heroBtn2Text: "Features",
  heroImage: "/hero_pointing_cctv.png",
  featuresTitle: "NV NightVision",
  featuresSubtitle: "Advanced and Reliable Security Solutions to meet increasing demands of dynamic and ever-changing security landscape by innovating design, development and production of high-quality Closed-Circuit Television.",
  features: [
    { icon: "power", title: "Easy Installation", desc: "Does not require any wiring and function as Wi-Fi Based plug and play surveillance devices." },
    { icon: "near_me", title: "Advanced Features", desc: "Night Vision Cameras are designed and developed with advanced feature and keeping practical usage in consideration." },
    { icon: "thunderstorm", title: "Durable", desc: "Manufactured to be used for indoor and outdoor purpose to last long from temperature -20 degree to 50+ degree Celsius." },
    { icon: "shield", title: "Secured", desc: "Highly secured application and hardware for absolute privacy which also comes with private mode." }
  ],
  whyTag: "The NightVision Edge",
  whyTitle: "UNCOMPROMISING VIGILANCE TECHNOLOGY",
  whySubtitle: "We don't just sell cameras; we deploy comprehensive security ecosystems tailored for the unique challenges of Nepal's infrastructure.",
  whyFeatures: [
    { val: "Weatherproof", label: "IP67 RATED" },
    { val: "24/7 Monitoring", label: "ZERO DOWNTIME" },
    { val: "Remote Access", label: "GLOBAL LINK" },
    { val: "Smart Alerts", label: "AI DETECTION" }
  ],
  testimonialsTitle: "TRUSTED BY LEADERS",
  testimonials: [
    { text: "\"NightVision transformed our facility's security protocol. The Ratri Dome clarity is unparalleled even in pitch black.\"", author: "— S. RAJBHANSARI, INDUSTRIALIST" },
    { text: "\"The mobile app integration is flawless. I can monitor my store from anywhere in the world with zero lag.\"", author: "— A. SHRESTHA, RETAIL GROUP" },
    { text: "\"Exceptional support and robust hardware. These cameras handle the monsoon season without a single glitch.\"", author: "— K. TAMANG, ESTATE MANAGER" }
  ],
  homeFounderName: "ROZIL THAPA",
  homeFounderTag: "Our Founder's Vision",
  homeFounderQuote: "The vision behind NV// was never just about hardware. It was about reclaiming safety in a world that never sleeps.",
  homeFounderDesc: "Founder Rozil Thapa started NightVision with a singular mission: to provide the people of Nepal with security technology that rivals the global elite, without compromise.",
  homeFounderImg: "/founder.jpg",
  
  expandNetworkTitle: "EXPAND THE NETWORK",
  expandNetworkDesc: "Join the elite force of NightVision security providers across Nepal. We provide the gear, the training, and the authority.",
  expandNetworkBtn: "BECOME A PARTNER",
  expandNetworkBgText: "DEALER",

  homeProductsTitle: "ELITE SERIES CAMERAS",
  homeProductsLinkText: "EXPLORE FULL CATALOG →",

  homeBlogTitle: "Our Blogs",
  homeBlogSubtitle: "Find out how Night Vision offers the best CCTV camera in Nepal and is transforming security in all sectors. From homes to organizations, see how trusted surveillance works in real life.",
  homeBlogBanner: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
  relatedProductsTitle: "Related Products",
  homeBlogFeaturedSlugs: [
    "cctv-camera-price-nepal-2026",
    "best-cctv-brand-nepal-nightvision-game-changer",
    "cctv-camera-maintenance-and-upgrades"
  ],
  homeBlogReadMoreText: "Read More",
  homeBlogViewAllText: "View All Blogs",
  homeBlogEventsBtnText: "News & Events",

  aboutHeroTitle: "ABOUT NIGHTVISION",
  aboutHeroDesc: "Nepal’s next-generation surveillance and security monitoring brand built for industrial security, intelligent detection, and uncompromising operational reliability.",
  aboutStoryTitle: "UNCOMPROMISING VIGILANCE",
  aboutStoryDesc1: "NIGHTVISION™ was founded in Kathmandu with one objective: eliminate the blind spots where security threats survive. Our systems are engineered to deliver maximum visibility, predictive intelligence, and unmatched operational durability.",
  aboutStoryDesc2: "From AI-powered motion analysis to advanced thermal imaging, we develop surveillance ecosystems that protect thousands of perimeters, commercial facilities, and residential hubs across Nepal.",
  aboutVision: "To redefine global surveillance standards through intelligent, predictive security systems that actively prevent threats before they happen.",
  aboutMission: "To engineer industrial-grade surveillance ecosystems that combine powerful hardware with intelligent software for unmatched reliability and operational awareness.",
  aboutPillarsTitle: "THE PILLARS OF NIGHTVISION",
  aboutPillarsDesc: "We build corporate partnership relationships on accountability, precision engineering, and the absolute trust that our operator networks will always remain protected.",
  aboutPillars: [
    { icon: "psychology", title: "Continuous Innovation", text: "We invest deeply in next-generation optical engineering and neural AI algorithms to keep your perimeter steps ahead of modern security challenges." },
    { icon: "workspace_premium", title: "Industrial-Grade Quality", text: "Every component undergoes rigorous stress-testing to guarantee reliable performance in critical security and extreme weather conditions." },
    { icon: "support_agent", title: "Dedicated Assistance", text: "We provide reliable, direct-line operator support to ensure your security system remains fully online and vigilant at all times." },
    { icon: "verified_user", title: "Ethical Integration", text: "Transparent privacy principles, secure encryption, and robust data protections engineered to keep your security records completely confidential." },
    { icon: "hub", title: "Interoperable Systems", text: "Our products are engineered to seamlessly connect with existing corporate networks, home automation, and global safety infrastructures." },
    { icon: "auto_graph", title: "Adaptive Performance", text: "Continuous firmware upgrades and self-learning camera models that get smarter, faster, and more secure the longer they are deployed." }
  ],
  aboutCtaTitle: "READY FOR THE DARK?",
  aboutCtaDesc: "Join the growing network of organizations and professionals who trust NIGHTVISION™ for critical surveillance and security operations worldwide.",

  founderHeroTitle: "Rozil Thapa: The Vision Behind NightVision",
  founderHeroSubtitle: "Architect of Nepal's most resilient security infrastructure. An uncompromising pursuit of technical dominance.",
  founderHeroBg: "https://lh3.googleusercontent.com/aida/ADBb0uigFZm2MU_7fFkN1PGbqxTC4_zsd19WX1rPPXQ9Dq4i5EMbGW8uL59JfytFZsh1esNLU9nligJX4Uv90jKWL6D8MLXnq26q3GTMcyBfSr1_zrrXpo67IpigOrch4RSQvHkeqBk9x4VXRJLGzluFfWso-xnep3TZtUNQtmjjVkx4xUm72ROueuOlQghaRdACvRgs6p-gLEx5sf_1mpkxK_OjtZIMzVkcxp_k_5NJOEzBPjW9mg5vXhadcbQb9GP1FJGoMGX0s4cmKw",
  founderName: "ROZIL THAPA",
  founderRole: "FOUNDER / CEO",
  founderNationality: "NEPALESE // KTM",
  founderRank: "COMMAND HUB CHIEF",
  founderHeadquarters: "BHAKTAPUR OPERATIONS",
  founderImage: "/founder.jpg",
  founderBioSections: [
    {
      num: "01",
      title: "Early Life",
      text: "Rozil was then raised by his grandfather, Ram Bahadur Thapa, a respected General Manager at DDC Nepal (Dairy Development Corporation). As a disciplined government employee, Ram Bahadur Thapa provided him a lesson in honesty, discipline, and responsibility.",
      textSec: "Rozil was a visionary person from his childhood who believed in the creation of opportunity rather than staying on order and staying on the safe side of the job. He carried his father’s spirit and legacy of doing something bold. At a very early age, his life carried the mark of enthusiasm, vision, and determination."
    },
    {
      num: "02",
      title: "Education",
      text: "Rozil completed his Secondary Education Examination (SEE) from Modern Boarding Secondary School, Bhaktapur. After completing his SEE level, he then joined Kathmandu World School for the Higher Secondary level (+2) and completed with a 3.45 GPA. After the completion of higher school education, most of his friends and colleagues planned to go abroad, but he started learning and getting involved in surveillance technology.",
      textSec: "Later, he joined TIME International College for his bachelor’s studies. At the time, he was deeply involved and engaged in the surveillance technology sector. While most of Rozil’s friends were studying business, he was practically learning and living in the real business world."
    }
  ],
  founderEst: "EST.2018",
  founderStartTitle: "Starting the Brand",
  founderStartText: "After gaining 2 years of on-the-field experience, he started learning more about business models, import systems, global technological trends, and the psychology of customers. Over the next 4 years, he continued learning about the technical side of the industry and continued learning about the market from backend logistics to front-line sales. His knowledge and experience in the surveillance technology sector helped to shape his brand later.\n\nIn 2023, Rozil took a big step from being a technician to a brand owner by launching NightVision®, a fully registered and trademarked Nepali CCTV brand. He established the brand with the objective of delivering high-quality, affordable, and reliable surveillance technology. NightVision is a brand built to make Nepal proud in the world of innovation and technology.",
  founderStartQuote: "I never wanted to follow the government path. I wanted to finish what my father started — to be a builder, a creator, a businessman.",
  founderStartStats: [
    { val: "01", label: "Initial Prototype\nBuilt & Tested" },
    { val: "24/7", label: "Agile Development\nContinuous Cycle" }
  ],
  founderMarketPhase: "SUCCESS",
  founderMarketTitle: "Success",
  founderMarketText: "Since the launch of Night Vision, the company has seen strong and steady growth. The company adopted a bold marketing campaign with “Timi dekhdaina, tara Night Vision dekcha” as the brand slogan. Under the leadership of Rozil, the company has progressed and earned recognition all over Nepal for its quality and trust in a short period.\n\nNight Vision is preparing to take a leap and enter the global markets where the company will introduce its products to international markets like Australia, Vietnam, and others. From a local CCTV installation company, the brand today offers a variety of NVRs, WiFi cameras, and LAN-powered surveillance devices that are engineered to meet modern security requirements.",
  founderMarketQuote: "Timi dekhdaina, tara Night Vision dekcha",
  founderMarketImg: "https://lh3.googleusercontent.com/aida/ADBb0ug9YQUIw0MrZtq_29TVpL-FnrRS4-3iO3i2xoUtfnLiEZe_x1qPNnIFn8RajYtk_3kUu4Lecu7tOfey1nC1fDG_afuxXijuyUz9pN7g86X1H10jaMDlqyeOIEEiGQvC1HhjCzxAXW4rYIekvJrK-trj0VvG2TcXCFJOVjtrbWxiyOVuUZaAbzTAwLZaRmCzGd_wGeeF0B0QC1GgBSLdCKyV-GWpYAkfufJgXCH9Uxfm-BaDCmosaS_A-O9GqeSpQeUk2eXxaetlEg",
  founderHighlightsTitle: "Key Highlights",
  founderHighlights: [
    { icon: "rocket_launch", title: "Post-School Launch", desc: "Founded NightVision International Pvt. Ltd. immediately after high school graduation, turning a garage startup into a nationwide enterprise." },
    { icon: "verified", title: "6+ Years Experience", desc: "Over half a decade of hands-on deployment in some of Nepal's most challenging environmental conditions." },
    { icon: "settings", title: "Registered Trademark", desc: "NightVision® is a fully registered and trademarked Nepali brand, built to make Nepal proud in the world of technology." },
    { icon: "groups", title: "Business Strategy", desc: "Operational in both Business-to-Business (B2B) corporate channels and Direct-to-Consumer (D2C) retail retail channels." },
    { icon: "security", title: "Global Footprint", desc: "Preparing for international expansion in 2025–2026, targeting tech deployments in emerging global markets." },
    { icon: "public", title: "Core Philosophy", desc: "Guided by three fundamental pillars of operation: Uncompromising Innovation, Absolute Trust, and Visionary Legacy." }
  ],
  founderVisionTitle: "Brand Vision / Mission",
  founderVisionQuote: "I didn’t just want to sell cameras. I wanted to create a brand that makes people feel secure, proud, and connected. NightVision is that dream — and we’re just getting started.",
  founderVisionText: "Rozil envisions Night Vision as a brand that will globally stand for Nepali technological innovation, reliability, and trust. Also, his mission is to offer quality, innovative technology, and affordable surveillance solutions to customers.\n\nHe believes in building not just products, but trust. The commitment to quality, trust, and customer empowerment is the foundation for Night Vision's philosophy, products, and services.\n\nThe foundation for moving from founding Night Vision to making it a premier CCTV brand globally comes from a deep place of legacy and passion. Night Vision is not just about products and profit for Rozil, but is something that honors his father’s dream.",
  founderVisionBg: "https://lh3.googleusercontent.com/aida/ADBb0uhFVruSlJhZ5q-sF8CoXAilTa0DbK8uG-4sf3f4cpUJsFuLNX3etF96ADT1UNmyuTuuJJTAVn4JPrUlNFDZt9xkUjNOaYf07xOE23xXpdgNxYTpTDkoXxMnvfQl_5jtL2ZclokCg18NynmRL3LwcqH5dgcnubOAPzSN7_Wmsj1wL7UqcbVy6U_7Snk7bUo4x_eCcpEGWTkQnkl6cD5H1Sla2en4IKIA1dWJFZBHVJWeERaVCKF_AciL8ixQPWy-N5f1jEqv-lJdXw",
  founderCtaTitle: "Ready to secure your perimeter?",
  founderCtaBtn1: "Consult with our team",
  founderCtaBtn2: "Explore our products",

  footerProductsText: "NIGHTVISION™ is Nepal’s premier security surveillance brand, innovating the design, development, and production of high-quality Closed-Circuit Television (CCTV) cameras. From smart AI-powered IP cameras and long-range outdoor bullets to versatile wireless home monitors, our security systems deliver uncompromising vigilance, continuous night vision, and encrypted live remote streaming. Secure your perimeter with NV NightVision.",

  metaTitle_home: "NightVision - Advanced surveillance for peace of mind",
  metaDesc_home: "Smart AI-powered surveillance systems engineered for continuous monitoring, encrypted live streaming, and real-time security response in Nepal.",
  metaTitle_products: "Explore Security Products - NightVision Nepal",
  metaDesc_products: "Browse high-quality CCTV cameras, NVR networks, PoE switches, and surveillance hard disks engineered for uncompromising vigilance.",
  metaTitle_about: "About Us - NightVision Surveillance",
  metaDesc_about: "Nepal’s next-generation surveillance and security monitoring brand built for industrial security, intelligent detection, and operational reliability.",
  metaTitle_contact: "Contact Us - NightVision Specialists",
  metaDesc_contact: "Get in touch with NightVision surveillance experts in Nepal for custom security consultations, quotes, and product support.",
  metaTitle_cart: "Shopping Cart - NightVision Security",
  metaDesc_cart: "View items in your surveillance equipment shopping cart. Complete your order with secure checkout.",
  metaTitle_founder: "Founder Rozil Thapa - NightVision",
  metaDesc_founder: "The vision behind NightVision Nepal by founder Rozil Thapa. Architecting Nepal's most resilient security infrastructure.",
  metaTitle_dealership: "Dealers & Partners - NightVision Network",
  metaDesc_dealership: "Find authorized NightVision dealers across Nepal or apply to become an official security partner.",
  metaTitle_support: "Technical Support Center - NightVision",
  metaDesc_support: "Access manuals, software downloads, and contact our 24/7 technical surveillance support helpline.",
  metaTitle_warranty: "Ironclad Warranty Policy - NightVision",
  metaDesc_warranty: "Every NightVision unit is forged for endurance. Read about our 1-Year Ironclad Warranty and device support policy.",
  metaTitle_terms: "Terms of Service - NightVision",
  metaDesc_terms: "Terms and conditions governing the use of NightVision surveillance hardware, digital applications, and services.",
  metaTitle_privacy: "Privacy Protocol Policy - NightVision",
  metaDesc_privacy: "Learn how we protect data captured by NightVision surveillance systems. Secure encryption and privacy standards.",
  metaTitle_blog: "Security Intelligence Blog - NightVision",
  metaDesc_blog: "Read latest updates, security tutorials, threat reports, and CCTV guides from NightVision experts.",
  metaTitle_gallery: "Perimeter Installation Gallery - NightVision",
  metaDesc_gallery: "Browse active drone feeds, operations matrix centers, and night vision installation mockups across Nepal.",

  footerBrandDesc: "Dedicated to the highest standard of surveillance technology and national security for Nepal. Security is our duty.",
  footerAddress: "Radhe Radhe, Bhaktapur, Nepal",
  footerPhone: "+977-9745978217",
  footerEmail: "info@nightvision.com.np",
  footerHours: "Sun - Fri: 9:00 AM - 6:00 PM",
  footerSubscribeTitle: "SUBSCRIBE FOR UPDATES",
  socialFacebook: "https://www.facebook.com/nightvisioninterprises",
  socialInstagram: "https://www.instagram.com/nightvision_nepal/",
  socialLinkedin: "https://linkedin.com/",
  socialTiktok: "https://www.tiktok.com/@nvnightvisionnp?lang=en",
  socialX: "https://x.com/",
  socialYoutube: "https://www.youtube.com/@nvnightvisionnp",

  contactHeroTitle: "CONTACT US",
  contactHeroSubtitle: "OUR SURVEILLANCE SPECIALISTS ARE STANDING BY. CONNECT WITH OUR SURVEILLANCE EXPERTS FOR UNCOMPROMISING SECURITY SOLUTIONS.",
  contactHeroImg: "https://lh3.googleusercontent.com/aida/ADBb0uigFZm2MU_7fFkN1PGbqxTC4_zsd19WX1rPPXQ9Dq4i5EMbGW8uL59JfytFZsh1esNLU9nligJX4Uv90jKWL6D8MLXnq26q3GTMcyBfSr1_zrrXpo67IpigOrch4RSQvHkeqBk9x4VXRJLGzluFfWso-xnep3TZtUNQtmjjVkx4xUm72ROueuOlQghaRdACvRgs6p-gLEx5sf_1mpkxK_OjtZIMzVkcxp_k_5NJOEzBPjW9mg5vXhadcbQb9GP1FJGoMGX0s4cmKw",
  contactMapTitle: "Night Vision CCTV Nepal",
  contactMapLocationName: "Kathmandu, Nepal",
  contactMapLocationDesc: "Advanced Surveillance Headquarters",
  contactMapDirectionsUrl: "https://maps.app.goo.gl/QohWxPHLPzi1MPCu7",
  contactMapLat: "27.677293° N",
  contactMapLng: "85.397990° E",
  contactMapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d516.379656973646!2d85.3979903064471!3d27.677293954618367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1902e459720b%3A0x446057850e6bebe5!2sNight%20Vision%20CCTV%20Nepal!5e1!3m2!1sen!2snp!4v1778740476919!5m2!1sen!2snp",

  supportHeroTitle: "24/7 EXPERT SUPPORT",
  supportHeroDesc: "Our surveillance specialists are ready to help you. Connect with an expert instantly.",
  supportHelpline: "+977-9745978217",
  supportEmail: "info@nightvision.com.np",

  warrantyHeroTitle: "UNCOMPROMISING PROTECTION: WARRANTY POLICY.",
  warrantyHeroSubtitle: "Every NV// unit is forged for endurance. Our 1-Year 'Ironclad' Warranty ensures your perimeter remains secure without failure. In the rare event of a technical issue, we deploy immediate hardware restoration.",
  warrantyHeroBg: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAsWqi7mOfZinZloeVK7bABjdrvaSo8ReutefSSHNtFzmkBVb5gKv2eRnkK0Zg_xnXgqVasj2hKnB3nVQ8g5jx9UQ7KgNlt0YWQyIA4gsxww16R1o5U2GtC66U5ub0xCd5u8WD9sLs5MJQ1ik2IWb26FNVwMXR2810anpFienZfLUPqajNfBU6FMtOmXLOPoZC-oLRGL1UwequU_q5aN7aDrDOqC58rU9iY_qP1cS-6dnbeZ-MhjpKH3aEp1BmY-XOehPr8YHtXf8",

  privacyHeroTitle: "PRIVACY POLICY",
  privacyProtocolLabel: "PROTOCOL: PRIVACY_V2.0_NP",
  privacyIntroContent: "At NV// NIGHTVISION™, compromising on security is not an option. Our Privacy Policy outlines the rigid technical standards we employ to protect the data captured by our surveillance ecosystems across Nepal.\n\nWe operate with uncompromising vigilance, ensuring that your personal and environmental data is handled with the highest level of industrial-grade security protocols.",

  termsHeroTitle: "TERMS OF SERVICE",
  termsIntroRevision: "LAST REVISION: OCTOBER 24, 2023",
  termsIntroContent: "These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity, and NV// NIGHTVISION™ SECURITY SYSTEMS. By accessing our surveillance solutions, digital platforms, or hardware distribution networks, you acknowledge that you have read, understood, and agreed to be bound by all of these terms.",

  trafficActiveSessions: "1482",
  trafficDailyHits: "84290",
  trafficBandwidth: "28.4",
  trafficThreatsBlocked: "427"
};

export const SEED_SETTINGS = [
  {
    id: "global_config",
    helpline1: "01-5925995",
    helpline2: "+977-9745978217",
    address: "Radhe Radhe, Bhaktapur, Nepal",
    email: "info@nightvision.com.np",
    bannerText: "SPECIAL NOTICE: ALL STORES SYNCHRONIZED // HIGH-PERFORMANCE FIRMWARE UPDATE v4.12 AVAILABLE FOR DOWNLOAD.",
    systemAlert: "ALERT: SYSTEM NORMAL // PERIMETER SAFE"
  },
  SEED_SITE_CONTENTS
];

export const SEED_GALLERY = [
  {
    id: 1,
    category: "premium-cameras",
    title: "NV-Dome Pro Zero Light Installation",
    model: "NV-DOME-900",
    location: "KTM Office Sector 1",
    resolution: "4K UHD (3840x2160)",
    status: "ACTIVE - SECURED",
    img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
    desc: "Premium dome camera deployed in corporate perimeter, featuring dual-lens IR cut filters and AI-based human recognition algorithms."
  },
  {
    id: 2,
    category: "control-centers",
    title: "Central Control Room Grid Array",
    model: "NV-WALL-CONSOLE-v4",
    location: "Bhaktapur Operations Center",
    resolution: "Multi-Feed Matrix",
    status: "ONLINE - SYNCED",
    img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    desc: "Video wall synchronizing 120+ active CCTV feeds across corporate office networks, utilizing real-time anomaly alerts."
  },
  {
    id: 3,
    category: "thermal-ir",
    title: "Thermal Target Acquisition Feed",
    model: "NV-THERM-x7",
    location: "Mustang High Altitude Outpost",
    resolution: "640x512 Radiometric",
    status: "OPERATIONAL",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    desc: "Long-range thermal sensor field feed capturing heat signatures at sub-zero temperatures. Active motion recognition zone enabled."
  },
  {
    id: 4,
    category: "enterprise-installations",
    title: "Wall Mount PTZ Exterior Deployment",
    model: "NV-PTZ-PREMIUM",
    location: "Industrial Sector West",
    resolution: "4K Zoom 30x",
    status: "ACTIVE - PANNING",
    img: "https://images.unsplash.com/photo-1525498128493-380d1990a112?auto=format&fit=crop&w=800&q=80",
    desc: "Heavy-duty outdoor PTZ camera, fully integrated into the customer's remote monitoring dashboard. High wind resistance chassis."
  },
  {
    id: 5,
    category: "control-centers",
    title: "Operations Desk Station 3",
    model: "NV-CLIENT-WORKSTATION-x9",
    location: "Lalitpur Server Hub",
    resolution: "Dual 1080p Monitor Set",
    status: "STANDBY - SECURE",
    img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
    desc: "Local administrator monitoring station with direct link to emergency fire alarms and automated security alerts."
  },
  {
    id: 6,
    category: "premium-cameras",
    title: "IR Night-Vision Sub-Assembly Setup",
    model: "NV-BULLET-750",
    location: "Biratnagar Depot Zone",
    resolution: "5MP Smart IR",
    status: "ACTIVE - ONLINE",
    img: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80",
    desc: "High-power infrared illuminators array on bullet chassis, designed to render pitch-black shipping containers with crisp clarity."
  },
  {
    id: 7,
    category: "enterprise-installations",
    title: "Encrypted Network Rack Integration",
    model: "NV-NET-SWITCH-24G",
    location: "Pokhara Data Hub",
    resolution: "10Gbps SFP+ Link",
    status: "SECURED - STREAMING",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    desc: "Centralized gigabit optical switches routing encrypted feeds from 40 outdoor units into the primary local storage network."
  },
  {
    id: 8,
    category: "thermal-ir",
    title: "Himalayan Ridge Patrol Sensor Calibration",
    model: "NV-THERM-x7",
    location: "Annapurna Base Perimeter",
    resolution: "1080p Upscaled IR",
    status: "ACTIVE - LIVE",
    img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
    desc: "High-altitude environmental housing test for NV-THERM line. Standardized operations maintained at temperatures below -25°C."
  },
  {
    id: 9,
    category: "premium-cameras",
    title: "Residential Gate PTZ Integration",
    model: "NV-PTZ-MINI",
    location: "Residential Zone 4",
    resolution: "4K UHD Smart Mount",
    status: "ACTIVE - SECURED",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    desc: "Mini-PTZ installation offering residential perimeter coverage. Integrates smart facial alerts and remote two-way audio."
  }
];

export const SEED_TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Rozil Thapa',
    role: 'Founder & CEO',
    bio: 'Visionary leader dedicated to creating advanced surveillance solutions and pushing the boundaries of security tech in Nepal.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 2,
    name: 'Aisha Sharma',
    role: 'Chief Technology Officer',
    bio: 'Pioneering our AI-powered motion analysis and cloud integration to keep you safe.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 3,
    name: 'Rajeev Shrestha',
    role: 'Head of Operations',
    bio: 'Ensuring seamless deployment and operational durability across our nationwide network.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 4,
    name: 'Sneha Gurung',
    role: 'Lead Developer',
    bio: 'Architecting the software that drives our intelligent systems from the ground up.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 5,
    name: 'Bikash Tamang',
    role: 'Security Analyst',
    bio: 'Analyzing threat patterns to build predictive security models that stop crimes before they happen.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 6,
    name: 'Anjali Chaudhary',
    role: 'AI Research Engineer',
    bio: 'Developing computer vision algorithms and deep learning models for intelligent video analytics.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 7,
    name: 'Sunil Basnet',
    role: 'Hardware Engineering Lead',
    bio: 'Designing high-durability thermal sensors and low-light optical components for our device fleet.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 8,
    name: 'Priya Adhikari',
    role: 'UX/UI Designer',
    bio: 'Crafting intuitive dashboard experiences and seamless mobile interfaces for our security app.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 9,
    name: 'Niranjan Mahato',
    role: 'Cloud Infrastructure Specialist',
    bio: 'Architecting high-availability cloud storage systems and secure video streaming pipelines.',
    image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 10,
    name: 'Sabina Karki',
    role: 'Customer Success Director',
    bio: 'Leading our 24/7 technical support and client onboarding operations across major enterprise deployments.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 11,
    name: 'Ramesh Bhatta',
    role: 'Cybersecurity Consultant',
    bio: 'Conducting network penetration testing and securing firmware integrations against potential vulnerabilities.',
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 12,
    name: 'Deepa Shrestha',
    role: 'Product Manager',
    bio: 'Bridging the gap between engineering teams and enterprise client requirements to define our product roadmap.',
    image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 13,
    name: 'Pradeep Khadka',
    role: 'QA Lead Engineer',
    bio: 'Implementing automated testing frameworks and verifying the stability of software updates.',
    image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 14,
    name: 'Kabita Rai',
    role: 'Marketing Manager',
    bio: 'Spreading our mission of uncompromising security and managing public relations and events.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  },
  {
    id: 15,
    name: 'Manish Giri',
    role: 'Senior DevOps Engineer',
    bio: 'Building continuous integration systems and optimizing deployment speeds for our global cloud services.',
    image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=800&auto=format&fit=crop&q=80',
    socials: { linkedin: '#', twitter: '#', facebook: '#', instagram: '#' }
  }
];

export const SEED_ACTIVITIES = [
  {
    id: 1,
    message: "System database initialized with default parameters.",
    type: "system",
    date: "Jun 08, 2026, 09:30 AM"
  },
  {
    id: 2,
    message: "New product 'NV-Dome Pro camera' created in registry.",
    type: "admin",
    date: "Jun 08, 2026, 10:15 AM"
  },
  {
    id: 3,
    message: "Contact message from Rupa Thapa received.",
    type: "contact",
    date: "Jun 08, 2026, 11:22 AM"
  }
];

export const SEED_ADMIN_USERS = [
  {
    id: "admin-1",
    name: "Administrator",
    email: "admin@nightvision.com",
    password: "admin123",
    role: "Admin",
    date: "Jun 08, 2026"
  }
];

export const DEFAULT_HOMEPAGE_SETTINGS = {
  hero: {
    status_badge: "LIVE SURVEILLANCE ACTIVE",
    heading: "ADVANCED SURVEILLANCE FOR PEACE OF MIND",
    subheading: "Smart AI-powered surveillance systems engineered for continuous monitoring, encrypted live streaming, and real-time security response.",
    body_text: "Highly secured application and hardware for absolute privacy.",
    button_text: "VIEW OUR PRODUCTS",
    button_url: "/products",
    button2_text: "FEATURES",
    button2_url: "#features",
    image_url: "/hero_pointing_cctv.png",
    recordings: [
      "CAM-01: KATHMANDU HQ",
      "CAM-02: BIRATNAGAR GRID",
      "CAM-03: POKHARA LOGISTICS",
      "CAM-04: LUMBINI HUB",
      "CAM-05: JANAKPUR PERIMETER"
    ]
  },
  ticker: {
    bannerText: "NightVision™ // CCTV Cameras Nepal // 4K Surveillance // Made for Nepal //",
    bannerSpeed: 18,
    bannerEnabled: true
  },
  features: {
    heading: "NV NightVision Features",
    subheading: "Advanced and Reliable Security Solutions to meet increasing demands of dynamic and ever-changing security landscape by innovating design, development and production of high-quality Closed-Circuit Television.",
    body_text: "Easy Installation, Advanced Features, Durable, Secured.",
    button_text: "OUR PRODUCTS",
    button_url: "/products",
    image_url: "",
    items: [
      { icon: "power", title: "Easy Installation", desc: "Does not require any wiring and function as Wi-Fi Based plug and play surveillance devices." },
      { icon: "near_me", title: "Advanced Features", desc: "Night Vision Cameras are designed and developed with advanced feature and keeping practical usage in consideration." },
      { icon: "thunderstorm", title: "Durable", desc: "Manufactured to be used for indoor and outdoor purpose to last long from temperature -20 degree to 50+ degree Celsius." },
      { icon: "shield", title: "Secured", desc: "Highly secured application and hardware for absolute privacy which also comes with private mode." }
    ]
  },
  products: {
    tag: "// CATALOG MATRIX // FEATURED SURVEILLANCE HARDWARE",
    heading: "ELITE SERIES CAMERAS",
    subheading: "Browse high-quality CCTV cameras, NVR networks, PoE switches, and surveillance hard disks engineered for uncompromising vigilance.",
    button_text: "EXPLORE FULL CATALOG →",
    button_url: "/products"
  },
  about: {
    tag: "The NightVision Edge",
    heading: "UNCOMPROMISING VIGILANCE TECHNOLOGY",
    subheading: "We don't just sell cameras; we deploy comprehensive security ecosystems tailored for the unique challenges of Nepal's infrastructure.",
    body_text: "Weatherproof IP67 rated, Zero Downtime, Global Link, and Smart AI detection.",
    button_text: "ABOUT US",
    button_url: "/company/about",
    image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    features: [
      { val: "Weatherproof", label: "IP67 RATED" },
      { val: "24/7 Monitoring", label: "ZERO DOWNTIME" },
      { val: "Remote Access", label: "GLOBAL LINK" },
      { val: "Smart Alerts", label: "AI DETECTION" }
    ]
  },
  founder: {
    tag: "Our Founder's Vision",
    name: "ROZIL THAPA",
    quote: "The vision behind NV// was never just about hardware. It was about reclaiming safety in a world that never sleeps.",
    description: "Founder Rozil Thapa started NightVision with a singular mission: to provide the people of Nepal with security technology that rivals the global elite, without compromise.",
    image_url: "/founder.jpg",
    button_text: "READ FULL STORY →",
    button_url: "/company/founder"
  },
  testimonials: {
    tag: "// OPERATIONAL TRUST // VERIFIED CLIENTS",
    heading: "TRUSTED BY LEADERS",
    items: [
      { text: "The mobile app integration is flawless. I can monitor my store from anywhere in the world with zero lag. Outstanding build quality and rock-solid reliability.", author: "A. Shrestha", role: "Retail Group" },
      { text: "NightVision's 4K AI surveillance system has revolutionized security across our commercial facilities in Biratnagar. Zero downtime, crystal-clear night vision.", author: "Pawan Shrestha", role: "Enterprise Partner, Nano Tek" },
      { text: "Deployment was seamless across our Lumbini warehouse locations. NightVision cameras withstand extreme weather while delivering live 60fps streaming.", author: "Siddharth Lumbini", role: "Logistics Partner" }
    ]
  },
  cta: {
    tag: "// NATIONWIDE SURVEILLANCE ECOSYSTEM",
    heading: "EXPAND THE NETWORK",
    subheading: "Join Nepal's premier surveillance ecosystem. Partner with NightVision to distribute high-tier AI cameras, thermal systems, and perimeter hardware across all 7 provinces.",
    body_text: "We provide the gear, the training, and the authority to become a partner.",
    button_text: "BECOME A CERTIFIED DEALER →",
    button_url: "/dealers/apply",
    button2_text: "CONTACT PARTNER TEAM",
    button2_url: "/contact",
    bg_text: "DEALER",
    image_url: ""
  },
  blogs: {
    tag: "// SECURITY INTELLIGENCE // ARTICLES & UPDATES",
    heading: "Our Blogs",
    subheading: "Find out how Night Vision offers the best CCTV camera in Nepal and is transforming security in all sectors. From homes to organizations, see how trusted surveillance works in real life.",
    card_tag: "[ INTEL ARCHIVES ]",
    card_title: "OPERATIONAL SECURITY & ANNOUNCEMENTS",
    card_desc: "Access real-time reports, field studies, product update logs, and corporate announcements.",
    image_url: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
    button1_text: "ACCESS SECURITY BLOG →",
    button1_url: "/blog",
    button2_text: "EXPLORE NEWS & EVENTS",
    button2_url: "/events"
  }
};
