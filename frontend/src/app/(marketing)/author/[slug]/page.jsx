import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { authors } from "../../../../data/blogData";
import { getAllBlogs } from "../../../../utils/cmsDb";

const C = {
  bg: "var(--nv-bg, #11140c)",
  surface: "var(--nv-surface, #11140c)",
  surfCont: "var(--nv-surfCont, #1e2117)",
  surfHi: "var(--nv-surfHi, #282b21)",
  surfHighest: "var(--nv-surfHighest, #33362c)",
  surfLow: "var(--nv-surfLow, #0c0f07)",
  onSurf: "var(--nv-onSurf, #e2e4d5)",
  onSurfVar: "var(--nv-onSurfVar, #c3c9b3)",
  primary: "var(--nv-primary, #deffa4)",
  onPrimary: "var(--nv-onPrimary, #233600)",
  secondary: "var(--nv-secondary, #94da32)",
  outline: "var(--nv-outline, #8d937f)",
  outlineVar: "var(--nv-outlineVar, #434938)",
  sg: "'Space Grotesk', sans-serif",
  pp: "'Poppins', sans-serif",
};


const IconArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);

const IconArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

function AuthorArticleCard({ article }) {
  const [hovered, setHovered] = useState(false);
  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.surfCont,
        border: `1px solid ${hovered ? C.primary : "transparent"}`,
        display: "flex",
        flexDirection: "column",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        transition: "all 0.3s ease",
        position: "relative",
        cursor: "pointer",
        height: "100%"
      }}
    >

      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden" }}>
        <img
          src={article.img}
          alt={article.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.5s ease",
            filter: hovered ? "grayscale(0%)" : "grayscale(100%)",
          }}
          loading="lazy"
        />
        <div style={{
          position: "absolute", top: 12, left: 12,
          background: C.primary, color: C.onPrimary,
          padding: "3px 10px",
          fontSize: 11, fontWeight: 600, letterSpacing: "1.5px",
          textTransform: "uppercase", fontFamily: C.pp,
        }}>{article.tag}</div>
      </div>

      {/* Body */}
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", flexGrow: 1 }}>
        <div style={{
          fontSize: 11, fontWeight: 600, letterSpacing: "1px", textTransform: "uppercase",
          color: C.onSurfVar, opacity: 0.65, marginBottom: 12, fontFamily: C.pp,
        }}>
          {article.date}
        </div>

        <h3 style={{
          fontFamily: C.pp,
          fontSize: 17,
          fontWeight: 600,
          lineHeight: 1.4,
          color: hovered ? C.primary : C.onSurf,
          marginBottom: 12,
          transition: "color 0.2s",
        }}>{article.title}</h3>

        <p style={{
          fontSize: 13,
          lineHeight: "20px",
          color: C.onSurfVar,
          marginBottom: 20,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          fontFamily: C.pp,
        }}>{article.excerpt}</p>

        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: hovered ? 12 : 6, transition: "gap 0.3s" }}>
          <span style={{
            fontSize: 11, fontWeight: 600, letterSpacing: "2px",
            textTransform: "uppercase", color: C.secondary, fontFamily: C.pp,
          }}>Read Full Article</span>
          <span style={{ color: C.secondary, display: "flex" }}><IconArrowRight /></span>
        </div>
      </div>
    </article>
  );
}

