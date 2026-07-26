import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function BlogCard({ article }) {
  const [hovered, setHovered] = useState(false);

  const authorSlug = article.author
    ? article.author.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    : "editorial-team";

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#121212",
        border: hovered
          ? "1px solid #7CFC00"
          : "1px solid rgba(124, 252, 0, 0.15)",
        borderRadius: "10px",
        overflow: "hidden",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 10px 24px rgba(124, 252, 0, 0.12)" : "none",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        boxSizing: "border-box",
      }}
      className="blog-card-item"
    >
      <Link
        to={`/blog/${article.slug || article.id}`}
        style={{
          textDecoration: "none",
          display: "block",
          position: "relative",
          width: "100%",
          height: "200px",
          overflow: "hidden",
        }}
      >
        <img
          src={article.img}
          alt={article.title}
          style={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.5s ease, filter 0.3s ease",
            transform: hovered ? "scale(1.05)" : "scale(1)",
            filter: hovered ? "none" : "grayscale(30%)",
          }}
          loading="lazy"
        />
        {article.category && (
          <span
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              background: "#7CFC00",
              color: "#000000",
              padding: "4px 10px",
              fontSize: "0.65rem",
              fontWeight: 800,
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              borderRadius: "4px",
              zIndex: 10,
              boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
            }}
          >
            {article.category}
          </span>
        )}
      </Link>

      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1,
          boxSizing: "border-box",
        }}
      >
        <div>
          {article.tag && (
            <div style={{ marginBottom: "8px" }}>
              <span
                style={{
                  background: "#1a1a1a",
                  color: "#c3c9b3",
                  border: "1px solid rgba(124, 252, 0, 0.2)",
                  padding: "2px 8px",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  borderRadius: "4px",
                  display: "inline-block",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {article.tag}
              </span>
            </div>
          )}

          <div
            style={{
              fontSize: "0.72rem",
              fontFamily: "monospace",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "#7CFC00",
              marginBottom: "8px",
            }}
          >
            {article.date} — BY{" "}
            <Link
              to={`/author/${authorSlug}`}
              style={{
                color: "#7CFC00",
                fontWeight: 700,
                textDecoration: "underline",
              }}
            >
              {article.author}
            </Link>
          </div>

          <Link to={`/blog/${article.slug || article.id}`} style={{ textDecoration: "none" }}>
            <h3
              style={{
                fontSize: "1.05rem",
                fontWeight: 800,
                fontFamily: "'Space Grotesk', sans-serif",
                lineHeight: 1.35,
                marginBottom: "10px",
                color: hovered ? "#7CFC00" : "#ffffff",
                transition: "color 0.2s ease",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
            >
              {article.title}
            </h3>
          </Link>

          <p
            style={{
              fontSize: "0.82rem",
              lineHeight: 1.55,
              color: "#aaaaaa",
              marginBottom: "16px",
              fontFamily: "'Poppins', sans-serif",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {article.excerpt}
          </p>
        </div>

        <Link
          to={`/blog/${article.slug || article.id}`}
          style={{
            marginTop: "auto",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            color: "#7CFC00",
            fontWeight: 800,
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textDecoration: "none",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          <span>READ FULL INTEL</span>
          <ArrowRight
            size={14}
            style={{
              transform: hovered ? "translateX(4px)" : "none",
              transition: "transform 0.2s ease",
            }}
          />
        </Link>
      </div>
    </div>
  );
}
