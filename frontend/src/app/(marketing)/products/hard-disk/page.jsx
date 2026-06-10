import React from "react";
import CategoryProductView from "../../../../components/products/CategoryProductView";

export default function ProductsHardDiskPage() {
  return (
    <CategoryProductView
      pageTitle="Surveillance Hard Disks"
      pageDesc="High-endurance storage drives engineered for 24/7 continuous video recording."
      categoryKey="Hard Disk"
      keyFeatures={[
        "Engineered for 24/7 continuous surveillance streaming write-cycles",
        "High write workloads supporting multiple simultaneous camera feeds",
        "Intelligent cache management for optimized video writing",
        "Vibration sensors for multi-bay storage environments"
      ]}
      pageBodyText={`Surveillance-optimized Hard Drives are designed for 24/7 write-intensive environments. Unlike standard desktop drives, they support continuous multi-stream recording from high-resolution cameras, ensuring high reliability, low power consumption, and zero frame-loss.

With customized firmware tuned specifically for digital video streaming, our hard drives reduce latency and frame loss during recording cycles. Whether built into an 8-channel or 32-channel network setup, they provide the rugged durability needed to maintain security archives over years of continuous operation.`}
    />
  );
}
