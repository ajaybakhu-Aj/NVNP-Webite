import React from "react";
import Icon from "../../utils/Icon";
import cameraImg from "../../assets/white_dome_camera.png";

export default function FeaturesStrip() {
  return (
    <section id="features" className="features-section-container">
      <div className="features-section-wrapper">
        
        {/* HEADER */}
        <div className="features-section-header">
          <h2 className="features-section-title">NV NightVision</h2>
          <p className="features-section-subtitle">
            Advanced and Reliable Security Solutions to meet increasing demands of dynamic and ever-changing security landscape by innovating design, development and production of high-quality Closed-Circuit Television.
          </p>
        </div>

        {/* THREE COLUMN GRID */}
        <div className="features-layout-grid">
          
          {/* Left Column: Easy Installation & Advanced Features */}
          <div className="features-side-column">
            <div className="features-item-card">
              <div className="features-item-icon-wrapper">
                <Icon name="power" size={26} />
              </div>
              <div className="features-item-content">
                <h3 className="features-item-title">Easy Installation</h3>
                <p className="features-item-desc">
                  Does not require any wiring and function as Wi-Fi Based plug and play surveillance devices.
                </p>
              </div>
            </div>

            <div className="features-item-card">
              <div className="features-item-icon-wrapper">
                <Icon name="near_me" size={26} />
              </div>
              <div className="features-item-content">
                <h3 className="features-item-title">Advanced Features</h3>
                <p className="features-item-desc">
                  Night Vision Cameras are designed and developed with advanced feature and keeping practical usage in consideration.
                </p>
              </div>
            </div>
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

          {/* Right Column: Durable & Secured */}
          <div className="features-side-column">
            <div className="features-item-card">
              <div className="features-item-icon-wrapper">
                <Icon name="thunderstorm" size={26} />
              </div>
              <div className="features-item-content">
                <h3 className="features-item-title">Durable</h3>
                <p className="features-item-desc">
                  Manufactured to be used for indoor and outdoor purpose to last long from temperature -20 degree to 50+ degree Celsius.
                </p>
              </div>
            </div>

            <div className="features-item-card">
              <div className="features-item-icon-wrapper">
                <Icon name="shield" size={26} />
              </div>
              <div className="features-item-content">
                <h3 className="features-item-title">Secured</h3>
                <p className="features-item-desc">
                  Highly secured application and hardware for absolute privacy which also comes with private mode.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}