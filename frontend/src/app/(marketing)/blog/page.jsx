import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { getAllBlogs } from "../../../utils/cmsDb";
import { useBlogTaxonomy } from "../../../utils/blogTaxonomy";
import BlogCard from "../../../components/blog/BlogCard";

export default function BlogPage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(searchParams.get("cat") || "All");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const taxonomy = useBlogTaxonomy();

  useEffect(() => {
    getAllBlogs().then((data) => {
      setArticles(data || []);
      setLoading(false);
    });
  }, []);

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

  return (
    <div className="bg-[var(--nv-bg,#11140c)] text-[var(--nv-onSurf,#e2e4d5)] min-h-screen w-full overflow-hidden">
      {/* HIGH IMPACT HERO BANNER */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#181a15] to-[#11140c] border-b border-[#434938] w-full flex justify-center items-center">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 w-full text-center sm:text-left box-border">
          <span className="inline-block px-3 py-1 bg-[#94da32]/10 border border-[#94da32] text-[#94da32] text-xs font-mono font-bold uppercase tracking-widest rounded-full mb-4">
            NIGHTVISION INTELLIGENCE HUB
          </span>
          <h1 className="font-['Space_Grotesk'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#e2e4d5] tracking-tight uppercase leading-tight">
            SURVEILLANCE INTEL & BLOGS
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-[#c3c9b3] max-w-[750px] leading-relaxed mt-3">
            Insights, engineering breakdowns, AI surveillance trends, and security deployment guides from NightVision experts.
          </p>
        </div>
      </section>

      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-12 py-8 sm:py-12 w-full box-border">
        {/* FILTER & SEARCH BAR */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 sm:mb-12 pb-6 border-b border-[#434938] w-full box-border">
          {/* Category Tabs */}
          <div className="inline-flex flex-wrap gap-2 p-1.5 bg-[#181a15] border border-[#434938] rounded-full max-w-full overflow-x-auto scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 sm:px-5 py-2 text-xs font-extrabold uppercase tracking-wider transition-all rounded-full shrink-0 cursor-pointer ${
                  category === cat
                    ? "bg-[#94da32] text-[#111111] shadow-md shadow-[rgba(148,218,50,0.3)]"
                    : "bg-transparent text-[#c3c9b3] hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-[320px] shrink-0">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8d937f]" size={18} />
            <input
              type="text"
              placeholder="Search intel & articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-[#181a15] border border-[#434938] text-sm text-[#e2e4d5] placeholder-[#8d937f] focus:outline-none focus:border-[#94da32] rounded-full box-border transition-all"
            />
          </div>
        </section>

        {loading ? (
          <div className="flex justify-center py-20 text-[#94da32] font-mono text-sm tracking-widest uppercase">
            LOADING SECURE CHANNELS...
          </div>
        ) : (
          <>
            {/* FEATURED ARTICLE */}
            {featured && (
              <section className="mb-10 sm:mb-14 w-full box-border">
                <Link to={`/blog/${featured.slug || featured.id}`} className="no-underline group block w-full">
                  <div className="flex flex-col lg:flex-row bg-[#1e2117] border border-[#434938] group-hover:border-[#94da32] transition-all duration-300 rounded-xl overflow-hidden w-full box-border shadow-xl shadow-black/40">
                    {/* IMAGE COLUMN */}
                    <div className="w-full lg:w-3/5 relative min-h-[240px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[440px] overflow-hidden shrink-0">
                      <img
                        src={featured.img}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <span className="absolute top-4 left-4 bg-[#94da32] text-[#111111] px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-widest rounded-full shadow-md z-10">
                        FEATURED INTEL
                      </span>
                    </div>

                    {/* CONTENT COLUMN */}
                    <div className="w-full lg:w-2/5 p-6 sm:p-8 lg:p-10 flex flex-col justify-center box-border">
                      <div className="text-xs text-[#94da32] font-mono font-bold mb-3 uppercase tracking-wider">
                        {featured.date} — BY {featured.author}
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-['Space_Grotesk'] text-white group-hover:text-[#deffa4] mb-4 transition-colors leading-tight">
                        {featured.title}
                      </h2>
                      <p className="text-[#c3c9b3] text-xs sm:text-sm md:text-base leading-relaxed mb-6 line-clamp-4">
                        {featured.excerpt}
                      </p>
                      <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#94da32] text-[#111111] font-bold text-xs uppercase tracking-widest rounded-full w-fit group-hover:bg-[#a3eb3f] transition-all">
                        <span>READ FULL INTEL</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* ARTICLES GRID */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 w-full box-border">
              {gridArticles.map((art) => (
                <BlogCard key={art.id} article={art} />
              ))}
            </section>
          </>
        )}
      </main>
    </div>
  );
}