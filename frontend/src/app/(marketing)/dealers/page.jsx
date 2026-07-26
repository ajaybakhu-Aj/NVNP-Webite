import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronDown, Radar, Lock } from 'lucide-react';
import { getAllDealers } from '../../../utils/cmsDb';
import PageHeroBanner from '../../../components/ui/PageHeroBanner';
import DealerCard from '../../../components/dealers/DealerCard';

const PROVINCES = [
  'ALL REGIONS',
  'Koshi Province',
  'Madhesh Province',
  'Bagmati Province',
  'Gandaki Province',
  'Lumbini Province',
  'Karnali Province',
  'Sudurpashchim Province'
];

const STEPS = [
  { num: '01', label: 'Apply Online' },
  { num: '02', label: 'Verification' },
  { num: '03', label: 'Inventory Setup' },
  { num: '04', label: 'Certified Status' }
];

export default function NightVisionDealerships() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('ALL REGIONS');
  const [hoveredCard, setHoveredCard] = useState(null);
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllDealers().then((data) => {
      setDealers(data);
      setLoading(false);
    });
  }, []);

  const filteredDealers = dealers.filter((dealer) => {
    const isActive = dealer.status !== "Vetting" && dealer.status !== "Rejected";
    const nameToMatch = dealer.companyName || dealer.name || "";
    const matchesSearch = nameToMatch.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion === 'ALL REGIONS' || (dealer.location && dealer.location.includes(selectedRegion));
    return isActive && matchesSearch && matchesRegion;
  });

  return (
    <div
      className="dealers-directory-page dealers-page dealers-container page-wrapper"
      style={{
        width: '100%',
        maxWidth: '100%',
        margin: 0,
        padding: 0,
        background: '#0a0a0a',
        minHeight: '100vh',
        boxSizing: 'border-box',
      }}
    >
      {/* 1. FULL-BLEED GREEN HERO BANNER */}
      <PageHeroBanner
        title="OUR DEALER NETWORK"
        subtitle="Expanding across Nepal. Locate an authorized surveillance specialist near you or join our elite distribution network."
      >
        <div className="dealer-hero-btns-wrapper" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '12px' }}>
          <a href="#directory" className="btn-find-dealer">FIND A DEALER</a>
          <a href="#apply" className="btn-partner">PARTNER WITH US</a>
        </div>
      </PageHeroBanner>

      {/* 2. DEALER DIRECTORY SECTION */}
      <section id="directory" className="directory-section" style={{ padding: '40px 0 60px 0', width: '100%' }}>
        <div className="dealers-section-inner directory-header-wrapper">
          {/* Header Title & Subtitle */}
          <div className="directory-header-text" style={{ marginBottom: '24px' }}>
            <h2
              className="directory-title"
              style={{
                color: '#ffffff',
                fontSize: '1.6rem',
                fontWeight: 800,
                fontFamily: "'Space Grotesk', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '0.03em',
                marginBottom: '6px',
                marginTop: 0,
              }}
            >
              AUTHORIZED PARTNERS
            </h2>
            <p
              className="directory-desc"
              style={{
                color: '#aaaaaa',
                fontSize: '0.88rem',
                fontFamily: "'Poppins', sans-serif",
                margin: 0,
              }}
            >
              Vetted installation and service experts across Nepal.
            </p>
          </div>

          {/* Search & Filter Row */}
          <div
            className="directory-filters-row"
            style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '32px',
              width: '100%',
              flexWrap: 'wrap',
            }}
          >
            {/* Search Input Box */}
            <div
              className="search-wrapper"
              style={{
                position: 'relative',
                flex: '1 1 300px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  left: '16px',
                  color: '#7CFC00',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="text"
                placeholder="SEARCH DEALERS..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0d0d0d',
                  border: '1px solid rgba(124, 252, 0, 0.25)',
                  color: '#ffffff',
                  borderRadius: '6px',
                  padding: '10px 16px 10px 44px',
                  fontSize: '0.88rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Region Dropdown */}
            <div
              className="region-select-wrapper"
              style={{
                position: 'relative',
                flex: '0 0 240px',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="region-select"
                style={{
                  width: '100%',
                  background: '#0d0d0d',
                  border: '1px solid rgba(124, 252, 0, 0.25)',
                  color: '#ffffff',
                  borderRadius: '6px',
                  padding: '10px 36px 10px 16px',
                  fontSize: '0.88rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  outline: 'none',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  cursor: 'pointer',
                  boxSizing: 'border-box',
                }}
              >
                {PROVINCES.map((reg, idx) => (
                  <option key={idx} value={reg} style={{ background: '#111111', color: '#ffffff' }}>{reg}</option>
                ))}
              </select>
              <ChevronDown
                size={18}
                style={{
                  position: 'absolute',
                  right: '14px',
                  color: '#7CFC00',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          {/* Dealer Cards Grid (4 Columns) */}
          {loading ? (
            <div className="text-center py-12 text-[#7CFC00] font-mono">LOADING DEALER NETWORK...</div>
          ) : (
            <div className="dealers-grid-4col">
              {filteredDealers.map((dealer, idx) => (
                <DealerCard
                  key={dealer.id}
                  dealer={dealer}
                  isHovered={hoveredCard === idx}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 3. MAP SECTION */}
      <section className="map-section" style={{ padding: '60px 0', borderTop: '1px solid rgba(124, 252, 0, 0.1)', borderBottom: '1px solid rgba(124, 252, 0, 0.1)' }}>
        <div className="dealers-section-inner">
          <div className="map-section-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
            <div className="map-info-col">
              <h2 className="map-section-title" style={{ color: '#ffffff', fontSize: '1.8rem', fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.2, marginBottom: '16px' }}>
                DOMINATING THE<br />
                <span className="highlight" style={{ color: '#7CFC00' }}>NEPALESE TERRAIN</span>
              </h2>
              <p className="map-section-desc" style={{ color: '#aaaaaa', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '24px', fontFamily: "'Poppins', sans-serif" }}>
                From the high mountain passes to the bustling urban centers, NV// hardware is deployed in the most demanding environments across the country.
              </p>

              <div className="stats-grid" style={{ display: 'flex', gap: '24px' }}>
                <div className="stat-box" style={{ background: 'rgba(20, 20, 20, 0.6)', border: '1px solid rgba(124, 252, 0, 0.2)', borderRadius: '8px', padding: '16px 24px' }}>
                  <div className="stat-value" style={{ color: '#7CFC00', fontSize: '1.8rem', fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif" }}>50+</div>
                  <div className="stat-label" style={{ color: '#ffffff', fontSize: '0.75rem', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.05em' }}>INSTALLATION HUBS</div>
                </div>
                <div className="stat-box" style={{ background: 'rgba(20, 20, 20, 0.6)', border: '1px solid rgba(124, 252, 0, 0.2)', borderRadius: '8px', padding: '16px 24px' }}>
                  <div className="stat-value" style={{ color: '#7CFC00', fontSize: '1.8rem', fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif" }}>24/7</div>
                  <div className="stat-label" style={{ color: '#ffffff', fontSize: '0.75rem', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '0.05em' }}>LOCAL SUPPORT</div>
                </div>
              </div>
            </div>

            <div className="map-visual-col" style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(124, 252, 0, 0.2)' }}>
              <img
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop"
                alt="Nepal Map Surveillance Network"
                className="map-image"
                style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block', filter: 'brightness(0.7) contrast(1.2)' }}
              />
              <div className="radar-overlay" style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.4)' }}>
                <div className="radar-pulse-container" style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Radar size={48} className="radar-icon" style={{ color: '#7CFC00' }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. APPLY SECTION */}
      <section id="apply" className="apply-section dealership-join-section join-force-wrapper" style={{ padding: '60px 20px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="dealers-section-inner" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <div
            className="apply-content-inner join-force-card dealership-cta-box"
            style={{
              background: 'rgba(20, 20, 20, 0.6)',
              border: '1px solid rgba(124, 252, 0, 0.2)',
              borderRadius: '12px',
              padding: '40px 32px',
              textAlign: 'center',
              maxWidth: '1000px',
              width: '100%',
              marginLeft: 'auto',
              marginRight: 'auto',
              boxSizing: 'border-box',
            }}
          >
            <h2 className="apply-title" style={{ color: '#ffffff', fontSize: '1.8rem', fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", textTransform: 'uppercase', marginBottom: '12px', textAlign: 'center' }}>JOIN THE NIGHTVISION FORCE</h2>
            <p className="apply-desc" style={{ color: '#cccccc', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto 32px auto', fontFamily: "'Poppins', sans-serif", lineHeight: 1.6, textAlign: 'center' }}>
              Providing hardware, training, and authority for Nepal's premier security providers. We build infrastructure for SURVEILLANCE.
            </p>

            <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '36px', justifyContent: 'center' }}>
              {STEPS.map((step, i) => (
                <div key={i} className="step-card" style={{ background: '#0d0d0d', border: '1px solid rgba(124, 252, 0, 0.15)', borderRadius: '8px', padding: '16px 12px', textAlign: 'center' }}>
                  <div className="step-num" style={{ color: '#7CFC00', fontSize: '1.2rem', fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif" }}>{step.num}</div>
                  <div className="step-label" style={{ color: '#ffffff', fontSize: '0.8rem', fontWeight: 600, fontFamily: "'Space Grotesk', sans-serif", marginTop: '4px' }}>{step.label}</div>
                </div>
              ))}
            </div>

            <Link
              to="/apply-dealers"
              className="btn-apply"
              style={{
                background: '#7CFC00',
                color: '#000000',
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: '0.9rem',
                letterSpacing: '0.05em',
                padding: '14px 28px',
                borderRadius: '6px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '32px auto 0 auto',
                transition: 'all 0.2s ease',
              }}
            >
              APPLY FOR DEALERSHIP
            </Link>
          </div>
        </div>
      </section>

      {/* 5. PAGE STYLING & RESPONSIVE CSS */}
      <style>{`
        /* Full-Bleed Outer Page Reset */
        .dealers-directory-page,
        .dealers-page,
        .dealers-container,
        .page-wrapper {
          width: 100% !important;
          max-width: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          box-sizing: border-box !important;
        }

        /* Full Bleed Green Hero Banner */
        .hero-banner,
        .page-hero-banner,
        .products-banner-redesign {
          width: 100% !important;
          max-width: 100% !important;
          border-radius: 0 !important;
          margin: 0 !important;
          box-sizing: border-box !important;
        }

        /* Standardized Header Guide-Line Alignment */
        .hero-banner-inner,
        .dealers-section-inner,
        .directory-header-wrapper {
          max-width: 1400px !important;
          margin-left: auto !important;
          margin-right: auto !important;
          padding-left: 5% !important;
          padding-right: 5% !important;
          box-sizing: border-box !important;
          width: 100% !important;
        }

        /* Hero Banner Buttons */
        .btn-find-dealer {
          background: #000000 !important;
          color: #ffffff !important;
          font-weight: 700 !important;
          font-size: 0.85rem !important;
          letter-spacing: 0.05em !important;
          padding: 10px 22px !important;
          border-radius: 6px !important;
          border: 1.5px solid #000000 !important;
          text-decoration: none !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: all 0.2s ease !important;
          font-family: 'Space Grotesk', sans-serif !important;
        }
        .btn-find-dealer:hover {
          background: #1a1a1a !important;
          transform: translateY(-2px) !important;
        }

        .btn-partner {
          background: rgba(0, 0, 0, 0.2) !important;
          color: #000000 !important;
          border: 1.5px solid #000000 !important;
          font-weight: 700 !important;
          font-size: 0.85rem !important;
          letter-spacing: 0.05em !important;
          padding: 10px 22px !important;
          border-radius: 6px !important;
          text-decoration: none !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          transition: all 0.2s ease !important;
          font-family: 'Space Grotesk', sans-serif !important;
        }
        .btn-partner:hover {
          background: rgba(0, 0, 0, 0.35) !important;
          color: #000000 !important;
          transform: translateY(-2px) !important;
        }

        /* Dealer Cards 4-Column Grid */
        .dealers-grid-4col {
          display: grid !important;
          grid-template-columns: repeat(4, 1fr) !important;
          gap: 24px !important;
          align-items: stretch !important;
          width: 100% !important;
        }

        /* Hide Top-Right Debug Tags & Raw Slugs */
        .dealer-card [class*="authorized"],
        .dealer-card [class*="slug"],
        .dealer-card .dealer-auth-tag,
        .dealer-card .dealer-slug,
        .dealer-card .slug-tag,
        .dealer-card .dealer-id {
          display: none !important;
        }

        /* Hide Signal Strength overlay box on the map graphic */
        .signal-tag,
        .terrain-section [class*="signal-strength"],
        .terrain-section [class*="signal_strength"],
        .map-section [class*="signal-tag"],
        .map-section [class*="signal_strength"],
        .map-graphic-wrapper > div:last-child {
          display: none !important;
          visibility: hidden !important;
          opacity: 0 !important;
          pointer-events: none !important;
        }

        /* Search input placeholder */
        .search-input::placeholder {
          color: rgba(255, 255, 255, 0.45) !important;
        }

        /* Center Join Force Card & Parent Section */
        .dealership-join-section,
        .join-force-wrapper,
        .apply-section {
          display: flex !important;
          justify-content: center !important;
          align-items: center !important;
          width: 100% !important;
          padding: 60px 20px !important;
          box-sizing: border-box !important;
        }

        .join-force-card,
        .dealership-cta-box,
        .apply-content-inner {
          margin-left: auto !important;
          margin-right: auto !important;
          max-width: 1000px !important;
          width: 100% !important;
          box-sizing: border-box !important;
          text-align: center !important;
        }

        .apply-title {
          text-align: center !important;
          margin-bottom: 12px !important;
        }

        .apply-desc {
          text-align: center !important;
          max-width: 600px !important;
          margin: 0 auto 32px auto !important;
        }

        .btn-apply {
          margin: 32px auto 0 auto !important;
          display: inline-flex !important;
          justify-content: center !important;
          align-items: center !important;
        }

        /* Responsive Layout Breaks */
        @media screen and (max-width: 1120px) {
          .dealers-grid-4col {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media screen and (max-width: 840px) {
          .dealers-grid-4col {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .map-section-grid {
            grid-template-columns: 1fr !important;
          }
          .steps-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media screen and (max-width: 580px) {
          .dealers-grid-4col {
            grid-template-columns: 1fr !important;
          }
          .steps-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-banner-inner,
          .dealers-section-inner {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
        }
      `}</style>
    </div>
  );
}
