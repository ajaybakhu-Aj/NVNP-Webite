import React from "react";
import { Link, useLocation } from "react-router-dom";
import Icon from "../../utils/Icon";

const ROUTE_NAME_MAP = {
  products: "PRODUCTS",
  "wireless-cameras": "WIRELESS SERIES CAMERAS",
  "ip-cameras": "IP SERIES CAMERAS",
  nvr: "NETWORK VIDEO RECORDER (NVR)",
  "poe-switch": "POE SWITCH",
  "hard-disk": "HARD DISK",
  "sd-card": "SD CARD",
  "indoor-cameras": "INDOOR CAMERAS",
  "outdoor-cameras": "OUTDOOR CAMERAS",
  "indoor-outdoor-cameras": "INDOOR & OUTDOOR CAMERAS",
  "ai-cameras": "AI CAMERAS",
  about: "ABOUT US",
  contact: "CONTACT US",
  dealership: "DEALERS",
  "apply-dealers": "BECOME A DEALER",
  blog: "BLOGS",
  events: "NEWS & EVENTS",
  support: "TECHNICAL SUPPORT",
  warranty: "WARRANTY",
  privacy: "PRIVACY POLICY",
  terms: "TERMS OF SERVICE",
  "cctv-setup": "CUSTOM CCTV SETUP"
};

export default function Breadcrumbs({ items: customItems, categoryName, productName }) {
  const location = useLocation();

  let breadcrumbs = [];

  if (customItems && customItems.length > 0) {
    breadcrumbs = customItems;
  } else {
    breadcrumbs.push({ label: "HOME", url: "/" });

    const pathSegments = location.pathname.split("/").filter(Boolean);

    let accumPath = "";
    pathSegments.forEach((segment, index) => {
      accumPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;

      let label = ROUTE_NAME_MAP[segment] || segment.replace(/-/g, " ").toUpperCase();
      
      // Override label if explicit product or category prop is supplied
      if (isLast && productName) {
        label = productName.toUpperCase();
      } else if (isLast && categoryName) {
        label = categoryName.toUpperCase();
      }

      breadcrumbs.push({
        label,
        url: isLast ? null : accumPath,
      });
    });
  }

  // Ensure HOME link is always present as the root parent
  if (breadcrumbs.length > 0 && breadcrumbs[0].label !== "HOME") {
    breadcrumbs.unshift({ label: "HOME", url: "/" });
  }

  return (
    <div
      className="breadcrumbs-wrapper"
      style={{
        background: "#0c0c0c",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        padding: "12px 24px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <style>{`
        .breadcrumbs-nav {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          overflow-x: auto;
          white-space: nowrap;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .breadcrumbs-nav::-webkit-scrollbar {
          display: none;
        }
        .breadcrumbs-list {
          display: flex;
          align-items: center;
          gap: 8px;
          list-style: none;
          margin: 0;
          padding: 0;
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          font-size: 0.82rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .breadcrumb-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .breadcrumb-link {
          color: #a0a0a0;
          text-decoration: none;
          transition: color 0.2s ease, text-shadow 0.2s ease;
          font-weight: 500;
        }
        .breadcrumb-link:hover {
          color: #7CFC00;
          text-shadow: 0 0 8px rgba(124, 252, 0, 0.4);
        }
        .breadcrumb-current {
          color: #deffa4;
          font-weight: 700;
        }
        .breadcrumb-separator {
          color: rgba(124, 252, 0, 0.6);
          display: flex;
          align-items: center;
          font-size: 0.75rem;
          user-select: none;
        }
      `}</style>

      <nav
        aria-label="Breadcrumb"
        className="breadcrumbs-nav"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        <ol className="breadcrumbs-list">
          {breadcrumbs.map((crumb, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            const position = idx + 1;

            return (
              <li
                key={idx}
                className="breadcrumb-item"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {!isLast && crumb.url ? (
                  <Link
                    to={crumb.url}
                    className="breadcrumb-link"
                    itemProp="item"
                  >
                    <span itemProp="name">{crumb.label}</span>
                  </Link>
                ) : (
                  <span
                    className="breadcrumb-current"
                    itemProp="name"
                    aria-current="page"
                  >
                    {crumb.label}
                  </span>
                )}
                <meta itemProp="position" content={position} />

                {!isLast && (
                  <span className="breadcrumb-separator" aria-hidden="true">
                    ›
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
