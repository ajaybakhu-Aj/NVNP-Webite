import React from "react";
import { colors } from "../../data/constants";

export default function TickerStrip() {
  const text =
    "NightVision™ // CCTV Cameras Nepal // 4K Surveillance // Made for Nepal //";

  return (
    <>
      <style>
        {`
          @keyframes marqueeScroll {
            0% {
              transform: translateX(0);
            }

            100% {
              transform: translateX(-50%);
            }
          }

          .ticker-wrapper {
            width: 100%;
            overflow: hidden;
          }

          .ticker-marquee {
            display: flex;
            align-items: center;
            width: max-content;

            white-space: nowrap;

            animation: marqueeScroll 18s linear infinite;
          }

          @media (max-width: 1024px) {
            .ticker-marquee {
              font-size: 20px !important;
            }
          }

          @media (max-width: 768px) {
            .ticker-marquee {
              font-size: 16px !important;
            }
          }

          @media (max-width: 480px) {
            .ticker-marquee {
              font-size: 13px !important;
            }

            .ticker-text {
              margin: 0 18px !important;
            }
          }

          @media (max-width: 360px) {
            .ticker-marquee {
              font-size: 11px !important;
            }
          }
        `}
      </style>

      <div
        style={{
          background: colors.primaryContainer,

          color: colors.onPrimaryContainer,

          padding: "16px 0",

          overflow: "hidden",

          borderTop: `1px solid ${colors.secondary}`,

          borderBottom: `1px solid ${colors.secondary}`,

          width: "100%",
        }}
      >
        <div className="ticker-wrapper">
          <div
            className="ticker-marquee"
            style={{
              whiteSpace: "nowrap",

              display: "flex",

              alignItems: "center",

              fontFamily: "'Space Grotesk', sans-serif",

              fontWeight: 700,

              fontSize: 24,

              textTransform: "uppercase",

              width: "max-content",
            }}
          >
            {[text, text, text, text].map((t, i) => (
              <span
                key={i}
                className="ticker-text"
                style={{
                  margin: "0 32px",

                  flexShrink: 0,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}