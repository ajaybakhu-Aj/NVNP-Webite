import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../utils/Icon";

export default function ProductFilterSidebar({
  maxPrice,
  setMaxPrice,
  categoryKey = "",
  productTypeKey = "",
  tagKey = "",
  selectedMemory = "",
  handleCategoryNav,
  handleProductTypeNav,
  handleMemoryNav,
  resetFilters,
}) {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* PRICE SLIDER FILTER */}
      <div style={{ border: "1px solid #434938", padding: 16, borderRadius: 4, background: "#181a15" }}>
        <h4 style={{ margin: "0 0 16px 0", fontSize: 14, fontFamily: "'Space Grotesk', sans-serif", color: "#deffa4", letterSpacing: 1 }}>
          PRICE LIMIT (NPR)
        </h4>
        <div style={{ display: "flex", justifyContent: "space-between", color: "#8d937f", fontSize: 12, marginBottom: 8 }}>
          <span>रू 0</span>
          <span style={{ color: "#94da32", fontWeight: 700 }}>Up to रू {maxPrice.toLocaleString("en-IN")}</span>
        </div>
        <input
          type="range"
          min="0"
          max="20000"
          step="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          style={{
            width: "100%",
            accentColor: "#94da32",
            cursor: "pointer",
            background: "#0c0d0a",
            height: 6,
            borderRadius: 3
          }}
        />
        <div style={{ textAlign: "right", color: "#8d937f", fontSize: 10, marginTop: 4 }}>
          Max: रू 20,000
        </div>
      </div>

      {/* CATEGORIES FILTER */}
      <div style={{ border: "1px solid #434938", padding: 16, borderRadius: 4, background: "#181a15" }}>
        <h4 style={{ margin: "0 0 16px 0", fontSize: 14, fontFamily: "'Space Grotesk', sans-serif", color: "#deffa4", letterSpacing: 1 }}>
          CATEGORIES
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            "Wireless CCTV Cameras",
            "IP CCTV Cameras",
            "Network Video Recoder (NVR)",
            "POE Switch"
          ].map((cat) => {
            const isChecked = categoryKey === cat;
            return (
              <label key={cat} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", color: isChecked ? "#fff" : "#c3c9b3", fontSize: 13, userSelect: "none" }}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleCategoryNav(cat)}
                  style={{
                    width: 16,
                    height: 16,
                    accentColor: "#94da32",
                    cursor: "pointer"
                  }}
                />
                {cat}
              </label>
            );
          })}

          {/* Memory Dropdown */}
          <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ color: "#8d937f", fontSize: 11, letterSpacing: 0.5 }}>MEMORY INTERFACE</label>
            <select
              value={selectedMemory}
              onChange={handleMemoryNav}
              style={{
                background: "#0c0d0a",
                border: "1px solid #434938",
                color: selectedMemory ? "#94da32" : "#fff",
                padding: "8px 12px",
                borderRadius: 4,
                fontSize: 12,
                cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif"
              }}
            >
              <option value="">Select Memory</option>
              <option value="Hard Disk">Hard Disk</option>
              <option value="SD Card">SD Card</option>
            </select>
          </div>
        </div>
      </div>

      {/* PRODUCT TYPE FILTER */}
      <div style={{ border: "1px solid #434938", padding: 16, borderRadius: 4, background: "#181a15" }}>
        <h4 style={{ margin: "0 0 16px 0", fontSize: 14, fontFamily: "'Space Grotesk', sans-serif", color: "#deffa4", letterSpacing: 1 }}>
          PRODUCT TYPE
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            "Indoor CCTV Cameras",
            "Outdoor CCTV Cameras",
            "Indoor and Outdoor CCTV Cameras",
            "AI Cameras"
          ].map((type) => {
            const isChecked = productTypeKey === type || (type === "AI Cameras" && tagKey === "ai");
            return (
              <label key={type} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", color: isChecked ? "#fff" : "#c3c9b3", fontSize: 13, userSelect: "none" }}>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleProductTypeNav(type)}
                  style={{
                    width: 16,
                    height: 16,
                    accentColor: "#94da32",
                    cursor: "pointer"
                  }}
                />
                {type}
              </label>
            );
          })}
        </div>
      </div>

      {/* BUILD YOUR CCTV SETUP BUTTON */}
      <div style={{
        border: "1px solid #94da32",
        padding: 16,
        borderRadius: 4,
        background: "linear-gradient(135deg, #181a15 0%, #0d0f0a 100%)",
        boxShadow: "0 0 15px rgba(148, 218, 50, 0.15)",
        textAlign: "center"
      }}>
        <h4 style={{ margin: "0 0 8px 0", fontSize: 14, fontFamily: "'Space Grotesk', sans-serif", color: "var(--nv-onSurf)", letterSpacing: 1 }}>
          CUSTOM SETUP
        </h4>
        <p style={{ color: "#8d937f", fontSize: 11, lineHeight: 1.5, marginBottom: 16 }}>
          Configure a complete camera network interactively to match your requirements.
        </p>
        <button
          onClick={() => navigate("/cctv-setup")}
          style={{
            width: "100%",
            background: "#94da32",
            color: "#111",
            border: "none",
            padding: "12px 8px",
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 12,
            letterSpacing: 1,
            borderRadius: 4,
            boxShadow: "0 0 10px rgba(148, 218, 50, 0.25)",
            transition: "transform 0.15s"
          }}
        >
          BUILD YOUR CCTV SETUP
        </button>
      </div>

      {/* RESET FILTERS */}
      {resetFilters && maxPrice < 20000 && (
        <button
          onClick={resetFilters}
          style={{
            width: "100%",
            background: "transparent",
            border: "1px dashed #ff6b6b",
            color: "#ff6b6b",
            padding: 10,
            borderRadius: 4,
            cursor: "pointer",
            fontWeight: 600,
            fontSize: 12,
            fontFamily: "'Space Grotesk', sans-serif"
          }}
        >
          RESET ALL FILTERS
        </button>
      )}
    </div>
  );
}
