import React from "react";
import { useSiteContents } from "../../utils/cmsDb";
import Icon from "../../utils/Icon";
import { useTheme } from "../../Context/ThemeContext";

export default function GlobalSocialSidebar() {
  const siteContents = useSiteContents();
  const { isDarkMode, toggleTheme } = useTheme();

  const facebook = siteContents.socialFacebook || "https://www.facebook.com/nightvisioninterprises";
  const instagram = siteContents.socialInstagram || "https://www.instagram.com/nightvision_nepal/";
  const linkedin = siteContents.socialLinkedin || "https://linkedin.com/";
  const tiktok = siteContents.socialTiktok || "https://www.tiktok.com/@nvnightvisionnp?lang=en";
  const x = siteContents.socialX || "https://x.com/";
  const youtube = siteContents.socialYoutube || "https://www.youtube.com/@nvnightvisionnp";

  const [footerVisible, setFooterVisible] = React.useState(false);

  React.useEffect(() => {
    const footer = document.querySelector(".app-footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="global-social-sidebar floating-social-bar social-share-sticky side-social-icons"
      style={{
        opacity: footerVisible ? 0 : 1,
        pointerEvents: footerVisible ? "none" : "all",
        transition: "opacity 0.4s ease, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
      }}
    >
      <a
        href={facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="global-social-btn btn-facebook"
        title="Facebook"
      >
        <Icon name="facebook" size={18} />
      </a>
      <a
        href={instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="global-social-btn btn-instagram"
        title="Instagram"
      >
        <Icon name="instagram" size={18} />
      </a>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="global-social-btn btn-linkedin"
        title="LinkedIn"
      >
        <Icon name="linkedin" size={18} />
      </a>

      {/* Theme Toggle Button (Middle of social list) */}
      <button
        id="theme-toggle-btn"
        className="theme-toggle-btn global-social-btn btn-theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle Theme"
        title={isDarkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}
      >
        <svg
          className="sun-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ display: isDarkMode ? "block" : "none" }}
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
        </svg>
        <svg
          className="moon-icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ display: isDarkMode ? "none" : "block" }}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </button>

      <a
        href={tiktok}
        target="_blank"
        rel="noopener noreferrer"
        className="global-social-btn btn-tiktok"
        title="TikTok"
      >
        <Icon name="tiktok" size={18} />
      </a>
      <a
        href={x}
        target="_blank"
        rel="noopener noreferrer"
        className="global-social-btn btn-x"
        title="X"
      >
        <Icon name="x" size={18} />
      </a>
      <a
        href={youtube}
        target="_blank"
        rel="noopener noreferrer"
        className="global-social-btn btn-youtube"
        title="YouTube"
      >
        <Icon name="youtube" size={18} />
      </a>
    </div>
  );
}
