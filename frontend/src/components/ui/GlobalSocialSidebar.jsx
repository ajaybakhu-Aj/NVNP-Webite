import React from "react";
import { useSiteContents } from "../../utils/cmsDb";
import Icon from "../../utils/Icon";

export default function GlobalSocialSidebar() {
  const siteContents = useSiteContents();
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
      className="global-social-sidebar"
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
