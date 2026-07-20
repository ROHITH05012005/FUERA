import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router";
import {
  ArrowLeft, Search, X, Globe, Layers, Shield, MapPin,
  ExternalLink, Award, FileText
} from "lucide-react";
import PageLayout from "../components/PageLayout";
import { useSEO } from "../hooks/useSEO";
import { BLOG_POSTS } from "../data/blogData";
import { CASE_STUDIES } from "../data/caseStudiesData";

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

const SERVICES_DATA = [
  { name: "Website Development", path: "/services/website-development", desc: "High-performance, responsive custom websites with free lifetime hosting." },
  { name: "Social Media Marketing", path: "/services/social-media-marketing", desc: "Strategic content & community building across Instagram, Facebook & LinkedIn." },
  { name: "Performance Marketing", path: "/services/performance-marketing", desc: "Data-driven paid campaign architecture designed for measurable ROI." },
  { name: "Meta Ads", path: "/services/meta-ads", desc: "Facebook & Instagram ad funnels for low-cost lead generation." },
  { name: "Google Ads", path: "/services/google-ads", desc: "High-intent Search, Display & YouTube campaigns." },
  { name: "Google SEO", path: "/services/google-seo", desc: "On-page, off-page & Google Business Profile organic ranking optimization." },
  { name: "Branding", path: "/services/branding", desc: "Complete visual identity, logo design & brand positioning strategy." },
  { name: "Review Scanner", path: "/services/review-scanner", desc: "Active reputation management and review tracking platform." },
  { name: "Content Creation", path: "/services/content-creation", desc: "High-converting video reels, ad creatives, graphics & copy." },
];

const MAIN_PAGES = [
  { title: "Home", path: "/", desc: "FUERA official landing page, hero showcase, packages, and overview." },
  { title: "About Us", path: "/about", desc: "Learn about FUERA's mission, values, and digital agency background." },
  { title: "Leadership Team", path: "/leadership", desc: "Meet the founders and team driving growth at FUERA." },
  { title: "Careers", path: "/careers", desc: "Explore open roles and career opportunities at FUERA." },
  { title: "Contact Us", path: "/contact", desc: "Get in touch with our team for consultations and enquiries." },
];

const LEGAL_PAGES = [
  { title: "Privacy Policy", path: "/privacy", desc: "Information on data collection, user privacy, and security commitments." },
  { title: "Terms of Use", path: "/terms", desc: "Terms of service, client agreements, and usage guidelines." },
  { title: "HTML Sitemap", path: "/sitemap", desc: "Full visual navigational tree of all website pages and services." },
];

