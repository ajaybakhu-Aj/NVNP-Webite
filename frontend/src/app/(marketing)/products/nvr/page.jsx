import React from "react";
import CategoryProductView from "../../../../components/products/CategoryProductView";

export default function ProductsNvrPage() {
  return (
    <CategoryProductView
      pageTitle="Network Video Recorders (NVR)"
      pageDesc="Central recording and analytics brains for IP camera security systems."
      categoryKey="Network Video Recoder (NVR)"
      keyFeatures={[
        "Multi-channel ultra-HD video input recording",
        "Dynamic motion-activated archive scheduling",
        "Remote multi-device surveillance feed viewing",
        "Smart compression algorithms (H.265+ / H.264)"
      ]}
      pageBodyText={`Network Video Recorders are the core processing hubs of modern security networks. Engineered to receive and archive digital streams from multiple IP cameras simultaneously, our NVRs support multi-channel synchronized recording, large-capacity surveillance hard drives, and intelligent video analytics playback.

Our professional-grade NVRs offer easy plug-and-play setup, auto-discovering connected IP cameras across the local subnet. They provide continuous, high-definition recording with support for multiple hard drives, giving you weeks or months of playback archives. Remote access features allow administrators to review security feeds on mobile devices or computers from anywhere in the world.`}
    />
  );
}
