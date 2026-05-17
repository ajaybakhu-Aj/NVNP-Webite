import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FounderPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

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
      backgroundImage: 'url(https://lh3.googleusercontent.com/aida/ADBb0uigFZm2MU_7fFkN1PGbqxTC4_zsd19WX1rPPXQ9Dq4i5EMbGW8uL59JfytFZsh1esNLU9nligJX4Uv90jKWL6D8MLXnq26q3GTMcyBfSr1_zrrXpo67IpigOrch4RSQvHkeqBk9x4VXRJLGzluFfWso-xnep3TZtUNQtmjjVkx4xUm72ROueuOlQghaRdACvRgs6p-gLEx5sf_1mpkxK_OjtZIMzVkcxp_k_5NJOEzBPjW9mg5vXhadcbQb9GP1FJGoMGX0s4cmKw)',
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
      gridTemplateColumns: '1fr 1fr',
      gap: '64px',
      alignItems: 'start',
    },

    startText: {
      fontSize: '22px',
      color: '#e5e2e1',
      lineHeight: '1.6',
    },

    statBoxes: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '32px',
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
      backgroundImage: 'url(https://lh3.googleusercontent.com/aida/ADBb0uhFVruSlJhZ5q-sF8CoXAilTa0DbK8uG-4sf3f4cpUJsFuLNX3etF96ADT1UNmyuTuuJJTAVn4JPrUlNFDZt9xkUjNOaYf07xOE23xXpdgNxYTpTDkoXxMnvfQl_5jtL2ZclokCg18NynmRL3LwcqH5dgcnubOAPzSN7_Wmsj1wL7UqcbVy6U_7Snk7bUo4x_eCcpEGWTkQnkl6cD5H1Sla2en4IKIA1dWJFZBHVJWeERaVCKF_AciL8ixQPWy-N5f1jEqv-lJdXw)',
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
  `;

  const [imgHovered, setImgHovered] = useState(false);
  const [marketImgHovered, setMarketImgHovered] = useState(false);

  return (
    <>
      <style>{keyframes}</style>
      <div style={{ backgroundColor: '#131313', color: '#e5e2e1' }}>
        {/* Header */}

        {/* Hero Section */}
        <section style={styles.hero}>
          <div style={styles.heroBg}></div>
          <div style={styles.heroOverlay}></div>
          <div style={styles.heroContent}>
            <div style={styles.archiveLabel}>
              <span style={styles.pulseDot}></span>
              <span>ARCHIVE_FOUNDER_BIO // 001</span>
            </div>
            <h1 style={styles.h1}>Rozil Thapa: The Vision Behind NightVision</h1>
            <p style={styles.heroSubtitle}>
              Architect of Nepal's most resilient security infrastructure. An uncompromising pursuit of technical dominance.
            </p>
          </div>
        </section>

        {/* Bio Section */}
        <section style={styles.bioSection}>
          <div
            style={styles.bioImage}
            onMouseEnter={() => setImgHovered(true)}
            onMouseLeave={() => setImgHovered(false)}
          >
            <img
              src="https://lh3.googleusercontent.com/aida/ADBb0uiGsiUA8BUnPz5W1BtC1A_ddnZ32Idm7Lriupd_f9XBElLTooQIq8LxpmwvL2YNhOlnIM6fajbQO37s87483wAxAmFOSFmTKe1pazPPbbgd3GXXHcrOZ_FmxNDfw6K-hg-lOOEJbFQlrv8bng4iKNBuk3CmrTpr5TWqbqgmdqqkC3E0ukVn0vtWSWzkkeMXd6jGuf93ojASN3zONE-bZ3YSRayYWo69aKBJR-yvpokSdWgCPFbDyYKkXdgIqnB5dfIG_MoXHnoS"
              alt="Rozil Thapa"
              style={{
                ...styles.bioImageImg,
                transform: imgHovered ? 'scale(1.05)' : 'scale(1)',
              }}
            />
            <div style={{
  ...styles.idCard,
  padding: '1.5rem'
}}>
  <div style={{
    ...styles.idGrid,
    gap: '1rem'
  }}>
    <div>
      <span style={{
        ...styles.idLabel,
        fontSize: '0.9rem'
      }}>
        Identification: 
      </span>

      <span style={{
        ...styles.idValue,
        fontSize: '1rem'
      }}>
        ROZIL THAPA
      </span>
    </div>

    <div>
      <span style={{
        ...styles.idLabel,
        fontSize: '0.9rem'
      }}>
        Clearance: 
      </span>

      <span style={{
        ...styles.idValue,
        fontSize: '1rem'
      }}>
        FOUNDER / CEO
      </span>
    </div>
  </div>
</div>
          </div>
          <div style={styles.bioContent}>
            <div style={styles.bioItem}>
              <div style={styles.bioNumber}>01</div>
              <h2 style={styles.bioTitle}>Early Life</h2>
              <p style={styles.bioText}>
                Born and raised in the heart of Kathmandu, Rozil Thapa's early fascination with mechanics and electronics wasn't just a hobby—it was a precursor to a security revolution.
              </p>
              <p style={styles.bioTextSecondary}>
                His childhood was defined by a relentless curiosity for how things worked, often dismantling and reassembling household gadgets to understand their internal logic. This technical foundation would later become the bedrock of NightVision's engineering philosophy.
              </p>
            </div>

            <div style={{ ...styles.bioItem, ...styles.bioItemInactive }}>
              <div style={{ ...styles.bioNumber, ...styles.bioNumberInactive }}>02</div>
              <h2 style={styles.bioTitle}>Education</h2>
              <p style={styles.bioText}>
                While academic institutions provided the framework, Thapa's true education occurred in the field.
              </p>
              <p style={styles.bioTextSecondary}>
                Balancing formal studies with rigorous self-taught engineering, he mastered the complexities of digital surveillance before he had even turned twenty. Focusing on network architecture and optical precision, his journey prioritizes real-world application over theoretical abstractions.
              </p>
            </div>
          </div>
        </section>

        {/* Starting the Brand */}
        <section style={styles.startBrand}>
          <div style={styles.estBg}>EST.2018</div>
          <div style={styles.startContent}>
            <h2 style={styles.sectionTitle}>Starting the Brand</h2>
            <div style={styles.startGrid}>
              <p style={styles.startText}>
                NightVision wasn't founded in a boardroom; it was born in a garage immediately following high school graduation. With limited capital but unlimited resolve, Rozil Thapa identified a critical gap in the Nepali market: the lack of high-fidelity, industrial-grade security solutions designed for local terrains.
              </p>
              <div style={styles.statBoxes}>
                <div style={styles.statBox}>
                  <div style={styles.statNumber}>01</div>
                  <div style={styles.statLabel}>Initial Prototype<br />Built & Tested</div>
                </div>
                <div style={{ ...styles.statBox, ...styles.statBoxInactive }}>
                  <div style={{ ...styles.statNumber, ...styles.statNumberInactive }}>24/7</div>
                  <div style={{ ...styles.statLabel, ...styles.statLabelInactive }}>Agile Development<br />Continuous Cycle</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Market Dominance */}
        <section style={styles.marketSection}>
          <div style={styles.marketLeft}>
            <div style={{ maxWidth: '600px' }}>
              <div style={styles.phaseLabel}>PHASE_03</div>
              <h2 style={styles.marketTitle}>Market Dominance</h2>
              <p style={styles.marketText}>
                Within six years, NightVision transitioned from a startup to the gold standard of security in Nepal. Thapa's insistence on "Uncompromising Vigilance" resonated with high-end clients, government bodies, and industrial sectors alike.
              </p>
              <div style={styles.quote}>
                "The market didn't need another camera vendor; it needed a security partner who understands the terrain."
              </div>
            </div>
          </div>
          <div
            style={styles.marketRight}
            onMouseEnter={() => setMarketImgHovered(true)}
            onMouseLeave={() => setMarketImgHovered(false)}
          >
            <img
              src="https://lh3.googleusercontent.com/aida/ADBb0ug9YQUIw0MrZtq_29TVpL-FnrRS4-3iO3i2xoUtfnLiEZe_x1qPNnIFn8RajYtk_3kUu4Lecu7tOfey1nC1fDG_afuxXijuyUz9pN7g86X1H10jaMDlqyeOIEEiGQvC1HhjCzxAXW4rYIekvJrK-trj0VvG2TcXCFJOVjtrbWxiyOVuUZaAbzTAwLZaRmCzGd_wGeeF0B0QC1GgBSLdCKyV-GWpYAkfufJgXCH9Uxfm-BaDCmosaS_A-O9GqeSpQeUk2eXxaetlEg"
              alt="Market dominance"
              style={{
                ...styles.marketRightImg,
                filter: marketImgHovered ? 'grayscale(0%)' : 'grayscale(100%)',
              }}
            />
          </div>
        </section>

        {/* Key Highlights */}
        <section style={styles.highlights}>
          <h2 style={styles.highlightsTitle}>Key Highlights</h2>
          <div style={styles.cardsGrid}>
            {[
              { icon: '🚀', title: 'Post-School Launch', desc: 'Founded NightVision immediately after high school, bypassing traditional corporate paths to lead through innovation.' },
              { icon: '✓', title: '6+ Years Experience', desc: 'Over half a decade of hands-on deployment in some of Nepal\'s most challenging environmental conditions.' },
              { icon: '⚙️', title: 'R&D Leadership', desc: 'Personally oversees the research and development of all NV-Series optical sensors and firmware protocols.' },
              { icon: '👥', title: 'Strategic Partnerships', desc: 'Developed a nationwide network of authorized dealerships, ensuring technical support is never more than an hour away.' },
              { icon: '🔒', title: 'Patented Encryption', desc: 'Architected the proprietary end-to-end encryption used in all NightVision cloud and local storage systems.' },
              { icon: '🌍', title: 'Regional Expansion', desc: 'Led the expansion of the brand into critical infrastructure projects across the Himalayas.' },
            ].map((item, idx) => (
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
                <div style={styles.cardIcon}>{item.icon}</div>
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
            <h2 style={styles.visionTitle}>Brand Vision</h2>
            <blockquote style={styles.visionQuote}>
              "Security is not a product; it is a state of mind achieved through technical absolute. My vision for NightVision is to create an ecosystem where the presence of our tech is invisible, but its protection is invincible."
            </blockquote>
            <p style={styles.visionText}>
              Looking forward, Rozil Thapa aims to integrate advanced AI-driven predictive analytics into every CCTV node, transforming passive monitoring into active threat prevention. The future of NightVision is not just seeing the dark, but predicting what it hides.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section style={styles.cta}>
          <div style={styles.ctaBefore}></div>
          <div style={styles.ctaContent}>
            <h2 style={styles.ctaTitle}>Ready to secure your perimeter?</h2>
            <div style={styles.ctaButtons}>
              <button
                style={{ ...styles.btn, ...styles.btnPrimary }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = '#75b800')}
                onMouseLeave={(e) => (e.target.style.backgroundColor = '#94da32')}
              >
                Consult with our team
              </button>
              <Link to="/product">
  <button
    style={{ ...styles.btn, ...styles.btnPrimary }}
    onMouseEnter={(e) =>
      (e.target.style.backgroundColor = '#75b800')
    }
    onMouseLeave={(e) =>
      (e.target.style.backgroundColor = '#94da32')
    }
  >
    Explore our products
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