export default function SitemapPage() {
  useSEO({
    title: "Sitemap | FUERA - Full Navigation & Site Hierarchy",
    description: "Explore the full sitemap of FUERA. Easily find links to our digital services, client case studies, blog articles, careers, and company overview.",
    path: "/sitemap"
  });

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredServices = useMemo(() => {
    if (!searchTerm.trim()) return SERVICES_DATA;
    return SERVICES_DATA.filter(
      s => s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredMainPages = useMemo(() => {
    if (!searchTerm.trim()) return MAIN_PAGES;
    return MAIN_PAGES.filter(
      p => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredCaseStudies = useMemo(() => {
    if (!searchTerm.trim()) return CASE_STUDIES;
    return CASE_STUDIES.filter(
      c => c.client.toLowerCase().includes(searchTerm.toLowerCase()) || c.industry.toLowerCase().includes(searchTerm.toLowerCase()) || c.service.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredBlogPosts = useMemo(() => {
    if (!searchTerm.trim()) return BLOG_POSTS;
    return BLOG_POSTS.filter(
      b => b.title.toLowerCase().includes(searchTerm.toLowerCase()) || b.summary.toLowerCase().includes(searchTerm.toLowerCase()) || b.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const filteredLegal = useMemo(() => {
    if (!searchTerm.trim()) return LEGAL_PAGES;
    return LEGAL_PAGES.filter(
      l => l.title.toLowerCase().includes(searchTerm.toLowerCase()) || l.desc.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const totalResults = filteredServices.length + filteredMainPages.length + filteredCaseStudies.length + filteredBlogPosts.length + filteredLegal.length;

  return (
    <PageLayout>
      {/* Hero Header */}
      <section className="relative py-20 bg-[#070709] border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.04) 0%, transparent 70%)" }} />
        
        <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
          <button onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-6 transition-colors font-medium">
            <ArrowLeft size={16} /> Back to Home
          </button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-white/10 border border-white/15 text-white/90 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <MapPin size={12} /> Visual Index
              </span>
            </div>
            
            <h1 className="text-white font-bold mb-4 leading-tight" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}>
              FUERA Sitemap & Navigation Architecture
            </h1>
            
            <p className="text-white/60 max-w-2xl text-base leading-relaxed mb-8">
              Easily discover all pages, services, client case studies, blog insights, and technical endpoints available across our website.
            </p>

            {/* Search Input */}
            <div className="max-w-xl relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40">
                <Search size={18} />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search any page, service, or article..."
                className="w-full bg-[#111115] border border-white/20 text-white text-sm rounded-lg pl-11 pr-10 py-3.5 focus:outline-none focus:border-white/50 transition-colors shadow-inner"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")} className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-white/40 hover:text-white">
                  <X size={18} />
                </button>
              )}
            </div>

            {searchTerm && (
              <p className="text-xs text-white/50 mt-3 font-medium">
                Found {totalResults} result{totalResults !== 1 ? "s" : ""} matching &ldquo;{searchTerm}&rdquo;
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* Main Sitemap Grid */}
      <section className="py-16 bg-[#0d0d0f]">
        <div className="max-w-7xl mx-auto px-5 md:px-10 space-y-16">
          
          {/* Section 1: Main Pages */}
          {filteredMainPages.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-3">
                <Globe className="text-white/80" size={22} />
                <h2 className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Main Website Pages
                </h2>
                <span className="ml-auto text-xs text-white/40 font-mono bg-white/5 px-2.5 py-1 rounded-sm">
                  {filteredMainPages.length} pages
                </span>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredMainPages.map(page => (
                  <motion.div key={page.path}
                    whileHover={{ y: -3 }}
                    onClick={() => navigate(page.path)}
                    className="bg-[#121216] border border-white/10 rounded-lg p-5 hover:border-white/30 transition-all cursor-pointer group shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white group-hover:text-white/90 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          {page.title}
                        </h3>
                        <ExternalLink size={14} className="text-white/30 group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed mb-4">{page.desc}</p>
                    </div>
                    <span className="text-[11px] font-mono text-white/40 bg-black/40 px-2.5 py-1 rounded w-fit border border-white/5">
                      {page.path}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Digital Services */}
          {filteredServices.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-3">
                <Layers className="text-white/80" size={22} />
                <h2 className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Digital Solutions & Services
                </h2>
                <span className="ml-auto text-xs text-white/40 font-mono bg-white/5 px-2.5 py-1 rounded-sm">
                  {filteredServices.length} services
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredServices.map(service => (
                  <motion.div key={service.path}
                    whileHover={{ y: -3 }}
                    onClick={() => navigate(service.path)}
                    className="bg-[#121216] border border-white/10 rounded-lg p-5 hover:border-white/30 transition-all cursor-pointer group shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white group-hover:text-white/90 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          {service.name}
                        </h3>
                        <ExternalLink size={14} className="text-white/30 group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed mb-4">{service.desc}</p>
                    </div>
                    <span className="text-[11px] font-mono text-white/40 bg-black/40 px-2.5 py-1 rounded w-fit border border-white/5">
                      {service.path}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Case Studies & Portfolio */}
          {filteredCaseStudies.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-3">
                <Award className="text-white/80" size={22} />
                <h2 className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Case Studies & Client Portfolios
                </h2>
                <span className="ml-auto text-xs text-white/40 font-mono bg-white/5 px-2.5 py-1 rounded-sm">
                  /case-studies & {filteredCaseStudies.length} clients
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                <motion.div whileHover={{ y: -3 }} onClick={() => navigate("/case-studies")}
                  className="bg-[#14141a] border border-white/20 rounded-lg p-5 hover:border-white/40 transition-all cursor-pointer group shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        All Case Studies Index Page
                      </h3>
                      <ExternalLink size={14} className="text-white/40 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed mb-4">Complete directory of client growth results, metrics, and strategy breakdowns.</p>
                  </div>
                  <span className="text-[11px] font-mono text-white/60 bg-black/60 px-2.5 py-1 rounded w-fit border border-white/10">
                    /case-studies
                  </span>
                </motion.div>

                <motion.div whileHover={{ y: -3 }} onClick={() => navigate("/clients")}
                  className="bg-[#14141a] border border-white/20 rounded-lg p-5 hover:border-white/40 transition-all cursor-pointer group shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Clients & Partners Directory
                      </h3>
                      <ExternalLink size={14} className="text-white/40 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed mb-4">List of brands, SaaS startups, and enterprise partners working with FUERA.</p>
                  </div>
                  <span className="text-[11px] font-mono text-white/60 bg-black/60 px-2.5 py-1 rounded w-fit border border-white/10">
                    /clients
                  </span>
                </motion.div>

                {filteredCaseStudies.map(item => (
                  <motion.div key={item.client} whileHover={{ y: -3 }} onClick={() => navigate("/case-studies")}
                    className="bg-[#121216] border border-white/10 rounded-lg p-5 hover:border-white/30 transition-all cursor-pointer group shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-white text-sm" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          {item.client}
                        </h3>
                        <span className="text-[10px] text-white/50 bg-white/5 px-2 py-0.5 rounded font-medium">{item.industry}</span>
                      </div>
                      <p className="text-xs text-white/40 leading-relaxed mb-3">{item.service}</p>
                    </div>
                    <span className="text-[11px] font-mono text-white/40 bg-black/40 px-2.5 py-1 rounded w-fit border border-white/5">
                      /case-studies#{slugify(item.client)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Blog Articles */}
          {filteredBlogPosts.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-3">
                <FileText className="text-white/80" size={22} />
                <h2 className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Blog Articles & Insights
                </h2>
                <span className="ml-auto text-xs text-white/40 font-mono bg-white/5 px-2.5 py-1 rounded-sm">
                  /blog & {filteredBlogPosts.length} articles
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                <motion.div whileHover={{ y: -3 }} onClick={() => navigate("/blog")}
                  className="bg-[#14141a] border border-white/20 rounded-lg p-5 hover:border-white/40 transition-all cursor-pointer group shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Blog Index Page
                      </h3>
                      <ExternalLink size={14} className="text-white/40 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed mb-4">Latest thoughts, guides, SEO tips, and performance marketing articles.</p>
                  </div>
                  <span className="text-[11px] font-mono text-white/60 bg-black/60 px-2.5 py-1 rounded w-fit border border-white/10">
                    /blog
                  </span>
                </motion.div>

                {filteredBlogPosts.map(post => (
                  <motion.div key={post.slug} whileHover={{ y: -3 }} onClick={() => navigate(`/blog/${post.slug}`)}
                    className="bg-[#121216] border border-white/10 rounded-lg p-5 hover:border-white/30 transition-all cursor-pointer group shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white text-sm line-clamp-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          {post.title}
                        </h3>
                        <ExternalLink size={14} className="text-white/30 group-hover:text-white transition-colors shrink-0 ml-2" />
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed mb-4 line-clamp-2">{post.summary}</p>
                    </div>
                    <span className="text-[11px] font-mono text-white/40 bg-black/40 px-2.5 py-1 rounded w-fit border border-white/5 truncate max-w-full">
                      /blog/{post.slug}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Section 5: Legal & Technical Endpoints */}
          {filteredLegal.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-3">
                <Shield className="text-white/80" size={22} />
                <h2 className="text-xl font-bold text-white tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Legal & Technical Endpoints
                </h2>
                <span className="ml-auto text-xs text-white/40 font-mono bg-white/5 px-2.5 py-1 rounded-sm">
                  {filteredLegal.length + 2} resources
                </span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredLegal.map(item => (
                  <motion.div key={item.path} whileHover={{ y: -3 }} onClick={() => navigate(item.path)}
                    className="bg-[#121216] border border-white/10 rounded-lg p-5 hover:border-white/30 transition-all cursor-pointer group shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-white group-hover:text-white/90 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                          {item.title}
                        </h3>
                        <ExternalLink size={14} className="text-white/30 group-hover:text-white transition-colors" />
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed mb-4">{item.desc}</p>
                    </div>
                    <span className="text-[11px] font-mono text-white/40 bg-black/40 px-2.5 py-1 rounded w-fit border border-white/5">
                      {item.path}
                    </span>
                  </motion.div>
                ))}

                {/* XML Sitemap link */}
                <a href="/sitemap.xml" target="_blank" rel="noreferrer"
                  className="bg-[#121216] border border-white/10 rounded-lg p-5 hover:border-white/30 transition-all group shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white group-hover:text-white/90 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        XML Sitemap File
                      </h3>
                      <ExternalLink size={14} className="text-white/30 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed mb-4">Search engine crawler manifest formatted in standard XML protocol.</p>
                  </div>
                  <span className="text-[11px] font-mono text-green-400/80 bg-black/40 px-2.5 py-1 rounded w-fit border border-white/5">
                    /sitemap.xml
                  </span>
                </a>

                {/* Robots.txt link */}
                <a href="/robots.txt" target="_blank" rel="noreferrer"
                  className="bg-[#121216] border border-white/10 rounded-lg p-5 hover:border-white/30 transition-all group shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-white group-hover:text-white/90 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Robots.txt File
                      </h3>
                      <ExternalLink size={14} className="text-white/30 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-xs text-white/50 leading-relaxed mb-4">Web crawler instructions and index permissions file.</p>
                  </div>
                  <span className="text-[11px] font-mono text-green-400/80 bg-black/40 px-2.5 py-1 rounded w-fit border border-white/5">
                    /robots.txt
                  </span>
                </a>
              </div>
            </div>
          )}

          {totalResults === 0 && (
            <div className="text-center py-16 bg-[#111115] border border-white/10 rounded-xl">
              <Search size={40} className="mx-auto text-white/20 mb-3" />
              <h3 className="text-lg font-semibold text-white mb-1">No pages found</h3>
              <p className="text-xs text-white/50 mb-4">No navigation targets matched &ldquo;{searchTerm}&rdquo;</p>
              <button onClick={() => setSearchTerm("")} className="px-4 py-2 bg-white/10 text-white text-xs rounded hover:bg-white/20 transition-colors font-medium">
                Clear Search Filter
              </button>
            </div>
          )}

        </div>
      </section>
    </PageLayout>
  );
}
