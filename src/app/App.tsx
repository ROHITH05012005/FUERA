import { useState, useEffect, useRef } from "react";
import {
  Menu, X, ChevronDown, ChevronRight, ArrowRight, ArrowUpRight,
  ExternalLink, Search, Check, Shield, Users, Award, Zap,
  Briefcase, HeartHandshake, FileText, Globe, Building2, Send,
  Cpu, Code, BarChart2, Eye, Compass, Layers, Coffee, Laptop, Heart, Calendar, Clock, Lock
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import broLogo from "@/imports/bro-logo.png";
import { useSEO } from "./hooks/useSEO";

// ─── TYPES & DATA ─────────────────────────────────────────────────────────────

type CategoryType =
  | "all"
  | "our-story"
  | "vision"
  | "tools-tech"
  | "culture"
  | "what-we-do"
  | "careers"
  | "vendors"
  | "investors";

interface FilterTab {
  id: CategoryType;
  label: string;
}

const FILTER_TABS: FilterTab[] = [
  { id: "all", label: "All" },
  { id: "our-story", label: "Our Story" },
  { id: "vision", label: "Vision" },
  { id: "tools-tech", label: "Tools & Technology" },
  { id: "culture", label: "Culture" },
  { id: "what-we-do", label: "What We Do" },
  { id: "careers", label: "Careers" },
  { id: "vendors", label: "Vendors" },
  { id: "investors", label: "Investor Relations" },
];

const TICKER_ROW_1 = [
  "Google Drive", "Slack", "Figma", "Asana", "Google Ads", "Facebook Ads",
  "Adobe Creative Cloud", "SpaceX", "Nvidia", "OpenAI ChatGPT", "Google Gemini", "GitHub"
];

const TICKER_ROW_2 = [
  "Notion", "Airtable", "Canva", "DocuSign", "Miro", "SCB Anywhere",
  "Webflow", "Fireflies.ai", "Stripe", "Discord", "Amazon AWS", "HubSpot"
];

const VENTURES = [
  {
    name: "Bro.Game",
    badge: "Cloud Gaming • Official NVIDIA Partner",
    desc: "Official partner with NVIDIA GeForce NOW, the first cloud gaming platform in Thailand. Transforming how people play games with ultra-low latency edge streaming across devices.",
    url: "https://www.bro.game/",
    tag: "Gaming & AI",
    color: "from-emerald-500/10 to-transparent",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    name: "Sciam",
    badge: "EdTech • Interactive 3D Platform",
    desc: "Making science accessible to all: an online educational platform that brings interactive 3D science simulations and experiential digital learning to every child.",
    url: "https://sciam.nsm.or.th/",
    tag: "Education",
    color: "from-blue-500/10 to-transparent",
    badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    name: "Lawyer.io",
    badge: "LegalTech • Debt Litigation Automation",
    desc: "The future of debt litigation. Scalable. Efficient. Profitable. Streamlining complex legal proceedings, document automation, and case management with intelligent data workflows.",
    url: "#",
    tag: "Legal Automation",
    color: "from-purple-500/10 to-transparent",
    badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
  },
  {
    name: "Deus.space",
    badge: "Disaster Tech • Early Warning Works",
    desc: "Delivering faster, more accurate disaster alerts. Bypassing bureaucracy to provide real-time community emergency warnings when seconds count. Invest in preparedness.",
    url: "#",
    tag: "Disaster Tech",
    color: "from-amber-500/10 to-transparent",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
  },
];

const CULTURE_VALUES = [
  {
    title: "Truth Seeker",
    desc: "We believe in diving deep into data and insights to uncover truths about our work. Our process here is to seek the truth, then make a decision based on what we know.",
    tag: "Data First",
  },
  {
    title: "Direct & Kind",
    desc: "Honesty and kindness go hand-in-hand here. We value direct communication delivered with respect, transparency, and consideration for one another.",
    tag: "Communication",
  },
  {
    title: "Backup Plans",
    desc: "With a proactive mindset, we always have a Plan B (and sometimes even C, D, and E). As everything can go wrong at any time, readiness is our superpower.",
    tag: "Resilience",
  },
  {
    title: "Value Time",
    desc: "We optimise our workflows and respect each other's time, ensuring maximum efficiency, minimal bureaucracy, and high productivity in everything we do.",
    tag: "Efficiency",
  },
  {
    title: "No Toxic",
    desc: "Zero tolerance for toxicity. Our culture prioritises positivity, safety, and inclusivity. We actively discourage toxic behaviours, whether verbal or mental.",
    tag: "Culture & Care",
  },
  {
    title: "Tech - Obsessed",
    desc: "We integrate all the technology available to work smart. All modern automation, generative AI, and SaaS infrastructure are actively harnessed here!",
    tag: "Innovation",
  },
];

const TECH_DOMAINS = [
  {
    title: "Productivity & Collaboration",
    desc: "Connect, collaborate, and stay organized seamlessly across teams.",
    tools: ["Google Workspace", "Slack", "Asana", "Notion", "Miro"],
    category: "Operations",
  },
  {
    title: "AI and Automation",
    desc: "Harness the power of AI to streamline tasks, analyze massive data, and boost execution speed.",
    tools: ["ChatGPT", "Fireflies.ai", "Google Gemini"],
    category: "AI & LLM",
  },
  {
    title: "Marketing & CRM",
    desc: "Manage all customer acquisition channels, programmatic campaigns, and lifecycle relationships.",
    tools: ["HubSpot", "Google Ads", "Meta Ads"],
    category: "Growth",
  },
  {
    title: "Design & Creative",
    desc: "Unleash creativity with world-class design systems, UI/UX tools, and multimedia production.",
    tools: ["Adobe Creative Cloud", "Canva", "Figma"],
    category: "Creative",
  },
  {
    title: "Data Management",
    desc: "Organize and leverage data with flexible, reliable, and high-performance database infrastructure.",
    tools: ["Airtable", "Amazon AWS", "Google Drive"],
    category: "Data Infra",
  },
  {
    title: "E-Signature & Legal",
    desc: "Sign, track, and archive official legal documents electronically with ease and bank-grade security.",
    tools: ["DocuSign"],
    category: "Legal",
  },
  {
    title: "Surveys & Forms",
    desc: "Stay connected with user feedback and gather high-engagement customer insights effortlessly.",
    tools: ["Typeform"],
    category: "Research",
  },
  {
    title: "Video & Communication",
    desc: "Enhance asynchronous communication with quick, high-definition video messaging and capture.",
    tools: ["Loom", "Screen Studio"],
    category: "Async Work",
  },
  {
    title: "Finance & Operations",
    desc: "Streamline payments, enterprise billing, event transactions, and automated financial accounting.",
    tools: ["Stripe", "SCB Anywhere", "AccRevo"],
    category: "FinTech",
  },
  {
    title: "Human Resource",
    desc: "Streamline HR operations, continuous learning, and integrated employee engagement.",
    tools: ["Vonder"],
    category: "People Ops",
  },
];

const CAREER_OPENINGS = [
  {
    title: "Senior Backend Engineer (Node.js)",
    level: "Senior",
    exp: "4-6 Years",
    location: "Bangkok (On-Site)",
    department: "Engineering",
    compensation: "Competitive",
  },
  {
    title: "Senior Frontend Developer (React)",
    level: "Senior",
    exp: "4-6 Years",
    location: "Bangkok (On-Site)",
    department: "Engineering",
    compensation: "Competitive",
  },
  {
    title: "Quality Assurance Engineer (Software Tester)",
    level: "Associate",
    exp: "2-4 Years",
    location: "Bangkok",
    department: "QA & Reliability",
    compensation: "Competitive",
  },
  {
    title: "Growth Marketing Manager (Online / Gaming)",
    level: "Senior",
    exp: "3-5 Years",
    location: "Bangkok",
    department: "Marketing",
    compensation: "30K - 45K",
  },
  {
    title: "IT Operations Engineer",
    level: "Mid-Level",
    exp: "2-4 Years",
    location: "Bangkok (On-Site)",
    department: "Infrastructure",
    compensation: "Competitive",
  },
  {
    title: "Online Customer Service (Game Industry)",
    level: "Associate",
    exp: "1-3 Years",
    location: "Bangkok",
    department: "Customer Experience",
    compensation: "20K - 35K",
  },
  {
    title: "Copywriter & Content Creator",
    level: "Associate",
    exp: "1-3 Years",
    location: "Bangkok",
    department: "Brand & Content",
    compensation: "Competitive",
  },
];

const VENDORS_LIST = [
  {
    name: "Telehouse",
    desc: "Data center owned by KDDI company. Leading provider of global data center services, specializing in secure, reliable, and high-performance colocation solutions.",
    type: "Data Center & Colocation",
  },
  {
    name: "Blockfint",
    desc: "White-label digital banking solutions, offering a customizable fintech platform to simplify access to capital and redefine modern financial experiences.",
    type: "FinTech Infrastructure",
  },
  {
    name: "True Corporate",
    desc: "Major telecommunications provider in Thailand, delivering mobile, high-speed fiber broadband, cloud services, and enterprise digital solutions.",
    type: "Telecom & Cloud",
  },
  {
    name: "Throughwave",
    desc: "Leading IT infrastructure and network engineering company in Southeast Asia, connecting world-class networking, storage, and cybersecurity solutions.",
    type: "IT Infrastructure",
  },
  {
    name: "Hatari NEXT",
    desc: "Comprehensive suite of end-to-end digital solutions encompassing conceptual systems design, software development, implementation, and 24/7 enterprise support.",
    type: "Digital Transformation",
  },
];

// ─── MAIN BRO.TECHNOLOGY COMPONENT ──────────────────────────────────────────

export default function App() {
  useSEO({
    title: "bro.technology | Impactful Technologies to Reshape Industries",
    description: "At Bro.technologies, we integrate cutting-edge technologies to shape and revolutionize industries.",
    path: "/"
  });

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [activeJobModal, setActiveJobModal] = useState<string | null>(null);
  const [vendorModalOpen, setVendorModalOpen] = useState(false);
  const [investorModalOpen, setInvestorModalOpen] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);

  // Smooth scroll helper
  const scrollToId = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleTabClick = (tabId: CategoryType) => {
    setSelectedCategory(tabId);
    scrollToId("cards-section");
  };

  return (
    <div
      className="min-h-screen bg-[#F2F5F9] text-[#0F172A] selection:bg-[#0F172A] selection:text-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── NAVIGATION HEADER ── */}
      <header className="sticky top-0 z-40 bg-[#F2F5F9]/85 backdrop-blur-md border-b border-slate-200/60 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-18 flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => { e.preventDefault(); scrollToId("top"); }}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-9 h-9 rounded-xl bg-white shadow-sm border border-slate-200/80 p-1.5 flex items-center justify-center transition-transform group-hover:scale-105">
              <img src={broLogo} alt="bro.technology" className="w-full h-full object-contain" />
            </div>
            <span className="font-bold text-xl tracking-tight text-[#0F172A] font-mono">
              bro.technology
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleTabClick("our-story")}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Our Story
            </button>
            <button
              onClick={() => handleTabClick("what-we-do")}
              className="hover:text-black transition-colors cursor-pointer"
            >
              What We Do
            </button>
            <button
              onClick={() => handleTabClick("culture")}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Culture
            </button>
            <button
              onClick={() => handleTabClick("tools-tech")}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Tools &amp; Tech
            </button>
            <button
              onClick={() => handleTabClick("careers")}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Careers
            </button>
            <button
              onClick={() => handleTabClick("vendors")}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Vendors
            </button>
            <button
              onClick={() => handleTabClick("investors")}
              className="hover:text-black transition-colors cursor-pointer"
            >
              Investors
            </button>
          </nav>

          {/* Right Header Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setContactModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 bg-[#0F172A] hover:bg-black text-white text-xs font-semibold px-5 py-2.5 rounded-full shadow-sm hover:shadow transition-all cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowRight size={13} />
            </button>

            <button
              onClick={() => setMobileMenuOpen(v => !v)}
              className="lg:hidden p-2 text-slate-700 hover:text-black"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-[#F2F5F9] border-b border-slate-200 px-6 py-5 shadow-lg"
            >
              <div className="flex flex-col gap-3 text-sm font-semibold text-slate-800">
                <button onClick={() => handleTabClick("our-story")} className="text-left py-2 hover:text-[#0099ff]">
                  Our Story
                </button>
                <button onClick={() => handleTabClick("what-we-do")} className="text-left py-2 hover:text-[#0099ff]">
                  What We Do
                </button>
                <button onClick={() => handleTabClick("culture")} className="text-left py-2 hover:text-[#0099ff]">
                  Culture
                </button>
                <button onClick={() => handleTabClick("tools-tech")} className="text-left py-2 hover:text-[#0099ff]">
                  Tools &amp; Tech
                </button>
                <button onClick={() => handleTabClick("careers")} className="text-left py-2 hover:text-[#0099ff]">
                  Careers
                </button>
                <button onClick={() => handleTabClick("vendors")} className="text-left py-2 hover:text-[#0099ff]">
                  Vendors
                </button>
                <button onClick={() => handleTabClick("investors")} className="text-left py-2 hover:text-[#0099ff]">
                  Investor Relations
                </button>
                <div className="pt-3 border-t border-slate-200">
                  <button
                    onClick={() => { setMobileMenuOpen(false); setContactModalOpen(true); }}
                    className="w-full bg-[#0F172A] text-white py-3 rounded-full font-bold flex items-center justify-center gap-2"
                  >
                    <span>Get in Touch</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── HERO SECTION ── */}
      <section id="top" className="relative pt-12 sm:pt-16 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200/90 shadow-2xs mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-slate-700 uppercase">
              DEPLOY
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-[#0F172A] tracking-tight leading-[1.06] max-w-4xl mb-6 uppercase">
            IMPACTFUL TECHNOLOGIES TO RESHAPE INDUSTRIES
          </h1>

          {/* Subtext */}
          <p className="text-slate-600 text-base sm:text-xl font-normal max-w-2xl leading-relaxed mb-10">
            At Bro.technologies, we integrate cutting-edge technologies to shape and revolutionize industries.
          </p>

          {/* Archimedes Lever Philosophy Quote Card */}
          <div className="w-full max-w-3xl bg-white border border-slate-200/80 rounded-2xl md:rounded-3xl p-6 sm:p-8 shadow-xs text-left mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0099ff]" />
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#0099ff] mb-2.5">
              <span>Philosophy</span>
              <span>•</span>
              <span>The Archimedes Lever</span>
            </div>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic font-serif">
              “As Archimedes once said, with a lever long enough and a stable fulcrum, he can move the world. We believe in the power of technology to act as a lever for positive change. We leverage AI to create solutions that improve lives and build a better future.”
            </p>
          </div>

          {/* ── INFINITE MARQUEE TICKER ── */}
          <div className="w-full overflow-hidden relative py-2">
            
            {/* Ticker Row 1 */}
            <div className="flex gap-3 whitespace-nowrap overflow-hidden select-none mb-3 py-1">
              <div className="flex gap-3 animate-[marquee_38s_linear_infinite]">
                {TICKER_ROW_1.concat(TICKER_ROW_1).map((item, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 text-xs font-medium text-slate-700 shadow-2xs shrink-0"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ticker Row 2 (Reverse direction feel) */}
            <div className="flex gap-3 whitespace-nowrap overflow-hidden select-none py-1">
              <div className="flex gap-3 animate-[marquee_45s_linear_infinite_reverse]">
                {TICKER_ROW_2.concat(TICKER_ROW_2).map((item, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200/80 text-xs font-medium text-slate-700 shadow-2xs shrink-0"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── FILTER TABS BAR (SIGNATURE BRO.TECHNOLOGY UI) ── */}
      <section id="cards-section" className="sticky top-18 z-30 bg-[#F2F5F9]/95 backdrop-blur-md py-4 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
            {FILTER_TABS.map((tab) => {
              const active = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    active
                      ? "bg-[#0F172A] text-white shadow-xs scale-102"
                      : "bg-white text-slate-600 hover:text-black border border-slate-200/80 hover:border-slate-300"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE CARDS BENTO GRID ── */}
      <section className="py-12 max-w-7xl mx-auto px-5 sm:px-8">
        <div className="space-y-16">

          {/* ── GROUP 1: OUR STORY & VISION ── */}
          {(selectedCategory === "all" || selectedCategory === "our-story" || selectedCategory === "vision") && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0099ff] block mb-1">
                    FOUNDATION
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Our Story &amp; Vision
                  </h2>
                </div>
                <span className="text-xs text-slate-500 font-mono">01 // Purpose</span>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                
                {/* Mission Card */}
                <div className="bg-white border border-slate-200/80 rounded-2xl md:rounded-3xl p-6 sm:p-7 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0099ff] mb-5">
                      <Compass size={20} />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2">
                      MISSION
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">
                      Empowering Real-World Impact
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      To develop and deploy cutting-edge technology that empowers individuals, businesses, and communities to overcome real-world problems and thrive.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-[#0099ff]">
                    <span>Humanity-first innovation</span>
                  </div>
                </div>

                {/* Vision Card */}
                <div className="bg-white border border-slate-200/80 rounded-2xl md:rounded-3xl p-6 sm:p-7 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 mb-5">
                      <Eye size={20} />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2">
                      VISION
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">
                      Leading Force in AI Solutions
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Provide the people access to the world’s impactful technology which tie into the belief that compassion and invention mindset is humanity’s greatest ability. To be the leading force in AI-powered solutions transforming how we address global needs.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-purple-600">
                    <span>Compassion + Invention</span>
                  </div>
                </div>

                {/* New Era Card */}
                <div className="bg-white border border-slate-200/80 rounded-2xl md:rounded-3xl p-6 sm:p-7 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between md:col-span-2 lg:col-span-1">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-5">
                      <Zap size={20} />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2">
                      NEW ERA
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug">
                      Reshaping Industries with AI
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      We cultivate an agile, high-velocity technological ecosystem. By combining proprietary AI agents, scalable cloud platforms, and fearless strategy, we unlock exponential efficiency for modern operations.
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <span>Scalable architecture</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ── GROUP 2: WHAT WE DO (VENTURES & PORTFOLIO) ── */}
          {(selectedCategory === "all" || selectedCategory === "what-we-do") && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0099ff] block mb-1">
                    PORTFOLIO &amp; VENTURES
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    What We Do
                  </h2>
                </div>
                <span className="text-xs text-slate-500 font-mono">02 // Impact Ecosystem</span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {VENTURES.map((v) => (
                  <div
                    key={v.name}
                    className="bg-white border border-slate-200/80 rounded-2xl md:rounded-3xl p-6 sm:p-8 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between relative overflow-hidden group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${v.badgeColor}`}>
                          {v.badge}
                        </span>
                        <span className="text-xs font-mono text-slate-400 font-bold uppercase">
                          {v.tag}
                        </span>
                      </div>

                      <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-[#0099ff] transition-colors">
                        {v.name}
                      </h3>

                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        {v.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      {v.url !== "#" ? (
                        <a
                          href={v.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0099ff] hover:underline"
                        >
                          <span>Visit Platform</span>
                          <ExternalLink size={13} />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400">
                          <span>Internal Deployment</span>
                        </span>
                      )}
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#0099ff] group-hover:text-white transition-all">
                        <ArrowUpRight size={14} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── GROUP 3: CULTURE (COMPANY VALUES) ── */}
          {(selectedCategory === "all" || selectedCategory === "culture") && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0099ff] block mb-1">
                    OUR CORE PRINCIPLES
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Culture &amp; Work Ethos
                  </h2>
                </div>
                <span className="text-xs text-slate-500 font-mono">03 // Mindset</span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {CULTURE_VALUES.map((c) => (
                  <div
                    key={c.title}
                    className="bg-white border border-slate-200/80 rounded-2xl md:rounded-3xl p-6 sm:p-7 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {c.tag}
                        </span>
                        <Check size={14} className="text-emerald-500" />
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2.5">
                        {c.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {c.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── GROUP 4: TOOLS & TECHNOLOGY ── */}
          {(selectedCategory === "all" || selectedCategory === "tools-tech") && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0099ff] block mb-1">
                    INTEGRATED SOFTWARE STACKS
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Tools &amp; Technology
                  </h2>
                </div>
                <span className="text-xs text-slate-500 font-mono">04 // Infrastructure</span>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {TECH_DOMAINS.map((domain) => (
                  <div
                    key={domain.title}
                    className="bg-white border border-slate-200/80 rounded-2xl md:rounded-3xl p-6 sm:p-7 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-400">
                          {domain.category}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                        {domain.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                        {domain.desc}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex flex-wrap gap-1.5">
                        {domain.tools.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── GROUP 5: CAREERS & BENEFITS ── */}
          {(selectedCategory === "all" || selectedCategory === "careers") && (
            <div id="careers" className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0099ff] block mb-1">
                    WORK WITH US
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Careers &amp; Benefits
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Enjoy working with us in a supportive environment where you can thrive and enjoy varieties of benefits from day one.
                  </p>
                </div>
                <span className="text-xs text-slate-500 font-mono">05 // Talent</span>
              </div>

              {/* Benefits Cards Row */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center mb-2.5">
                    <Heart size={16} />
                  </div>
                  <div className="font-bold text-xs text-slate-900">HEALTH INSURANCE</div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Full health coverage benefits after probationary period.
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center mb-2.5">
                    <Laptop size={16} />
                  </div>
                  <div className="font-bold text-xs text-slate-900">FULLY EQUIPPED</div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Modern M-series MacBook &amp; modern devices for every position.
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center mb-2.5">
                    <Clock size={16} />
                  </div>
                  <div className="font-bold text-xs text-slate-900">WORK YOUR WAY</div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Flexible hours, hybrid options, and generous holiday policy.
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center mb-2.5">
                    <Zap size={16} />
                  </div>
                  <div className="font-bold text-xs text-slate-900">STARTER BENEFIT</div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Welcome starter kit including desk gear and essentials.
                  </div>
                </div>

                <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-2xs sm:col-span-2 lg:col-span-1">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center mb-2.5">
                    <Coffee size={16} />
                  </div>
                  <div className="font-bold text-xs text-slate-900">SNACKS &amp; COFFEE</div>
                  <div className="text-[11px] text-slate-500 mt-1 leading-snug">
                    Barista-grade coffee, snacks bar, and free drinks all day.
                  </div>
                </div>
              </div>

              {/* Job Listings */}
              <div className="bg-white border border-slate-200/80 rounded-2xl md:rounded-3xl p-6 sm:p-8 shadow-2xs divide-y divide-slate-100">
                <div className="pb-4">
                  <h3 className="text-xl font-bold text-slate-900">Open Positions</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Ready to make an impact? Explore our current openings and join our team in Bangkok.</p>
                </div>

                {CAREER_OPENINGS.map((job) => (
                  <div
                    key={job.title}
                    className="py-4.5 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {job.department}
                        </span>
                        <span className="text-xs text-slate-400">•</span>
                        <span className="text-xs text-slate-500">{job.location}</span>
                      </div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#0099ff] transition-colors">
                        {job.title}
                      </h4>
                      <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                        <span>Level: {job.level}</span>
                        <span>•</span>
                        <span>Experience: {job.exp}</span>
                        {job.compensation !== "Competitive" && (
                          <>
                            <span>•</span>
                            <span className="font-semibold text-slate-700">{job.compensation}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveJobModal(job.title)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-[#0F172A] text-slate-800 hover:text-white text-xs font-semibold transition-all cursor-pointer self-start sm:self-center shrink-0"
                    >
                      <span>Apply Now</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                ))}

                {/* General Application Row */}
                <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/80 -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-6 sm:p-8 rounded-b-2xl md:rounded-b-3xl">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Not the right role?</h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Leave your resume with us and we will be in touch as soon as the opportunity opens up!
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveJobModal("General Application / Open Resume")}
                    className="px-5 py-2.5 rounded-full bg-[#0F172A] hover:bg-black text-white text-xs font-bold transition-all cursor-pointer shrink-0"
                  >
                    Leave Your Resume
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ── GROUP 6: VENDORS & PARTNERS ── */}
          {(selectedCategory === "all" || selectedCategory === "vendors") && (
            <div id="vendors" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0099ff] block mb-1">
                    COLLABORATION NETWORK
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Vendors We Work With
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    bro.technology is seeking exceptional vendors to join our growing network. If you're passionate about technology and providing high-quality products or services, we invite you to connect.
                  </p>
                </div>
                <span className="text-xs text-slate-500 font-mono">06 // Vendors</span>
              </div>

              {/* Vendors List */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                {VENDORS_LIST.map((vendor) => (
                  <div
                    key={vendor.name}
                    className="bg-white border border-slate-200/80 rounded-2xl md:rounded-3xl p-6 sm:p-7 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block mb-2">
                        {vendor.type}
                      </span>
                      <h3 className="text-xl font-black text-slate-900 mb-2.5">
                        {vendor.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {vendor.desc}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Vendor Portal Action Card */}
                <div className="bg-gradient-to-br from-slate-900 to-black text-white rounded-2xl md:rounded-3xl p-6 sm:p-7 shadow-sm flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest block mb-2">
                      PARTNER PORTAL
                    </span>
                    <h3 className="text-xl font-bold mb-2">
                      Join Our Vendor Network
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-6">
                      Submit your bidding proposal or submit your invoices through our streamlined vendor onboarding workflow.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => setVendorModalOpen(true)}
                      className="w-full py-2.5 px-4 rounded-xl bg-white text-slate-900 font-bold text-xs hover:bg-slate-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Submit Vendor Form</span>
                      <ArrowRight size={13} />
                    </button>
                    <button
                      onClick={() => setVendorModalOpen(true)}
                      className="w-full py-2.5 px-4 rounded-xl border border-white/20 text-white font-bold text-xs hover:bg-white/10 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Submit Invoicing</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── GROUP 7: INVESTOR RELATIONS ── */}
          {(selectedCategory === "all" || selectedCategory === "investors") && (
            <div id="investors" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#0099ff] block mb-1">
                    CAPITAL &amp; GROWTH
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    Investor Relations
                  </h2>
                </div>
                <span className="text-xs text-slate-500 font-mono">07 // Investors</span>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl md:rounded-3xl p-6 sm:p-10 shadow-2xs grid lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0099ff] text-xs font-bold border border-blue-100">
                    <span>Shaping Tomorrow with AI</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                    Partner with bro.technology
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Submit your information to receive our mutual NDA and access our audited financial statements and growth roadmap to explore exciting investment opportunities in Southeast Asia’s AI revolution.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2 text-xs text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Check size={14} className="text-emerald-500" />
                      <span>Audited Financial Statements</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check size={14} className="text-emerald-500" />
                      <span>Comprehensive AI Roadmap</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-[#F2F5F9] p-6 rounded-2xl border border-slate-200/80">
                  <button
                    onClick={() => setInvestorModalOpen(true)}
                    className="w-full py-3.5 bg-[#0F172A] hover:bg-black text-white font-bold text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request NDA &amp; Financials</span>
                    <ArrowRight size={14} />
                  </button>
                  <p className="text-[11px] text-slate-500 text-center mt-3">
                    Formal credentials verified within 24 business hours.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-slate-200/80 pt-16 pb-12 mt-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-100">
            
            {/* Col 1: Brand & Address */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 p-1 flex items-center justify-center">
                  <img src={broLogo} alt="bro.technology" className="w-full h-full object-contain" />
                </div>
                <span className="font-bold text-xl font-mono text-[#0F172A]">bro.technology</span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
                14/2 Phahon Yothin 29 Alley, Khwaeng Chatuchak, Chatuchak, Bangkok 10900
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">
                Empowering businesses with AI deployment, cloud infrastructure, and impactful technologies.
              </p>
            </div>

            {/* Col 2: What We Do */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4 font-mono">
                What We Do
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li>
                  <a href="https://www.bro.game/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                    bro.game (NVIDIA)
                  </a>
                </li>
                <li>
                  <a href="https://sciam.nsm.or.th/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">
                    sciam
                  </a>
                </li>
                <li>
                  <button onClick={() => handleTabClick("what-we-do")} className="hover:text-black transition-colors">
                    lawyer.io
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabClick("what-we-do")} className="hover:text-black transition-colors">
                    deus.space
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Join Us & Careers */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4 font-mono">
                Join Us
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li>
                  <button onClick={() => handleTabClick("careers")} className="hover:text-black transition-colors">
                    Careers
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabClick("careers")} className="hover:text-black transition-colors">
                    Benefits
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabClick("culture")} className="hover:text-black transition-colors">
                    Culture
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Vendors & Investors */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4 font-mono">
                Partners
              </h4>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li>
                  <button onClick={() => handleTabClick("vendors")} className="hover:text-black transition-colors">
                    Current vendors
                  </button>
                </li>
                <li>
                  <button onClick={() => setVendorModalOpen(true)} className="hover:text-black transition-colors">
                    Vendor Registration
                  </button>
                </li>
                <li>
                  <button onClick={() => handleTabClick("investors")} className="hover:text-black transition-colors">
                    Investor Relations
                  </button>
                </li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>© 2025 bro.technology. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <span>Bangkok, Thailand</span>
              <span>•</span>
              <span>Privacy &amp; Terms</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ── MODAL: CONTACT US / GENERAL ENQUIRY ── */}
      <AnimatePresence>
        {contactModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setContactModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200"
            >
              <button
                onClick={() => setContactModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-black transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#0099ff]" />
                <span className="text-xs uppercase font-mono font-bold tracking-wider text-[#0099ff]">
                  Get in Touch
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Contact bro.technology</h3>
              <p className="text-xs text-slate-600 mb-6">
                Tell us about your organization or inquiry and our team will get in touch.
              </p>

              {formSubmitted ? (
                <div className="py-8 text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <Check size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Message Received!</h4>
                  <p className="text-xs text-slate-500">Thank you for reaching out. We will respond shortly.</p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                    setTimeout(() => {
                      setFormSubmitted(false);
                      setContactModalOpen(false);
                    }, 2000);
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Your Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0099ff]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address *</label>
                    <input
                      required
                      type="email"
                      placeholder="alex@company.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0099ff]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Message / Project Goal</label>
                    <textarea
                      rows={3}
                      placeholder="How can bro.technology help you?"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0099ff] resize-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#0F172A] hover:bg-black text-white font-bold text-sm rounded-xl transition-all cursor-pointer"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MODAL: JOB APPLICATION ── */}
      <AnimatePresence>
        {activeJobModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setActiveJobModal(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200"
            >
              <button
                onClick={() => setActiveJobModal(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-black transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0099ff] font-bold mb-2 inline-block">
                Application Form
              </span>
              <h3 className="text-xl font-black text-slate-900 mb-1">{activeJobModal}</h3>
              <p className="text-xs text-slate-500 mb-5">
                Join our team at Brothers Pictures / bro.technology in Bangkok, Thailand.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Application received! Our talent team will review your profile.");
                  setActiveJobModal(null);
                }}
                className="space-y-3.5"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">First Name *</label>
                    <input required type="text" className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0099ff]" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Last Name *</label>
                    <input required type="text" className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0099ff]" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Email *</label>
                  <input required type="email" className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0099ff]" />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number *</label>
                  <input required type="tel" className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0099ff]" />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">LinkedIn / Portfolio URL</label>
                  <input type="url" placeholder="https://..." className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0099ff]" />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#0F172A] hover:bg-black text-white font-bold text-xs rounded-xl transition-all cursor-pointer mt-2"
                >
                  Submit Application
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MODAL: VENDOR PORTAL ── */}
      <AnimatePresence>
        {vendorModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setVendorModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200"
            >
              <button
                onClick={() => setVendorModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-black transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-bold mb-2 inline-block">
                Vendor Application
              </span>
              <h3 className="text-xl font-black text-slate-900 mb-1">Join Our Vendor Network</h3>
              <p className="text-xs text-slate-500 mb-5">
                Register your company to provide services, hardware, or software to bro.technology.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("Vendor submission received! Our procurement team will review your application.");
                  setVendorModalOpen(false);
                }}
                className="space-y-3.5"
              >
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Company Name *</label>
                  <input required type="text" className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0099ff]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Contact Name *</label>
                  <input required type="text" className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0099ff]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Email *</label>
                  <input required type="email" className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0099ff]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Telephone *</label>
                  <input required type="tel" className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0099ff]" />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#0F172A] hover:bg-black text-white font-bold text-xs rounded-xl transition-all cursor-pointer mt-2"
                >
                  Submit Vendor Form
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── MODAL: INVESTOR NDA REQUEST ── */}
      <AnimatePresence>
        {investorModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setInvestorModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200"
            >
              <button
                onClick={() => setInvestorModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-black transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0099ff] font-bold mb-2 inline-block">
                Investor Portal
              </span>
              <h3 className="text-xl font-black text-slate-900 mb-1">Partner with bro.technology</h3>
              <p className="text-xs text-slate-500 mb-5">
                Submit your information to receive our mutual NDA and access our financial statements.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert("NDA Request received! Our Investor Relations team will follow up.");
                  setInvestorModalOpen(false);
                }}
                className="space-y-3.5"
              >
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Company / Fund Name *</label>
                  <input required type="text" className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0099ff]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Contact Name *</label>
                  <input required type="text" className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0099ff]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Corporate Email *</label>
                  <input required type="email" className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0099ff]" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Telephone *</label>
                  <input required type="tel" className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-[#0099ff]" />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#0F172A] hover:bg-black text-white font-bold text-xs rounded-xl transition-all cursor-pointer mt-2"
                >
                  Submit NDA Request
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
