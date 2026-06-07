import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Phone, Navigation, Radar, ChevronDown } from 'lucide-react';

export default function NightVisionDealerships() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('ALL REGIONS');
  const [hoveredCard, setHoveredCard] = useState(null);

  const dealers = [
    {
      id: 1,
      name: "Nano Tek",
      location: "KanchanBari, Biratnagar, Koshi Province, Nepal",
      phone: "+977 9762959446",
      status: "PLATINUM PARTNER",
      isPlatinum: true,
      route: "/dealer/nanotek",
      mapUrl: "https://maps.google.com/?q=KanchanBari,Biratnagar,Nepal"
    },
    {
      id: 2,
      name: "White Pearl",
      location: "Janakpurdham, Dhanusha, Madhesh Province, Nepal",
      phone: "+977 9845990344",
      status: "PLATINUM PARTNER",
      isPlatinum: true,
      route: "/dealer/whitepearl",
      mapUrl: "https://maps.google.com/?q=Janakpurdham,Dhanusha,Nepal"
    },
    {
      id: 3,
      name: "Night Vision CCTV",
      location: "Bhaktapur, Bagmati Province, Nepal",
      phone: "+977 9845990344",
      status: "AUTHORIZED",
      isPlatinum: false,
      route: "/dealer/night-vision",
      mapUrl: "https://maps.google.com/?q=Bhaktapur,Nepal"
    },
    {
      id: 4,
      name: "SR Suppliers",
      location: "Bardaghat, Nawalparasi, Lumbini Province, Nepal",
      phone: "+977 9960457003",
      status: "AUTHORIZED",
      isPlatinum: false,
      route: "/dealer/srsuppliers",
      mapUrl: "https://maps.google.com/?q=Bardaghat,Nawalparasi,Nepal"
    },
    {
      id: 5,
      name: "Axe Tech",
      location: "Kohalpur, Banke, Lumbini Province, Nepal",
      phone: "+977 9802575215",
      status: "AUTHORIZED",
      isPlatinum: false,
      route: "/dealer/axetech",
      mapUrl: "https://maps.google.com/?q=Kohalpur,Banke,Nepal"
    },
    {
      id: 6,
      name: "Joshi Kyodai",
      location: "Dhangadi, Kailali, Sudurpashchim Province, Nepal",
      phone: "+977 9869049449",
      status: "AUTHORIZED",
      isPlatinum: false,
      route: "/dealer/joshi-kyodai",
      mapUrl: "https://maps.app.goo.gl/HYBJZupqQaqkanKR7"
    }
  ];

  const filteredDealers = dealers.filter((dealer) => {
    const matchesSearch = dealer.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesRegion =
      selectedRegion === 'ALL REGIONS' ||
      dealer.location.includes(selectedRegion);

    return matchesSearch && matchesRegion;
  });

  return (
    <div className="dealers-directory-page">
      {/* Hero Section */}
      <section className="dealers-hero">
        <div className="hero-radial-dots" />
        <div className="hero-scanlines" />

        {/* Crosshairs */}
        <span className="crosshair crosshair-tl">+</span>
        <span className="crosshair crosshair-tr">+</span>
        <span className="crosshair crosshair-bl">+</span>
        <span className="crosshair crosshair-br">+</span>

        <div className="hero-content">
          <div className="live-indicator-wrapper">
            <span className="pulse-dot" />
            <span className="live-indicator-text">SYSTEM LIVE: GLOBAL NETWORK</span>
          </div>
          <h1 className="hero-title">OUR DEALER NETWORK</h1>
          <p className="hero-desc">
            is expanding. Locate an authorized surveillance specialist near you or join our elite distribution network. Uncompromising vigilance starts here.
          </p>
          <div className="hero-btn-row">
            <a href="#directory" className="btn-find-dealer">
              FIND A DEALER
            </a>
            <a href="#apply" className="btn-partner">
              PARTNER WITH US
            </a>
          </div>
        </div>
      </section>

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
                {dealer.name}
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
                  to={dealer.route}
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
          🔒
        </div>
      </section>
    </div>
  );
}





