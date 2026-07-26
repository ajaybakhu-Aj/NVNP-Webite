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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-[#7CFC00] opacity-[0.04] blur-[120px] pointer-events-none" />

      {/* Header Container */}
      <div className="max-w-[1200px] mx-auto px-6 mb-12 relative z-10 text-center flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-mono font-bold tracking-[3px] text-[#7CFC00] uppercase mb-2 px-3 py-1 rounded bg-[#7CFC00]/10 border border-[#7CFC00]/20"
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
          MEET THE <span className="text-[#7CFC00]">TEAM</span>
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

      {/* Team Slider */}
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <Splide options={splideOptions} className="team-splide pb-14">
          {teamMembers.map((member) => (
            <SplideSlide key={member.id}>
              <TeamCard member={member} />
            </SplideSlide>
          ))}
        </Splide>
      </div>

      {/* Custom Styles */}
      <style>{`
        .team-card-container {
          transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .team-card-container:hover {
          border-color: rgba(124, 252, 0, 0.6) !important;
          box-shadow: 0 0 20px rgba(124, 252, 0, 0.2), 0 8px 30px rgba(0, 0, 0, 0.5) !important;
          transform: translateY(-4px) !important;
        }
        .team-splide .splide__arrow {
          background: rgba(0, 0, 0, 0.7) !important;
          border: 1px solid rgba(124, 252, 0, 0.4) !important;
          backdrop-filter: blur(8px) !important;
          -webkit-backdrop-filter: blur(8px) !important;
          width: 42px !important;
          height: 42px !important;
          border-radius: 50% !important;
          opacity: 0.9 !important;
          transition: all 0.3s ease !important;
        }
        .team-splide .splide__arrow:hover {
          background: rgba(124, 252, 0, 0.15) !important;
          border-color: #7CFC00 !important;
          box-shadow: 0 0 15px rgba(124, 252, 0, 0.4) !important;
          opacity: 1 !important;
          transform: translateY(-50%) scale(1.1) !important;
        }
        .team-splide .splide__arrow svg {
          fill: #7CFC00 !important;
          width: 1.1rem !important;
          height: 1.1rem !important;
        }
        .team-splide .splide__pagination {
          bottom: 0 !important;
        }
        .team-splide .splide__pagination__page {
          background: rgba(255, 255, 255, 0.2) !important;
          transition: all 0.3s ease !important;
        }
        .team-splide .splide__pagination__page.is-active {
          background: #7CFC00 !important;
          box-shadow: 0 0 10px rgba(124, 252, 0, 0.6) !important;
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
        border: '1px solid rgba(124, 252, 0, 0.15)',
        borderRadius: '12px',
        boxSizing: 'border-box',
      }}
    >
      {/* IMAGE CONTAINER (4:5 Aspect Ratio) */}
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-black/40">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-105"
          loading="lazy"
        />

        {/* OVERLAY GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-95" />

        {/* TOP ACCENT BADGE */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-black/60 border border-[#7CFC00]/30 backdrop-blur-md text-[10px] font-mono font-bold tracking-widest text-[#7CFC00] uppercase">
          SECURITY ELITE
        </div>
      </div>

      {/* CONTENT PANEL OVERLAY */}
      <div className="absolute bottom-0 inset-x-0 p-5 flex flex-col justify-end z-10">
        {/* ROLE */}
        <span className="text-[0.82rem] font-bold uppercase tracking-wider text-[#7CFC00] mb-1 font-['Space_Grotesk']">
          {member.role}
        </span>

        {/* NAME */}
        <h3 className="text-[1.1rem] font-bold text-white mb-1.5 font-['Space_Grotesk'] leading-snug">
          {member.name}
        </h3>

        {/* BIO */}
        <p className="text-[0.8rem] text-white/75 line-clamp-2 leading-relaxed mb-3 font-sans">
          {member.bio}
        </p>

        {/* SOCIAL QUICK-LINKS OVERLAY */}
        <div className="flex items-center gap-2.5 pt-2.5 border-t border-white/10 opacity-0 translate-y-2.5 transition-all duration-300 ease-out group-hover:opacity-100 group-hover:translate-y-0">
          {member.socials?.linkedin && (
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white/80 hover:text-[#7CFC00] hover:border-[#7CFC00] hover:bg-[#7CFC00]/10 transition-all duration-200"
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
              className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white/80 hover:text-[#7CFC00] hover:border-[#7CFC00] hover:bg-[#7CFC00]/10 transition-all duration-200"
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
              className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white/80 hover:text-[#7CFC00] hover:border-[#7CFC00] hover:bg-[#7CFC00]/10 transition-all duration-200"
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
              className="w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white/80 hover:text-[#7CFC00] hover:border-[#7CFC00] hover:bg-[#7CFC00]/10 transition-all duration-200"
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
