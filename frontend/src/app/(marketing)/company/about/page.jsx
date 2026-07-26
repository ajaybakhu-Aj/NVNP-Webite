import React from "react";
import { Link } from "react-router-dom";
import Icon from "../../../../utils/Icon";
import { useSiteContents } from "../../../../utils/cmsDb";
import PageHeroBanner from "../../../../components/ui/PageHeroBanner";
import TeamSection from "../../../../components/company/TeamSection";

const PROVINCES = [
  { name: "Koshi Province [01]", link: "/dealer/nanotek", title: "NanoTek Solutions", loc: "Biratnagar Command Station" },
  { name: "Madhesh Province [02]", link: "/dealer/whitepearl", title: "White Pearl Pvt. Ltd.", loc: "Morang Base Hub" },
  { name: "Bagmati Province [03]", link: "/dealer/night-vision", title: "Night Vision CCTV", loc: "Bhaktapur Secure Depot" },
  { name: "Gandaki Province [04]", link: "/dealer/srsuppliers", title: "SR Suppliers", loc: "Pokhara Logistics Node" },
  { name: "Karnali Province [06]", link: "/dealer/axetech", title: "AxeTech Automation", loc: "Surkhet Support Node" },
  { name: "Sudurpashchim Province [07]", link: "/dealer/joshi-kyodai", title: "Joshi Kyodai Tech", loc: "Dhangadhi Command Node" },
];

