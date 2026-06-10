import React from "react";
import CategoryProductView from "../../../../components/products/CategoryProductView";

export default function ProductsOutdoorCamerasPage() {
  return (
    <CategoryProductView
      pageTitle="Outdoor CCTV Cameras"
      pageDesc="Rugged, weatherproof surveillance built to defend your external perimeter under any conditions."
      productTypeKey="Outdoor CCTV Cameras"
      keyFeatures={[
        "IP66 and IP67 weatherproofing with metal alloy enclosures",
        "Long-range infrared and color night vision up to 50 meters",
        "Vandal-resistant dome and bullet form factor options",
        "Active deterrence siren and strobe light warning systems"
      ]}
      pageBodyText={`Outdoor CCTV Cameras are built to withstand the harshest environmental elements. From heavy monsoon rain to extreme temperatures, these rugged, vandal-resistant cameras provide long-range night vision and high-definition perimeter monitoring day and night.

Protecting the boundary of your property is the first line of defense. Our outdoor models feature integrated active deterrence systems, combining bright strobe lights and loud audible sirens that trigger when intrusion is detected. Backed by high-power infrared LEDs and color-at-night technologies, these cameras capture crisp, legal-grade video evidence even in absolute darkness, ensuring your property is watched 24/7.`}
    />
  );
}
