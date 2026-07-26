import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Mail, Navigation } from 'lucide-react';
import { getSettings, useSiteContents } from '../../../utils/cmsDb';
import PageHeroBanner from '../../../components/ui/PageHeroBanner';
import ContactForm from '../../../components/contact/ContactForm';

export default function NightVisionContactPage() {
  const [settings, setSettings] = useState(null);
  const siteContents = useSiteContents();

  useEffect(() => {
    getSettings().then(setSettings);
  }, []);

  return (
    <div className="nv-contact-container">
      {/* Hero Section */}
      <PageHeroBanner
        title={siteContents.contactHeroTitle || "CONTACT US"}
        subtitle={siteContents.contactHeroSubtitle || "Our surveillance specialists are standing by. Connect with our team for uncompromising security solutions."}
      />

      {/* Contact Cards */}
      <section className="contact-cards">
        {/* Call Us Card */}
        <div className="contact-card">
          <div className="card-icon-wrapper">
            <Phone size={32} className="contact-card-icon" />
          </div>
          <h3 className="card-title">CALL US</h3>
          <p className="card-subtitle">24/7 HELPLINE</p>
          <div className="card-content">
            <div className="card-content-item">
              <a href={`tel:${settings?.helpline1 || "015925995"}`} className="text-[#e5e2e1] no-underline hover:text-[#94da32]">
                {settings?.helpline1 || "01-5925995"}
              </a>
            </div>
            <div className="card-content-item">
              <a href={`tel:${settings?.helpline2 || "+9779745978217"}`} className="text-[#e5e2e1] no-underline hover:text-[#94da32]">
                {settings?.helpline2 || "+977-9745978217"}
              </a>
            </div>
          </div>
        </div>

        {/* Visit Us Card */}
        <a
          href="https://maps.app.goo.gl/WiF7jeWaksC2YRF37"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline"
        >
          <div className="contact-card">
            <div className="card-icon-wrapper">
              <MapPin size={32} className="contact-card-icon" />
            </div>
            <h3 className="card-title">VISIT US</h3>
            <p className="card-subtitle">HEADQUARTERS</p>
            <address className="card-content not-italic">
              <div className="card-content-item text-[#e5e2e1]">
                {settings?.address || "Radhe Radhe, Bhaktapur, NEPAL"}
              </div>
            </address>
          </div>
        </a>

        {/* Email Us Card */}
        <div className="contact-card">
          <div className="card-icon-wrapper">
            <Mail size={32} className="contact-card-icon" />
          </div>
          <h3 className="card-title">E-MAIL US</h3>
          <p className="card-subtitle">COMMUNICATIONS</p>
          <div className="card-content">
            <div className="card-content-item">
              <a href={`mailto:${settings?.email || "info@nightvision.com.np"}`} className="text-[#e5e2e1] no-underline hover:text-[#94da32]">
                {settings?.email || "info@nightvision.com.np"}
              </a>
            </div>
            <div className="card-content-item">
              <a href="https://www.nightvision.com.np" target="_blank" rel="noopener noreferrer" className="text-[#e5e2e1] no-underline hover:text-[#94da32]">
                www.nightvision.com.np
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="px-6 pb-20 max-w-[1280px] mx-auto">
        <div className="relative w-full h-[450px] md:h-[550px] rounded-3xl overflow-hidden border-2 border-[#94da32] shadow-[0_0_30px_rgba(148,218,50,0.2)] bg-[#101010]">
          <iframe
            title="Night Vision CCTV Nepal"
            src={siteContents.contactMapEmbedUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d516.379656973646!2d85.3979903064471!3d27.677293954618367!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1902e459720b%3A0x446057850e6bebe5!2sNight%20Vision%20CCTV%20Nepal!5e1!3m2!1sen!2snp!4v1778740476919!5m2!1sen!2snp"}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* Location info badge */}
          <div className="absolute top-4 left-4 right-4 md:right-auto z-10 bg-black/80 backdrop-blur-md border border-[#94da32]/30 rounded-2xl p-4 md:p-6 max-w-sm shadow-[0_0_20px_rgba(148,218,50,0.15)]">
            <div className="flex items-center gap-2 text-[#94da32] font-mono text-xs font-bold mb-1">
              <Navigation size={14} /> KATHMANDU HQ COMMAND
            </div>
            <div className="text-white font-bold text-lg font-['Space_Grotesk']">NightVision CCTV Nepal</div>
            <p className="text-[#c3c9b3] text-xs mt-1">Radhe Radhe, Arniko Highway, Bhaktapur</p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="px-6 pb-20 max-w-[900px] mx-auto">
        <div className="bg-[#181b12] border border-[#434938] p-8 md:p-12 rounded-2xl">
          <h2 className="text-2xl md:text-3xl font-bold font-['Space_Grotesk'] text-white mb-2 uppercase tracking-wider text-center">
            SEND US A TRANSMISSION
          </h2>
          <p className="text-sm text-[#c3c9b3] text-center mb-8 max-w-lg mx-auto">
            Fill in your inquiry details below. Our security team will review your specs and respond within 24 hours.
          </p>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}