import React, { useState, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { motion } from 'framer-motion';
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { getAllTeamMembers } from '../../utils/cmsDb';

export default function TeamSection() {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    getAllTeamMembers().then((members) => {
      if (members && members.length > 0) {
        setTeamMembers(members);
      }
    });
  }, []);

  const splideOptions = {
    type: 'loop',
    perPage: 3,
    perMove: 1,
    gap: '1.5rem',
    arrows: true,
    pagination: true,
    speed: 800,
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    autoplay: true,
    interval: 4500,
    pauseOnHover: true,
    breakpoints: {
      1280: {
        perPage: 3,
        gap: '1.5rem',
      },
      1024: {
        perPage: 2,
        gap: '1.25rem',
      },
      768: {
        perPage: 1,
        gap: '1rem',
      },
    },
  };

  if (teamMembers.length === 0) return null;

  return (
    <section className="relative py-20 overflow-hidden border-t border-b bg-[#0a0a0a] border-white/10">
      {/* Background accents */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-[#b5e75d] opacity-[0.04] blur-[120px] pointer-events-none" />

      {/* Header Container */}
      <div
        className="hero-banner-inner about-content-inner"
        style={{
          maxWidth: 1200,
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: 24,
          paddingRight: 24,
          boxSizing: "border-box",
          width: "100%",
          marginBottom: 48,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-mono font-bold tracking-[3px] text-[#b5e75d] uppercase mb-2 px-3 py-1 rounded bg-[#b5e75d]/10 border border-[#b5e75d]/20"
        >
          OPERATIONAL ARCHITECTS
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-['Space_Grotesk'] text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white mb-4"
        >
          MEET THE <span className="text-[#b5e75d]">TEAM</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-sm md:text-base text-white/70 leading-relaxed font-sans"
        >
          The visionaries and engineers behind NightVision's uncompromising security ecosystem.
        </motion.p>
      </div>

      {/* Team Slider Centered Container */}
      <div
        className="team-slider-wrapper hero-banner-inner about-content-inner"
        style={{
          maxWidth: 1200,
          marginLeft: "auto",
          marginRight: "auto",
          paddingLeft: 24,
          paddingRight: 24,
          boxSizing: "border-box",
          width: "100%",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Splide options={splideOptions} className="team-splide pb-4">
          {teamMembers.map((member) => (
            <SplideSlide key={member.id}>
              <TeamCard member={member} />
            </SplideSlide>
          ))}
        </Splide>
      </div>

      {/* Custom Styles */}
      <style>{`
        .team-slider-wrapper .splide__track {
          overflow: hidden !important;
          border-radius: 12px;
        }
        .team-card-container {
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .team-card-container:hover {
          border-color: rgba(181, 231, 93, 0.6) !important;
          box-shadow: 0 0 20px rgba(181, 231, 93, 0.2), 0 8px 30px rgba(0, 0, 0, 0.5) !important;
          transform: translateY(-4px) !important;
        }
        .team-splide .splide__arrow {
          background: rgba(0, 0, 0, 0.75) !important;
          border: 1px solid rgba(181, 231, 93, 0.4) !important;
          backdrop-filter: blur(8px) !important;
          -webkit-backdrop-filter: blur(8px) !important;
          width: 42px !important;
          height: 42px !important;
          border-radius: 50% !important;
          opacity: 0.9 !important;
          top: 50% !important;
          transform: translateY(-50%) !important;
          transition: all 0.3s ease !important;
          z-index: 20 !important;
        }
        .team-splide .splide__arrow--prev {
          left: -12px !important;
        }
        .team-splide .splide__arrow--next {
          right: -12px !important;
        }
        @media (min-width: 1280px) {
          .team-splide .splide__arrow--prev {
            left: -18px !important;
          }
          .team-splide .splide__arrow--next {
            right: -18px !important;
          }
        }
        .team-splide .splide__arrow:hover {
          background: rgba(181, 231, 93, 0.2) !important;
          border-color: #b5e75d !important;
          box-shadow: 0 0 15px rgba(181, 231, 93, 0.5) !important;
          opacity: 1 !important;
          transform: translateY(-50%) scale(1.1) !important;
        }
        .team-splide .splide__arrow svg {
          fill: #b5e75d !important;
          width: 1.1rem !important;
          height: 1.1rem !important;
        }
        .team-splide .splide__pagination {
          margin-top: 24px !important;
          position: relative !important;
          bottom: 0 !important;
          display: flex !important;
          justify-content: center !important;
          gap: 8px !important;
        }
        .team-splide .splide__pagination__page {
          background: rgba(255, 255, 255, 0.2) !important;
          width: 8px !important;
          height: 8px !important;
          border-radius: 50% !important;
          transition: all 0.3s ease !important;
          margin: 0 !important;
        }
        .team-splide .splide__pagination__page.is-active {
          background: #b5e75d !important;
          box-shadow: 0 0 10px rgba(181, 231, 93, 0.6) !important;
          transform: scale(1.3) !important;
        }
      `}</style>
    </section>
  );
}

function TeamCard({ member }) {
  return (
    <div
      className="team-card-container group relative w-full overflow-hidden"
      style={{
        background: 'rgba(20, 20, 20, 0.6)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(181, 231, 93, 0.15)',
        borderRadius: '12px',
        boxSizing: 'border-box',
        position: 'relative',
      }}
    >
      {/* TOP CORNER BADGE POSITIONING */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          right: 12,
          zIndex: 2,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          border: '1px solid rgba(181, 231, 93, 0.4)',
          color: '#b5e75d',
          fontSize: '0.68rem',
          fontWeight: 700,
          padding: '4px 10px',
          borderRadius: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        SECURITY ELITE
      </div>

      {/* IMAGE CONTAINER (4:5 Aspect Ratio) */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-black/40">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-105"
          loading="lazy"
        />

        {/* OVERLAY GRADIENT SCRIM */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(10, 10, 10, 0.95) 70%, #0d0d0d 100%)',
          }}
        />
      </div>

      {/* CONTENT PANEL OVERLAY */}
      <div
        className="absolute bottom-0 inset-x-0 flex flex-col justify-end z-10"
        style={{
          padding: '20px 16px',
          boxSizing: 'border-box',
        }}
      >
        {/* ROLE BADGE */}
        <span
          style={{
            color: '#b5e75d',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginBottom: '4px',
            fontFamily: "'Space Grotesk', sans-serif",
            display: 'block',
          }}
        >
          {member.role}
        </span>

        {/* MEMBER NAME */}
        <h3
          style={{
            color: '#ffffff',
            fontSize: '1.2rem',
            fontWeight: 800,
            marginBottom: '6px',
            fontFamily: "'Space Grotesk', sans-serif",
            lineHeight: 1.2,
          }}
        >
          {member.name}
        </h3>

        {/* DESCRIPTION / BIO */}
        <p
          className="line-clamp-2"
          style={{
            color: '#cccccc',
            fontSize: '0.82rem',
            lineHeight: 1.4,
            maxWidth: '100%',
            marginBottom: '12px',
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {member.bio}
        </p>

        {/* SOCIAL QUICK-LINKS */}
        <div className="flex items-center gap-2.5 pt-2.5 border-t border-white/10 opacity-0 translate-y-2.5 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0">
          {member.socials?.linkedin && (
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white/80 hover:text-[#b5e75d] hover:border-[#b5e75d] hover:bg-[#b5e75d]/10 transition-all duration-200"
              title="LinkedIn"
            >
              <FaLinkedinIn size={12} />
            </a>
          )}
          {member.socials?.twitter && (
            <a
              href={member.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white/80 hover:text-[#b5e75d] hover:border-[#b5e75d] hover:bg-[#b5e75d]/10 transition-all duration-200"
              title="Twitter"
            >
              <FaTwitter size={12} />
            </a>
          )}
          {member.socials?.instagram && (
            <a
              href={member.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white/80 hover:text-[#b5e75d] hover:border-[#b5e75d] hover:bg-[#b5e75d]/10 transition-all duration-200"
              title="Instagram"
            >
              <FaInstagram size={12} />
            </a>
          )}
          {member.socials?.facebook && (
            <a
              href={member.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white/80 hover:text-[#b5e75d] hover:border-[#b5e75d] hover:bg-[#b5e75d]/10 transition-all duration-200"
              title="Facebook"
            >
              <FaFacebookF size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
