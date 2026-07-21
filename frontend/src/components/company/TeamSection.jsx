import React, { useState, useEffect } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedinIn, FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import { getAllTeamMembers } from '../../utils/cmsDb';

export default function TeamSection() {
  const [activeIndex, setActiveIndex] = useState(0);
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
    focus: 'center',
    gap: '2rem',
    autoWidth: true,
    arrows: true,
    pagination: false,
    speed: 800,
    easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    drag: 'free',
    updateOnMove: true,
    autoplay: true,
    interval: 5000,
    pauseOnHover: false,
    pauseOnFocus: false,
    breakpoints: {
      768: {
        gap: '1rem',
      }
    }
  };

  if (teamMembers.length === 0) return null;

  return (
    <section className="relative py-20 overflow-hidden border-t border-b" style={{ background: 'var(--nv-bg)', borderColor: 'var(--nv-outlineVar)' }}>
      {/* Background accents */}
      <div className="absolute inset-0 grid-overlay opacity-50"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-[#94da32] opacity-[0.03] blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 mb-12 relative z-10 text-center flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-5xl md:text-7xl font-bold uppercase tracking-wider mb-6 text-center w-full"
          style={{ textAlign: 'center', color: 'var(--nv-onSurf)' }}
        >
          Meet The <span className="text-[#94da32]">Team</span>
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg text-center w-full"
          style={{ textAlign: 'center', color: 'var(--nv-onSurfVar)' }}
        >
          The visionaries and engineers behind NightVision's uncompromising security ecosystem.
        </motion.p>
      </div>

      <div className="relative z-10 mt-12">
        <Splide 
          options={splideOptions} 
          onActive={(splide, slide) => setActiveIndex(slide.index)}
          className="team-splide pb-36"
        >
          {teamMembers.map((member, index) => (
            <SplideSlide key={member.id} className="w-[300px] md:w-[450px] transition-all duration-700 ease-in-out">
              <TeamCard member={member} isActive={activeIndex === index} />
            </SplideSlide>
          ))}
        </Splide>
      </div>

      {/* Custom CSS for Splide to match theme */}
      <style>{`
        .team-splide .splide__arrow {
          background: var(--nv-surfCont);
          border: 1px solid var(--nv-outlineVar);
          transition: all 0.3s ease;
          opacity: 1;
          width: 3rem;
          height: 3rem;
        }
        .team-splide .splide__arrow:hover {
          border-color: var(--nv-secondary);
          box-shadow: 0 0 15px rgba(148, 218, 50, 0.3);
          transform: translateY(-50%) scale(1.1);
        }
        .team-splide .splide__arrow svg {
          fill: var(--nv-secondary);
          height: 1.2rem;
          width: 1.2rem;
        }
        .team-splide .splide__slide:not(.is-active) {
          transform: scale(0.85);
          opacity: 0.3;
          filter: grayscale(100%);
        }
        .team-splide .splide__slide.is-active {
          transform: scale(1);
          opacity: 1;
          filter: grayscale(0%);
          z-index: 10;
        }
        .team-splide .splide__track {
          overflow: visible;
        }
        .team-social-icon-facebook:hover {
          color: #1877F2 !important;
        }
        .team-social-icon-instagram:hover {
          color: #E4405F !important;
        }
        .team-social-icon-twitter:hover {
          color: #1DA1F2 !important;
        }
        .team-social-icon-linkedin:hover {
          color: #0A66C2 !important;
        }
      `}</style>
    </section>
  );
}

function TeamCard({ member }) {
  const [isHovered, setIsHovered] = useState(false);
  const showContent = isHovered;

  return (
    <div 
      className="relative w-full h-[600px] group overflow-hidden border transition-all duration-700 rounded-sm"
      style={{ background: 'var(--nv-surfLow)', borderColor: 'var(--nv-outlineVar)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={member.image} 
          alt={member.name} 
          className={`w-full h-full object-cover transition-transform duration-1000 ease-out ${showContent ? 'scale-105' : 'scale-100'}`}
          loading="lazy"
        />
        <div className={`absolute inset-0 transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`} style={{ background: 'linear-gradient(to top, var(--nv-bg) 0%, transparent 60%)' }}></div>
      </div>

      <AnimatePresence>
        {showContent && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 flex flex-col justify-end items-center text-center"
            style={{ padding: '2.5rem 2.5rem 1.5rem 2.5rem', boxSizing: 'border-box' }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-4 text-center w-full"
              style={{ textAlign: 'center' }}
            >
              <h3 className="font-display text-4xl font-bold tracking-wide text-center" style={{ textAlign: 'center', color: 'var(--nv-onSurf)' }}>{member.name}</h3>
              <p className="font-semibold tracking-wider text-sm uppercase mt-2 text-center" style={{ textAlign: 'center', color: 'var(--nv-secondary)' }}>{member.role}</p>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-base mt-2 mb-8 line-clamp-3 leading-relaxed text-center max-w-full mx-auto"
              style={{ textAlign: 'center', color: 'var(--nv-onSurfVar)' }}
            >
              {member.bio}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center pt-4 pb-0 w-full"
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              <div className="flex gap-6 justify-center" style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', alignItems: 'center' }}>
                <a href={member.socials?.facebook || "#"} className="team-social-icon-facebook transition-all duration-300 transform hover:scale-125 hover:-translate-y-1" style={{ color: 'var(--nv-onSurfVar)' }} title="Facebook"><FaFacebookF size={26} /></a>
                <a href={member.socials?.instagram || "#"} className="team-social-icon-instagram transition-all duration-300 transform hover:scale-125 hover:-translate-y-1" style={{ color: 'var(--nv-onSurfVar)' }} title="Instagram"><FaInstagram size={26} /></a>
                <a href={member.socials?.twitter || "#"} className="team-social-icon-twitter transition-all duration-300 transform hover:scale-125 hover:-translate-y-1" style={{ color: 'var(--nv-onSurfVar)' }} title="Twitter"><FaTwitter size={26} /></a>
                <a href={member.socials?.linkedin || "#"} className="team-social-icon-linkedin transition-all duration-300 transform hover:scale-125 hover:-translate-y-1" style={{ color: 'var(--nv-onSurfVar)' }} title="LinkedIn"><FaLinkedinIn size={26} /></a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