export default function AuthorPage() {
  const { slug } = useParams();
  const [authorArticles, setAuthorArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // Find author profile details from slug
  const authorData = authors[slug] || {
    name: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
    role: "NIGHTVISION™ Contributor",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&h=400&q=80",
    bio: "Technical contributor and security engineering team member at NIGHTVISION™ operations.",
    skills: ["Surveillance Security", "Hardware Systems", "Edge AI Controls"],
    stats: {
      deployments: "30+",
      publications: "2",
      experience: "5 Years"
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllBlogs().then((all) => {
      const filtered = all.filter(
        (art) => art.author.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") === slug
      );
      setAuthorArticles(filtered);
      setLoading(false);
    });
  }, [slug]);

  return (
    <div style={{ background: C.bg, color: C.onSurf, fontFamily: C.pp, minHeight: "100vh", overflowX: "hidden" }}>
      {/* SCANLINE OVERLAY */}
      <div className="scanline-overlay"></div>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 24px 80px" }}>
        
        {/* Back Link */}
        <Link to="/blog" className="event-detail-back-btn" style={{ marginBottom: 32, display: "inline-flex" }}>
          <IconArrowLeft />
          <span>Back to Blogs</span>
        </Link>

        {/* Profile Header Card */}
        <section style={{
          background: C.surfCont,
          border: `1px solid ${C.outlineVar}`,
          padding: "clamp(24px, 4vw, 48px)",
          position: "relative",
          marginBottom: 64,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)"
        }}>

          <div style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 40,
            alignItems: "flex-start"
          }}>
            {/* Avatar image */}
            <div style={{
              position: "relative",
              flexShrink: 0,
              width: 160,
              height: 160,
              margin: "0 auto"
            }}>
              <img
                src={authorData.avatar}
                alt={authorData.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  border: `2px solid ${C.primary}`,
                  boxShadow: `0 0 15px rgba(222, 255, 164, 0.2)`
                }}
              />
              <div style={{
                position: "absolute",
                bottom: -8,
                left: "50%",
                transform: "translateX(-50%)",
                background: C.primary,
                color: C.onPrimary,
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "1px",
                padding: "2px 8px",
                textTransform: "uppercase",
                whiteSpace: "nowrap"
              }}>
                CERTIFIED
              </div>
            </div>

            {/* Profile Meta Details */}
            <div style={{ flex: "1 1 450px" }}>
              <div style={{
                fontSize: 11,
                fontWeight: 600,
                color: C.primary,
                letterSpacing: "2px",
                textTransform: "uppercase",
                fontFamily: C.sg,
                marginBottom: 6
              }}>
                NIGHTVISION AUTHOR PROFILE
              </div>
              
              <h1 style={{
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 700,
                color: C.onSurf,
                fontFamily: C.sg,
                marginBottom: 8,
                letterSpacing: "-0.5px"
              }}>
                {authorData.name}
              </h1>

              <div style={{
                fontSize: 14,
                fontWeight: 500,
                color: C.onSurfVar,
                opacity: 0.8,
                marginBottom: 20
              }}>
                {authorData.role}
              </div>

              <p style={{
                fontSize: 14,
                lineHeight: "24px",
                color: C.onSurfVar,
                marginBottom: 24,
                fontFamily: C.pp
              }}>
                {authorData.bio}
              </p>

              {/* Skill Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                {authorData.skills.map((skill, index) => (
                  <span
                    key={index}
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      color: C.onSurf,
                      background: C.surfHi,
                      border: `1px solid ${C.outlineVar}`,
                      padding: "4px 10px",
                      letterSpacing: "0.5px",
                      fontFamily: C.pp
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Stats dashboard */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
                gap: 16,
                borderTop: `1px solid ${C.outlineVar}`,
                paddingTop: 24
              }}>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: C.onSurfVar, opacity: 0.6, textTransform: "uppercase", letterSpacing: "1px" }}>Experience</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: C.primary, fontFamily: C.sg, marginTop: 4 }}>{authorData.stats.experience}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: C.onSurfVar, opacity: 0.6, textTransform: "uppercase", letterSpacing: "1px" }}>Deployments</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: C.primary, fontFamily: C.sg, marginTop: 4 }}>{authorData.stats.deployments}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: C.onSurfVar, opacity: 0.6, textTransform: "uppercase", letterSpacing: "1px" }}>Publications</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: C.primary, fontFamily: C.sg, marginTop: 4 }}>{authorData.stats.publications}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* List of articles */}
        <section>
          <h2 style={{
            fontSize: 20,
            fontWeight: 700,
            fontFamily: C.sg,
            letterSpacing: "1px",
            textTransform: "uppercase",
            marginBottom: 32,
            color: C.onSurf,
            display: "flex",
            alignItems: "center",
            gap: 12
          }}>
            <span style={{ width: 8, height: 8, background: C.secondary, display: "inline-block" }} />
            Articles Published by {authorData.name} ({authorArticles.length})
          </h2>

          {loading ? (
            <div style={{
              background: C.surfCont,
              border: `1px solid ${C.outlineVar}`,
              padding: "48px 24px",
              textAlign: "center"
            }}>
              <p style={{ color: C.secondary, fontSize: 15, fontFamily: C.pp }}>DECRYPTING AUTHOR LOG ARCHIVE FEED...</p>
            </div>
          ) : authorArticles.length > 0 ? (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: 24
            }}>
              {authorArticles.map((article) => (
                <Link key={article.id} to={`/blog/${article.slug}`} style={{ textDecoration: "none" }}>
                  <AuthorArticleCard article={article} />
                </Link>
              ))}
            </div>
          ) : (
            <div style={{
              background: C.surfCont,
              border: `1px solid ${C.outlineVar}`,
              padding: "48px 24px",
              textAlign: "center"
            }}>
              <p style={{ color: C.onSurfVar, fontSize: 15, fontFamily: C.pp }}>No articles found for this author in database feeds.</p>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
