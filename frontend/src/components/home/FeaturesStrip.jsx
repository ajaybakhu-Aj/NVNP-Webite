import React, { useState, useEffect } from "react";
import Icon from "../../utils/Icon";
import cameraImg from "../../assets/white_dome_camera.png";
import { useSiteContents } from "../../utils/cmsDb";

export default function FeaturesStrip() {
  const contents = useSiteContents();

  const feats = contents.features || [];

  return (
    <section id="features" className="features-section-container">
      <div className="features-section-wrapper">
        
        {/* HEADER */}
        <div className="features-section-header">
          <h2 className="features-section-title">{contents.featuresTitle || "NV NightVision"}</h2>
          <p className="features-section-subtitle">
            {contents.featuresSubtitle || "Advanced and Reliable Security Solutions to meet increasing demands of dynamic and ever-changing security landscape by innovating design, development and production of high-quality Closed-Circuit Television."}
          </p>
        </div>

        {/* THREE COLUMN GRID */}
        <div className="features-layout-grid">
          
          {/* Left Column */}
          <div className="features-side-column">
            {feats.slice(0, 2).map((item, idx) => (
              <div className="features-item-card" key={idx}>
                <div className="features-item-icon-wrapper">
                  <Icon name={item.icon || "power"} size={26} />
                </div>
                <div className="features-item-content">
                  <h3 className="features-item-title">{item.title}</h3>
                  <p className="features-item-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Center Column: Product Visual */}
          <div className="features-center-column">
            <div className="features-center-image-wrapper">
              <img
                src={cameraImg}
                alt="NIGHTVISION Dome Camera"
                className="features-center-image"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="features-side-column">
            {feats.slice(2, 4).map((item, idx) => (
              <div className="features-item-card" key={idx}>
                <div className="features-item-icon-wrapper">
                  <Icon name={item.icon || "shield"} size={26} />
                </div>
                <div className="features-item-content">
                  <h3 className="features-item-title">{item.title}</h3>
                  <p className="features-item-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}