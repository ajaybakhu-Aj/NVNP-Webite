import React from "react";
import CategoryProductView from "../../../../components/products/CategoryProductView";

export default function ProductsWirelessCamerasPage() {
  return (
    <CategoryProductView
      pageTitle="Wireless CCTV Cameras"
      pageDesc="High-performance Wi-Fi surveillance systems delivering flexible placement and rapid setup."
      categoryKey="Wireless CCTV Cameras"
      keyFeatures={[
        "High-speed Wi-Fi dual-band connectivity (2.4GHz & 5GHz)",
        "Zero video cabling required - easy DIY setup",
        "Cloud and local MicroSD card edge storage options",
        "Two-way talk with built-in speaker and microphone"
      ]}
      pageBodyText={`Wireless CCTV Cameras offer complete flexibility and ease of installation without the hassle of running video cables. Designed for smart homes and modern offices, these systems connect directly to your Wi-Fi network and feature advanced dual-band connectivity. They provide high-definition monitoring, real-time alerts, and local storage, ensuring your premises remain secure around the clock.

By utilizing high-gain dual antennas, our wireless cameras ensure stable signal reception through walls and over longer distances. They support seamless mobile integration via our companion application, enabling remote live view, pan-and-tilt control, and audio broadcasting directly from your smartphone, making security management effortless.`}
    />
  );
}
