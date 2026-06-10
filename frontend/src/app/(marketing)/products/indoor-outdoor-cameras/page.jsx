import React from "react";
import CategoryProductView from "../../../../components/products/CategoryProductView";

export default function ProductsIndoorOutdoorCamerasPage() {
  return (
    <CategoryProductView
      pageTitle="Indoor and Outdoor CCTV Cameras"
      pageDesc="Highly versatile security cameras configured for interior elegance and exterior durability."
      productTypeKey="Indoor and Outdoor CCTV Cameras"
      keyFeatures={[
        "Hybrid design suitable for both interior and exterior installations",
        "Adjustable mounting brackets for flexible angle configuration",
        "High contrast imaging under sunlight or shadow conditions",
        "Smart activity zone customization to avoid false alarms"
      ]}
      pageBodyText={`Versatile Indoor and Outdoor CCTV Cameras adapt to any placement scenario. Combining weatherproof durability with clean, modern aesthetics, these multi-functional cameras can be mounted on your living room wall or under your house eaves, offering consistent high-tier protection.

These hybrid cameras offer the perfect balance of visual appeal and environmental toughness. With auto-switching day/night filters and high-performance lens coatings, they deliver balanced exposures even in situations with harsh backlighting or high contrast transitions, making them ideal for monitoring doorways, porches, and hallways alike.`}
    />
  );
}
