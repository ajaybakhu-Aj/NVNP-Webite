import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { colors } from "../../data/constants";
import { useSiteContents, getAllBlogs } from "../../utils/cmsDb";

export default function HomeBlogSection() {
  const contents = useSiteContents();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    getAllBlogs().then((all) => {
      const featuredSlugs = contents.homeBlogFeaturedSlugs || [];
      let selected = [];

      if (featuredSlugs.length > 0) {
        selected = featuredSlugs
          .map((slug) => all.find((b) => b.slug === slug))
          .filter(Boolean)
          .slice(0, 3);
      }

      if (selected.length < 3) {
        const remaining = all
          .filter((b) => !selected.some((s) => s.id === b.id))
          .slice(0, 3 - selected.length);
        selected = [...selected, ...remaining];
      }

      setBlogs(selected.slice(0, 3));
    });
  }, [contents]);

  if (blogs.length === 0) return null;

  return (
    <section className="home-blog-section" style={{ background: colors.background }}>
      <div className="home-blog-section__inner">
        <div className="home-blog-section__header">
          <h2 className="home-blog-section__title">
            {contents.homeBlogTitle || "Our Blogs"}
          </h2>
          <p className="home-blog-section__subtitle">
            {contents.homeBlogSubtitle ||
              "Find out how Night Vision offers the best CCTV camera in Nepal and is transforming security in all sectors. From homes to organizations, see how trusted surveillance works in real life."}
          </p>
        </div>

        {contents.homeBlogBanner && (
          <div className="home-blog-section__banner">
            <img src={contents.homeBlogBanner} alt="NightVision blog highlight" />
          </div>
        )}

        <div className="home-blog-section__grid">
          {blogs.map((blog) => (
            <article key={blog.id} className="home-blog-section__card">
              <Link to={`/blog/${blog.slug}`} className="home-blog-section__card-img-wrap">
                <img src={blog.img} alt={blog.title} className="home-blog-section__card-img" />
              </Link>
              <div className="home-blog-section__card-body">
                <h3 className="home-blog-section__card-title">
                  <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                </h3>
                <Link to={`/blog/${blog.slug}`} className="home-blog-section__read-more">
                  {contents.homeBlogReadMoreText || "Read More"}
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="home-blog-section__actions">
          <Link to="/blog" className="home-blog-section__action-btn home-blog-section__action-btn--primary">
            {contents.homeBlogViewAllText || "View All Blogs"}
          </Link>
          <Link to="/events" className="home-blog-section__action-btn home-blog-section__action-btn--secondary">
            {contents.homeBlogEventsBtnText || "News & Events"}
          </Link>
        </div>
      </div>
    </section>
  );
}
