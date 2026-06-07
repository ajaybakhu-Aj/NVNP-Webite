import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Phone, Navigation, Radar, ShoppingCart, User, ChevronDown } from 'lucide-react';

export default function NightVisionDealerships() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('ALL REGIONS');
  const [hoveredCard, setHoveredCard] = useState(null);

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 480);
      setIsTablet(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      name: "RK Services",
      location: "Suryabinayak, Bhaktapur, Bagmati Province, Nepal",
      phone: "+977 9841271533",
      status: "AUTHORIZED",
      isPlatinum: false,
      route: "/dealer/rkservices",
      mapUrl: "https://share.google/zRw4UzGnu2TmwrRtq"
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

  const keyframes = `
    @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
    @keyframes ping { 0% { opacity: 1; } 75%, 100% { opacity: 0; transform: scale(2); } }
  `;

  return (
    <div style={{ backgroundColor: '#000', color: '#fff', fontFamily: 'Inter, sans-serif', minHeight: '100vh' }}>
      <style>{keyframes}</style>

      {/* Top App Bar */}

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        minHeight: '614px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        overflow: 'hidden',
        borderBottom: '1px solid #555',
        backgroundColor: '#000'
      }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.2, backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.1) 50%)', backgroundSize: '100% 4px', pointerEvents: 'none' }}></div>

        {/* Crosshairs */}
        {[{ top: '32px', left: '32px' }, { top: '32px', right: '32px' }, { bottom: '32px', left: '32px' }, { bottom: '32px', right: '32px' }].map((pos, i) => (
          <span key={i} style={{ position: 'absolute', color: '#94da32', fontSize: '24px', fontWeight: 'bold', ...pos }}>+</span>
        ))}

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '56rem', padding: isMobile ? '0 16px' : '0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffb4ab', animation: 'pulse 2s infinite' }}></span>
            <span style={{ color: '#94da32', fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.1em', textTransform: 'uppercase' }}>SYSTEM LIVE: GLOBAL NETWORK</span>
          </div>
          <h1 style={{ fontSize: isMobile ? '32px' : '48px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1.1, color: '#fff', textAlign: 'center' }}>OUR DEALER NETWORK</h1>
          <p style={{ fontSize: isMobile ? '15px' : '18px', color: '#999', maxWidth: '42rem', margin: '0 auto 32px', lineHeight: 1.6, textAlign: 'center' }}>
             is expanding. Locate an authorized surveillance specialist near you or join our elite distribution network. Uncompromising vigilance starts here.
          </p>
          <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '24px', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <a href="#directory" style={{ backgroundColor: '#b5e75d', color: '#000', padding: '16px 48px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', border: 'none', cursor: 'pointer', textDecoration: 'none', fontSize: '14px', display: 'inline-block', width: isMobile ? '100%' : 'auto', textAlign: 'center' }}>
              FIND A DEALER
            </a>
            <a href="#apply" style={{ border: '1px solid #94da32', color: '#94da32', padding: '16px 48px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', backgroundColor: 'transparent', cursor: 'pointer', textDecoration: 'none', fontSize: '14px', display: 'inline-block', width: isMobile ? '100%' : 'auto', textAlign: 'center' }}>
              PARTNER WITH US
            </a>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '16px', right: '24px', fontSize: '12px', color: '#444' }}>
          LOC: 27.7172° N, 85.3240° E // NEPAL_OPS
        </div>
      </section>

      {/* Dealer Directory */}
      <section id="directory" style={{ padding: isMobile ? '40px 16px' : '80px 24px', maxWidth: '80rem', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px', alignItems: 'flex-start', width: '100%' }}>
          <div>
            <h2 style={{ color: '#94da32', fontSize: isMobile ? '24px' : '32px', fontWeight: 'bold', marginBottom: '8px' }}>AUTHORIZED PARTNERS</h2>
            <p style={{ color: '#999', fontSize: '16px' }}>Vetted installation and service experts across Nepal.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: isTablet ? 'column' : 'row', gap: '16px', width: '100%' }}>
            <div style={{ position: 'relative' }}>
              <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#555', width: '18px', height: '18px' }} />
              <input
                type="text"
                placeholder="SEARCH DEALERS..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  backgroundColor: '#000',
                  border: '1px solid #444',
                  color: '#fff',
                  paddingLeft: '40px',
                  paddingRight: '16px',
                  paddingTop: '12px',
                  paddingBottom: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  outline: 'none',
                  width: '100%',
                  maxWidth: '256px',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#94da32'}
                onBlur={(e) => e.target.style.borderColor = '#444'}
              />
            </div>

            <div style={{ position: 'relative', width: '100%', maxWidth: '192px' }}>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                style={{
                  backgroundColor: '#000',
                  border: '1px solid #444',
                  color: '#fff',
                  padding: '12px 30px 12px 16px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  outline: 'none',
                  width: '100%',
                  appearance: 'none',
                  cursor: 'pointer',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#94da32'}
                onBlur={(e) => e.target.style.borderColor = '#444'}
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
              <ChevronDown style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#555', width: '16px', height: '16px' }} />
            </div>
          </div>
        </div>

        {/* Dealer Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {filteredDealers.map((dealer, idx) => (
            <div
              key={dealer.id}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                backgroundColor: '#111',
                border: `1px solid ${hoveredCard === idx ? '#94da32' : '#333'}`,
                padding: '24px',
                position: 'relative',
                transition: 'all 0.3s',
                boxShadow: hoveredCard === idx ? '0 0 15px rgba(148, 218, 50, 0.3)' : 'none'
              }}
            >
              <div style={{ position: 'absolute', top: '0', right: '0', padding: '8px', fontSize: '10px', color: '#555' }}>
                {String(dealer.id).padStart(3, '0')}_AUTHORIZED
              </div>

              {dealer.isPlatinum && (
                <div style={{ position: 'absolute', top: '8px', left: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#94da32' }}></span>
                  <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#94da32' }}>PLATINUM PARTNER</span>
                </div>
              )}

              <h3 style={{ color: '#94da32', fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', marginTop: dealer.isPlatinum ? '16px' : '0', textTransform: 'uppercase' }}>
                {dealer.name}
              </h3>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                <MapPin size={18} style={{ color: '#555', flexShrink: 0, marginTop: '4px' }} />
                <p style={{ color: '#999', fontSize: '14px' }}>{dealer.location}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '24px' }}>
                <Phone size={18} style={{ color: '#555', flexShrink: 0, marginTop: '4px' }} />
                <p style={{ color: '#999', fontSize: '14px' }}>{dealer.phone}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '100%' }}>
                <Link
                  to={dealer.route}
                  style={{
                    width: '100%',
                    backgroundColor: '#94da32',
                    borderColor: '#94da32',
                    color: '#000',
                    border: '1px solid #94da32',
                    padding: '12px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                    boxSizing: 'border-box'
                  }}
                >
                  VIEW PROFILE <Radar size={16} />
                </Link>

                <button
                  onClick={() => window.open(dealer.mapUrl, '_blank')}
                  style={{
                    width: '100%',
                    backgroundColor: 'transparent',
                    borderColor: '#94da32',
                    color: '#94da32',
                    border: '1px solid',
                    padding: '12px',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.3s',
                    boxSizing: 'border-box',
                    ...(hoveredCard === idx ? { backgroundColor: 'rgba(148, 218, 50, 0.1)' } : {})
                  }}
                >
                  GET DIRECTIONS <Navigation size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Map Section */}
      {/* Map Section */}
<section
  style={{
    padding:
      isTablet
        ? '50px 20px'
        : '80px 24px',

    borderTop: '1px solid #555',

    borderBottom: '1px solid #555',

    backgroundColor: '#111',

    overflow: 'hidden',

    position: 'relative',
  }}
>
  <div
    style={{
      maxWidth: '80rem',

      margin: '0 auto',

      display: 'grid',

      gridTemplateColumns:
        isTablet
          ? '1fr'
          : '1fr 1fr',

      gap:
        isTablet
          ? '40px'
          : '48px',

      alignItems: 'center',
    }}
  >
    {/* LEFT CONTENT */}
    <div
      style={{
        position: 'relative',

        zIndex: 10,

        width: '100%',
      }}
    >
      <h2
        style={{
          fontSize:
            isMobile
              ? '42px'
              : isTablet
              ? '56px'
              : '32px',

          fontWeight: 'bold',

          marginBottom: '24px',

          lineHeight: 1.05,

          wordBreak: 'break-word',
        }}
      >
        DOMINATING THE
        <br />

        <span style={{ color: '#94da32' }}>
          NEPALESE TERRAIN
        </span>
      </h2>

      <p
        style={{
          fontSize:
            isMobile
              ? '15px'
              : '18px',

          color: '#999',

          marginBottom: '32px',

          lineHeight: 1.8,

          maxWidth: '100%',
        }}
      >
        From the high mountain passes to the
        bustling urban centers, NV// hardware
        is deployed in the most demanding
        environments across the country.
      </p>

      <div
        style={{
          display: 'grid',

          gridTemplateColumns:
            isMobile
              ? '1fr'
              : '1fr 1fr',

          gap:
            isMobile
              ? '20px'
              : '24px',

          width: '100%',
        }}
      >
        <div
          style={{
            borderLeft: '2px solid #94da32',

            paddingLeft:
              isMobile
                ? '16px'
                : '24px',
          }}
        >
          <div
            style={{
              fontSize:
                isMobile
                  ? '52px'
                  : '32px',

              fontWeight: 'bold',

              color: '#94da32',

              lineHeight: 1,
            }}
          >
            50+
          </div>

          <div
            style={{
              fontSize:
                isMobile
                  ? '11px'
                  : '12px',

              fontWeight: 'bold',

              color: '#999',

              textTransform: 'uppercase',

              letterSpacing: '0.1em',

              lineHeight: 1.6,
            }}
          >
            INSTALLATION HUBS
          </div>
        </div>

        <div
          style={{
            borderLeft: '2px solid #94da32',

            paddingLeft:
              isMobile
                ? '16px'
                : '24px',
          }}
        >
          <div
            style={{
              fontSize:
                isMobile
                  ? '52px'
                  : '32px',

              fontWeight: 'bold',

              color: '#94da32',

              lineHeight: 1,
            }}
          >
            24/7
          </div>

          <div
            style={{
              fontSize:
                isMobile
                  ? '11px'
                  : '12px',

              fontWeight: 'bold',

              color: '#999',

              textTransform: 'uppercase',

              letterSpacing: '0.1em',

              lineHeight: 1.6,
            }}
          >
            LOCAL SUPPORT
          </div>
        </div>
      </div>
    </div>

    {/* MAP */}
    <div
      style={{
        position: 'relative',

        height:
          isMobile
            ? '260px'
            : isTablet
            ? '320px'
            : '400px',

        border: '1px solid #555',

        backgroundColor: '#000',

        overflow: 'hidden',

        width: '100%',
      }}
    >
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1NTrgUfi7r729Nuok8DVlAC9KsIK1uc9Zyqyt2ZrKoxf68pU6QioqxO6z1Sk-k-UKLSIYpjnf2oDNT-XoDGJ23UJQK_exW8BNkgGi4xwqcn_2C1j70rt51KCi6ObuPB-ey9y1kleGn7me31h4h98sXiC_52CxFDUVWDH39cvSf6eujPyp-lvRy_5FDcuiEro3knUGwTkvOjq6wFFzQDwWYMlhNp6o9b5B7t8mmoFlBhyTKL1DozizXfcaSfDmq7JGidKVlUugDB_e"
        alt="Nepal map"
        style={{
          width: '100%',

          height: '100%',

          objectFit: 'cover',

          opacity: 0.5,
        }}
      />

      <div
        style={{
          position: 'absolute',

          inset: 0,

          display: 'flex',

          alignItems: 'center',

          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',

            width:
              isMobile
                ? '90px'
                : '128px',

            height:
              isMobile
                ? '90px'
                : '128px',
          }}
        >
          <div
            style={{
              position: 'absolute',

              inset: 0,

              border: '2px solid #94da32',

              borderRadius: '50%',

              animation: 'ping 2s infinite',

              opacity: 0.2,
            }}
          />

          <div
            style={{
              position: 'absolute',

              inset:
                isMobile
                  ? '10px'
                  : '16px',

              border:
                '1px solid rgba(148, 218, 50, 0.4)',

              borderRadius: '50%',
            }}
          />

          <Radar
            size={
              isMobile
                ? 34
                : 48
            }
            style={{
              color: '#94da32',

              position: 'absolute',

              top: '50%',

              left: '50%',

              transform:
                'translate(-50%, -50%)',
            }}
          />
        </div>
      </div>

      <div
        style={{
          position: 'absolute',

          top:
            isMobile
              ? '10px'
              : '16px',

          right:
            isMobile
              ? '10px'
              : '16px',

          fontSize:
            isMobile
              ? '9px'
              : '12px',

          color: '#94da32',

          padding:
            isMobile
              ? '6px 10px'
              : '8px',

          backgroundColor:
            'rgba(0, 0, 0, 0.75)',

          lineHeight: 1.5,

          maxWidth:
            isMobile
              ? '140px'
              : 'unset',

          textAlign: 'right',
        }}
      >
        SIGNAL_STRENGTH:
        <br />
        OPTIMAL
      </div>
    </div>
  </div>
</section>

      {/* Apply Section */}
      <section id="apply" style={{ position: 'relative', padding: '80px 24px', overflow: 'hidden', backgroundColor: '#b5e75d' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, fontSize: '20vw', fontWeight: 'bold', opacity: 0.1, pointerEvents: 'none', userSelect: 'none', transform: 'translateY(-20%)', color: '#94da32' }}>
          DEALER
        </div>

        <div style={{ position: 'relative', zIndex: 10, maxWidth: '80rem', margin: '0 auto', color: '#000' }}>
          <div style={{ maxWidth: '48rem' }}>
            <h2 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '24px', lineHeight: 1 }}>JOIN THE NIGHTVISION FORCE</h2>
            <p style={{ fontSize: '18px', marginBottom: '32px', fontWeight: 500, opacity: 0.8, lineHeight: 1.6 }}>
              Providing the hardware, training, and authority for Nepal's premier security providers. We don't just sell cameras; we build infrastructure for SURVEILLANCE.
            </p>

            {/* Steps */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '32px' }}>
              {[{ num: '01', label: 'Apply Online' }, { num: '02', label: 'Verification' }, { num: '03', label: 'Inventory Setup' }, { num: '04', label: 'Certified Status' }].map((step, i) => (
                <div key={i} style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)', padding: '24px', border: '1px solid rgba(0, 0, 0, 0.2)' }}>
                  <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>{step.num}</div>
                  <div style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{step.label}</div>
                </div>
              ))}
            </div>

            <button style={{
              backgroundColor: '#000',
              color: '#94da32',
              padding: '20px 48px',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              border: '1px solid #000',
              cursor: 'pointer',
              fontSize: '18px',
              transition: 'background-color 0.3s'
            }}>
              APPLY FOR DEALERSHIP
            </button>
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '33%', height: '100%', opacity: 0.1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '24px', fontSize: '15rem', pointerEvents: 'none' }}>
          🔒
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
}