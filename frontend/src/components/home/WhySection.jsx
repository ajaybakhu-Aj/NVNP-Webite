import { colors, feedImages } from "../../data/constants";
import { useSiteContents, useHomepageSettings } from "../../utils/cmsDb";

export default function WhySection() {
  const contents = useSiteContents();
  const homeSettings = useHomepageSettings();

  const whyFeats = homeSettings.about?.features || contents.whyFeatures || [];

  return (
    <section
      id="why"
      className="homepage-safe-section bg-[var(--nv-bg,#131313)] border-b border-[var(--nv-outlineVar,#434938)]/40 overflow-hidden flex justify-center items-center py-[clamp(45px,5vw,85px)]"
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-center w-full box-border">
        {/* CAMERA FEEDS */}
        <div className="w-full rounded-xl overflow-hidden border border-[var(--nv-secondary,#94da32)] shadow-xl shadow-[rgba(148,218,50,0.06)] bg-black">
          <div className="grid grid-cols-2 w-full overflow-hidden">
            {feedImages.map(({ src, ch }, i) => (
              <div
                key={ch}
                className="relative aspect-video bg-black overflow-hidden group"
                style={{
                  borderTop: i >= 2 ? `1px solid ${colors.secondary}` : "none",
                  borderLeft: i % 2 === 1 ? `1px solid ${colors.secondary}` : "none",
                }}
              >
                <img
                  src={src}
                  alt={ch}
                  className="w-full h-full object-cover opacity-50 transition-opacity duration-200 group-hover:opacity-80 block"
                />
                <div className="absolute top-2 left-2 text-[clamp(8px,2vw,10px)] bg-[#dc2626] text-white px-1.5 py-0.5 whitespace-nowrap font-semibold">
                  REC • {ch}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col gap-5 w-full">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--nv-secondary,#94da32)] animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-[2px] uppercase text-[var(--nv-secondary,#94da32)]">
              {homeSettings.about?.tag || contents.whyTag || "// ARCHITECTURE // HARDWARE INTEGRITY"}
            </span>
          </div>

          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--nv-onSurf,#ffffff)] uppercase break-words leading-tight">
            {homeSettings.about?.heading || contents.whyTitle || "UNCOMPROMISING VIGILANCE TECHNOLOGY"}
          </h2>

          <p className="text-sm sm:text-base text-[var(--nv-onSurfVar,#c3c9b3)] leading-relaxed">
            {homeSettings.about?.subheading || contents.whySubtitle || "We don't just sell cameras; we deploy comprehensive security ecosystems tailored for the unique challenges of Nepal's infrastructure."}
          </p>

          {homeSettings.about?.body_text && (
            <p className="text-sm text-[var(--nv-onSurfVar,#c3c9b3)] opacity-80 leading-relaxed -mt-2">
              {homeSettings.about.body_text}
            </p>
          )}

          {/* FEATURES */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 w-full">
            {whyFeats.map((feat, idx) => (
              <div
                key={idx}
                className="pl-4 py-2 min-w-0"
                style={{ borderLeft: `4px solid ${colors.secondary}` }}
              >
                <div
                  className="text-[clamp(20px,3vw,24px)] font-bold text-[var(--nv-secondary,#94da32)] leading-snug break-words"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {feat.val}
                </div>
                <div
                  className="text-xs font-semibold tracking-wider text-[var(--nv-onSurfVar,#c3c9b3)] leading-relaxed break-words"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {feat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}