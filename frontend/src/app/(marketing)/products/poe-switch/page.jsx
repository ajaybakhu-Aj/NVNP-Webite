import React from "react";
import CategoryProductView from "../../../../components/products/CategoryProductView";

export default function ProductsPoeSwitchPage() {
  return (
    <CategoryProductView
      pageTitle="PoE Switches"
      pageDesc="High-power networking gear designed to consolidate data and power distribution."
      categoryKey="POE Switch"
      keyFeatures={[
        "High-power output budgets for demanding PTZ & infrared cameras",
        "Automatic device detection to prevent damage to non-PoE nodes",
        "Sleek rackmount/desktop fanless silent design",
        "Up to 250m long-range network transmission modes"
      ]}
      pageBodyText={`Power over Ethernet switches provide power and network connectivity to your IP camera infrastructure. They eliminate the need for individual power outlets near cameras, simplifying cabling topology while offering intelligent power budget allocation and smart port monitoring.

Featuring robust surge protection, our PoE switches are specifically engineered to keep your security infrastructure operational during electrical fluctuations. They support high bandwidth rates to prevent bottlenecking or frame dropouts, maintaining optimal performance across all security endpoints.`}
    />
  );
}
