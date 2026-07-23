import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, ArrowRight } from "lucide-react";
import { getAllBlogs } from "../../../utils/cmsDb";
import { useBlogTaxonomy } from "../../../utils/blogTaxonomy";
import PageHeroBanner from "../../../components/ui/PageHeroBanner";
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
      <PageHeroBanner
        title="SURVEILLANCE INTEL & BLOGS"
        subtitle="Insights, engineering breakdowns, AI surveillance trends, and security deployment guides from NightVision experts."
      />

      <main className="max-w-[1280px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 w-full box-border">
        {/* FILTER & SEARCH BAR */}
        <section className="flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4 mb-8 sm:mb-10 pb-6 border-b border-[#434938] w-full box-border">
          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 sm:px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors rounded shrink-0 whitespace-nowrap cursor-pointer ${
                  category === cat
                    ? "bg-[#94da32] text-[#111111]"
                    : "bg-[#1e2117] text-[#c3c9b3] hover:bg-[#282b21] border border-[#434938]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-[280px] shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8d937f]" size={18} />
            <input
              type="text"
              placeholder="Search intel & articles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#1e2117] border border-[#434938] text-sm text-[#e2e4d5] placeholder-[#8d937f] focus:outline-none focus:border-[#94da32] rounded box-border"
            />
          </div>
        </section>

        {loading ? (
          <div className="text-center py-20 text-[#94da32] font-mono">LOADING ARTICLES...</div>
        ) : (
          <>
            {/* FEATURED ARTICLE */}
            {featured && (
              <section className="mb-8 sm:mb-12 w-full box-border">
                <Link to={`/blog/${featured.slug || featured.id}`} className="no-underline group block w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-12 bg-[#1e2117] border border-[#434938] group-hover:border-[#94da32] transition-all rounded overflow-hidden w-full box-border">
                    <div className="lg:col-span-7 relative min-h-[220px] sm:min-h-[300px] md:min-h-[360px]">
                      <img
                        src={featured.img}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 bg-[#94da32] text-[#111111] px-3 py-1 text-xs font-bold uppercase tracking-widest rounded shadow-sm">
                        FEATURED INTEL
                      </span>
                    </div>

                    <div className="lg:col-span-5 p-5 sm:p-8 flex flex-col justify-center w-full box-border">
                      <div className="text-xs text-[#94da32] font-mono mb-2 uppercase tracking-wider">
                        {featured.date} — BY {featured.author}
                      </div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-['Space_Grotesk'] text-white group-hover:text-[#94da32] mb-3 sm:mb-4 transition-colors leading-tight">
                        {featured.title}
                      </h2>
                      <p className="text-[#c3c9b3] text-xs sm:text-sm leading-relaxed mb-5 sm:mb-6 line-clamp-3">
                        {featured.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-[#94da32] font-bold text-xs uppercase tracking-widest">
                        <span>READ FULL INTEL</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              </section>
            )}

            {/* ARTICLES GRID */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 w-full box-border">
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