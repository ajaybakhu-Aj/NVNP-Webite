import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { getAllBlogs } from "../../../utils/cmsDb";
import { useBlogTaxonomy } from "../../../utils/blogTaxonomy";
import BlogCard from "../../../components/blog/BlogCard";
import PageHeroBanner from "../../../components/ui/PageHeroBanner";

const POSTS_PER_PAGE = 12;

export default function BlogPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("cat") || "All");
  const [currentPage, setCurrentPage] = useState(1);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const taxonomy = useBlogTaxonomy();

  useEffect(() => {
    getAllBlogs().then((data) => {
      setArticles(data || []);
      setLoading(false);
    });
  }, []);

  // Reset pagination when filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [category, search]);

  const categories = ["All", ...taxonomy.categories.map((c) => c.name)];

  const filteredArticles = articles.filter((art) => {
    const matchCat = category === "All" || art.category === category;
    const matchSearch =
      !search ||
      art.title.toLowerCase().includes(search.toLowerCase()) ||
      art.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      (art.tag && art.tag.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featured = filteredArticles.find((a) => a.featured) || filteredArticles[0];
  const gridArticles = featured
    ? filteredArticles.filter((a) => a.id !== featured.id)
    : filteredArticles;

  // Pagination Logic
  const totalPages = Math.max(1, Math.ceil(gridArticles.length / POSTS_PER_PAGE));
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedArticles = gridArticles.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  return (
    <div
      className="blog-directory-page blog-page blog-page-container page-wrapper"
      style={{
        width: "100%",
        maxWidth: "100%",
        margin: 0,
        padding: 0,
        background: "#0a0a0a",
        minHeight: "100vh",
        boxSizing: "border-box",
      }}
    >
      {/* 1. FULL-BLEED GREEN HERO BANNER */}
      <PageHeroBanner
        title="SURVEILLANCE INTEL & BLOGS"
        subtitle="Insights, engineering breakdowns, AI surveillance trends, and security deployment guides from NightVision experts."
      >
        <span
          className="badge-intel"
          style={{
            display: "inline-block",
            padding: "4px 12px",
            background: "rgba(124, 252, 0, 0.1)",
            border: "1px solid #7CFC00",
            color: "#7CFC00",
            fontSize: "0.75rem",
            fontFamily: "monospace",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            borderRadius: "9999px",
            marginBottom: "12px",
          }}
        >
          NIGHTVISION INTELLIGENCE HUB
        </span>
      </PageHeroBanner>

      {/* MAIN CONTENT AREA */}
      <main className="blog-hero-inner articles-grid-container" style={{ padding: "40px 0 80px 0" }}>
        {/* 2. FILTER & SEARCH BAR */}
        <section
          className="filter-search-row"
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
            marginBottom: "40px",
            paddingBottom: "24px",
            borderBottom: "1px solid rgba(124, 252, 0, 0.15)",
            width: "100%",
          }}
        >
          {/* Category Tabs */}
          <div
            className="category-tabs"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              alignItems: "center",
            }}
          >
            {categories.map((cat) => {
              const isActive = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  style={{
                    padding: "8px 18px",
                    fontSize: "0.78rem",
                    fontWeight: 800,
                    fontFamily: "'Space Grotesk', sans-serif",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    borderRadius: "9999px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    border: isActive
                      ? "1px solid #7CFC00"
                      : "1px solid rgba(255, 255, 255, 0.12)",
                    background: isActive
                      ? "#7CFC00"
                      : "rgba(20, 20, 20, 0.7)",
                    color: isActive ? "#000000" : "#c3c9b3",
                    boxShadow: isActive
                      ? "0 0 16px rgba(124, 252, 0, 0.3)"
                      : "none",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div
            className="blog-search-wrapper"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "320px",
            }}
          >
            <Search
              size={18}
              style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#7CFC00",
                pointerEvents: "none",
              }}
            />
            <input
              type="text"
              placeholder="SEARCH INTEL & ARTICLES..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                background: "#0d0d0d",
                border: "1px solid rgba(124, 252, 0, 0.25)",
                color: "#ffffff",
                borderRadius: "9999px",
                padding: "10px 16px 10px 42px",
                fontSize: "0.85rem",
                fontFamily: "'Space Grotesk', sans-serif",
                outline: "none",
                boxSizing: "border-box",
                transition: "all 0.2s ease",
              }}
            />
          </div>
        </section>

        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "80px 0",
              color: "#7CFC00",
              fontFamily: "monospace",
              fontSize: "0.9rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            LOADING SECURE CHANNELS...
          </div>
        ) : (
          <>
            {/* 3. FEATURED ARTICLE */}
            {featured && currentPage === 1 && (
              <section className="featured-article-section" style={{ marginBottom: "48px", width: "100%" }}>
                <Link
                  to={`/blog/${featured.slug || featured.id}`}
                  style={{ textDecoration: "none", display: "block", width: "100%" }}
                  className="featured-card-link"
                >
                  <div
                    className="featured-card-container"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      background: "rgba(20, 20, 20, 0.6)",
                      border: "1px solid rgba(124, 252, 0, 0.2)",
                      borderRadius: "12px",
                      overflow: "hidden",
                      width: "100%",
                      boxSizing: "border-box",
                      transition: "all 0.3s ease",
                      minHeight: "380px",
                    }}
                  >
                    {/* IMAGE COLUMN */}
                    <div
                      className="featured-image-col"
                      style={{
                        flex: "0 0 50%",
                        position: "relative",
                        overflow: "hidden",
                        minHeight: "320px",
                      }}
                    >
                      <img
                        src={featured.img}
                        alt={featured.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          transition: "transform 0.5s ease",
                        }}
                        className="featured-img"
                      />
                      <span
                        style={{
                          position: "absolute",
                          top: "16px",
                          left: "16px",
                          background: "#7CFC00",
                          color: "#000000",
                          padding: "6px 14px",
                          fontSize: "0.72rem",
                          fontWeight: 800,
                          fontFamily: "'Space Grotesk', sans-serif",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          borderRadius: "9999px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
                          zIndex: 2,
                        }}
                      >
                        FEATURED INTEL
                      </span>
                    </div>

                    {/* CONTENT COLUMN */}
                    <div
                      className="featured-content-col"
                      style={{
                        flex: "0 0 50%",
                        padding: "36px 40px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        boxSizing: "border-box",
                      }}
                    >
                      <div
                        style={{
                          color: "#7CFC00",
                          fontSize: "0.75rem",
                          fontFamily: "monospace",
                          fontWeight: 700,
                          marginBottom: "12px",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        {featured.date} — BY {featured.author}
                      </div>

                      <h2
                        className="featured-title"
                        style={{
                          fontSize: "1.75rem",
                          fontWeight: 800,
                          fontFamily: "'Space Grotesk', sans-serif",
                          color: "#ffffff",
                          lineHeight: 1.3,
                          marginBottom: "16px",
                          transition: "color 0.2s ease",
                        }}
                      >
                        {featured.title}
                      </h2>

                      <p
                        style={{
                          color: "#cccccc",
                          fontSize: "0.9rem",
                          lineHeight: 1.6,
                          marginBottom: "24px",
                          fontFamily: "'Poppins', sans-serif",
                          display: "-webkit-box",
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {featured.excerpt}
                      </p>

                      <div
                        className="btn-read-featured"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          padding: "10px 22px",
                          background: "#7CFC00",
                          color: "#000000",
                          fontWeight: 800,
                          fontSize: "0.8rem",
                          fontFamily: "'Space Grotesk', sans-serif",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                          borderRadius: "9999px",
                          width: "fit-content",
                          transition: "all 0.2s ease",
                        }}
                      >
                        <span>READ FULL INTEL</span>
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* 4. ARTICLES GRID (12 ARTICLES PER PAGE) */}
            <section
              className="blog-articles-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "28px",
                marginTop: "40px",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              {paginatedArticles.map((art) => (
                <BlogCard key={art.id} article={art} />
              ))}
            </section>

            {/* 5. NUMBERED PAGINATION BAR (1, 2, 3, 4 ... NEXT) */}
            {totalPages > 1 && (
              <div
                className="pagination-container"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "56px",
                  marginBottom: "40px",
                  width: "100%",
                }}
              >
                {/* PREV BUTTON */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  style={{
                    padding: "0 16px",
                    height: "42px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(124, 252, 0, 0.3)",
                    color: currentPage === 1 ? "rgba(255, 255, 255, 0.3)" : "#7CFC00",
                    fontWeight: 700,
                    borderRadius: "6px",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.85rem",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    transition: "all 0.2s ease",
                    opacity: currentPage === 1 ? 0.5 : 1,
                  }}
                >
                  <ChevronLeft size={16} />
                  <span>PREV</span>
                </button>

                {/* NUMBERED BUTTONS */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isCurrent = pageNum === currentPage;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      style={{
                        width: "42px",
                        height: "42px",
                        background: isCurrent ? "#7CFC00" : "#141414",
                        color: isCurrent ? "#000000" : "#ffffff",
                        border: isCurrent
                          ? "1px solid #7CFC00"
                          : "1px solid rgba(255, 255, 255, 0.15)",
                        borderRadius: "6px",
                        fontWeight: isCurrent ? 800 : 700,
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* NEXT BUTTON */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: "0 16px",
                    height: "42px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(124, 252, 0, 0.3)",
                    color: currentPage === totalPages ? "rgba(255, 255, 255, 0.3)" : "#7CFC00",
                    fontWeight: 700,
                    borderRadius: "6px",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.85rem",
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    transition: "all 0.2s ease",
                    opacity: currentPage === totalPages ? 0.5 : 1,
                  }}
                >
                  <span>NEXT</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <style>{`
        /* Remove artificial container width restrictions & align to 5% logo guide line */
        .blog-hero-inner,
        .articles-grid-container {
          max-width: 1400px !important;
          width: 100% !important;
          margin-left: auto !important;
          margin-right: auto !important;
          padding-left: 5% !important;
          padding-right: 5% !important;
          box-sizing: border-box !important;
        }

        /* Search input placeholder */
        .blog-search-wrapper input::placeholder {
          color: rgba(255, 255, 255, 0.45) !important;
        }

        /* Featured Card Hover Effects */
        .featured-card-link:hover .featured-card-container {
          border-color: rgba(124, 252, 0, 0.6) !important;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(124, 252, 0, 0.15) !important;
          transform: translateY(-2px);
        }

        .featured-card-link:hover .featured-img {
          transform: scale(1.04) !important;
        }

        .featured-card-link:hover .featured-title {
          color: #7CFC00 !important;
        }

        /* Responsive Layouts */
        @media screen and (max-width: 1024px) {
          .featured-card-container {
            flex-direction: column !important;
          }
          .featured-image-col,
          .featured-content-col {
            flex: 0 0 100% !important;
            width: 100% !important;
          }
          .featured-content-col {
            padding: 24px !important;
          }
          .blog-articles-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media screen and (max-width: 640px) {
          .filter-search-row {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .blog-search-wrapper {
            max-width: 100% !important;
          }
          .blog-articles-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}