import { useState } from "react";

const COLORS = {
  bg: "#131313",
  surface: "#1e1e1e",
  surfaceHigh: "#2a2a2a",
  surfaceLow: "#181818",
  surfaceLowest: "#0e0e0e",
  lime: "#94da32",
  limeLight: "#b5e75d",
  limeDark: "#75b800",
  limeDeep: "#284300",
  outline: "#434938",
  outlineMid: "#8d937f",
  onSurface: "#e5e2e1",
  onSurfaceVar: "#c3c9b3",
};

const globalStyles = `
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    overflow-x: hidden;
  }

  .product-card {
    transition: 0.3s;
  }

  .product-card:hover {
    border-color: #94da32 !important;
    box-shadow: 0 0 18px rgba(148,218,50,0.18);
  }

  .card-img {
    transition: transform 0.5s ease;
  }

  .product-card:hover .card-img {
    transform: scale(1.05);
  }

  .deploy-btn {
    transition: 0.3s;
  }

  .deploy-btn:hover {
    background: #284300 !important;
    color: #94da32 !important;
  }

  @media (max-width: 1100px) {
    .products-layout {
      grid-template-columns: 1fr !important;
    }

    .products-grid {
      grid-template-columns: repeat(2,1fr) !important;
    }
  }

  @media (max-width: 768px) {
    .products-grid {
      grid-template-columns: 1fr !important;
    }

    .hero-section {
      padding: 48px 20px !important;
    }

    .main-section {
      padding: 40px 20px !important;
    }
  }

  @media (max-width: 480px) {
    .hero-title {
      font-size: 42px !important;
      letter-spacing: 1px !important;
    }
  }
`;

const products = [
  {
    id: 1,
    name: "Y1-RATRI",
    img: "https://nightvision.com.np/wp-content/uploads/2025/04/Ratri-G11-CCTV-Camera-600x600.jpg",
    price: "NPR 4,500",
    category: "WI-FI ENABLED",
  },
  {
    id: 2,
    name: "T5P-RATRI",
    img: "https://nightvision.com.np/wp-content/uploads/2024/04/T5P-Ratri-Bullet-Outdoor-Wi-Fi-CCTV-Camera-1-600x600.jpg",
    price: "NPR 6,200",
    category: "OUTDOOR TACTICAL",
  },
  {
    id: 3,
    name: "RATRI G11",
    img: "https://nightvision.com.np/wp-content/uploads/2025/04/CCTV-Netra-S8-Camera-1-600x600.jpg",
    price: "NPR 5,800",
    category: "OUTDOOR TACTICAL",
  },
  {
    id: 4,
    name: "NETRA V6Z",
    img: "https://nightvision.com.np/wp-content/uploads/2025/04/CCTV-Netra-V6Z-Camera-600x600.jpg",
    price: "NPR 12,500",
    category: "INDOOR SURVEILLANCE",
  },
];

const categories = [
  "ALL SYSTEMS",
  "INDOOR SURVEILLANCE",
  "OUTDOOR TACTICAL",
  "WI-FI ENABLED",
];

function ProductCard({ p }) {
  return (
    <div
      className="product-card"
      style={{
        background: COLORS.surface,
        border: `1px solid ${COLORS.outline}`,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          aspectRatio: "1/1",
          overflow: "hidden",
          background: COLORS.surfaceHigh,
        }}
      >
        <img
          className="card-img"
          src={p.img}
          alt={p.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>

      <div
        style={{
          padding: 16,
          display: "flex",
          flexDirection: "column",
          gap: 12,
          flexGrow: 1,
        }}
      >
        <h3
          style={{
            color: COLORS.lime,
            fontSize: 20,
            fontWeight: 700,
          }}
        >
          {p.name}
        </h3>

        <span
          style={{
            color: COLORS.onSurfaceVar,
            fontSize: 14,
          }}
        >
          {p.category}
        </span>

        <div
          style={{
            marginTop: "auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              color: COLORS.lime,
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            {p.price}
          </span>

          <button
            className="deploy-btn"
            style={{
              background: COLORS.lime,
              color: COLORS.bg,
              border: "none",
              padding: "10px 18px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default function NightVision() {
  const [selectedCategory, setSelectedCategory] =
    useState("ALL SYSTEMS");

  const filteredProducts =
    selectedCategory === "ALL SYSTEMS"
      ? products
      : products.filter(
          (p) => p.category === selectedCategory
        );

  return (
    <>
      <style>{globalStyles}</style>

      <div
        style={{
          background: COLORS.bg,
          minHeight: "100vh",
          color: COLORS.onSurface,
          width: "100%",
          overflowX: "hidden",
        }}
      >
        {/* HERO */}
        <section
          className="hero-section"
          style={{
            background: COLORS.limeDark,
            padding: "56px 24px",
            borderBottom: `1px solid ${COLORS.lime}`,
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
            }}
          >
            <h1
              className="hero-title"
              style={{
                fontSize: "clamp(52px,8vw,88px)",
                color: COLORS.limeDeep,
                lineHeight: 1,
                marginBottom: 16,
                fontWeight: 700,
              }}
            >
              OUR PRODUCTS
            </h1>

            <p
              style={{
                maxWidth: 600,
                lineHeight: 1.7,
                color: COLORS.limeDeep,
              }}
            >
              Advanced surveillance architecture engineered
              for uncompromising vigilance.
            </p>
          </div>
        </section>

        {/* PRODUCTS */}
        <section
          className="main-section products-layout"
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "48px 24px",
            display: "grid",
            gridTemplateColumns: "220px 1fr",
            gap: 40,
          }}
        >
          {/* SIDEBAR */}
          <aside
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: "12px 16px",
                  border:
                    selectedCategory === cat
                      ? `1px solid ${COLORS.lime}`
                      : `1px solid ${COLORS.outline}`,
                  background:
                    selectedCategory === cat
                      ? COLORS.lime
                      : "transparent",
                  color:
                    selectedCategory === cat
                      ? COLORS.bg
                      : COLORS.onSurface,
                  cursor: "pointer",
                  textAlign: "left",
                  fontWeight: 700,
                }}
              >
                {cat}
              </button>
            ))}
          </aside>

          {/* GRID */}
          <div
            className="products-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 24,
            }}
          >
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}