export default function NightVisionAboutPage() {
  const contents = useSiteContents();

  const title = contents.aboutStoryTitle || "UNCOMPROMISING VIGILANCE";
  const titleParts = title.split(/(UNCOMPROMISING)/i);

  const pillars = (contents.aboutPillars && contents.aboutPillars.length > 0 && contents.aboutPillars[0]?.title)
    ? contents.aboutPillars
    : [
        { icon: "security", title: "Uncompromising Security", text: "Industrial-grade hardware for zero-fail operations." },
        { icon: "memory", title: "Intelligent Systems", text: "AI-driven analytics for predictive threat detection." },
        { icon: "public", title: "Nationwide Support", text: "Dedicated service teams across all major provinces." }
      ];

  return (
    <div className="night-vision-container">
      <main className="main-content">
        {/* HERO */}
        <PageHeroBanner
          title={contents.aboutHeroTitle || "ABOUT NIGHTVISION"}
          subtitle={contents.aboutHeroDesc || "Nepal's next-generation surveillance and security monitoring brand built for industrial security, intelligent detection, and uncompromising operational reliability."}
        >
          <div className="flex gap-3 flex-wrap mt-1">
            <Link to="/products" className="hero-btn-primary flex items-center justify-center bg-black/15 text-black border-2 border-black px-6 py-2.5 font-bold text-xs tracking-wider no-underline font-sans">
              Explore Systems
            </Link>
            <Link to="/dealership" className="hero-btn-secondary flex items-center justify-center bg-black text-[#94da32] px-6 py-2.5 font-bold text-xs tracking-wider no-underline font-sans">
              Contact Sales
            </Link>
          </div>
        </PageHeroBanner>

        {/* STORY */}
        <section className="story-section">
          <div className="story-grid">
            <div className="story-text">
              <h2>
                {titleParts.map((part, i) => (
                  part.toLowerCase() === "uncompromising" ? (
                    <React.Fragment key={i}>{part}<br /></React.Fragment>
                  ) : part
                ))}
              </h2>
              <p>
                {contents.aboutStoryDesc1 || "NIGHTVISION™ was founded in Kathmandu with one objective: eliminate the blind spots where security threats survive. Our systems are engineered to deliver maximum visibility, predictive intelligence, and unmatched operational durability."}
              </p>
              <p>
                {contents.aboutStoryDesc2 || "From AI-powered motion analysis to advanced thermal imaging, we develop surveillance ecosystems that protect thousands of perimeters, commercial facilities, and residential hubs across Nepal."}
              </p>
              <Link to="/products" className="explore-btn inline-block text-center no-underline">
                Explore Our Technology
              </Link>
            </div>
            <div className="story-image-container">
              <div className="story-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1400&auto=format&fit=crop"
                  alt="Night Vision"
                />
              </div>
            </div>
          </div>
        </section>

        {/* VISION & MISSION */}
        <section className="vision-mission">
          <div className="vision-grid">
            <div className="vision-card">
              <div className="card-header">
                <div className="card-icon-realistic">
                  <Icon name="visibility" size={48} />
                </div>
              </div>
              <h3 className="card-title">OUR VISION</h3>
              <p className="card-text">
                {contents.aboutVision || "To redefine global surveillance standards through intelligent, predictive security systems that actively prevent threats before they happen."}
              </p>
            </div>

            <div className="mission-card">
              <div className="card-header">
                <div className="card-icon-realistic">
                  <Icon name="security" size={48} />
                </div>
              </div>
              <h3 className="card-title">OUR MISSION</h3>
              <p className="card-text">
                {contents.aboutMission || "To engineer industrial-grade surveillance ecosystems that combine powerful hardware with intelligent software for unmatched reliability and operational awareness."}
              </p>
            </div>
          </div>
        </section>

        {/* IMAGE BREAK */}
        <section className="image-break">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1600&auto=format&fit=crop"
            alt="Control Room"
          />
          <div className="image-break-text">
            <div className="image-break-title">PRECISION. CONTROL.</div>
            <div className="image-break-line" />
          </div>
        </section>

        {/* VALUES / PILLARS */}
        <section className="values-section">
          <div className="values-container">
            <div className="values-header flex items-center">
              <div className="values-title-group flex-1 min-w-[280px]">
                <h2 className="values-title">
                  {contents.aboutPillarsTitle || "THE PILLARS OF NIGHTVISION"}
                </h2>
              </div>
              <p className="values-side max-w-[420px] normal-case text-sm text-[#c3c9b3] opacity-85 text-left leading-relaxed">
                {contents.aboutPillarsDesc || "We build corporate partnership relationships on accountability, precision engineering, and the absolute trust that our operator networks will always remain protected."}
              </p>
            </div>

            <div className="values-grid">
              {pillars.map((item, idx) => (
                <div className="value-card" key={idx}>
                  <div className="value-header">
                    <span className="value-icon inline-flex p-2 rounded-lg bg-[#94da32]/10 border border-[#94da32]/20">
                      <Icon name={item.icon || "star"} size={20} />
                    </span>
                  </div>
                  <h3 className="value-title text-lg text-[var(--nv-onSurf)] font-bold mt-3 font-['Space_Grotesk']">
                    {item.title}
                  </h3>
                  <p className="value-text text-xs text-[#c3c9b3] leading-relaxed mt-2 flex-1">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NATIONWIDE DEALERS NETWORK */}
        <section className="about-dealers-section">
          <div className="about-dealers-container">
            <div className="about-dealers-header">
              <span className="about-dealers-tag">Nepal Certified Network</span>
              <h2 className="about-dealers-title">OUR REPRESENTATIVE STATIONS</h2>
              <p className="about-dealers-desc">
                Providing full integration and hardware services across key regions. Click on any certified partner to view their profile, inventory, and location metrics.
              </p>
            </div>

            <div className="about-dealers-grid">
              {PROVINCES.map((prov, idx) => (
                <div className="about-province-card" key={idx}>
                  <div className="auth-card-corner top-left" />
                  <div className="auth-card-corner top-right" />
                  <div className="auth-card-corner bottom-left" />
                  <div className="auth-card-corner bottom-right" />
                  <h3 className="about-province-name">{prov.name}</h3>
                  <div className="about-dealers-list">
                    <div className="about-dealer-item">
                      <Link to={prov.link} className="about-dealer-link">
                        {prov.title} <Icon name="arrow_forward" size={14} />
                      </Link>
                      <span className="about-dealer-loc">{prov.loc}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <TeamSection />

        {/* CTA */}
        <section className="cta-section">
          <h2 className="cta-title">
            {contents.aboutCtaTitle || "READY FOR THE DARK?"}
          </h2>
          <p className="cta-text">
            {contents.aboutCtaDesc || "Join the growing network of organizations and professionals who trust NIGHTVISION™ for critical surveillance and security operations worldwide."}
          </p>
          <div className="cta-buttons">
            <Link to="/apply-dealers" className="cta-btn-primary no-underline inline-flex justify-center items-center">
              Become A Dealer
            </Link>
            <Link to="/dealership" className="cta-btn-secondary no-underline inline-flex justify-center items-center">
              Contact Sales
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}