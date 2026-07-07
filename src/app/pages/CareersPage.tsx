import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, MapPin, Clock, Zap, Users, Palette, Code, Share2, Search, BarChart2, Target, Megaphone, ScanSearch, FileText } from "lucide-react";
import PageLayout from "../components/PageLayout";
import { useState } from "react";

const OPEN_ROLES = [
  {
    title: "Digital Marketing Executive",
    dept: "Marketing",
    type: "Full-time",
    location: "Bangalore (Hybrid)",
    icon: Target,
    color: "hsl(210, 70%, 55%)",
    desc: "Drive client campaign performance across Google Ads, Meta Ads, and SEO. You'll be the hands-on executor of growth strategies.",
    requirements: [
      "1–3 years experience in digital marketing",
      "Hands-on with Google Ads and Meta Business Suite",
      "Basic understanding of SEO and analytics",
      "Strong communication skills",
      "Data-driven mindset",
    ],
    perks: ["Competitive CTC", "Performance bonuses", "Learning budget", "Flexible hours"],
  },
  {
    title: "Social Media & Content Creator",
    dept: "Content",
    type: "Full-time",
    location: "Bangalore (On-site)",
    icon: Share2,
    color: "hsl(270, 60%, 60%)",
    desc: "Create scroll-stopping reels, carousels, and graphics for FUERA's clients. You'll shape brand voices across Instagram, LinkedIn, and Facebook.",
    requirements: [
      "Strong visual storytelling skills",
      "Proficiency in Reels creation and editing",
      "Experience with Canva / Adobe tools",
      "Understanding of social media trends",
      "Portfolio of past content work",
    ],
    perks: ["Creative freedom", "Brand collaborations", "Equipment support", "Monthly performance bonus"],
  },
  {
    title: "Web Developer (Frontend)",
    dept: "Technology",
    type: "Full-time",
    location: "Bangalore (Hybrid)",
    icon: Code,
    color: "hsl(150, 60%, 45%)",
    desc: "Build premium, high-performance websites for FUERA clients. You'll work with React/Next.js and Tailwind to create stunning, fast-loading sites.",
    requirements: [
      "Strong HTML, CSS, JavaScript skills",
      "Experience with React or Next.js",
      "Responsive and mobile-first design",
      "Knowledge of Vite and modern tooling",
      "Eye for design detail",
    ],
    perks: ["Latest tech stack", "Client-facing projects", "Learning allowance", "WFH flexibility"],
  },
  {
    title: "SEO Specialist",
    dept: "Marketing",
    type: "Full-time",
    location: "Bangalore (Hybrid)",
    icon: Search,
    color: "hsl(30, 80%, 55%)",
    desc: "Own the SEO strategy for multiple client accounts — from technical audits to link building and Google Business Profile optimisation.",
    requirements: [
      "2+ years of SEO experience",
      "Proficiency in SEMrush / Ahrefs / Search Console",
      "Technical SEO knowledge",
      "Content strategy experience",
      "Proven track record of ranking improvements",
    ],
    perks: ["Tool subscriptions provided", "Certification budget", "Performance-linked bonuses", "Remote-friendly"],
  },
  {
    title: "Graphic Designer",
    dept: "Design",
    type: "Freelance / Part-time",
    location: "Remote",
    icon: Palette,
    color: "hsl(0, 70%, 60%)",
    desc: "Design brand identities, ad creatives, and social media assets for a diverse range of client industries. You'll define the look and feel of growing brands.",
    requirements: [
      "Strong portfolio of brand / UI work",
      "Proficiency in Figma and Adobe Illustrator",
      "Experience with ad creative design",
      "Understanding of visual hierarchy and colour",
      "Fast turnaround ability",
    ],
    perks: ["Flexible schedule", "Per-project pay", "Remote work", "Long-term retainer opportunity"],
  },
  {
    title: "Performance Marketing Analyst",
    dept: "Marketing",
    type: "Full-time",
    location: "Bangalore (On-site)",
    icon: BarChart2,
    color: "hsl(190, 65%, 50%)",
    desc: "Analyse campaign data, generate insights, and optimise ad spend across Google and Meta for maximum ROI across our client portfolio.",
    requirements: [
      "Analytical mindset with Excel / Sheets proficiency",
      "Understanding of funnel metrics and attribution",
      "Experience with campaign dashboards",
      "Ability to generate clear performance reports",
      "Curiosity and hunger to improve results",
    ],
    perks: ["Data tools provided", "Steep learning curve", "Career progression path", "Team incentives"],
  },
];

