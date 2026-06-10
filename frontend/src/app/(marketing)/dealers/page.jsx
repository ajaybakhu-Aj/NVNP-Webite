import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Phone, Navigation, Radar, ChevronDown } from 'lucide-react';
import { getAllDealers } from '../../../utils/cmsDb';
import PageHeroBanner from '../../../components/ui/PageHeroBanner';

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
    // Only show active/approved dealers on the directory page, not Vetting or Rejected leads!
    const isActive = dealer.status !== "Vetting" && dealer.status !== "Rejected";

    const nameToMatch = dealer.companyName || dealer.name || "";
    const matchesSearch = nameToMatch
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesRegion =
      selectedRegion === 'ALL REGIONS' ||
      dealer.location.includes(selectedRegion);

    return isActive && matchesSearch && matchesRegion;
  });

  return (
    <div className="dealers-directory-page">
      <PageHeroBanner
        title="OUR DEALER NETWORK"
        subtitle="Expanding across Nepal. Locate an authorized surveillance specialist near you or join our elite distribution network."
      >
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
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
              <Search />
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
                <option>ALL REGIONS</option>
                <option>Koshi Province</option>
                <option>Madhesh Province</option>
                <option>Bagmati Province</option>
                <option>Gandaki Province</option>
                <option>Lumbini Province</option>
                <option>Karnali Province</option>
                <option>Sudurpashchim Province</option>
              </select>
              <ChevronDown />
            </div>
          </div>
        </div>

        {/* Dealer Grid */}
        <div className="dealers-grid">
          {filteredDealers.map((dealer, idx) => (
            <div
              key={dealer.id}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`dealer-card ${hoveredCard === idx ? 'hovered' : ''}`}
            >
              <div className="dealer-auth-tag">
                {String(dealer.id).padStart(3, '0')}_AUTHORIZED
              </div>

              {dealer.isPlatinum && (
                <div className="dealer-platinum-tag">
                  <span className="platinum-dot" />
                  <span className="platinum-text">PLATINUM PARTNER</span>
                </div>
              )}

              <h3 className={`dealer-name ${dealer.isPlatinum ? 'platinum-margin' : ''}`}>
                {dealer.companyName || dealer.name}
              </h3>

              <div className="dealer-info-row">
                <MapPin size={18} />
                <p>{dealer.location}</p>
              </div>
              <div className="dealer-info-row margin-large">
                <Phone size={18} />
                <p>{dealer.phone}</p>
              </div>

              <div className="dealer-actions">
                <Link
                  to={dealer.route || `/dealer/${dealer.id}`}
                  className="btn-view-profile"
                >
                  VIEW PROFILE <Radar size={16} />
                </Link>

                <button
                  onClick={() => window.open(dealer.mapUrl, '_blank')}
                  className="btn-directions"
                >
                  GET DIRECTIONS <Navigation size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="map-section-grid">
          {/* LEFT CONTENT */}
          <div className="map-info-col">
            <h2 className="map-section-title">
              DOMINATING THE
              <br />
              <span className="highlight">NEPALESE TERRAIN</span>
            </h2>

            <p className="map-section-desc">
              From the high mountain passes to the bustling urban centers, NV// hardware
              is deployed in the most demanding environments across the country.
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

          {/* MAP */}
          <div className="map-visual-col">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1NTrgUfi7r729Nuok8DVlAC9KsIK1uc9Zyqyt2ZrKoxf68pU6QioqxO6z1Sk-k-UKLSIYpjnf2oDNT-XoDGJ23UJQK_exW8BNkgGi4xwqcn_2C1j70rt51KCi6ObuPB-ey9y1kleGn7me31h4h98sXiC_52CxFDUVWDH39cvSf6eujPyp-lvRy_5FDcuiEro3knUGwTkvOjq6wFFzQDwWYMlhNp6o9b5B7t8mmoFlBhyTKL1DozizXfcaSfDmq7JGidKVlUugDB_e"
              alt="Nepal map"
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
              SIGNAL_STRENGTH:
              <br />
              OPTIMAL
            </div>
          </div>
        </div>
      </section>

      {/* Apply Section */}
      <section id="apply" className="apply-section">
        <div className="apply-bg-word">
          DEALER
        </div>

        <div className="apply-content">
          <div className="apply-content-inner">
            <h2 className="apply-title">JOIN THE NIGHTVISION FORCE</h2>
            <p className="apply-desc">
              Providing the hardware, training, and authority for Nepal's premier security providers. We don't just sell cameras; we build infrastructure for SURVEILLANCE.
            </p>

            {/* Steps */}
            <div className="steps-grid">
              {[{ num: '01', label: 'Apply Online' }, { num: '02', label: 'Verification' }, { num: '03', label: 'Inventory Setup' }, { num: '04', label: 'Certified Status' }].map((step, i) => (
                <div key={i} className="step-card">
                  <div className="step-num">{step.num}</div>
                  <div className="step-label">{step.label}</div>
                </div>
              ))}
            </div>

            <Link
              to="/apply-dealers"
              className="btn-apply"
              style={{ textDecoration: 'none', display: 'inline-flex', justifyContent: 'center', alignItems: 'center' }}
            >
              APPLY FOR DEALERSHIP
            </Link>
          </div>
        </div>

        <div className="apply-bg-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: "1em", height: "1em", color: "#94da32" }}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
      </section>
    </div>
  );
}





