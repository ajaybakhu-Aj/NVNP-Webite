import React from "react";
import CategoryProductView from "../../../../components/products/CategoryProductView";

export default function ProductsSdCardPage() {
  return (
    <CategoryProductView
      pageTitle="Security MicroSD Cards"
      pageDesc="Endurance flash storage designed for edge recording in standalone wireless cameras."
      categoryKey="SD Card"
      keyFeatures={[
        "High-endurance flash memory for continuous loop recording",
        "Waterproof, temperature-proof, shock-proof, and X-ray proof casings",
        "Class 10 and UHS Speed Class ratings for smooth video capture",
        "Seamless integration with smart cameras' native storage slots"
      ]}
      pageBodyText={`Edge storage MicroSD cards provide reliable, independent security backup. Designed for wireless cameras, they store motion-activated events and full continuous video streams right on the camera, ensuring continuous recording even during network or power disruptions.

Built to withstand severe temperatures and physical stress, these cards are optimal for outdoor wireless cameras. Their high speed ratings guarantee stutter-free recording of 1080p, 2K, or 4K surveillance video streams, offering double backup security when paired with cloud storage.`}
    />
  );
}