const VALUES = [
  { icon: Zap, title: "Move Fast", desc: "We are a lean, agile team. We make decisions quickly and iterate constantly based on what the data tells us." },
  { icon: Users, title: "People First", desc: "Our team's well-being drives our output. We invest in your growth, celebrate your wins, and support your development." },
  { icon: Target, title: "Results Obsessed", desc: "We measure everything. If it can't be tracked and improved, we question whether we should be doing it at all." },
  { icon: Palette, title: "Creative Excellence", desc: "We care deeply about the quality of our work. Every campaign, website, and piece of content should be something we're proud of." },
];

export default function CareersPage() {
  const navigate = useNavigate();
  const [applied, setApplied] = useState<string | null>(null);

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-24 bg-[#070709] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 70% 30%, rgba(255,255,255,0.03) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <button onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            <ArrowLeft size={16} /> Back to Home
          </button>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Join Our Team
            </p>
            <h1 className="text-white font-bold mb-5 leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Careers at FUERA
            </h1>
            <p className="text-white/55 max-w-2xl text-base leading-relaxed">
              We're a forward-thinking team that values creativity, data, and impact. If you're hungry to grow, love building things that matter, and thrive in fast-paced environments — you'll fit right in.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-[#111115]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-12">
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>How We Work</p>
            <h2 className="text-white font-bold" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>Our Values</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="border border-white/8 rounded-xl bg-[#0d0d0f] p-6 hover:border-white/20 transition-all">
                <div className="w-11 h-11 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  <v.icon size={20} className="text-white/70" />
                </div>
                <h3 className="text-white font-semibold mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>{v.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Roles */}
      <section className="py-20 bg-[#0d0d0f]">
        <div className="max-w-5xl mx-auto px-5 md:px-10">
          <div className="text-center mb-12">
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>We're Hiring</p>
            <h2 className="text-white font-bold" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>Open Positions</h2>
          </div>
          <div className="space-y-4">
            {OPEN_ROLES.map((role, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="border border-white/8 rounded-xl bg-[#111115] overflow-hidden hover:border-white/20 transition-all">
                {/* Role header */}
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: `${role.color}22`, border: `1.5px solid ${role.color}44` }}>
                        <role.icon size={18} style={{ color: role.color }} />
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-base" style={{ fontFamily: "'Poppins', sans-serif" }}>{role.title}</h3>
                        <div className="flex flex-wrap items-center gap-3 mt-1.5">
                          <span className="flex items-center gap-1 text-white/40 text-xs"><Clock size={11} /> {role.type}</span>
                          <span className="flex items-center gap-1 text-white/40 text-xs"><MapPin size={11} /> {role.location}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-white/50 border border-white/8">{role.dept}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setApplied(applied === role.title ? null : role.title)}
                      className={`shrink-0 px-5 py-2.5 text-sm font-semibold rounded-sm transition-all ${applied === role.title ? "bg-green-600 text-white" : "bg-white text-black hover:bg-gray-100"}`}
                      style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {applied === role.title ? "✓ Applied!" : "Apply Now"}
                    </button>
                  </div>

                  <p className="text-white/55 text-sm leading-relaxed mt-4">{role.desc}</p>

                  <div className="grid sm:grid-cols-2 gap-6 mt-5">
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-widest font-bold mb-3">Requirements</p>
                      <ul className="space-y-1.5">
                        {role.requirements.map((r, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-white/55">
                            <span className="text-white/30 mt-0.5 shrink-0">›</span> {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-white/30 text-xs uppercase tracking-widest font-bold mb-3">Perks</p>
                      <ul className="space-y-1.5">
                        {role.perks.map((p, j) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-white/55">
                            <span className="text-green-500 mt-0.5 shrink-0">✓</span> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {applied === role.title && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      className="mt-5 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-green-400 text-sm font-medium">
                        Thank you for your interest! Please send your CV to{" "}
                        <a href="mailto:fuera.solutions.23@gmail.com" className="underline">fuera.solutions.23@gmail.com</a>{" "}
                        with subject: <strong>{role.title} – Application</strong>
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#111111]">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="text-white font-bold mb-4" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
            Don't see a role that fits?
          </h2>
          <p className="text-white/60 mb-8">Send us your portfolio or CV anyway. We're always looking for exceptional talent.</p>
          <a href="mailto:fuera.solutions.23@gmail.com?subject=Open Application – FUERA"
            className="inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-sm hover:bg-gray-100 transition-all hover:-translate-y-0.5"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            Send Open Application <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </PageLayout>
  );
}
