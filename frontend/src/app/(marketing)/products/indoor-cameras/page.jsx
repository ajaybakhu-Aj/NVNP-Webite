import React from "react";
import CategoryProductView from "../../../../components/products/CategoryProductView";

export default function ProductsIndoorCamerasPage() {
  return (
    <CategoryProductView
      pageTitle="Indoor CCTV Cameras"
      pageDesc="Sleek, unobtrusive security cameras engineered specifically for home and office interiors."
      productTypeKey="Indoor CCTV Cameras"
      keyFeatures={[
        "Compact, lightweight, and modern aesthetic designs",
        "Wide-angle fields of view with minimal distortion",
        "Intelligent motion detection and automatic baby/pet tracking",
        "Discreet mounting options for ceilings, walls, or bookshelves"
      ]}
      pageBodyText={`Indoor CCTV Cameras are tailored to blend seamlessly into your home or office decor. Offering wide-angle lenses, smart motion detection, and discreet profiles, these cameras keep watch over your valuables, family members, or staff while respecting aesthetic and space constraints.

Modern indoor spaces require surveillance solutions that are subtle yet highly capable. Equipped with high-definition sensors, automatic night vision modes, and built-in two-way audio, these cameras allow you to communicate with loved ones or deter unwanted activity in real time. Features like configurable activity zones and smart person alerts minimize false notifications, giving you peace of mind whether you are in the next room or away from home.`}
    />
  );
}
