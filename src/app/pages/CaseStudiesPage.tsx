import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, BarChart2, TrendingUp, Target, Star } from "lucide-react";
import PageLayout from "../components/PageLayout";
import { useState } from "react";
import { useSEO } from "../hooks/useSEO";
import { CASE_STUDIES } from "../data/caseStudiesData";

export default function CaseStudiesPage() {
  useSEO({
    title: "Case Studies | FUERA",
    description: "Read detailed client case studies and growth metrics demonstrating how FUERA drives leads and scales businesses online.",
    path: "/case-studies"
  });

  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-24 bg-[#070709] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(255,255,255,0.03) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <button onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            <ArrowLeft size={16} /> Back to Home
          </button>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Proof of Work
            </p>
            <h1 className="text-white font-bold mb-5 leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Case Studies
            </h1>
            <p className="text-white/55 max-w-2xl text-base leading-relaxed">
              Deep dives into how FUERA's strategies have created real, measurable business growth for our clients across industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-[#0d0d0f]">
        <div className="max-w-5xl mx-auto px-5 md:px-10 space-y-6">
          {CASE_STUDIES.map((cs, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              className="border border-white/8 rounded-xl bg-[#111115] overflow-hidden hover:border-white/20 transition-all">
              {/* Header */}
              <button className="w-full flex items-center justify-between gap-4 p-6 text-left group"
                onClick={() => setExpanded(expanded === i ? null : i)}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: `${cs.color}22`, border: `1.5px solid ${cs.color}55` }}>
                    <BarChart2 size={18} style={{ color: cs.color }} />
                  </div>
                  <div>
                    <p className="text-white font-bold text-base" style={{ fontFamily: "'Poppins', sans-serif" }}>{cs.client}</p>
                    <p className="text-white/40 text-xs mt-0.5">{cs.industry} · {cs.service} · {cs.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  {cs.results.slice(0, 2).map(r => (
                    <span key={r.label} className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border border-white/10 text-white/70 bg-white/5">
                      <TrendingUp size={11} /> {r.val}
                    </span>
                  ))}
                  <span className="text-white/40 text-sm">{expanded === i ? "▲" : "▼"}</span>
                </div>
              </button>

              {/* Expanded */}
              {expanded === i && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                  className="px-6 pb-8 border-t border-white/8">
                  <div className="grid md:grid-cols-2 gap-8 mt-6">
                    <div className="space-y-5">
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-2">The Challenge</p>
                        <p className="text-white/65 text-sm leading-relaxed">{cs.challenge}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-2">Our Solution</p>
                        <p className="text-white/65 text-sm leading-relaxed">{cs.solution}</p>
                      </div>
                      {/* Quote */}
                      <div className="border-l-2 border-white/20 pl-4 mt-4">
                        <p className="text-white/50 text-sm italic leading-relaxed">"{cs.quote}"</p>
                        <p className="text-white/30 text-xs mt-2">— {cs.author}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-4">Key Results</p>
                      <div className="grid grid-cols-2 gap-3">
                        {cs.results.map(r => (
                          <div key={r.label} className="bg-[#0d0d0f] border border-white/8 rounded-lg p-4">
                            <div className="text-2xl font-black text-white mb-1" style={{ fontFamily: "'Poppins', sans-serif", color: cs.color }}>{r.val}</div>
                            <div className="text-xs text-white/40 uppercase tracking-wider">{r.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-1 mt-5">
                        {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="white" className="text-white" />)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="text-white font-bold mb-4" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
            Want results like these?
          </h2>
          <p className="text-white/60 mb-8">Let's build your case study together. Get in touch for a free strategy call.</p>
          <button onClick={() => navigate("/#contact")}
            className="inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-sm hover:bg-gray-100 transition-all hover:-translate-y-0.5"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            Book a Free Call <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </PageLayout>
  );
}
