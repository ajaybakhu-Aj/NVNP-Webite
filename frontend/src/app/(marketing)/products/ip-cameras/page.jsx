import React from "react";
import CategoryProductView from "../../../../components/products/CategoryProductView";

export default function ProductsIpCamerasPage() {
  return (
    <CategoryProductView
      pageTitle="IP CCTV Cameras"
      pageDesc="Professional network cameras utilizing single-cable Ethernet PoE for high-capacity security grids."
      categoryKey="IP CCTV Cameras"
      keyFeatures={[
        "Gigabit data streaming with low-latency network protocols",
        "Single-cable Power over Ethernet (PoE 802.3af/at) integration",
        "Advanced digital noise reduction and wide dynamic range (WDR)",
        "Rugged weatherproof casings (IP66/IP67 rated)"
      ]}
      pageBodyText={`IP CCTV Cameras deliver enterprise-grade performance and unmatched stability. Operating over high-speed Ethernet lines with Power over Ethernet (PoE) support, these cameras carry video streams and power over a single cable. With advanced image sensors and high megapixel resolutions, they capture crystal-clear details in any lighting environment.

Designed for robust long-term deployments, IP cameras communicate directly with your network video recorder (NVR) over standard TCP/IP protocols. They feature onboard hardware encryption, ensuring that your surveillance streams are protected against unauthorized access and local network interference.`}
    />
  );
}
