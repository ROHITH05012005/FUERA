import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, Users, TrendingUp, Globe } from "lucide-react";
import PageLayout from "../components/PageLayout";
import { useState } from "react";
import { useSEO } from "../hooks/useSEO";

const CLIENTS = [
  { name: "Namma Sihii Mane", sub: "E-Commerce", industry: "Retail / Sweets", result: "Digital storefront", desc: "A modern digital storefront and e-commerce presence for a local sweets brand to expand their customer base.", logo: "/logos/sihii.png", url: "https://nammasihiisweets.netlify.app/" },
  { name: "Sri Raghavendra Vaibhava", sub: "F&B Brand", industry: "Food & Beverage", result: "Local traffic driver", desc: "A complete brand website and digital presence designed specifically to drive local restaurant traffic and online orders.", logo: "/logos/raghavendra.png", url: "https://sriraghavendravaibhava.vercel.app" },
  { name: "Emmaus Academy", sub: "Enterprise Software", industry: "EdTech", result: "Custom institutional management", desc: "A custom-built Enterprise Resource Planning system designed to streamline academy operations and administration.", logo: "/logos/emmaus.png", url: "https://emmaus-erp-fuera.onrender.com/" },
  { name: "Pulse Intelligence", sub: "B2B SaaS", industry: "Machine Learning", result: "Advanced intelligence", desc: "A modern artificial intelligence tool built to deliver advanced insights and data intelligence for modern businesses.", logo: "/logos/pulse.png", url: "https://pulse-ai-engine.onrender.com/" },
  { name: "FinGuard Solutions", sub: "Risk Management", industry: "FinTech", result: "Comprehensive monitoring", desc: "Developed a comprehensive dashboard and monitoring system for analyzing financial risk and securing high-stakes data.", logo: "/logos/finguard.png", url: "https://finguard-fuera.vercel.app/" },
  { name: "Nexus Telecom", sub: "Data Science", industry: "Telecommunications", result: "Predictive ML models", desc: "A data science and machine learning model built to analyze customer data trends and predict telecom user churn.", logo: "/logos/nexus.png", url: "https://nexus-telecom-fuera.onrender.com/" },
  { name: "OutboundFlow", sub: "Marketing Tech", industry: "SaaS", result: "High-converting outbound", desc: "An automated marketing tool designed to generate high-converting outbound email campaigns and drive sales.", logo: "/logos/outboundflow.png", url: "https://outboundflow-fuera.vercel.app/" },
  { name: "CoinWave", sub: "Crypto Dashboard", industry: "Web3 / Finance", result: "Live market data", desc: "A real-time cryptocurrency tracking dashboard featuring live market data, interactive charts, and a glassmorphic UI.", logo: "/logos/coinwave.jpg", url: "https://coinwave-fuera.vercel.app/" },
  { name: "Zenith Tasks", sub: "Productivity App", industry: "SaaS", result: "Local persistence", desc: "A premium, minimalist daily task and habit tracker featuring interactive progress bars, micro-animations, and local storage.", logo: "/logos/zenith.jpg", url: "https://zenith-tasks-fuera.vercel.app/" },
  { name: "Aira Conversational AI", sub: "Conversational AI", industry: "Customer Support AI", result: "Automated user support", desc: "An advanced enterprise chatbot built to automate customer support inquiries and provide intelligent conversational experiences.", logo: "/logos/aira.png", url: "https://aira-ai-fuera.streamlit.app/" },
];

const STATS = [
  { icon: Users, val: "50+", label: "Happy Clients" },
  { icon: TrendingUp, val: "3×", label: "Average Lead Growth" },
  { icon: Globe, val: "12+", label: "Cities Reached" },
];

export default function ClientsPage() {
  useSEO({
    title: "Clients & Badges | FUERA",
    description: "See the businesses and brands that partner with FUERA for web development, paid ads, SEO, and social media growth.",
    path: "/clients"
  });

  const navigate = useNavigate();
  const [active, setActive] = useState<number | null>(null);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-24 bg-[#070709] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 60% 0%, rgba(255,255,255,0.04) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <button onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            <ArrowLeft size={16} /> Back to Home
          </button>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Our Most Successful
            </p>
            <h1 className="text-white font-bold mb-5 leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Collaborations & Clients
            </h1>
            <p className="text-white/55 max-w-2xl text-base leading-relaxed">
              We've partnered with 50+ businesses across industries — from startups to established brands — driving measurable digital growth with every engagement.
            </p>
          </motion.div>

          {/* Stats */}
          <div className="flex flex-wrap gap-10 mt-12">
            {STATS.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i + 0.3 }}
                className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                  <s.icon size={20} className="text-white/60" />
                </div>
                <div>
                  <div className="text-3xl font-black text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>{s.val}</div>
                  <div className="text-xs text-white/40 uppercase tracking-widest">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Grid */}
      <section className="py-20 bg-[#0d0d0f]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CLIENTS.map((c, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.08 }}
                onClick={() => setActive(active === i ? null : i)}
                className="group cursor-pointer border border-white/8 rounded-xl bg-[#111115] hover:border-white/25 hover:bg-[#161619] transition-all duration-300 p-6">
                {/* Monogram or Logo */}
                {(c as any).logo ? (
                  <img
                    src={(c as any).logo}
                    alt={`${c.name} logo`}
                    className="w-14 h-14 rounded-full mb-4 transition-transform duration-300 group-hover:scale-110 shrink-0 object-cover border border-white/10 shadow-lg bg-[#111115]"
                  />
                ) : (
                  <div className="w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 shrink-0"
                    style={{
                      background: `hsl(${(i * 43 + 12) % 360}, 38%, 16%)`,
                      border: `1.5px solid hsl(${(i * 43 + 12) % 360}, 42%, 28%)`,
                      boxShadow: `0 0 16px hsl(${(i * 43 + 12) % 360}, 50%, 18%)`,
                    }}>
                    <span className="text-base font-bold" style={{ fontFamily: "'Poppins', sans-serif", color: `hsl(${(i * 43 + 12) % 360}, 60%, 72%)` }}>
                      {c.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                )}
                <p className="text-white font-semibold text-sm mb-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>{c.name}</p>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-3">{c.sub}</p>
                <div className="text-xs font-semibold text-white/60 bg-white/5 border border-white/8 rounded-full px-3 py-1 inline-block mb-3">
                  📈 {c.result}
                </div>
                {active === i && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                    <p className="text-white/50 text-xs leading-relaxed mt-2 mb-3">
                      {c.desc}
                    </p>
                    <a href={(c as any).url} target="_blank" rel="noopener noreferrer" 
                       onClick={(e) => e.stopPropagation()}
                       className="inline-flex items-center gap-1.5 text-[10px] font-medium px-3 py-1.5 bg-white text-black hover:bg-white/90 rounded-sm transition-colors">
                      Visit Website <ArrowRight size={10} />
                    </a>
                  </motion.div>
                )}
                <p className="text-white/30 text-[10px] mt-2 group-hover:text-white/50 transition-colors">
                  {active === i ? "Click to collapse ↑" : "Click to read more ↓"}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="text-white font-bold mb-4" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
            Ready to be our next success story?
          </h2>
          <p className="text-white/60 mb-8">Join 50+ businesses that trust FUERA to grow their brand online.</p>
          <button onClick={() => navigate("/#contact")}
            className="inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-sm hover:bg-gray-100 transition-all hover:-translate-y-0.5"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            Get Started <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </PageLayout>
  );
}
