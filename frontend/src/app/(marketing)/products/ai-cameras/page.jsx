import React from "react";
import CategoryProductView from "../../../../components/products/CategoryProductView";

export default function ProductsAiCamerasPage() {
  return (
    <CategoryProductView
      pageTitle="AI CCTV Cameras"
      pageDesc="Smart neural-processing cameras providing automated target tracking and intrusion warnings."
      tagKey="ai"
      keyFeatures={[
        "NPU-driven human, vehicle, and face classification",
        "Intelligent tripwire crossing and perimeter intrusion alerts",
        "Automatic target tracking and digital zoom capture",
        "Facial recognition database and customized greeting support"
      ]}
      pageBodyText={`AI Cameras harness neural processing units to deliver proactive security intelligence. Moving beyond simple motion alerts, these cameras detect, categorize, and track humans, vehicles, and faces in real time, virtually eliminating false alarms while offering automated security actions.

Rather than wading through hours of empty footage, our AI-powered systems catalog events based on smart triggers. Receive immediate, specific notifications on your device when a vehicle enters your driveway, or when a person crosses a designated digital boundary. The built-in deep learning algorithms continuously improve accuracy, ensuring that only genuine threats demand your attention.`}
    />
  );
}
