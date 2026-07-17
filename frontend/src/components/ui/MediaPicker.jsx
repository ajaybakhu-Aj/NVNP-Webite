import React, { useState, useEffect } from "react";
import { uploadImage } from "../../utils/api";

const C = {
  bg: "#f8fafc",
  surface: "#ffffff",
  surfCont: "#f1f5f9",
  surfHi: "#e2e8f0",
  onSurf: "#0f172a",
  onSurfVar: "#475569",
  primary: "#4f46e5",
  onPrimary: "#ffffff",
  secondary: "#0284c7",
  outline: "#cbd5e1",
  outlineVar: "#e2e8f0",
};

export default function MediaPicker({
  value,
  onChange,
  label,
  altText = "Uploaded Asset",
  addLog = console.log,
  accept = "image/*"
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedAssetUrl, setSelectedAssetUrl] = useState(value);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchAssets();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedAssetUrl(value);
  }, [value]);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/assets/", { credentials: "same-origin" });
      if (res.ok) {
        const data = await res.json();
        setAssets(data || []);
      } else {
        addLog("Failed to load server media assets.");
      }
    } catch (err) {
      addLog(`Error loading media assets: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    addLog(`Uploading file: ${file.name}...`);
    try {
      const res = await uploadImage(file, altText);
      addLog(`Upload success! Saved to ${res.url}`);
      // Refresh assets list and select newly uploaded image
      await fetchAssets();
      setSelectedAssetUrl(res.url);
      onChange(res.url);
      setIsOpen(false);
    } catch (err) {
      addLog(`Upload failed: ${err.message}. Using local file fallback.`);
      // Fallback: Embed local file as base64 URL
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result);
        setSelectedAssetUrl(reader.result);
        setIsOpen(false);
      };
      reader.readAsDataURL(file);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSelect = (url) => {
    setSelectedAssetUrl(url);
    onChange(url);
    setIsOpen(false);
  };

  const filteredAssets = assets.filter(asset => 
    (asset.title || "").toLowerCase().includes(search.toLowerCase()) ||
    (asset.file || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6, width: "100%" }}>
      {label && (
        <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: C.onSurfVar }}>
          {label.toUpperCase()}
        </label>
      )}
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        {value ? (
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 6,
            border: `1px solid ${C.outline}`,
            overflow: "hidden",
            background: "#ebebeb",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}>
            <img src={value} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ) : (
          <div style={{
            width: 48,
            height: 48,
            borderRadius: 6,
            border: `1px dashed ${C.outline}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: C.onSurfVar,
            fontSize: 10,
            fontWeight: 600,
            flexShrink: 0
          }}>
            None
          </div>
        )}
        <input
          type="text"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Image URL or Path"
          style={{
            flex: 1,
            background: C.surfCont,
            border: `1px solid ${C.outlineVar}`,
            padding: 12,
            color: C.onSurf,
            outline: "none",
            fontSize: 13,
            borderRadius: 6
          }}
        />
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          style={{
            padding: "11px 16px",
            background: C.primary,
            color: C.onPrimary,
            border: "none",
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            transition: "opacity 0.2s"
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = 0.9}
          onMouseOut={(e) => e.currentTarget.style.opacity = 1}
        >
          Choose / Upload
        </button>
      </div>

      {isOpen && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(15, 23, 42, 0.6)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 99999,
          padding: 20
        }}>
          <div style={{
            width: "100%",
            maxWidth: 800,
            height: "80vh",
            background: "#ffffff",
            borderRadius: 16,
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden"
          }}>
            {/* Header */}
            <div style={{
              padding: "20px 24px",
              borderBottom: `1px solid ${C.outlineVar}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: C.onSurf }}>
                  Select or Upload Media
                </h3>
                <p style={{ margin: "4px 0 0", fontSize: 12, color: C.onSurfVar }}>
                  Choose an existing image from the server or upload a new one
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  fontSize: 20,
                  cursor: "pointer",
                  color: C.onSurfVar
                }}
              >
                &times;
              </button>
            </div>

            {/* Toolbar */}
            <div style={{
              padding: "16px 24px",
              background: C.bg,
              borderBottom: `1px solid ${C.outlineVar}`,
              display: "flex",
              gap: 16,
              alignItems: "center",
              justifyContent: "space-between"
            }}>
              <input
                type="text"
                placeholder="Search server assets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  flex: 1,
                  maxWidth: 320,
                  padding: "8px 12px",
                  borderRadius: 6,
                  border: `1px solid ${C.outline}`,
                  outline: "none",
                  fontSize: 13
                }}
              />
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <label style={{
                  padding: "8px 16px",
                  background: C.secondary,
                  color: "#fff",
                  borderRadius: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  {isUploading ? "Uploading..." : "Upload From Browser"}
                  <input
                    type="file"
                    accept={accept}
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>

            {/* Grid Area */}
            <div style={{
              flex: 1,
              overflowY: "auto",
              padding: 24,
              background: "#fafafa"
            }}>
              {loading ? (
                <div style={{ display: "flex", height: "100%", alignItems: "center", justifyCenter: "center", flexDirection: "column", gap: 12 }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    border: `3px solid ${C.outline}`,
                    borderTopColor: C.primary,
                    borderRadius: "50%",
                    animation: "spin 1s linear infinite"
                  }} />
                  <span style={{ fontSize: 13, color: C.onSurfVar }}>Loading server media...</span>
                </div>
              ) : filteredAssets.length === 0 ? (
                <div style={{ display: "flex", height: "100%", alignItems: "center", justifyContent: "center", flexDirection: "column", color: C.onSurfVar, gap: 12 }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <polyline points="21 15 16 10 5 21" />
                  </svg>
                  <span>No assets found on the server.</span>
                </div>
              ) : (
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                  gap: 16
                }}>
                  {/* Upload Folder / Card Option */}
                  <label style={{
                    border: `2px dashed ${C.outline}`,
                    borderRadius: 12,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 16,
                    cursor: "pointer",
                    background: "#ffffff",
                    textAlign: "center",
                    aspectRatio: "1/1",
                    transition: "border-color 0.2s"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = C.primary}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = C.outline}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: C.primary, marginBottom: 8 }}>
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="12" y1="18" x2="12" y2="12" />
                      <line x1="9" y1="15" x2="15" y2="15" />
                    </svg>
                    <span style={{ fontSize: 11, fontWeight: 600, color: C.onSurf }}>Upload Image</span>
                    <span style={{ fontSize: 9, color: C.onSurfVar, marginTop: 4 }}>From Browser</span>
                    <input
                      type="file"
                      accept={accept}
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
                      disabled={isUploading}
                    />
                  </label>

                  {/* Existing Assets */}
                  {filteredAssets.map((asset) => {
                    const isSelected = selectedAssetUrl === asset.file;
                    return (
                      <div
                        key={asset.id}
                        onClick={() => handleSelect(asset.file)}
                        style={{
                          border: `2px solid ${isSelected ? C.primary : "transparent"}`,
                          borderRadius: 12,
                          background: "#ffffff",
                          overflow: "hidden",
                          cursor: "pointer",
                          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                          display: "flex",
                          flexDirection: "column",
                          aspectRatio: "1/1",
                          position: "relative"
                        }}
                      >
                        <div style={{ flex: 1, overflow: "hidden", background: "#f1f5f9" }}>
                          <img
                            src={asset.file}
                            alt={asset.title}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            loading="lazy"
                          />
                        </div>
                        <div style={{
                          padding: "6px 8px",
                          fontSize: 10,
                          fontWeight: 600,
                          color: C.onSurf,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          borderTop: `1px solid ${C.outlineVar}`
                        }}>
                          {asset.title}
                        </div>
                        {isSelected && (
                          <div style={{
                            position: "absolute",
                            top: 6,
                            right: 6,
                            background: C.primary,
                            color: "#fff",
                            width: 18,
                            height: 18,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 10,
                            fontWeight: 700
                          }}>
                            ✓
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
