import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, Calendar, Clock, ChevronRight } from "lucide-react";
import PageLayout from "../components/PageLayout";
import { useSEO } from "../hooks/useSEO";
import { BLOG_POSTS } from "../data/blogData";

export default function BlogListPage() {
  useSEO({
    title: "Blog | FUERA",
    description: "Read the latest insights, strategies, and tips on digital marketing, web development, and SEO from the experts at FUERA.",
    path: "/blog"
  });

  const navigate = useNavigate();

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-24 bg-[#070709] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <button onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            <ArrowLeft size={16} /> Back to Home
          </button>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Our Thoughts
            </p>
            <h1 className="text-white font-bold mb-5 leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              The FUERA Blog
            </h1>
            <p className="text-white/55 max-w-2xl text-base leading-relaxed">
              Insights, strategies, and industry news to help your business stay ahead in the digital world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-[#0d0d0f]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post, i) => (
              <motion.div key={post.id}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-[#111115] border border-white/10 rounded-xl overflow-hidden hover:border-white/30 transition-all flex flex-col group cursor-pointer shadow-lg hover:shadow-2xl"
                onClick={() => navigate(`/blog/${post.slug}`)}>
                
                {/* Image */}
                <div className="h-48 overflow-hidden relative">
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/20 text-white/90 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm z-10">
                    {post.category}
                  </div>
                  <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                
                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-4 text-xs text-white/40 mb-3 font-medium">
                    <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
                  </div>
                  <h2 className="text-white font-bold text-xl mb-3 group-hover:text-[#c0c0c0] transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {post.title}
                  </h2>
                  <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1">
                    {post.summary}
                  </p>
                  
                  <div className="flex items-center gap-2 text-sm font-semibold text-white mt-auto group-hover:gap-3 transition-all" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Read Article <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
