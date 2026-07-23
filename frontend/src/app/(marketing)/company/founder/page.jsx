import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSiteContents } from '../../../../utils/cmsDb';
import Icon from '../../../../utils/Icon';
import '../../../../styles/founder.css';

export default function FounderPage() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const contents = useSiteContents();

  const bioSections = (contents.founderBioSections && contents.founderBioSections.length > 0 && contents.founderBioSections[0]?.title)
    ? contents.founderBioSections
    : [
        {
          num: "01",
          title: "Early Life & Foundations",
          text: "Rozil was raised by his grandfather, Ram Bahadur Thapa, a respected General Manager at DDC Nepal. His grandfather instilled early values of honesty, discipline, and unwavering responsibility.",
          textSec: "A visionary from childhood, Rozil believed in creating bold opportunities rather than staying on the safe side. He carried his family legacy with enthusiasm, vision, and determination."
        },
        {
          num: "02",
          title: "Education & Passion for Tech",
          text: "After completing SEE from Modern Boarding School Bhaktapur and higher secondary education at Kathmandu World School with a 3.45 GPA, Rozil chose to dive deep into surveillance technology in Nepal.",
          textSec: "While pursuing his bachelor's degree at TIME International College, Rozil engaged practically in the surveillance industry, gaining hands-on field and business mastery."
        }
      ];

  const startTitle = contents.founderStartTitle || "Starting the Brand";
  const startText = contents.founderStartText || "After 2 years of field experience, Rozil mastered import systems, global technological trends, and customer psychology. In 2023, he launched NightVision®, a fully registered Nepali CCTV brand built to deliver high-quality, affordable, and reliable surveillance technology.";
  const startQuote = contents.founderStartQuote || "I wanted to finish what my father started — to be a builder, a creator, a businessman.";

  const marketTitle = contents.founderMarketTitle || "Nationwide Expansion";
  const marketText = contents.founderMarketText || "Under Rozil's leadership, NightVision gained rapid nationwide adoption with the slogan 'Timi dekhdaina, tara Night Vision dekcha'. The brand is expanding globally to markets across Asia and Australia with NVRs, WiFi cameras, and AI surveillance systems.";
  const marketQuote = contents.founderMarketQuote || "Timi dekhdaina, tara Night Vision dekcha";

  const visionTitle = contents.founderVisionTitle || "Brand Vision & Mission";
  const visionQuote = contents.founderVisionQuote || "I didn't just want to sell cameras. I wanted to create a brand that makes people feel secure, proud, and connected.";
  const visionText = contents.founderVisionText || "Rozil envisions Night Vision as a premier global technology brand standing for Nepali innovation, reliability, and trust. Our mission remains rooted in quality, affordability, and empowering our communities.";

  const highlights = (contents.founderHighlights && contents.founderHighlights.length > 0 && contents.founderHighlights[0]?.title)
    ? contents.founderHighlights
    : [
        { icon: "rocket_launch", title: "Post-School Launch", desc: "Founded NightVision International Pvt. Ltd., building a nationwide enterprise." },
        { icon: "verified", title: "6+ Years Experience", desc: "Over half a decade of hands-on deployment in challenging environments." },
        { icon: "settings", title: "Registered Trademark", desc: "NightVision® is a fully registered trademarked Nepali brand." },
        { icon: "groups", title: "Dual Channel Strategy", desc: "Operational in corporate B2B and direct retail D2C channels." },
        { icon: "security", title: "Global Footprint", desc: "Expanding into international surveillance and smart security markets." },
        { icon: "public", title: "Core Philosophy", desc: "Driven by Uncompromising Innovation, Absolute Trust, and Visionary Legacy." }
      ];

  const heroBg = contents.founderHeroBg || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1400&auto=format&fit=crop";

  return (
    <div className="founder-page">
      {/* HERO SECTION */}
      <section className="founder-hero">
        <div 
          className="founder-hero-bg"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="founder-hero-overlay" />
        <div className="founder-hero-content">
          <div className="founder-archive-label">
            <span className="w-2.5 h-2.5 bg-red-600 rounded-full animate-pulse" />
            FOUNDER & CEO PROFILE
          </div>
          <h1 className="founder-title">
            {contents.founderTitle || "ROZIL THAPA"}
          </h1>
          <p className="founder-subtitle">
            {contents.founderSubtitle || "Founder & Chief Executive Officer of NightVision International Pvt. Ltd. Engineering the future of Nepali surveillance technology."}
          </p>
        </div>
      </section>

      {/* BIO & EARLY YEARS */}
      <section className="founder-bio-section">
        <div className="founder-bio-grid">
          <div className="founder-bio-image">
            <img 
              src={contents.founderBioImage || "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1200&auto=format&fit=crop"} 
              alt="Rozil Thapa Founder" 
              className="founder-bio-img"
            />
            <div className="founder-id-card">
              <div className="text-[#94da32] font-mono text-xs tracking-widest font-bold mb-1">NV_EXEC_OFFICER_01</div>
              <div className="text-white font-bold text-xl font-['Space_Grotesk']">ROZIL THAPA</div>
              <div className="text-[#c3c9b3] text-sm">FOUNDER / CEO</div>
            </div>
          </div>

          <div className="founder-bio-content">
            {bioSections.map((sec, idx) => (
              <div key={idx} className="founder-bio-block">
                <div className="founder-bio-num">PHASE [{sec.num || `0${idx + 1}`}]</div>
                <h2 className="founder-bio-heading">{sec.title}</h2>
                <p className="founder-bio-text">{sec.text}</p>
                {sec.textSec && <p className="founder-bio-text mt-3">{sec.textSec}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND STORY & EXPANSION */}
      <section className="founder-story-section">
        <h2 className="founder-section-title">{startTitle}</h2>
        <p className="founder-bio-text text-lg leading-relaxed">{startText}</p>
        
        <div className="founder-quote-box">
          "{startQuote}"
        </div>

        <h2 className="founder-section-title mt-16">{marketTitle}</h2>
        <p className="founder-bio-text text-lg leading-relaxed">{marketText}</p>
        
        <div className="founder-quote-box">
          "{marketQuote}"
        </div>
      </section>

      {/* KEY HIGHLIGHTS */}
      <section className="founder-highlights">
        <h2 className="founder-section-title text-center mb-12">EXECUTIVE HIGHLIGHTS</h2>
        <div className="founder-cards-grid">
          {highlights.map((item, idx) => (
            <div 
              key={idx} 
              className="founder-card"
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="text-[#94da32] mb-4">
                <Icon name={item.icon || "star"} size={36} />
              </div>
              <h3 className="founder-card-title">{item.title}</h3>
              <p className="founder-card-text">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BRAND VISION */}
      <section className="founder-vision">
        <h2 className="founder-section-title">{visionTitle}</h2>
        <div className="founder-vision-quote">
          "{visionQuote}"
        </div>
        <p className="founder-bio-text text-xl max-w-4xl mx-auto">{visionText}</p>
      </section>

      {/* CTA SECTION */}
      <section className="founder-cta">
        <h2 className="founder-cta-title">BUILD THE FUTURE WITH US</h2>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link to="/dealership" className="bg-[#233600] text-white px-8 py-3 rounded-full font-bold uppercase tracking-wider no-underline hover:bg-black transition-colors">
            Contact Executive Team
          </Link>
          <Link to="/products" className="bg-transparent border-2 border-[#233600] text-[#233600] px-8 py-3 rounded-full font-bold uppercase tracking-wider no-underline hover:bg-[#233600] hover:text-white transition-colors">
            Explore Ecosystem
          </Link>
        </div>
      </section>
    </div>
  );
}