import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import PageLayout from "../components/PageLayout";
import { useSEO } from "../hooks/useSEO";
import { BLOG_POSTS } from "../data/blogData";
import { useEffect } from "react";

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const post = BLOG_POSTS.find((p) => p.slug === slug);

  useSEO({
    title: post ? `${post.title} | FUERA Blog` : "Blog Not Found | FUERA",
    description: post?.summary || "Read the latest insights from FUERA.",
    path: `/blog/${slug}`
  });

  useEffect(() => {
    if (!post) {
      navigate("/blog", { replace: true });
    }
  }, [post, navigate]);

  if (!post) return null;

  return (
    <PageLayout>
      <article className="bg-[#070709] min-h-screen pb-20">
        {/* Cover Image & Header Info */}
        <div className="w-full h-[40vh] md:h-[55vh] relative">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-black/50 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full">
            <div className="max-w-4xl mx-auto px-5 md:px-10 pb-12">
              <button onClick={() => navigate("/blog")}
                className="flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
                style={{ fontFamily: "'Poppins', sans-serif" }}>
                <ArrowLeft size={16} /> Back to Blog
              </button>
              
              <div className="inline-block bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm mb-4">
                {post.category}
              </div>
              <h1 className="text-white font-bold mb-6 leading-tight"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.5rem)" }}>
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-white/70 font-medium">
                <span className="flex items-center gap-2"><User size={14} /> {post.author}</span>
                <span className="flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
                <span className="flex items-center gap-2"><Clock size={14} /> {post.readTime}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="max-w-3xl mx-auto px-5 md:px-10 mt-12">
          {/* We use dangerouslySetInnerHTML because the content includes HTML tags. */}
          <div 
            className="text-white/80 leading-relaxed text-lg [&>h2]:text-3xl [&>h2]:font-bold [&>h2]:mt-10 [&>h2]:mb-4 [&>h2]:text-white [&>h3]:text-2xl [&>h3]:font-bold [&>h3]:mt-8 [&>h3]:mb-3 [&>h3]:text-white [&>p]:mb-6 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul>li]:mb-2 [&>strong]:text-white [&>a]:text-blue-400 hover:[&>a]:underline"
            style={{ fontFamily: "'Inter', sans-serif" }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <hr className="border-white/10 my-16" />
          
          <div className="bg-[#111115] border border-white/10 p-8 rounded-xl text-center">
            <h3 className="text-white font-bold text-xl mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>Ready to grow your business?</h3>
            <p className="text-white/60 text-sm mb-6 max-w-md mx-auto">
              Contact FUERA today to see how our expertise can translate into real results for your brand.
            </p>
            <button onClick={() => navigate("/contact")}
              className="bg-white text-black px-6 py-3 font-semibold text-sm rounded-sm hover:bg-gray-200 transition-colors"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              Get in Touch
            </button>
          </div>
        </div>
      </article>
    </PageLayout>
  );
}
