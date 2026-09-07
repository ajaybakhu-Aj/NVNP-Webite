import { colors } from "../../data/constants";
import { useHomepageSettings } from "../../utils/cmsDb";

export default function TickerStrip() {
  const homeSettings = useHomepageSettings();
  const ticker = homeSettings?.ticker;

  if (ticker?.bannerEnabled === false) return null;

  const tickerText =
    ticker?.bannerText || "NightVision™ // CCTV Cameras Nepal // 4K Surveillance // Made for Nepal //";
  const speedRaw = parseInt(ticker?.bannerSpeed, 10);
  const scrollSeconds = !Number.isNaN(speedRaw) && speedRaw >= 5 && speedRaw <= 120 ? speedRaw : 18;

  const items = [tickerText, tickerText, tickerText, tickerText];

  return (
    <div
      className="w-full py-3 sm:py-4 overflow-hidden border-y"
      style={{
        background: colors.primaryContainer,
        color: colors.onPrimaryContainer,
        borderColor: colors.secondary,
      }}
    >
      <div className="ticker-wrapper">
        <div
          className="ticker-marquee uppercase font-bold text-xs sm:text-base md:text-xl lg:text-2xl"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            animation: `marqueeScroll ${scrollSeconds}s linear infinite`,
          }}
        >
          {items.map((t, i) => (
            <span key={i} className="mx-4 sm:mx-6 md:mx-8 flex-shrink-0">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}