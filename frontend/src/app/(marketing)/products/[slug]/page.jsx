import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CartContext } from "../../../../Context/CartContext";
import Icon from "../../../../utils/Icon";
import { getProductById, getAllProducts } from "../../../../utils/productDb";
import { useSiteContents } from "../../../../utils/cmsDb";
import CatalogDownloadButton from "../../../../components/ui/CatalogDownloadButton";
import Breadcrumbs from "../../../../components/ui/Breadcrumbs";

const getEmbedVideoDetails = (url) => {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  const ytRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = trimmed.match(ytRegex);

  if (match && match[2] && match[2].length === 11) {
    const videoId = match[2];
    return {
      type: "youtube",
      embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`,
      thumbUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      videoId
    };
  }

  return {
    type: "direct",
    embedUrl: trimmed,
    thumbUrl: null
  };
};

export default function ProductDetail() {
  const { slug } = useParams();
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const siteContents = useSiteContents();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeImg, setActiveImg] = useState("");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("specs");

  const checkIsPurchased = () => {
    if (!product) return false;
    try {
      const userSession = localStorage.getItem("user");
      if (!userSession) return false;
      const savedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
      return savedOrders.some(order => 
        order.items && order.items.some(item => 
          item.name.toLowerCase().includes(product.name.toLowerCase())
        )
      );
    } catch (e) {
      return false;
    }
  };
  const isPurchased = checkIsPurchased();

  useEffect(() => {
    setLoading(true);
    getProductById(slug).then((prod) => {
      if (prod) {
        setProduct(prod);
        setActiveImg(prod.img);
        setQuantity(1);

        // Fetch related products strictly from the same category
        getAllProducts().then((allProds) => {
          const filtered = allProds.filter((p) => p.id !== prod.id && p.category === prod.category).slice(0, 3);
          setRelatedProducts(filtered);
        });
      } else {
        setProduct(null);
      }
      setLoading(false);
    }).catch((err) => {
      console.error("Database query failed:", err);
      setProduct(null);
      setLoading(false);
    });
  }, [slug]);

  // Removed manual head mutation in favor of React Helmet Async hydration binding

  const handleAddToCart = () => {
    if (!product) return;

    const userSession = localStorage.getItem("user");
    if (!userSession) {
      alert("Login required. Please log in to add products to your cart.");
      navigate("/login");
      return;
    }

    const cartProduct = {
      id: product.id,
      name: product.name,
      img: activeImg,
      price: product.price,
    };
    
    addToCart(cartProduct, quantity);
  };

  const handleDownloadGuide = (e) => {
    e.preventDefault();
    const pdfUrl = product.guidePdf || "/assets/guides/nightvision-user-manual.pdf";
    const fileName = `${product.name.toLowerCase().replace(/\s+/g, "-")}-guide.pdf`;

    if (pdfUrl.startsWith("data:")) {
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = fileName;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBuyNow = () => {
    if (!product) return;

    const userSession = localStorage.getItem("user");
    if (!userSession) {
      alert("Login required. Please log in to purchase products.");
      navigate("/login");
      return;
    }

    const cartProduct = {
      id: product.id,
      name: product.name,
      img: activeImg,
      price: product.price,
    };

    addToCart(cartProduct, quantity);
    navigate("/checkout");
  };

  if (loading) {
    return (
      <main className="product-detail-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ color: "#b5e75d", fontFamily: "'Space Mono', monospace", letterSpacing: 2 }}>
          CONNECTING DIGITAL UPLINK FOR DEVICE '{slug.toUpperCase()}'...
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="product-detail-page" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ textAlign: "center", background: "#181a15", border: "1px solid #ff6b6b", padding: 40, maxWidth: 500, borderRadius: 4 }}>
          <h1 style={{ color: "#ff6b6b", fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, marginBottom: 16 }}>
            SYSTEM NOT REGISTERED
          </h1>
          <p style={{ color: "#8d937f", fontSize: 14, lineHeight: 1.6, marginBottom: 24 }}>
            The requested device key '{slug}' was not found in the NightVision security database registry.
          </p>
          <Link to="/products" style={{
            background: "#b5e75d",
            color: "#111",
            textDecoration: "none",
            padding: "10px 20px",
            fontWeight: 700,
            display: "inline-block",
            fontFamily: "'Inter', sans-serif"
          }}>
            RETURN TO CATALOG
          </Link>
        </div>
      </main>
    );
  }

  const videoDetails = getEmbedVideoDetails(product?.videoUrl);
  const rawThumbs = Array.isArray(product?.thumbs) && product.thumbs.length > 0
    ? product.thumbs
    : product?.img ? [product.img] : [];

  const slides = [];

  if (videoDetails && product.videoIsFirst !== false) {
    slides.push({
      id: "video-slide",
      type: "video",
      videoDetails,
      thumb: videoDetails.thumbUrl || rawThumbs[0] || product?.img
    });
  }

  rawThumbs.forEach((imgUrl, i) => {
    slides.push({
      id: `img-${i}`,
      type: "image",
      url: imgUrl,
      thumb: imgUrl
    });
  });

  if (videoDetails && product.videoIsFirst === false) {
    slides.push({
      id: "video-slide",
      type: "video",
      videoDetails,
      thumb: videoDetails.thumbUrl || rawThumbs[0] || product?.img
    });
  }

  const currentSlide = slides[activeSlideIndex] || slides[0];

  return (
    <article className="product-detail-page" style={{ minHeight: "1200px" }}>
      <Helmet>
        <title>{product.name} | NIGHTVISION™ Security</title>
        <meta name="description" content={product.description || "Enterprise-grade surveillance CCTV system."} />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description || ""} />
        <meta property="og:type" content="product" />
      </Helmet>

      <div className="hud-scanline" style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 999 }} />

      <Breadcrumbs
        categoryName={product.category}
        productName={product.name}
      />

      <main>

        <div className="detail-grid">
          {/* Gallery Column */}
          <div className="gallery-col">
            <div
              className="main-img-box"
              style={currentSlide?.type === "video" ? { padding: 0, overflow: "hidden", background: "#000", aspectRatio: "16 / 9", height: "auto" } : {}}
            >
              {currentSlide?.type === "video" ? (
                currentSlide.videoDetails.type === "youtube" ? (
                  <iframe
                    src={currentSlide.videoDetails.embedUrl}
                    title={product.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    style={{ width: "100%", height: "100%", minHeight: "340px", border: "none", display: "block" }}
                  />
                ) : (
                  <video
                    src={currentSlide.videoDetails.embedUrl}
                    controls
                    autoPlay
                    style={{ width: "100%", height: "100%", minHeight: "340px", objectFit: "contain", display: "block" }}
                  />
                )
              ) : (
                <img src={currentSlide?.url || activeImg} alt={product.name} className="main-img" />
              )}

              {product.badge && (
                <span className="product-badge">
                  {product.badge}
                </span>
              )}
            </div>

            {slides.length > 1 && (
              <div className="thumbs-list">
                {slides.map((s, idx) => {
                  const isActive = activeSlideIndex === idx;
                  return (
                    <button
                      key={s.id || idx}
                      type="button"
                      onClick={() => setActiveSlideIndex(idx)}
                      className={`thumb-btn ${isActive ? "active" : ""}`}
                      style={{ position: "relative", overflow: "hidden" }}
                    >
                      <img src={s.thumb || product.img} alt="" className="thumb-img" />
                      {s.type === "video" && (
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background: "rgba(0,0,0,0.45)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          <div
                            style={{
                              width: 28,
                              height: 20,
                              background: "#ff0000",
                              borderRadius: 4,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              boxShadow: "0 2px 6px rgba(0,0,0,0.5)"
                            }}
                          >
                            <span style={{ color: "#fff", fontSize: 10, marginLeft: 2 }}>▶</span>
                          </div>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="details-col">
            <div>
              <h1 className="detail-title" style={{ marginTop: 0 }}>
                {product.name}
              </h1>
              <p className="detail-desc">
                {product.description}
              </p>
            </div>

            <div className="price-line">
              <span className="price-val">
                रू {product.price.toLocaleString("en-IN")}
              </span>
              <span className="status-label">
                [ STATUS: {product.status} ]
              </span>
            </div>



            <div className="actions-row" style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 24 }}>
              <div className="qty-selector" style={{ flexShrink: 0 }}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="qty-btn">-</button>
                <div className="qty-val">
                  {quantity}
                </div>
                <button onClick={() => setQuantity(q => q + 1)} className="qty-btn">+</button>
              </div>

              <button
                onClick={handleAddToCart}
                style={{
                  background: "transparent",
                  color: "#b5e75d",
                  border: "1px solid #b5e75d",
                  fontFamily: "'Space Grotesk', monospace",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  padding: "14px 24px",
                  cursor: "pointer",
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "all 0.2s"
                }}
              >
                <Icon name="shopping_cart" size={18} />
                ADD TO CART
              </button>

              <button onClick={handleBuyNow} className="deploy-btn" style={{ flex: 1 }}>
                <Icon name="chevron_right" size={18} />
                BUY NOW
              </button>
            </div>

            {/* HIGH-CONVERSION CATALOG & DATASHEET DOWNLOAD CTA */}
            <CatalogDownloadButton variant="pdp" product={product} />

            {isPurchased ? (
              <div style={{ marginTop: 16, marginBottom: 24 }}>
                <button
                  type="button"
                  onClick={handleDownloadGuide}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    background: "rgba(181, 231, 93, 0.1)",
                    border: "1px solid #b5e75d",
                    color: "#b5e75d",
                    padding: "14px 24px",
                    fontFamily: "'Space Grotesk', monospace",
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    width: "100%"
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#b5e75d";
                    e.currentTarget.style.color = "#111";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "rgba(181, 231, 93, 0.1)";
                    e.currentTarget.style.color = "#b5e75d";
                  }}
                >
                  <Icon name="download" size={18} />
                  DOWNLOAD PRODUCT GUIDE (PDF)
                </button>
              </div>
            ) : product.guidePdf && (
              <p style={{ marginTop: 8, marginBottom: 24, color: "#8d937f", fontSize: 12, fontFamily: "'Space Grotesk', monospace", letterSpacing: 1 }}>
                Product guide available after purchase.
              </p>
            )}

            {/* KEY FEATURES */}
            <div style={{ borderTop: "1px solid #434938", paddingTop: 24 }}>
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#b5e75d", fontSize: 13, fontWeight: 700, letterSpacing: 1, marginBottom: 16, textTransform: "uppercase" }}>
                KEY FEATURES
              </h4>
              {product.specs && (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
                  {product.specs.map((s, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Icon name={s.icon} size={18} style={{ color: "#b5e75d" }} />
                      <span style={{ color: "#fff", fontSize: 13, fontFamily: "'Space Grotesk', sans-serif" }}>{s.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabbed Section */}
        <div className="tab-section">
          <div className="tabs-header">
            {[
              { id: "specs", label: "TECHNICAL SPECS" },
              { id: "intel", label: "PRODUCT DETAILS" },
            ].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}>
                {tab.label}
              </button>
            ))}
          </div>

          <div className="tab-content">
            {activeTab === "specs" && product.specs && (
              <div className="specs-tab-grid">
                <div className="specs-left-column">
                  <div className="specs-icons-grid">
                    {product.specs.map((s, i) => (
                      <div key={i} className="spec-icon-box">
                        <Icon name={s.icon} size={28} style={{ color: "#b5e75d" }} />
                        <span className="spec-icon-label">{s.label}</span>
                      </div>
                    ))}
                  </div>

                  <div className="specs-overview-box">
                    <div className="specs-overview-title">OVERVIEW & HIGHLIGHTS</div>
                    <ul className="specs-overview-list">
                      <li>
                        <Icon name="check" size={14} style={{ color: "#b5e75d", flexShrink: 0 }} />
                        <span>Smart AI Human & Vehicle Motion Detection</span>
                      </li>
                      <li>
                        <Icon name="check" size={14} style={{ color: "#b5e75d", flexShrink: 0 }} />
                        <span>Ultra Low-Light Starlight Color Night Vision</span>
                      </li>
                      <li>
                        <Icon name="check" size={14} style={{ color: "#b5e75d", flexShrink: 0 }} />
                        <span>Two-Way Real-time Audio & Built-in Noise Cancellation</span>
                      </li>
                      <li>
                        <Icon name="check" size={14} style={{ color: "#b5e75d", flexShrink: 0 }} />
                        <span>Encrypted Cloud & MicroSD Local Storage Support</span>
                      </li>
                    </ul>
                    
                    <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid rgba(255, 255, 255, 0.08)" }}>
                      <CatalogDownloadButton variant="button" product={product} />
                    </div>
                  </div>
                </div>

                <div className="specs-table">
                  {product.specTable && product.specTable.map(([k, v]) => (
                    <div key={k} className="specs-table-row">
                      <span className="specs-table-key">{k}</span>
                      <span className="specs-table-val">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "intel" && (
              <div className="intel-content">
                {String(product.longDesc || product.description || "").trim().startsWith("<") ? (
                  <div
                    className="blog-html-block"
                    dangerouslySetInnerHTML={{ __html: product.longDesc || product.description }}
                  />
                ) : (
                  <p>{product.longDesc || product.description}</p>
                )}
                <p>NIGHTVISION™ products are designed for durability, ease of deployment, and high integration capability with custom security networks. Supported under global SLA agreements.</p>
              </div>
            )}
          </div>
        </div>

        {/* PRODUCT BODY TEXT SECTION — above related products */}
        <section className="product-body-section">
          {product.longDesc && (
            <div style={{ marginBottom: 32 }}>
              <div className="product-body-section__label">
                <span className="product-body-section__dot" />
                <span>ABOUT THIS PRODUCT</span>
              </div>
              <h3 className="product-body-section__title">
                {product.bodySectionTitle || `About ${product.name}`}
              </h3>
              {String(product.longDesc).trim().startsWith("<") ? (
                <div
                  className="blog-html-block product-body-section__text"
                  dangerouslySetInnerHTML={{ __html: product.longDesc }}
                />
              ) : (
                <p className="product-body-section__text">
                  {product.longDesc}
                </p>
              )}
            </div>
          )}

          {product.detailedInfo && (
            <div style={{ marginBottom: 32 }}>
              <div className="product-body-section__label">
                <span className="product-body-section__dot" />
                <span>DETAILED INFORMATION</span>
              </div>
              <div
                className="blog-html-block product-body-section__text"
                dangerouslySetInnerHTML={{ __html: product.detailedInfo }}
              />
            </div>
          )}

          {product.videoUrl && (() => {
            const idMatch = String(product.videoUrl).match(/(?:youtu\.be\/|v=|embed\/)([\w-]{6,})/);
            return idMatch ? (
              <div style={{ marginBottom: 32 }}>
                <div className="product-body-section__label">
                  <span className="product-body-section__dot" />
                  <span>PRODUCT VIDEO</span>
                </div>
                <div style={{ position: "relative", paddingTop: "56.25%", maxWidth: 720 }}>
                  <iframe
                    title={`${product.name} video`}
                    src={`https://www.youtube.com/embed/${idMatch[1]}`}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "1px solid rgba(181, 231, 93, 0.25)", borderRadius: 8 }}
                    allowFullScreen
                  />
                </div>
              </div>
            ) : null;
          })()}

          <div style={{ marginBottom: 32 }}>
            <div className="product-body-section__label">
              <span className="product-body-section__dot" />
              <span>ABOUT NIGHTVISION CAMERAS</span>
            </div>
            <h3 className="product-body-section__title">
              High-Performance Vigilance Engineering
            </h3>
            <p className="product-body-section__text">
              NightVision is Nepal's premier security surveillance brand, innovating the design, development, and production of high-quality Closed-Circuit Television (CCTV) cameras. Our products are forged with the highest standards of hardware and software integration, ensuring reliable remote streaming, zero downtime, and end-to-end data encryption.
            </p>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div className="product-body-section__label">
              <span className="product-body-section__dot" />
              <span>IMPORTANCE OF SECURITY CAMERAS</span>
            </div>
            <h3 className="product-body-section__title">
              Proactive Perimeter Defense & Peace of Mind
            </h3>
            <p className="product-body-section__text">
              In modern environments, security cameras are vital. They deter unauthorized access, document critical site operations, and provide immediate visual verification when anomalies occur. A robust camera network provides peace of mind, continuous protection, and absolute situational awareness.
            </p>
          </div>
        </section>

        {/* Related Section — above footer */}
        {relatedProducts.length > 0 && (
          <div className="related-section">
            <h3 className="related-title">
              {!siteContents.relatedProductsTitle || siteContents.relatedProductsTitle === "RELATED_SYSTEM_PROT"
                ? "Related Products"
                : siteContents.relatedProductsTitle}
            </h3>
            <div className="related-grid">
              {relatedProducts.map(p => (
                <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <div className="related-card">
                    <img src={p.img} alt={p.name} className="related-card-img" />
                    <div className="related-card-footer">
                      <span className="related-card-name">{p.name}</span>
                      <span className="related-card-price">रू {p.price.toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </article>
  );
}