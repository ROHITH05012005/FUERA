import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, Users, TrendingUp, Globe } from "lucide-react";
import PageLayout from "../components/PageLayout";
import { useState } from "react";

const CLIENTS = [
  { name: "RetailX", sub: "E-Commerce", industry: "Retail", result: "3× lead increase in 60 days", desc: "FUERA designed and deployed a complete e-commerce strategy with Meta Ads and Google SEO, tripling qualified inbound leads within 2 months." },
  { name: "HealthPro", sub: "Clinics", industry: "Healthcare", result: "2× patient enquiries", desc: "A mobile-first clinic website with WhatsApp integration and Google Ads campaign resulted in doubling monthly patient bookings." },
  { name: "EduTech Ltd", sub: "Education", industry: "EdTech", result: "200% organic traffic growth", desc: "Strategic SEO and social media management helped EduTech double organic traffic and grow Instagram engagement by over 180%." },
  { name: "FinServe", sub: "Finance", industry: "FinTech", result: "40% lower cost per lead", desc: "Performance marketing campaigns on Google and Meta were optimised to cut the cost per lead by 40% while maintaining lead quality." },
  { name: "FoodChain", sub: "F&B Brand", industry: "Food & Beverage", result: "5× Instagram followers", desc: "Content creation and influencer strategy grew the brand's Instagram from 2K to 10K followers with consistent daily engagement." },
  { name: "LegalEdge", sub: "Law Firm", industry: "Legal", result: "Top 3 Google ranking", desc: "Google SEO and Business Profile optimisation pushed LegalEdge to the top 3 search results for high-intent legal keywords in Bangalore." },
  { name: "BuildRight", sub: "Real Estate", industry: "Real Estate", result: "₹2Cr+ leads generated", desc: "Google Ads and Meta Ads campaigns for residential projects generated over ₹2 crore worth of qualified real estate leads." },
  { name: "StyleHub", sub: "Fashion", industry: "Fashion", result: "85% Instagram engagement lift", desc: "Reels strategy and branded content transformed StyleHub's social presence, with average engagement rising 85% month-over-month." },
  { name: "GreenLeaf", sub: "Wellness", industry: "Wellness", result: "300% website traffic boost", desc: "A premium new website with SEO-first content strategy tripled GreenLeaf's organic website traffic within 90 days of launch." },
  { name: "TechNova", sub: "SaaS", industry: "Technology", result: "4× demo bookings", desc: "LinkedIn Ads and Google Ads targeting decision-makers quadrupled monthly product demo bookings for this SaaS startup." },
  { name: "CityLogix", sub: "Logistics", industry: "Logistics", result: "25% lower acquisition cost", desc: "Performance marketing and landing page optimisation reduced customer acquisition cost by 25% with higher conversion rates." },
  { name: "PureFoods", sub: "Organic", industry: "FMCG", result: "10K+ online orders", desc: "E-commerce website + Meta Ads drove over 10,000 online orders in the first quarter after launch, exceeding all targets." },
  { name: "CloudBase", sub: "IT Services", industry: "IT", result: "60 new B2B clients", desc: "LinkedIn outreach strategy and targeted Google Ads brought 60 new B2B clients onboard in a single quarter." },
  { name: "MediaHouse", sub: "Publishing", industry: "Media", result: "1M+ content reach", desc: "Content creation and social distribution helped MediaHouse content reach over 1 million people across platforms in 6 months." },
  { name: "FitLife", sub: "Fitness", industry: "Fitness", result: "2× gym memberships", desc: "Local SEO, Google Business Profile and Meta Ads doubled gym membership sign-ups within 45 days of campaign launch." },
  { name: "BrandLab", sub: "Creative", industry: "Creative Agency", result: "Complete brand overhaul", desc: "Full brand identity redesign — logo, colour system, typography — followed by a premium website that tripled enquiry conversions." },
  { name: "QuickDeals", sub: "Marketplace", industry: "Marketplace", result: "50K+ monthly visitors", desc: "SEO-optimised marketplace website + Google Shopping Ads drove 50,000+ unique monthly visitors within 4 months." },
  { name: "Coders Acad", sub: "Training", industry: "Education", result: "3× course enrolments", desc: "Landing page redesign, Review Scanner setup and Google Ads tripled course enrolments for this coding bootcamp." },
  { name: "ZuddhaHerbs", sub: "Ayurveda", industry: "Wellness", result: "₹50L+ revenue impact", desc: "A full-funnel D2C strategy — website, Meta Ads, content — generated over ₹50 lakh in attributable revenue in Year 1." },
  { name: "CoreTech", sub: "Engineering", industry: "Engineering", result: "Pan-India visibility", desc: "SEO and Google Ads expansion strategy took CoreTech from a local player to a recognised brand across 12 Indian cities." },
];

const STATS = [
  { icon: Users, val: "50+", label: "Happy Clients" },
  { icon: TrendingUp, val: "3×", label: "Average Lead Growth" },
  { icon: Globe, val: "12+", label: "Cities Reached" },
];

export default function ClientsPage() {
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
                {/* Monogram */}
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
                <p className="text-white font-semibold text-sm mb-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>{c.name}</p>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-3">{c.sub}</p>
                <div className="text-xs font-semibold text-white/60 bg-white/5 border border-white/8 rounded-full px-3 py-1 inline-block mb-3">
                  📈 {c.result}
                </div>
                {active === i && (
                  <motion.p initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                    className="text-white/50 text-xs leading-relaxed mt-2">
                    {c.desc}
                  </motion.p>
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
