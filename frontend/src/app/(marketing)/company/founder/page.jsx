import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSiteContents } from '../../../../utils/cmsDb';
import PageHeroBanner from '../../../../components/ui/PageHeroBanner';
import Icon from '../../../../utils/Icon';
import { Rocket, Award, Cpu, Handshake, Lock, Globe } from 'lucide-react';



const FounderPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const contents = useSiteContents();

  const bioSections = (contents.founderBioSections && contents.founderBioSections[0]?.text?.includes("grandfather"))
    ? contents.founderBioSections
    : [
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
      ];

  const startTitle = (contents.founderStartText && contents.founderStartText.includes("gaining 2 years")) ? (contents.founderStartTitle || "Starting the Brand") : "Starting the Brand";
  
  const startText = (contents.founderStartText && contents.founderStartText.includes("gaining 2 years"))
    ? contents.founderStartText
    : "After gaining 2 years of on-the-field experience, he started learning more about business models, import systems, global technological trends, and the psychology of customers. Over the next 4 years, he continued learning about the technical side of the industry and continued learning about the market from backend logistics to front-line sales. His knowledge and experience in the surveillance technology sector helped to shape his brand later.\n\nIn 2023, Rozil took a big step from being a technician to a brand owner by launching NightVision®, a fully registered and trademarked Nepali CCTV brand. He established the brand with the objective of delivering high-quality, affordable, and reliable surveillance technology. NightVision is a brand built to make Nepal proud in the world of innovation and technology.";

  const startQuote = contents.founderStartQuote || "I never wanted to follow the government path. I wanted to finish what my father started — to be a builder, a creator, a businessman.";

  const marketTitle = (contents.founderMarketText && contents.founderMarketText.includes("Timi dekhdaina")) ? (contents.founderMarketTitle || "Success") : "Success";

  const marketText = (contents.founderMarketText && contents.founderMarketText.includes("Timi dekhdaina"))
    ? contents.founderMarketText
    : "Since the launch of Night Vision, the company has seen strong and steady growth. The company adopted a bold marketing campaign with “Timi dekhdaina, tara Night Vision dekcha” as the brand slogan. Under the leadership of Rozil, the company has progressed and earned recognition all over Nepal for its quality and trust in a short period.\n\nNight Vision is preparing to take a leap and enter the global markets where the company will introduce its products to international markets like Australia, Vietnam, and others. From a local CCTV installation company, the brand today offers a variety of NVRs, WiFi cameras, and LAN-powered surveillance devices that are engineered to meet modern security requirements.";

  const marketQuote = contents.founderMarketQuote || "Timi dekhdaina, tara Night Vision dekcha";

  const visionTitle = (contents.founderVisionText && contents.founderVisionText.includes("Mission")) ? (contents.founderVisionTitle || "Brand Vision / Mission") : "Brand Vision / Mission";

  const visionQuote = (contents.founderVisionQuote && contents.founderVisionQuote.includes("dream"))
    ? contents.founderVisionQuote
    : "I didn’t just want to sell cameras. I wanted to create a brand that makes people feel secure, proud, and connected. NightVision is that dream — and we’re just getting started.";

  const visionText = (contents.founderVisionText && contents.founderVisionText.includes("Nepali technological innovation"))
    ? contents.founderVisionText
    : "Rozil envisions Night Vision as a brand that will globally stand for Nepali technological innovation, reliability, and trust. Also, his mission is to offer quality, innovative technology, and affordable surveillance solutions to customers.\n\nHe believes in building not just products, but trust. The commitment to quality, trust, and customer empowerment is the foundation for Night Vision's philosophy, products, and services.\n\nThe foundation for moving from founding Night Vision to making it a premier CCTV brand globally comes from a deep place of legacy and passion. Night Vision is not just about products and profit for Rozil, but is something that honors his father’s dream.";

  const highlights = (contents.founderHighlights && contents.founderHighlights[2]?.title?.includes("Trademark"))
    ? contents.founderHighlights
    : [
        { icon: "rocket_launch", title: "Post-School Launch", desc: "Founded NightVision International Pvt. Ltd. immediately after high school graduation, turning a garage startup into a nationwide enterprise." },
        { icon: "verified", title: "6+ Years Experience", desc: "Over half a decade of hands-on deployment in some of Nepal's most challenging environmental conditions." },
        { icon: "settings", title: "Registered Trademark", desc: "NightVision® is a fully registered and trademarked Nepali brand, built to make Nepal proud in the world of technology." },
        { icon: "groups", title: "Business Strategy", desc: "Operational in both Business-to-Business (B2B) corporate channels and Direct-to-Consumer (D2C) retail retail channels." },
        { icon: "security", title: "Global Footprint", desc: "Preparing for international expansion in 2025–2026, targeting tech deployments in emerging global markets." },
        { icon: "public", title: "Core Philosophy", desc: "Guided by three fundamental pillars of operation: Uncompromising Innovation, Absolute Trust, and Visionary Legacy." }
      ];

  const styles = {
    // Global
    body: {
      backgroundColor: '#131313',
      color: '#e5e2e1',
      fontFamily: "'Inter', sans-serif",
      lineHeight: '1.6',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
    },

    // Hero Section
    hero: {
      position: 'relative',
      height: '80vh',
      display: 'flex',
      alignItems: 'flex-end',
      paddingBottom: '80px',
      paddingLeft: '40px',
      paddingRight: '40px',
      overflow: 'hidden',
    },

    heroBg: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      backgroundImage: `url(${contents.founderHeroBg || 'https://lh3.googleusercontent.com/aida/ADBb0uigFZm2MU_7fFkN1PGbqxTC4_zsd19WX1rPPXQ9Dq4i5EMbGW8uL59JfytFZsh1esNLU9nligJX4Uv90jKWL6D8MLXnq26q3GTMcyBfSr1_zrrXpo67IpigOrch4RSQvHkeqBk9x4VXRJLGzluFfWso-xnep3TZtUNQtmjjVkx4xUm72ROueuOlQghaRdACvRgs6p-gLEx5sf_1mpkxK_OjtZIMzVkcxp_k_5NJOEzBPjW9mg5vXhadcbQb9GP1FJGoMGX0s4cmKw'})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      filter: 'grayscale(100%) opacity(0.4)',
    },

    heroOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(to top, #131313 0%, rgba(19, 19, 19, 0.4) 50%, transparent 100%)',
      zIndex: 1,
    },

    heroContent: {
      position: 'relative',
      zIndex: 20,
      width: '100%',
    },

    archiveLabel: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '16px',
      backgroundColor: 'rgba(19, 19, 19, 0.8)',
      backdropFilter: 'blur(10px)',
      padding: '8px 16px',
      border: '1px solid #434938',
      fontSize: '12px',
      letterSpacing: '3px',
      color: '#94da32',
      fontWeight: 600,
    },

    pulseDot: {
      width: '12px',
      height: '12px',
      backgroundColor: '#dc2626',
      borderRadius: '50%',
      animation: 'pulse 2s infinite',
    },

    h1: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: '80px',
      fontWeight: 700,
      letterSpacing: '4px',
      color: '#b5e75d',
      textTransform: 'uppercase',
      lineHeight: '1.1',
      marginBottom: '24px',
      maxWidth: '80%',
    },

    heroSubtitle: {
      fontSize: '22px',
      color: '#c3c9b3',
      maxWidth: '70%',
      borderLeft: '4px solid #94da32',
      paddingLeft: '24px',
    },

    // Bio Section
    bioSection: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      minHeight: '100vh',
      borderTop: '1px solid #434938',
      borderBottom: '1px solid #434938',
    },

    bioImage: {
      position: 'relative',
      overflow: 'hidden',
      borderRight: '1px solid #434938',
      cursor: 'pointer',
    },

    bioImageImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'grayscale(100%) brightness(0.75) contrast(1.25)',
      transition: 'transform 1s ease',
    },

    idCard: {
      position: 'absolute',
      bottom: '40px',
      left: '40px',
      right: '40px',
      backgroundColor: 'rgba(42, 42, 42, 0.9)',
      backdropFilter: 'blur(10px)',
      padding: '32px',
      border: '2px solid #94da32',
      boxShadow: '0 0 25px rgba(181, 231, 93, 0.2)',
    },

    idGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '32px',
    },

    idLabel: {
      fontSize: '12px',
      letterSpacing: '1px',
      color: '#94da32',
      fontWeight: 600,
      marginBottom: '4px',
      textTransform: 'uppercase',
    },

    idValue: {
      fontSize: '24px',
      fontWeight: 700,
      color: '#e5e2e1',
      fontFamily: "'Space Grotesk', sans-serif",
    },

    socialIconsContainer: {
      display: 'flex',
      gap: '16px',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },

    socialIconLink: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '54px',
      height: '54px',
      border: '1px solid #434938',
      color: '#c3c9b3',
      textDecoration: 'none',
      transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },

    bioContent: {
      padding: '96px 40px',
      backgroundColor: '#0e0e0e',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },

    bioItem: {
      marginBottom: '96px',
      position: 'relative',
      paddingLeft: '48px',
      borderLeft: '2px solid #94da32',
    },

    bioItemInactive: {
      borderLeftColor: '#434938',
    },

    bioNumber: {
      position: 'absolute',
      left: '-12px',
      top: '0',
      width: '24px',
      height: '24px',
      backgroundColor: '#94da32',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '10px',
      color: '#131313',
      fontWeight: 700,
    },

    bioNumberInactive: {
      backgroundColor: '#434938',
    },

    bioTitle: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: '48px',
      fontWeight: 700,
      letterSpacing: '2px',
      color: '#94da32',
      textTransform: 'uppercase',
      marginBottom: '32px',
    },

    bioText: {
      fontSize: '18px',
      color: '#e5e2e1',
      marginBottom: '24px',
    },

    bioTextSecondary: {
      fontSize: '16px',
      color: '#c3c9b3',
    },

    // Starting Brand Section
    startBrand: {
      position: 'relative',
      backgroundColor: '#20201f',
      padding: '128px 40px',
      overflow: 'hidden',
    },

    estBg: {
      position: 'absolute',
      top: '0',
      right: '0',
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: '20vw',
      color: 'rgba(19, 19, 19, 0.3)',
      fontWeight: 700,
      pointerEvents: 'none',
      lineHeight: '1',
    },

    startContent: {
      position: 'relative',
      zIndex: 10,
      maxWidth: '1280px',
    },

    sectionTitle: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: '80px',
      fontWeight: 700,
      letterSpacing: '4px',
      color: '#b5e75d',
      textTransform: 'uppercase',
      marginBottom: '48px',
    },

    startGrid: {
  display: 'grid',
  gridTemplateColumns:
    window.innerWidth <= 768
      ? '1fr'
      : '1fr 1fr',

  gap: window.innerWidth <= 768
    ? '24px'
    : '64px',

  alignItems: 'start',

  width: '100%',
},

    startText: {
  fontSize:
    window.innerWidth <= 480
      ? '14px'
      : window.innerWidth <= 768
      ? '16px'
      : '22px',

  color: '#e5e2e1',

  lineHeight: '1.8',

  width: '100%',

  wordBreak: 'break-word',
},

   statBoxes: {
  display: 'grid',

  gridTemplateColumns:
    window.innerWidth <= 768
      ? '1fr'
      : '1fr 1fr',

  gap:
    window.innerWidth <= 768
      ? '16px'
      : '32px',

  width: '100%',
},

    statBox: {
      border: '2px solid #94da32',
      padding: '40px',
      backgroundColor: 'rgba(19, 19, 19, 0.5)',
      backdropFilter: 'blur(10px)',
      position: 'relative',
      transition: 'border-color 0.3s',
    },

    statBoxInactive: {
      borderColor: '#434938',
    },

    statBoxAfter: {
      position: 'absolute',
      top: '8px',
      right: '8px',
      color: '#434938',
      fontWeight: 'bold',
      fontSize: '14px',
    },

    statNumber: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: '64px',
      color: '#94da32',
      marginBottom: '16px',
      fontWeight: 700,
    },

    statNumberInactive: {
      color: '#c3c9b3',
    },

    statLabel: {
      fontSize: '12px',
      letterSpacing: '1px',
      fontWeight: 600,
      textTransform: 'uppercase',
      lineHeight: '1.5',
    },

    statLabelInactive: {
      color: '#c3c9b3',
    },

    // Market Dominance
    marketSection: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      borderTop: '1px solid #434938',
      borderBottom: '1px solid #434938',
    },

    marketLeft: {
      padding: '128px 40px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      order: 2,
    },

    marketRight: {
      position: 'relative',
      minHeight: '500px',
      overflow: 'hidden',
      order: 1,
      borderLeft: '1px solid #434938',
    },

    marketRightImg: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      filter: 'grayscale(100%)',
      transition: 'filter 1s ease',
      cursor: 'pointer',
    },

    phaseLabel: {
      display: 'inline-block',
      backgroundColor: '#94da32',
      color: '#131313',
      padding: '4px 16px',
      fontFamily: 'monospace',
      fontSize: '14px',
      fontWeight: 700,
      marginBottom: '32px',
    },

    marketTitle: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: '48px',
      fontWeight: 700,
      letterSpacing: '2px',
      color: '#94da32',
      textTransform: 'uppercase',
      marginBottom: '32px',
    },

    marketText: {
      fontSize: '22px',
      color: '#e5e2e1',
      lineHeight: '1.6',
      marginBottom: '48px',
      maxWidth: '600px',
    },

    quote: {
      padding: '32px',
      border: '1px solid #434938',
      backgroundColor: '#2a2a2a',
      fontStyle: 'italic',
      color: '#c3c9b3',
      fontSize: '18px',
    },

    // Key Highlights
    highlights: {
      backgroundColor: '#0e0e0e',
      padding: '128px 40px',
    },

    highlightsTitle: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: '80px',
      fontWeight: 700,
      letterSpacing: '4px',
      color: '#94da32',
      textTransform: 'uppercase',
      marginBottom: '80px',
    },

    cardsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '40px',
    },

    card: {
      backgroundColor: '#2a2a2a',
      padding: '48px',
      border: '1px solid #434938',
      position: 'relative',
      transition: 'border-color 0.3s',
      cursor: 'pointer',
    },

    cardHover: {
      borderColor: '#94da32',
    },

    cardAfter: {
      position: 'absolute',
      top: '0',
      right: '0',
      width: '48px',
      height: '48px',
      borderTop: '2px solid',
      borderRight: '2px solid',
      transition: 'border-color 0.3s',
    },

    cardIcon: {
      fontSize: '48px',
      marginBottom: '32px',
    },

    cardTitle: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: '24px',
      fontWeight: 600,
      color: '#e5e2e1',
      marginBottom: '16px',
    },

    cardText: {
      fontSize: '16px',
      color: '#c3c9b3',
      lineHeight: '1.6',
    },

    // Brand Vision
    vision: {
      position: 'relative',
      padding: '192px 40px',
      overflow: 'hidden',
    },

    visionBg: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundImage: `url(${contents.founderVisionBg || 'https://lh3.googleusercontent.com/aida/ADBb0uhFVruSlJhZ5q-sF8CoXAilTa0DbK8uG-4sf3f4cpUJsFuLNX3etF96ADT1UNmyuTuuJJTAVn4JPrUlNFDZt9xkUjNOaYf07xOE23xXpdgNxYTpTDkoXxMnvfQl_5jtL2ZclokCg18NynmRL3LwcqH5dgcnubOAPzSN7_Wmsj1wL7UqcbVy6U_7Snk7bUo4x_eCcpEGWTkQnkl6cD5H1Sla2en4IKIA1dWJFZBHVJWeERaVCKF_AciL8ixQPWy-N5f1jEqv-lJdXw'})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      filter: 'grayscale(100%) brightness(0.2)',
      zIndex: 0,
    },

    visionOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(to bottom, #131313 0%, transparent 50%, #131313 100%)',
      zIndex: 1,
    },

    visionContent: {
      position: 'relative',
      zIndex: 10,
      textAlign: 'center',
      maxWidth: '1280px',
      margin: '0 auto',
    },

    visionTitle: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: '80px',
      fontWeight: 700,
      letterSpacing: '4px',
      color: '#94da32',
      textTransform: 'uppercase',
      marginBottom: '64px',
    },

    visionQuote: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: '48px',
      color: '#e5e2e1',
      fontStyle: 'italic',
      lineHeight: '1.4',
      marginBottom: '64px',
      paddingTop: '64px',
      paddingBottom: '64px',
      borderTop: '1px solid rgba(148, 218, 50, 0.3)',
      borderBottom: '1px solid rgba(148, 218, 50, 0.3)',
    },

    visionText: {
      fontSize: '22px',
      color: '#c3c9b3',
      lineHeight: '1.6',
      maxWidth: '900px',
      margin: '0 auto',
    },

    // CTA Section
    cta: {
      backgroundColor: '#b5e75d',
      padding: '128px 40px',
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.05) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.02), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.02))',
      backgroundSize: '100% 3px, 3px 100%',
    },

    ctaBefore: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: 'radial-gradient(circle, rgba(131, 157, 50, 0.3) 1px, transparent 1px)',
      backgroundSize: '40px 40px',
      pointerEvents: 'none',
      zIndex: 0,
    },

    ctaContent: {
      position: 'relative',
      zIndex: 10,
      textAlign: 'center',
    },

    ctaTitle: {
      fontFamily: "'Space Grotesk', sans-serif",
      fontSize: '80px',
      fontWeight: 700,
      color: '#466700',
      textTransform: 'uppercase',
      marginBottom: '80px',
      letterSpacing: '3px',
    },

    ctaButtons: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      justifyContent: 'center',
      alignItems: 'center',
      flexWrap: 'wrap',
    },

    btn: {
      fontWeight: 'bold',
      fontSize: '0.75rem',
      padding: '0.75rem 2rem',
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      cursor: 'pointer',
      transition: 'all 200ms',
      border: 'none',
    },

    btnPrimary: {
      backgroundColor: '#94da32',
      color: '#131313',
    },

    btnPrimaryHover: {
      backgroundColor: '#75b800',
    },

    btnSecondary: {
      border: '2px solid #94da32',
      color: '#94da32',
      backgroundColor: 'transparent',
    },

    btnSecondaryHover: {
      backgroundColor: 'rgba(148, 218, 50, 0.1)',
    },

    // Keyframes
    '@keyframes pulse': {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.5 },
    },
  };

  const keyframes = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    /* ========== RESPONSIVE DESIGN ========== */
    
    /* TABLET & SMALL DESKTOP (max 1024px) */
    @media (max-width: 1024px) {
      /* Hero Section */
      .disabled-hero {
        height: 60vh !important;
        padding: 40px 24px !important;
        padding-bottom: 60px !important;
      }

      .disabled-h1 {
        font-size: 48px !important;
        max-width: 100% !important;
        letter-spacing: 2px !important;
      }

      /* Bio Section */
      section:nth-of-type(2) {
        grid-template-columns: 1fr !important;
        min-height: auto !important;
      }

      section:nth-of-type(2) > div:first-child {
        border-right: none !important;
        border-bottom: 1px solid #434938 !important;
        min-height: 400px !important;
      }

      section:nth-of-type(2) > div:last-child {
        padding: 64px 24px !important;
      }

      .bioTitle {
        font-size: 32px !important;
      }

      /* ID Card - Responsive */
      .idCard {
        padding: 24px !important;
      }

      .idGrid {
        gap: 20px !important;
        grid-template-columns: 1fr 1fr !important;
      }

      .idLabel {
        font-size: 10px !important;
      }

      .idValue {
        font-size: 18px !important;
      }

      .socialIconLink {
        width: 48px !important;
        height: 48px !important;
      }


      /* Starting Brand Section */
      section:nth-of-type(3) {
        padding: 80px 24px !important;
      }

      section:nth-of-type(3) h2 {
        font-size: 48px !important;
        margin-bottom: 40px !important;
      }

      .startGrid {
        grid-template-columns: 1fr !important;
        gap: 32px !important;
      }

      .startText {
        font-size: 18px !important;
      }

      .statBoxes {
        grid-template-columns: 1fr 1fr !important;
        gap: 20px !important;
      }

      .statBox {
        padding: 32px !important;
      }

      .statNumber {
        font-size: 56px !important;
      }

      .statLabel {
        font-size: 11px !important;
      }

      /* Market Section */
      section:nth-of-type(4) {
        grid-template-columns: 1fr !important;
      }

      section:nth-of-type(4) > div:first-child {
        order: 1 !important;
        padding: 64px 24px !important;
      }

      section:nth-of-type(4) > div:last-child {
        order: 2 !important;
        border-left: none !important;
        border-top: 1px solid #434938 !important;
        min-height: 300px !important;
      }

      .marketTitle {
        font-size: 32px !important;
      }

      /* Highlights Section */
      section:nth-of-type(5) {
        padding: 80px 24px !important;
      }

      section:nth-of-type(5) h2 {
        font-size: 48px !important;
        margin-bottom: 48px !important;
      }

      .cardsGrid {
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)) !important;
        gap: 24px !important;
      }

      /* Vision Section */
      section:nth-of-type(6) {
        padding: 96px 24px !important;
      }

      section:nth-of-type(6) h2 {
        font-size: 48px !important;
        margin-bottom: 40px !important;
      }

      blockquote {
        font-size: 32px !important;
        padding-top: 40px !important;
        padding-bottom: 40px !important;
      }

      /* CTA Section */
      section:nth-of-type(7) {
        padding: 64px 24px !important;
      }

      section:nth-of-type(7) h2 {
        font-size: 48px !important;
        margin-bottom: 48px !important;
      }
    }

    /* MOBILE TABLET (max 768px) */
    @media (max-width: 768px) {
      body {
        overflow-x: hidden !important;
      }

      /* Hero Section */
      .disabled-hero {
        height: 50vh !important;
        padding: 32px 16px !important;
        padding-bottom: 50px !important;
      }

      .disabled-h1 {
        font-size: 36px !important;
        margin-bottom: 16px !important;
        letter-spacing: 1px !important;
      }

      p {
        font-size: 16px !important;
      }

      /* Archive Label */
      .archiveLabel {
        font-size: 10px !important;
        padding: 6px 12px !important;
        gap: 6px !important;
        margin-bottom: 12px !important;
      }

      .pulseDot {
        width: 8px !important;
        height: 8px !important;
      }

      /* Bio Section */
      section:nth-of-type(2) > div:first-child {
        min-height: 350px !important;
      }

      section:nth-of-type(2) > div:last-child {
        padding: 50px 20px !important;
      }

      .bioItem {
        margin-bottom: 60px !important;
        padding-left: 32px !important;
      }

      .bioNumber {
        width: 20px !important;
        height: 20px !important;
        font-size: 8px !important;
        left: -10px !important;
      }

      .bioTitle {
        font-size: 24px !important;
        margin-bottom: 16px !important;
      }

      .bioText {
        font-size: 16px !important;
        margin-bottom: 16px !important;
      }

      /* ID Card - Keep 2 column layout */
      .idCard {
        padding: 20px !important;
        bottom: 16px !important;
        left: 16px !important;
        right: 16px !important;
      }

      .idGrid {
        gap: 12px !important;
        grid-template-columns: 1fr 1fr !important;
      }

      .idLabel {
        font-size: 10px !important;
        letter-spacing: 0.5px !important;
      }

      .idValue {
        font-size: 13px !important;
      }

      .socialIconLink {
        width: 44px !important;
        height: 44px !important;
      }


      /* Starting Brand */
      section:nth-of-type(3) {
        padding: 60px 16px !important;
      }

      .estBg {
        font-size: 12vw !important;
        opacity: 0.3 !important;
      }

      .sectionTitle {
        font-size: 36px !important;
        margin-bottom: 32px !important;
      }

      .startText {
        font-size: 16px !important;
      }

      .statBoxes {
        grid-template-columns: 1fr !important;
        gap: 16px !important;
      }

      .statBox {
        padding: 20px !important;
      }

      .statNumber {
        font-size: 42px !important;
        margin-bottom: 12px !important;
      }

      .statLabel {
        font-size: 11px !important;
      }

      /* Market Text */
      .marketText {
        font-size: 16px !important;
        max-width: 100% !important;
      }

      .quote {
        font-size: 14px !important;
        padding: 16px !important;
        margin-top: 16px !important;
      }

      section:nth-of-type(4) > div:last-child {
        min-height: 280px !important;
      }

      /* Highlights */
      section:nth-of-type(5) {
        padding: 60px 16px !important;
      }

      .highlightsTitle {
        font-size: 36px !important;
        margin-bottom: 40px !important;
      }

      .cardsGrid {
        grid-template-columns: 1fr !important;
        gap: 20px !important;
      }

      .card {
        padding: 24px !important;
      }

      .cardIcon {
        font-size: 32px !important;
        margin-bottom: 16px !important;
      }

      .cardTitle {
        font-size: 18px !important;
        margin-bottom: 8px !important;
      }

      .cardText {
        font-size: 14px !important;
      }

      /* Vision */
      section:nth-of-type(6) {
        padding: 60px 16px !important;
      }

      .visionTitle {
        font-size: 36px !important;
        margin-bottom: 32px !important;
      }

      blockquote {
        font-size: 24px !important;
        margin-bottom: 32px !important;
        padding-top: 32px !important;
        padding-bottom: 32px !important;
      }

      .visionText {
        font-size: 16px !important;
        max-width: 100% !important;
      }

      /* CTA */
      section:nth-of-type(7) {
        padding: 50px 16px !important;
      }

      .ctaTitle {
        font-size: 36px !important;
        margin-bottom: 40px !important;
      }

      .ctaButtons {
        flex-direction: column !important;
        gap: 16px !important;
      }

      .btn {
        padding: 12px 24px !important;
        font-size: 12px !important;
        width: calc(100% - 32px) !important;
        max-width: 280px !important;
      }
    }

    /* SMALL MOBILE (max 480px) */
    @media (max-width: 480px) {
      /* Hero Section */
      .disabled-hero {
        height: 45vh !important;
        padding: 24px 12px !important;
        padding-bottom: 40px !important;
        align-items: flex-end !important;
      }

      .disabled-h1 {
        font-size: 28px !important;
        letter-spacing: 1px !important;
        margin-bottom: 12px !important;
        line-height: 1.2 !important;
      }

      p {
        font-size: 14px !important;
        line-height: 1.5 !important;
      }

      /* Archive Label */
      .archiveLabel {
        font-size: 8px !important;
        padding: 4px 8px !important;
        gap: 4px !important;
        margin-bottom: 12px !important;
      }

      /* Hero Subtitle */
      .disabled-hero p {
        font-size: 13px !important;
        padding-left: 12px !important;
        max-width: 100% !important;
      }

      /* Bio Section */
      section:nth-of-type(2) > div:first-child {
        min-height: 320px !important;
      }

      section:nth-of-type(2) > div:last-child {
        padding: 40px 16px !important;
      }

      .bioItem {
        margin-bottom: 48px !important;
        padding-left: 24px !important;
      }

      .bioNumber {
        width: 18px !important;
        height: 18px !important;
        font-size: 7px !important;
        left: -9px !important;
      }

      .bioTitle {
        font-size: 20px !important;
        margin-bottom: 12px !important;
        letter-spacing: 1px !important;
      }

      .bioText {
        font-size: 14px !important;
        margin-bottom: 12px !important;
      }

      .bioTextSecondary {
        font-size: 13px !important;
      }

      /* ID Card - Responsive for small mobile */
      .idCard {
        padding: 12px !important;
        bottom: 12px !important;
        left: 12px !important;
        right: 12px !important;
      }

      .idGrid {
        gap: 10px !important;
        grid-template-columns: 1fr 1fr !important;
      }

      .idValue {
        font-size: 12px !important;
      }

      .idLabel {
        font-size: 8px !important;
      }

      .socialIconLink {
        width: 40px !important;
        height: 40px !important;
      }


      /* Starting Brand */
      section:nth-of-type(3) {
        padding: 50px 12px !important;
      }

      .estBg {
        font-size: 10vw !important;
        opacity: 0.2 !important;
      }

      .sectionTitle {
        font-size: 28px !important;
        margin-bottom: 28px !important;
        letter-spacing: 1px !important;
      }

      .startText {
        font-size: 14px !important;
        margin-bottom: 20px !important;
      }

      .statBoxes {
        grid-template-columns: 1fr !important;
        gap: 14px !important;
      }

      .statBox {
        padding: 16px !important;
      }

      .statNumber {
        font-size: 36px !important;
        margin-bottom: 12px !important;
      }

      .statLabel {
        font-size: 10px !important;
      }

      /* Market Section */
      section:nth-of-type(4) > div:first-child {
        padding: 40px 12px !important;
      }

      .phaseLabel {
        font-size: 11px !important;
        padding: 3px 12px !important;
        margin-bottom: 20px !important;
      }

      .marketTitle {
        font-size: 24px !important;
        margin-bottom: 20px !important;
      }

      .marketText {
        font-size: 14px !important;
        max-width: 100% !important;
        margin-bottom: 20px !important;
      }

      .quote {
        font-size: 13px !important;
        padding: 12px !important;
        margin-top: 12px !important;
      }

      section:nth-of-type(4) > div:last-child {
        min-height: 250px !important;
      }

      /* Highlights */
      section:nth-of-type(5) {
        padding: 50px 12px !important;
      }

      .highlightsTitle {
        font-size: 28px !important;
        margin-bottom: 28px !important;
      }

      .cardsGrid {
        gap: 16px !important;
      }

      .card {
        padding: 16px !important;
      }

      .cardIcon {
        font-size: 28px !important;
        margin-bottom: 12px !important;
      }

      .cardTitle {
        font-size: 16px !important;
        margin-bottom: 8px !important;
      }

      .cardText {
        font-size: 13px !important;
      }

      .cardAfter {
        width: 36px !important;
        height: 36px !important;
      }

      /* Vision */
      section:nth-of-type(6) {
        padding: 50px 12px !important;
      }

      .visionTitle {
        font-size: 28px !important;
        margin-bottom: 28px !important;
      }

      blockquote {
        font-size: 18px !important;
        margin-bottom: 24px !important;
        padding-top: 24px !important;
        padding-bottom: 24px !important;
        line-height: 1.3 !important;
      }

      .visionText {
        font-size: 14px !important;
        max-width: 100% !important;
      }

      /* CTA */
      section:nth-of-type(7) {
        padding: 40px 12px !important;
      }

      .ctaTitle {
        font-size: 28px !important;
        margin-bottom: 32px !important;
        letter-spacing: 1px !important;
      }

      .btn {
        padding: 10px 20px !important;
        font-size: 11px !important;
        width: calc(100% - 24px) !important;
        max-width: 270px !important;
      }

      .ctaButtons {
        gap: 12px !important;
      }
    }

    /* EXTRA SMALL (max 360px) */
    @media (max-width: 360px) {
      .disabled-h1 {
        font-size: 24px !important;
        margin-bottom: 10px !important;
      }

      .sectionTitle {
        font-size: 24px !important;
      }

      .bioTitle {
        font-size: 18px !important;
      }

      blockquote {
        font-size: 16px !important;
      }

      .ctaTitle {
        font-size: 24px !important;
      }

      .disabled-hero {
        height: 40vh !important;
      }

      .btn {
        width: calc(100% - 20px) !important;
      }
    }

    /* TABLET LANDSCAPE (1024px and below, landscape orientation) */
    @media (max-width: 1024px) and (orientation: landscape) {
      .disabled-hero {
        height: auto !important;
        min-height: 80vh !important;
      }

      .disabled-h1 {
        font-size: 42px !important;
      }

      .startGrid {
        gap: 24px !important;
      }
    }

    /* MOBILE LANDSCAPE (480px and below, landscape) */
    @media (max-width: 480px) and (orientation: landscape) {
      .disabled-hero {
        height: auto !important;
        min-height: 100vh !important;
        padding: 20px 12px !important;
      }

      .disabled-h1 {
        font-size: 26px !important;
      }

      .bioTitle {
        font-size: 18px !important;
      }

      section:nth-of-type(2) > div:first-child {
        min-height: 300px !important;
      }

      .cardsGrid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
  `;

  const [imgHovered, setImgHovered] = useState(false);
  const [marketImgHovered, setMarketImgHovered] = useState(false);

  return (
    <>
      <style>{keyframes}</style>
      <div style={{ backgroundColor: '#131313', color: '#e5e2e1' }}>
        {/* Header */}

        {/* Hero Section */}
        <PageHeroBanner
          title={contents.founderHeroTitle || "Rozil Thapa: The Vision Behind NightVision"}
          subtitle={contents.founderHeroSubtitle || "Architect of Nepal's most resilient security infrastructure. An uncompromising pursuit of technical dominance."}
        />


        {/* Bio Section */}
        <section style={styles.bioSection}>
          <div
            style={styles.bioImage}
            onMouseEnter={() => setImgHovered(true)}
            onMouseLeave={() => setImgHovered(false)}
          >
            <img
              src={(!contents.founderImage || contents.founderImage.includes("googleusercontent.com")) ? "/founder.jpg" : contents.founderImage}
              alt={contents.founderName || "Rozil Thapa"}
              style={{
                ...styles.bioImageImg,
                transform: imgHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            />
          </div>
          <div style={styles.bioContent}>
            {(contents.founderBioSections || []).map((section, idx) => {
              const isInactive = idx > 0;
              return (
                <div key={idx} style={isInactive ? { ...styles.bioItem, ...styles.bioItemInactive } : styles.bioItem}>
                  <div style={isInactive ? { ...styles.bioNumber, ...styles.bioNumberInactive } : styles.bioNumber}>
                    {section.num || `0${idx + 1}`}
                  </div>
                  <h2 style={styles.bioTitle}>{section.title}</h2>
                  <p style={styles.bioText}>{section.text}</p>
                  <p style={styles.bioTextSecondary}>{section.textSec}</p>
                </div>
              );
            })}

            {/* Social Media Icons Row */}
            <div style={{ display: 'flex', justifyContent: 'center', width: '100%', paddingLeft: '48px', boxSizing: 'border-box', marginTop: '40px' }}>
              <div style={styles.socialIconsContainer} className="socialIconsContainer">
                {[
                  { name: 'facebook', url: contents.socialFacebook || "https://www.facebook.com/nightvisioninterprises", label: 'Facebook', hoverColor: '#1877F2' },
                  { name: 'instagram', url: contents.socialInstagram || "https://www.instagram.com/nightvision_nepal/", label: 'Instagram', hoverColor: '#E1306C' },
                  { name: 'linkedin', url: contents.socialLinkedin || "https://linkedin.com/", label: 'LinkedIn', hoverColor: '#0077B5' }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.socialIconLink}
                    className="socialIconLink"
                    title={social.label}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = social.hoverColor;
                      e.currentTarget.style.color = social.hoverColor;
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#434938';
                      e.currentTarget.style.color = '#c3c9b3';
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    <Icon name={social.name} size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Starting the Brand */}
        <section style={styles.startBrand}>
          <div style={styles.estBg}>{contents.founderEst || "EST.2018"}</div>
          <div style={styles.startContent}>
            <h2 style={styles.sectionTitle}>{startTitle}</h2>
            <div style={styles.startGrid}>
              <div>
                <p style={styles.startText}>
                  {startText}
                </p>
                <div style={{
                  padding: '24px',
                  borderLeft: '4px solid #94da32',
                  backgroundColor: 'rgba(19, 19, 19, 0.4)',
                  marginTop: '32px',
                  fontStyle: 'italic',
                  color: '#c3c9b3',
                  fontSize: '18px',
                  fontFamily: "'Space Grotesk', sans-serif"
                }}>
                  "{startQuote}"
                  <span style={{ display: 'block', fontSize: '14px', fontStyle: 'normal', color: '#94da32', marginTop: '8px', fontWeight: 600 }}>— ROZIL THAPA</span>
                </div>
              </div>
              <div style={styles.statBoxes}>
                {(contents.founderStartStats || []).map((stat, idx) => {
                  const isInactive = idx > 0;
                  return (
                    <div key={idx} style={isInactive ? { ...styles.statBox, ...styles.statBoxInactive } : styles.statBox}>
                      <div style={isInactive ? { ...styles.statNumber, ...styles.statNumberInactive } : styles.statNumber}>
                        {stat.val}
                      </div>
                      <div style={isInactive ? { ...styles.statLabel, ...styles.statLabelInactive } : styles.statLabel} dangerouslySetInnerHTML={{ __html: stat.label ? stat.label.replace(/\n/g, '<br />') : "" }} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Market Dominance */}
        <section style={styles.marketSection}>
          <div style={styles.marketLeft}>
            <div style={{ maxWidth: '600px' }}>
              <h2 style={styles.marketTitle}>{marketTitle}</h2>
              <p style={styles.marketText}>
                {marketText}
              </p>
              <div style={styles.quote}>
                "{marketQuote}"
              </div>
            </div>
          </div>
          <div
            style={styles.marketRight}
            onMouseEnter={() => setMarketImgHovered(true)}
            onMouseLeave={() => setMarketImgHovered(false)}
          >
            <img
              src={contents.founderMarketImg || "https://lh3.googleusercontent.com/aida/ADBb0ug9YQUIw0MrZtq_29TVpL-FnrRS4-3iO3i2xoUtfnLiEZe_x1qPNnIFn8RajYtk_3kUu4Lecu7tOfey1nC1fDG_afuxXijuyUz9pN7g86X1H10jaMDlqyeOIEEiGQvC1HhjCzxAXW4rYIekvJrK-trj0VvG2TcXCFJOVjtrbWxiyOVuUZaAbzTAwLZaRmCzGd_wGeeF0B0QC1GgBSLdCKyV-GWpYAkfufJgXCH9Uxfm-BaDCmosaS_A-O9GqeSpQeUk2eXxaetlEg"}
              alt={marketTitle}
              style={{
                ...styles.marketRightImg,
                filter: marketImgHovered ? 'grayscale(0%)' : 'grayscale(100%)',
              }}
            />
          </div>
        </section>

        {/* Key Highlights */}
        <section style={styles.highlights}>
          <h2 style={styles.highlightsTitle}>{contents.founderHighlightsTitle || "Key Highlights"}</h2>
          <div style={styles.cardsGrid}>
            {(contents.founderHighlights || []).map((item, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.card,
                  ...(hoveredCard === idx ? styles.cardHover : {}),
                }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  style={{
                    ...styles.cardAfter,
                    borderColor: hoveredCard === idx ? '#94da32' : '#434938',
                  }}
                ></div>
                <div style={styles.cardIcon}>
                  {idx === 0 && <Rocket size={32} style={{ color: "#94da32" }} />}
                  {idx === 1 && <Award size={32} style={{ color: "#94da32" }} />}
                  {idx === 2 && <Cpu size={32} style={{ color: "#94da32" }} />}
                  {idx === 3 && <Handshake size={32} style={{ color: "#94da32" }} />}
                  {idx === 4 && <Lock size={32} style={{ color: "#94da32" }} />}
                  {idx === 5 && <Globe size={32} style={{ color: "#94da32" }} />}
                </div>
                <h3 style={styles.cardTitle}>{item.title}</h3>
                <p style={styles.cardText}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Brand Vision */}
        <section style={styles.vision}>
          <div style={styles.visionBg}></div>
          <div style={styles.visionOverlay}></div>
          <div style={styles.visionContent}>
            <h2 style={styles.visionTitle}>{contents.founderVisionTitle || "Brand Vision"}</h2>
            <blockquote style={styles.visionQuote}>
              "{contents.founderVisionQuote || "Security is not a product; it is a state of mind achieved through technical absolute. My vision for NightVision is to create an ecosystem where the presence of our tech is invisible, but its protection is invincible."}"
            </blockquote>
            <p style={styles.visionText}>
              {contents.founderVisionText || "Looking forward, Rozil Thapa aims to integrate advanced AI-driven predictive analytics into every CCTV node, transforming passive monitoring into active threat prevention. The future of NightVision is not just seeing the dark, but predicting what it hides."}
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section style={styles.cta}>
          <div style={styles.ctaBefore}></div>
          <div style={styles.ctaContent}>
            <h2 style={styles.ctaTitle}>{contents.founderCtaTitle || "Ready to secure your perimeter?"}</h2>
            <div style={styles.ctaButtons}>
              <button
                style={{ ...styles.btn, ...styles.btnPrimary }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#75b800')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#94da32')}
              >
                {contents.founderCtaBtn1 || "Consult with our team"}
              </button>
              <Link to="/products">
                <button
                  style={{ ...styles.btn, ...styles.btnPrimary }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#75b800')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#94da32')}
                >
                  {contents.founderCtaBtn2 || "Explore our products"}
                </button>
              </Link>
            </div>
          </div>
        </section>

      </div>
    </>
  );
};

export default FounderPage;