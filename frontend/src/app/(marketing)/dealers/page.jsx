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
    <div className="dealers-directory-page">
      <PageHeroBanner
        title="OUR DEALER NETWORK"
        subtitle="Expanding across Nepal. Locate an authorized surveillance specialist near you or join our elite distribution network."
      >
        <div className="flex gap-3 flex-wrap mt-2">
          <a href="#directory" className="btn-find-dealer">FIND A DEALER</a>
          <a href="#apply" className="btn-partner">PARTNER WITH US</a>
        </div>
      </PageHeroBanner>

      {/* Dealer Directory */}
      <section id="directory" className="directory-section">
        <div className="directory-header-wrapper">
          <div className="directory-header-text">
            <h2 className="directory-title">AUTHORIZED PARTNERS</h2>
            <p className="directory-desc">Vetted installation and service experts across Nepal.</p>
          </div>

          <div className="directory-filters">
            <div className="search-wrapper">
              <Search size={18} />
              <input
                type="text"
                placeholder="SEARCH DEALERS..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="region-select-wrapper">
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="region-select"
              >
                {PROVINCES.map((reg, idx) => (
                  <option key={idx} value={reg}>{reg}</option>
                ))}
              </select>
              <ChevronDown size={18} />
            </div>
          </div>
        </div>

        {/* Dealer Grid */}
        {loading ? (
          <div className="text-center py-12 text-[#94da32] font-mono">LOADING DEALER NETWORK...</div>
        ) : (
          <div className="dealers-grid">
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
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-section-grid">
          <div className="map-info-col">
            <h2 className="map-section-title">
              DOMINATING THE<br />
              <span className="highlight">NEPALESE TERRAIN</span>
            </h2>
            <p className="map-section-desc">
              From the high mountain passes to the bustling urban centers, NV// hardware is deployed in the most demanding environments across the country.
            </p>

            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-value">50+</div>
                <div className="stat-label">INSTALLATION HUBS</div>
              </div>
              <div className="stat-box">
                <div className="stat-value">24/7</div>
                <div className="stat-label">LOCAL SUPPORT</div>
              </div>
            </div>
          </div>

          <div className="map-visual-col">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1200&auto=format&fit=crop"
              alt="Nepal Map Surveillance Network"
              className="map-image"
            />
            <div className="radar-overlay">
              <div className="radar-pulse-container">
                <div className="radar-pulse" />
                <div className="radar-ring" />
                <Radar size={48} className="radar-icon" />
              </div>
            </div>
            <div className="signal-tag">
              SIGNAL_STRENGTH:<br />OPTIMAL
            </div>
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section id="apply" className="apply-section">
        <div className="apply-bg-word">DEALER</div>
        <div className="apply-content">
          <div className="apply-content-inner">
            <h2 className="apply-title">JOIN THE NIGHTVISION FORCE</h2>
            <p className="apply-desc">
              Providing hardware, training, and authority for Nepal's premier security providers. We build infrastructure for SURVEILLANCE.
            </p>

            <div className="steps-grid">
              {STEPS.map((step, i) => (
                <div key={i} className="step-card">
                  <div className="step-num">{step.num}</div>
                  <div className="step-label">{step.label}</div>
                </div>
              ))}
            </div>

            <Link to="/apply-dealers" className="btn-apply no-underline inline-flex justify-center items-center">
              APPLY FOR DEALERSHIP
            </Link>
          </div>
        </div>

        <div className="apply-bg-icon">
          <Lock size={48} className="text-[#94da32]" />
        </div>
      </section>
    </div>
  );
}
