import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Menu, X, ChevronDown, ChevronUp, ArrowRight, Phone, Mail, MapPin,
  Instagram, Globe, Facebook, Linkedin, MessageCircle, Check,
  Share2, Target, BarChart2, Search, Code, Palette, TrendingUp,
  Video, Megaphone, Star, Shield, Users, Award, Zap, ChevronLeft, ChevronRight,
  ScanSearch, FileText, Globe2, Rocket, Lock, Wifi, Sun, Moon, Layers, Layers3, Flame, ArrowUpRight, Cpu, Terminal, Database, Server, Activity, CheckCircle2,
  Play, ShieldCheck, Handshake, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import fueraLogo from "@/imports/image-4.png";
import fueraWordmark from "@/imports/image-7.png";
import fueraHeroLogo from "@/imports/fuera-hero-logo.png";
import EnquiryModal from "./components/ui/EnquiryModal";
import { scrollTo } from "./helpers";
import { useSEO } from "./hooks/useSEO";

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

// ─── DATA ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  {
    label: "Services", href: "#solutions",
    children: [
      "Website Development", "Performance Marketing", "Meta & Google Ads",
      "Search Engine Optimization", "Brand Identity & DX", "AI & Intelligent Automation",
      "Review Scanner Engine", "Content & Media Systems"
    ]
  },
  { label: "About", href: "/about" },
  { label: "Packages", href: "#packages" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/case-studies" },
  { label: "Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
];

const SOLUTIONS = [
  {
    icon: Code,
    label: "Enterprise Web Engineering",
    desc: "Custom high-throughput web platforms, microservices architecture, and sub-second edge delivery built for scale.",
    link: "/services/website-development",
    badge: "Cloud & Frontend"
  },
  {
    icon: Zap,
    label: "AI & Intelligent Automation",
    desc: "Custom AI workflows, automated CRM/ERP integrations, and WhatsApp multi-channel messaging engines to eliminate manual work.",
    link: "/services/review-scanner",
    badge: "AI & Workflow"
  },
  {
    icon: BarChart2,
    label: "Performance Growth Systems",
    desc: "Data-driven advertising, programmatic search campaigns, and conversion analytics pipelines engineered for enterprise ROI.",
    link: "/services/performance-marketing",
    badge: "Analytics & Ads"
  },
  {
    icon: Palette,
    label: "Brand & Experience Design (DX)",
    desc: "Scalable design systems, corporate visual identity, and high-impact digital experiences that establish market authority.",
    link: "/services/branding",
    badge: "Design Systems"
  },
];

const TECH_STACK_ITEMS = [
  { name: "React & Next.js", category: "Frontend Engine", desc: "Server-side rendering, sub-second load times & static generation.", icon: Code },
  { name: "TypeScript", category: "Language", desc: "Type-safe robust codebase with zero runtime surprises.", icon: Terminal },
  { name: "Node.js & Python", category: "Backend Microservices", desc: "High-concurrency microservices, GraphQL & REST APIs.", icon: Server },
  { name: "AWS & Cloudflare", category: "Cloud & Security", desc: "Zero-trust SSL, DDoS protection, edge caching & 99.99% uptime.", icon: Shield },
  { name: "OpenAI & AI APIs", category: "Artificial Intelligence", desc: "Intelligent customer bots, predictive workflows & LLM tools.", icon: Cpu },
  { name: "PostgreSQL & Redis", category: "Data Systems", desc: "Ultra-fast database caching and real-time event streaming.", icon: Database },
];

const FEATURED_PROJECTS = [
  {
    title: "Sri Raghavendra Vaibhava",
    tags: ["Enterprise Web", "Local Search SEO", "Brand System"],
    link: "/case-studies",
    type: "web",
    accent: "from-[#e81c2e]/30 to-[#0e0e14]",
    subText: "High-conversions multi-location digital dining engine & local search system."
  },
  {
    title: "EVEX Systems",
    tags: ["Cross-Platform App", "AI Automation", "Operations"],
    link: "/case-studies",
    type: "app",
    accent: "from-[#0070f3]/30 to-[#0e0e14]",
    subText: "Enterprise mobile platform & automated multi-channel messaging pipeline."
  },
  {
    title: "SKYNEX Tech",
    tags: ["Brand Engineering", "Design System", "Marketing"],
    link: "/case-studies",
    type: "brand",
    accent: "from-[#7928ca]/30 to-[#0e0e14]",
    subText: "Complete digital identity system, design tokens, and corporate positioning."
  }
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Architecture & Discovery",
    desc: "We perform a thorough audit of your requirements, security specs, and growth objectives to design the technical blueprint."
  },
  {
    number: "02",
    title: "System Design & Security",
    desc: "Our engineers craft high-fidelity UI/UX design systems, zero-trust data architectures, and API schemas."
  },
  {
    number: "03",
    title: "Engineering & QA",
    desc: "We write clean, modular TypeScript code, set up automated CI/CD pipelines, and conduct rigorous load & security testing."
  },
  {
    number: "04",
    title: "Deployment & Scale",
    desc: "We deploy to continuous edge hosting, configure real-time telemetry monitoring, and drive performance growth."
  }
];

const METRICS = [
  { value: "99.99%", label: "System Uptime Guarantee" },
  { value: "50+", label: "Enterprise Systems Built" },
  { value: "3.4x", label: "Avg Conversion Increase" },
  { value: "10M+", label: "Monthly API Requests" }
];

const TESTIMONIALS = [
  {
    name: "Raghavendra Vaibhava",
    role: "Managing Director, Hospitality Group",
    text: "FUERA engineered our online ordering platform and local SEO infrastructure. Their technical precision, responsiveness, and clear communication set them apart from standard agencies.",
    rating: 5
  },
  {
    name: "Rohan Mehta",
    role: "Head of Digital, RetailX",
    text: "Partnering with FUERA transformed our tech infrastructure. Their performance marketing algorithms and custom React platform tripled our digital acquisition within 60 days.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "Founder & CTO, HealthPro Clinics",
    text: "FUERA built our HIPAA-compliant web app and automated CRM. The quality of leads and operational time saved has given us an unmatched competitive edge.",
    rating: 5
  }
];

const FAQS = [
  { q: "What technology solutions does FUERA architect?", a: "FUERA provides full-stack web app engineering, custom AI workflows, automated CRM/WhatsApp integrations, performance ad engines, technical SEO, brand identity design systems, and cloud infrastructure management." },
  { q: "What is included in the Foundation Tech Package?", a: "The Foundation package includes a custom-engineered web platform built on React/Next.js, lifetime edge hosting on Netlify/Vercel, SSL security, contact API integration, mobile optimization, and basic maintenance support." },
  { q: "What is in the Growth Tech System (Recommended)?", a: "The Growth System includes full custom web platform engineering, advanced Google & technical SEO, Google Business Profile optimization, lead management dashboard integration, custom automated workflows, and 5% preferred customer rate." },
  { q: "What is the Custom Enterprise Partnership model?", a: "Our Enterprise tier offers complete end-to-end digital transformation — custom domain, enterprise cloud infrastructure, performance ad engines, dedicated developer pod access, custom AI model integration, and 24/7 SLA monitoring." },
  { q: "How long does custom technology development take?", a: "Standard enterprise web platforms launch in 7–14 business days. Complex custom cloud apps or automation engines typically require 3–4 weeks with continuous sprint updates." },
  { q: "How do we start a technical discovery call?", a: "Click 'Request Proposal' or email contact@fuera.in.net or call +91 9449658382. We will set up a technical discovery session to review your scope and provide a detailed architecture blueprint." }
];

// ─── LOGO & BUTTON COMPONENTS ──────────────────────────────────────────────────

function FueraLogo({ white = false }: { white?: boolean }) {
  return (
    <div
      className="cursor-pointer shrink-0 flex items-center gap-2.5 group select-none"
      onClick={() => scrollTo("#home")}
    >
      <img
        src={fueraLogo}
        alt="FUERA Emblem"
        className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
      />
      <div className="flex flex-col justify-center -space-y-0.5">
        <span className="text-white font-black text-xl sm:text-2xl tracking-[0.16em] leading-tight">
          FUERA
        </span>
        <span className="text-[9px] text-white/50 tracking-[0.18em] font-medium flex items-center gap-1">
          <span className="text-[#e81c2e]">•</span> Build the Future <span className="text-[#e81c2e]">•</span>
        </span>
      </div>
    </div>
  );
}

function RedPillButton({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 bg-[#e81c2e] hover:bg-[#d01728] text-white font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 shadow-[0_4px_25px_rgba(232,28,46,0.45)] hover:shadow-[0_6px_30px_rgba(232,28,46,0.65)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer ${className}`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {children}
    </button>
  );
}

function OutlinePillButton({ children, onClick, className = "" }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white text-white font-medium text-sm px-6 py-3 rounded-full hover:bg-white/10 transition-all duration-200 cursor-pointer ${className}`}
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {children}
    </button>
  );
}

function SectionTag({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <span className="w-5 h-[2px] bg-[#e81c2e]" />
      <span className="text-[#e81c2e] text-xs font-bold uppercase tracking-[0.2em]" style={{ fontFamily: "'Inter', sans-serif" }}>
        {text}
      </span>
    </div>
  );
}



// ─── MAIN APP COMPONENT ───────────────────────────────────────────────────────

export default function App() {
  useSEO({
    title: "FUERA | Enterprise Technology & Digital Solutions Company",
    description: "FUERA architects custom enterprise web platforms, AI workflow engines, high-conversions performance systems, and modern digital identities for scaling companies.",
    path: "/"
  });

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [storyModalOpen, setStoryModalOpen] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [faqOpenIdx, setFaqOpenIdx] = useState<number | null>(0);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    setServicesOpen(false);
    if (href.startsWith("/")) {
      navigate(href);
    } else {
      scrollTo(href);
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-[#e81c2e] selection:text-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* Grid Pattern Background overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      {/* Ambient Red Glows */}
      <div className="fixed top-0 right-0 w-[550px] h-[550px] bg-[#e81c2e]/12 blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[550px] h-[550px] bg-[#e81c2e]/08 blur-[160px] pointer-events-none z-0" />

      {/* ── TOP CONTACT & SOCIAL BAR ── */}
      <div className="relative z-50 bg-[#050508] border-b border-white/10 py-1.5 px-4 sm:px-8 text-xs text-white/70 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Subtle red laser glow on far left */}
          <div className="absolute top-0 left-0 w-36 h-[1px] bg-gradient-to-r from-[#e81c2e] to-transparent pointer-events-none" />

          {/* Left: Contact Info */}
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
            <a
              href="mailto:contact@fuera.in.net"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Mail size={12} className="text-white/60" />
              <span>contact@fuera.in.net</span>
            </a>
            <span className="text-white/20">|</span>
            <div className="flex items-center gap-1.5">
              <Phone size={12} className="text-white/60" />
              <a href="tel:9449658382" className="hover:text-white transition-colors">9449658382</a>
              <span className="text-white/30">/</span>
              <a href="tel:7899945862" className="hover:text-white transition-colors">7899945862</a>
            </div>
          </div>

          {/* Right: Social icons & WhatsApp pill button */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="https://instagram.com/fuera.official.23"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-[#e81c2e] transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={13} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-[#e81c2e] transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={13} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-[#e81c2e] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={13} />
            </a>
            <a
              href="https://wa.me/919449658382"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba59] text-white text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(37,211,102,0.3)] hover:scale-105"
            >
              <MessageCircle size={12} fill="currentColor" />
              <span>WhatsApp</span>
            </a>
          </div>

        </div>
      </div>

      {/* ── MAIN NAVIGATION HEADER ── */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#050508]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3"
            : "bg-[#050508]/70 backdrop-blur-sm py-4 border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between relative z-10">
          <FueraLogo />

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map((item) => (
              item.children ? (
                <div key={item.label} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setServicesOpen(v => !v)}
                    className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors py-1 cursor-pointer group"
                  >
                    <span>{item.label}</span>
                    {servicesOpen ? (
                      <ChevronUp size={14} className="text-[#e81c2e]" />
                    ) : (
                      <ChevronDown size={14} className="text-white/60 group-hover:text-white transition-colors" />
                    )}
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-3 w-64 bg-[#0a0a0f] border border-white/10 shadow-2xl rounded-xl z-50 py-2 overflow-hidden"
                      >
                        {item.children.map(c => (
                          <button
                            key={c}
                            onClick={() => { setServicesOpen(false); navigate(`/services/${slugify(c)}`); }}
                            className="w-full text-left px-4 py-2.5 text-xs text-white/70 hover:bg-[#e81c2e]/10 hover:text-white transition-colors flex items-center justify-between"
                          >
                            <span>{c}</span>
                            <ArrowRight size={12} className="text-[#e81c2e]" />
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  key={item.label}
                  onClick={() => handleNav(item.href)}
                  className={`text-sm font-medium transition-colors py-1 cursor-pointer relative ${
                    item.label === "Home" ? "text-[#e81c2e] font-bold" : "text-white/80 hover:text-white"
                  }`}
                >
                  {item.label}
                  {item.label === "Home" && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#e81c2e] rounded-full" />
                  )}
                </button>
              )
            ))}
          </nav>

          {/* Right Header Controls: Send Enquiry & Sparkle/Theme */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 bg-[#0d090d]/80 hover:bg-[#1a0f14] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full border border-[#e81c2e] shadow-[0_0_15px_rgba(232,28,46,0.3)] hover:shadow-[0_0_25px_rgba(232,28,46,0.55)] transition-all cursor-pointer group"
            >
              <span>Send Enquiry</span>
              <ArrowRight size={14} className="text-white group-hover:translate-x-0.5 transition-transform" />
            </button>

            <button
              onClick={() => {
                const isDark = document.documentElement.classList.contains("dark");
                if (isDark) {
                  document.documentElement.classList.remove("dark");
                  localStorage.setItem("theme", "light");
                } else {
                  document.documentElement.classList.add("dark");
                  localStorage.setItem("theme", "dark");
                }
              }}
              className="w-9 h-9 rounded-full bg-white/5 border border-white/20 hover:border-[#e81c2e]/60 flex items-center justify-center text-white/70 hover:text-white transition-all shadow-sm cursor-pointer"
              aria-label="Toggle visual theme"
            >
              <Sun size={15} />
            </button>

            <button
              className="lg:hidden p-2 text-white/80 hover:text-white"
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-[#09090e] border-b border-white/10 px-6 py-5 relative z-50"
            >
              <div className="flex flex-col gap-3">
                {NAV_ITEMS.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleNav(item.href)}
                    className="text-left py-2 text-sm font-medium text-white/80 hover:text-white"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
                  <button
                    onClick={() => { setMenuOpen(false); setModalOpen(true); }}
                    className="w-full bg-gradient-to-r from-[#ff283b] to-[#e81c2e] text-white font-bold py-3 rounded-full flex items-center justify-center gap-2 shadow-[0_4px_25px_rgba(232,28,46,0.45)]"
                  >
                    <span>Send Enquiry</span>
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <EnquiryModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ── HERO SECTION ── */}
      <section id="home" className="relative pt-6 pb-12 md:pt-10 md:pb-16 overflow-hidden border-b border-white/5 z-10">
        
        {/* Ambient Red Glows Matching the Visual */}
        <div className="absolute top-1/4 right-0 w-[550px] h-[550px] bg-[#e81c2e]/20 rounded-full blur-[150px] pointer-events-none z-0" />
        <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-[#e81c2e]/10 rounded-full blur-[140px] pointer-events-none z-0" />

        <div className="max-w-7xl mx-auto px-5 md:px-8">
          
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-4 items-center">
            
            {/* Left Column Copy & Action Buttons */}
            <div className="lg:col-span-6 space-y-6 z-10">
              
              {/* Digital Growth Partner Tag */}
              <div className="flex items-center gap-3">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#150a0d] border border-[#e81c2e]/40 shadow-[0_0_18px_rgba(232,28,46,0.2)]">
                  <span className="w-2 h-2 rounded-full bg-[#e81c2e] shadow-[0_0_8px_#e81c2e] animate-pulse" />
                  <span className="text-xs font-semibold text-white/90 tracking-wide">Digital Growth Partner</span>
                </div>
                <span className="hidden sm:inline-block w-16 h-[1px] bg-gradient-to-r from-[#e81c2e]/60 to-transparent" />
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[58px] xl:text-[66px] font-black leading-[1.08] tracking-tight">
                <span className="bg-gradient-to-b from-white via-[#f1f5f9] to-[#94a3b8] bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  Build the{" "}
                </span>
                <span className="bg-gradient-to-b from-[#ff4d5a] via-[#e81c2e] to-[#b30f1e] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(232,28,46,0.65)]">
                  Future
                </span>
                <br />
                <span className="bg-gradient-to-b from-white via-[#f1f5f9] to-[#94a3b8] bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
                  of Your Business
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-white/75 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
                FUERA delivers measurable results through innovative digital solutions, crafted for{" "}
                <span className="text-[#e81c2e] font-semibold">growth.</span>
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => scrollTo("#solutions")}
                  className="inline-flex items-center gap-2.5 bg-gradient-to-r from-[#ff283b] to-[#e81c2e] hover:from-[#ff3d4e] hover:to-[#d01728] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-full transition-all duration-200 shadow-[0_4px_25px_rgba(232,28,46,0.55)] hover:shadow-[0_6px_35px_rgba(232,28,46,0.8)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={() => setStoryModalOpen(true)}
                  className="inline-flex items-center gap-2.5 bg-black/40 hover:bg-white/10 text-white font-medium text-sm sm:text-base px-6 py-3.5 rounded-full border border-white/20 hover:border-white/50 transition-all duration-200 backdrop-blur-md cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px]">
                    <Play size={10} className="fill-white translate-x-[0.5px]" />
                  </span>
                  <span>Watch Our Story</span>
                </button>
              </div>

            </div>

            {/* Right Column: Official FUERA 3D Emblem Logo */}
            <div className="lg:col-span-6 relative flex items-center justify-center py-4 lg:py-8">
              {/* Backlight Red Ambient Halo Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] bg-[#e81c2e]/25 rounded-full blur-[130px] pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[260px] h-[260px] bg-[#ff3b4e]/20 rounded-full blur-[70px] pointer-events-none" />

              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full max-w-[500px] select-none flex items-center justify-center"
              >
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative group cursor-pointer"
                >
                  <img
                    src={fueraHeroLogo}
                    alt="FUERA Official 3D Eagle Emblem"
                    className="w-full h-auto max-h-[460px] object-contain filter drop-shadow-[0_20px_50px_rgba(232,28,46,0.4)] transition-all duration-500 group-hover:scale-[1.03] group-hover:drop-shadow-[0_25px_65px_rgba(232,28,46,0.65)]"
                  />
                </motion.div>
              </motion.div>
            </div>

          </div>

          {/* Mouse Scroll Down Indicator */}
          <div className="flex flex-col items-center justify-center pt-8 pb-3">
            <button
              onClick={() => scrollTo("#features-ribbon")}
              className="flex flex-col items-center gap-1 group cursor-pointer"
              aria-label="Scroll to features"
            >
              <div className="w-5 h-9 rounded-full border border-white/25 bg-black/40 flex items-start justify-center p-1 shadow-md group-hover:border-[#e81c2e]/60 transition-colors">
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1 h-2 bg-white/70 rounded-full"
                />
              </div>
              <ChevronDown size={14} className="text-white/40 group-hover:text-white transition-colors animate-bounce" />
            </button>
          </div>

          {/* ── BOTTOM FLOATING FEATURE RIBBON (GLASS BAR) ── */}
          <div id="features-ribbon" className="relative z-20 w-full mt-2">
            <div className="bg-[#0b0b10]/80 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-full py-4 px-6 md:px-10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
              
              {/* Item 1: Fast & Reliable */}
              <div className="flex items-center gap-3.5 pt-3 lg:pt-0 lg:px-4 first:pt-0 first:pl-0">
                <div className="w-10 h-10 rounded-xl bg-[#e81c2e]/10 border border-[#e81c2e]/30 flex items-center justify-center shrink-0 text-[#e81c2e]">
                  <Zap size={20} className="fill-[#e81c2e]" />
                </div>
                <div>
                  <div className="text-white font-bold text-sm sm:text-base leading-snug">Fast &amp; Reliable</div>
                  <div className="text-white/50 text-xs mt-0.5">On-Time Delivery</div>
                </div>
              </div>

              {/* Item 2: Strategic Solutions */}
              <div className="flex items-center gap-3.5 pt-3 lg:pt-0 lg:px-4">
                <div className="w-10 h-10 rounded-xl bg-[#e81c2e]/10 border border-[#e81c2e]/30 flex items-center justify-center shrink-0 text-[#e81c2e]">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div className="text-white font-bold text-sm sm:text-base leading-snug">Strategic Solutions</div>
                  <div className="text-white/50 text-xs mt-0.5">For Every Business</div>
                </div>
              </div>

              {/* Item 3: Data-Driven Growth */}
              <div className="flex items-center gap-3.5 pt-3 lg:pt-0 lg:px-4">
                <div className="w-10 h-10 rounded-xl bg-[#e81c2e]/10 border border-[#e81c2e]/30 flex items-center justify-center shrink-0 text-[#e81c2e]">
                  <TrendingUp size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-white font-bold text-sm sm:text-base leading-snug">Data-Driven Growth</div>
                  <div className="text-white/50 text-xs mt-0.5">Real Business Impact</div>
                </div>
              </div>

              {/* Item 4: Trusted Partner */}
              <div className="flex items-center gap-3.5 pt-3 lg:pt-0 lg:px-4 last:pr-0">
                <div className="w-10 h-10 rounded-xl bg-[#e81c2e]/10 border border-[#e81c2e]/30 flex items-center justify-center shrink-0 text-[#e81c2e]">
                  <Handshake size={20} />
                </div>
                <div>
                  <div className="text-white font-bold text-sm sm:text-base leading-snug">Trusted Partner</div>
                  <div className="text-white/50 text-xs mt-0.5">For Your Success</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── STORY MODAL ── */}
      <AnimatePresence>
        {storyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setStoryModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative z-10 w-full max-w-2xl bg-[#0a0a10] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden"
            >
              <button
                onClick={() => setStoryModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#e81c2e]" />
                <span className="text-xs uppercase font-bold tracking-widest text-[#e81c2e]">Our Story</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                Architecting the Future of Business with FUERA
              </h3>

              <div className="space-y-3 text-sm text-white/75 leading-relaxed">
                <p>
                  At FUERA, we believe technology should be a competitive weapon, not a bottleneck. We engineer high-performance web platforms, intelligent automation workflows, and high-conversions performance engines designed to scale modern businesses.
                </p>
                <p>
                  From Bengaluru to global enterprises, our multidisciplinary team of software architects, AI engineers, and growth strategists have delivered over 250+ solutions with a 3x average growth multiple for our partners.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 my-6 pt-4 border-t border-white/10">
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                  <div className="text-xl font-black text-[#e81c2e]">250+</div>
                  <div className="text-[10px] text-white/50">Projects Delivered</div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                  <div className="text-xl font-black text-[#e81c2e]">3x</div>
                  <div className="text-[10px] text-white/50">Avg Growth</div>
                </div>
                <div className="bg-white/5 p-3 rounded-xl border border-white/10 text-center">
                  <div className="text-xl font-black text-[#e81c2e]">100+</div>
                  <div className="text-[10px] text-white/50">Happy Clients</div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <OutlinePillButton onClick={() => setStoryModalOpen(false)}>
                  Close
                </OutlinePillButton>
                <RedPillButton onClick={() => { setStoryModalOpen(false); setModalOpen(true); }}>
                  Start Your Project <ArrowRight size={15} />
                </RedPillButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── CLIENT ECOSYSTEM ── */}
      <section className="py-12 bg-[#08080d] border-b border-white/5 z-10 relative">
        <div className="max-w-7xl mx-auto px-5 md:px-8 text-center">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-[0.25em] mb-8">
            TRUSTED BY FORWARD-THINKING ENTERPRISES & STARTUPS
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-80 hover:opacity-100 transition-opacity">
            <div className="flex items-center gap-2 font-bold text-sm tracking-wide text-white/80 hover:text-white">
              <div className="w-6 h-6 rounded-full bg-[#e81c2e]/20 border border-[#e81c2e]/50 flex items-center justify-center text-[10px] text-[#e81c2e]">🪷</div>
              <span>Sri Raghavendra Vaibhava</span>
            </div>

            <div className="font-extrabold text-sm tracking-widest text-white/80 hover:text-white">
              A+N TRADERS
            </div>

            <div className="font-extrabold text-base tracking-[0.35em] text-white/80 hover:text-white">
              E V E X
            </div>

            <div className="font-serif italic text-base text-white/80 hover:text-white">
              Annapoorna Kitchen
            </div>

            <div className="flex items-center gap-1.5 font-black text-sm tracking-widest text-white/80 hover:text-white">
              <span className="text-[#e81c2e]">✦</span> SKYNEX TECH
            </div>

            <div className="text-xs text-white/40 font-mono">
              and more...
            </div>
          </div>
        </div>
      </section>

      {/* ── ENTERPRISE CAPABILITIES / SOLUTIONS ── */}
      <section id="solutions" className="py-24 bg-[#050508] border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Solutions Header */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <SectionTag text="ENTERPRISE CAPABILITIES" />

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              End-to-end technology solutions built for competitive advantage.
            </h2>

            <p className="text-white/60 text-base leading-relaxed">
              We combine enterprise software engineering, AI workflow automation, data-first performance marketing, and high-impact design to scale modern companies.
            </p>

            <div>
              <OutlinePillButton onClick={() => navigate("/services/website-development")}>
                View All Capabilities <ArrowRight size={16} />
              </OutlinePillButton>
            </div>
          </div>

          {/* Right Column: 2x2 Solution Cards */}
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-5">
            {SOLUTIONS.map((s) => (
              <div
                key={s.label}
                className="group bg-[#0a0a0f] border border-white/10 rounded-2xl p-7 hover:border-[#e81c2e]/50 hover:bg-[#0e0e16] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[#e81c2e]/10 border border-[#e81c2e]/30 flex items-center justify-center text-[#e81c2e] group-hover:scale-110 transition-transform">
                      <s.icon size={22} />
                    </div>
                    <span className="text-[10px] bg-white/5 text-white/50 border border-white/10 px-2.5 py-1 rounded-full font-mono">
                      {s.badge}
                    </span>
                  </div>

                  <h3 className="text-white font-bold text-lg mb-3 group-hover:text-[#e81c2e] transition-colors">
                    {s.label}
                  </h3>

                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    {s.desc}
                  </p>
                </div>

                <button
                  onClick={() => navigate(s.link)}
                  className="text-xs font-semibold text-white/80 hover:text-white flex items-center gap-1.5 group-hover:gap-2.5 transition-all text-left cursor-pointer"
                >
                  <span>Learn more</span> <ArrowRight size={13} className="text-[#e81c2e]" />
                </button>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── TECHNOLOGY STACK MATRIX ── */}
      <section id="tech-stack" className="py-24 bg-[#08080d] border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <SectionTag text="TECHNOLOGY STACK" />
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Built on Modern Enterprise Software Infrastructure.
            </h2>
            <p className="text-white/60 text-base">
              We leverage modern, type-safe, and battle-tested frameworks to ensure zero downtime and lightning speed.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TECH_STACK_ITEMS.map((item) => (
              <div key={item.name} className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e81c2e] shrink-0 mt-0.5">
                  <item.icon size={20} />
                </div>
                <div>
                  <div className="text-[10px] text-[#e81c2e] font-mono font-bold uppercase tracking-wider mb-1">{item.category}</div>
                  <h3 className="text-white font-bold text-base mb-1">{item.name}</h3>
                  <p className="text-white/50 text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── FEATURED CASE STUDIES ── */}
      <section id="featured-work" className="py-24 bg-[#050508] border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 space-y-12">
          
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <SectionTag text="ENGINEERED CASE STUDIES" />

              <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                Solutions that deliver measurable outcomes.
              </h2>

              <p className="text-white/60 text-base leading-relaxed max-w-2xl">
                A look at how we helped client partners transform their technology stack, improve conversions, and scale ops.
              </p>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <OutlinePillButton onClick={() => navigate("/case-studies")}>
                Explore Case Studies <ArrowRight size={16} />
              </OutlinePillButton>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {FEATURED_PROJECTS.map((proj) => (
              <div
                key={proj.title}
                className="group bg-[#0a0a0f] border border-white/10 rounded-2xl overflow-hidden hover:border-[#e81c2e]/40 transition-all duration-300 flex flex-col"
              >
                <div className={`h-52 bg-gradient-to-br ${proj.accent} p-6 flex flex-col justify-center items-center relative overflow-hidden border-b border-white/5`}>
                  <div className="text-center transform group-hover:scale-105 transition-transform duration-300">
                    <span className="text-2xl text-white font-extrabold tracking-wide block mb-1">{proj.title}</span>
                    <span className="text-[10px] text-white/50 uppercase tracking-widest font-mono">Enterprise Solution</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2 group-hover:text-[#e81c2e] transition-colors">
                      {proj.title}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-3">
                      {proj.tags.map((t) => (
                        <span key={t} className="text-[10px] bg-white/5 border border-white/10 text-white/70 px-2.5 py-1 rounded-full font-medium">
                          {t}
                        </span>
                      ))}
                    </div>

                    <p className="text-white/50 text-xs leading-relaxed">
                      {proj.subText}
                    </p>
                  </div>

                  <button
                    onClick={() => navigate(proj.link)}
                    className="text-xs font-semibold text-white/80 hover:text-white flex items-center gap-1.5 group-hover:gap-2.5 transition-all text-left cursor-pointer"
                  >
                    <span>Read Architecture Case Study</span> <ArrowRight size={13} className="text-[#e81c2e]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── ENGINEERING PROCESS ── */}
      <section className="py-24 bg-[#08080d] border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <SectionTag text="THE ENGINEERING PROCESS" />

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              A structured lifecycle for zero-friction deployment.
            </h2>

            <p className="text-white/60 text-base leading-relaxed">
              We follow a rigorous agile engineering lifecycle to turn complex requirements into high-performing digital systems.
            </p>

            <div>
              <OutlinePillButton onClick={() => navigate("/about")}>
                Learn About Our Methodology <ArrowRight size={16} />
              </OutlinePillButton>
            </div>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-4 gap-4">
            {PROCESS_STEPS.map((proc) => (
              <div
                key={proc.number}
                className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 hover:border-[#e81c2e]/40 transition-all duration-300 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white font-bold text-sm mb-6 bg-[#050508]">
                    {proc.number}
                  </div>

                  <h3 className="text-white font-bold text-base mb-2">
                    {proc.title}
                  </h3>

                  <p className="text-white/60 text-xs leading-relaxed">
                    {proc.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── IMPACT METRICS ── */}
      <section className="py-24 bg-[#050508] border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <SectionTag text="ENGINEERED FOR SCALE" />

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Proven benchmarks &amp; system reliability.
            </h2>

            <p className="text-white/60 text-base leading-relaxed">
              Our codebases and marketing infrastructures are engineered for high throughput and continuous growth.
            </p>

            <div>
              <OutlinePillButton onClick={() => navigate("/case-studies")}>
                View Benchmarks <ArrowRight size={16} />
              </OutlinePillButton>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left">
            {METRICS.map((m) => (
              <div key={m.label} className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-colors">
                <div className="text-3xl sm:text-4xl font-black text-white mb-2 tracking-tight">
                  {m.value}
                </div>
                <div className="text-xs text-white/50 font-medium">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── ENGAGEMENT MODELS (PACKAGES) ── */}
      <section id="packages" className="py-24 bg-[#08080d] border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28">
            <SectionTag text="ENGAGEMENT MODELS" />

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Flexible technology suites for every growth stage.
            </h2>

            <p className="text-white/60 text-base leading-relaxed">
              Choose an engineering package aligned with your technical &amp; marketing goals, or talk to us for a custom enterprise partnership.
            </p>

            <div>
              <OutlinePillButton onClick={() => setModalOpen(true)}>
                Discuss Custom SLA <ArrowRight size={16} />
              </OutlinePillButton>
            </div>
          </div>

          <div className="lg:col-span-8 grid sm:grid-cols-3 gap-5 items-stretch">
            
            {/* Model 1: Foundation Tech */}
            <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4">
                  <Rocket size={18} />
                </div>

                <h3 className="text-white font-bold text-lg mb-1">Foundation Tech</h3>
                <p className="text-white/50 text-xs mb-4 min-h-[32px]">
                  For high-growth startups establishing modern web platforms.
                </p>

                <div className="text-xs text-white/40 uppercase tracking-widest font-mono">Starting at</div>
                <div className="text-2xl font-black text-white mb-6">₹5,999</div>
              </div>

              <OutlinePillButton onClick={() => setModalOpen(true)} className="w-full text-xs">
                Select Foundation <ArrowRight size={14} />
              </OutlinePillButton>
            </div>

            {/* Model 2: Growth Tech Suite (Recommended) */}
            <div className="bg-[#0f0f18] border-2 border-[#e81c2e] rounded-2xl p-6 flex flex-col justify-between shadow-[0_0_35px_rgba(232,28,46,0.25)] relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#e81c2e] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                RECOMMENDED ENTERPRISE
              </div>

              <div>
                <div className="w-10 h-10 rounded-xl bg-[#e81c2e]/20 border border-[#e81c2e]/40 flex items-center justify-center text-[#e81c2e] mb-4 mt-1">
                  <BarChart2 size={18} />
                </div>

                <h3 className="text-white font-bold text-lg mb-1">Growth System</h3>
                <p className="text-white/50 text-xs mb-4 min-h-[32px]">
                  Full-stack web engine, advanced SEO, and lead automation.
                </p>

                <div className="text-xs text-white/40 uppercase tracking-widest font-mono">Starting at</div>
                <div className="text-2xl font-black text-white mb-6">₹14,999</div>
              </div>

              <RedPillButton onClick={() => setModalOpen(true)} className="w-full text-xs">
                Select Growth Suite <ArrowRight size={14} />
              </RedPillButton>
            </div>

            {/* Model 3: Enterprise Custom */}
            <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-6 flex flex-col justify-between hover:border-white/20 transition-all">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-4">
                  <Shield size={18} />
                </div>

                <h3 className="text-white font-bold text-lg mb-1">Custom Enterprise</h3>
                <p className="text-white/50 text-xs mb-4 min-h-[32px]">
                  Dedicated cloud infra, performance ad engine &amp; 24/7 SLA.
                </p>

                <div className="text-xs text-white/40 uppercase tracking-widest font-mono">Starting at</div>
                <div className="text-2xl font-black text-white mb-6">₹28,999</div>
              </div>

              <OutlinePillButton onClick={() => setModalOpen(true)} className="w-full text-xs">
                Custom Architecture <ArrowRight size={14} />
              </OutlinePillButton>
            </div>

          </div>

        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 bg-[#050508] border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6">
            <SectionTag text="EXECUTIVE ENDORSEMENTS" />

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Trusted by leaders across industries.
            </h2>
          </div>

          <div className="lg:col-span-7">
            <div className="bg-[#0a0a0f] border border-white/10 rounded-2xl p-8 sm:p-10 relative space-y-6">
              <div className="text-6xl text-[#e81c2e] font-serif leading-none select-none font-bold">
                “
              </div>

              <p className="text-white/85 text-base sm:text-lg leading-relaxed font-normal">
                "{TESTIMONIALS[testimonialIdx].text}"
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#e81c2e]/20 border border-[#e81c2e]/40 flex items-center justify-center text-white font-bold text-sm">
                    {TESTIMONIALS[testimonialIdx].name[0]}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{TESTIMONIALS[testimonialIdx].name}</div>
                    <div className="text-white/50 text-xs">{TESTIMONIALS[testimonialIdx].role}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setTestimonialIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length)}
                    className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:border-white transition-colors cursor-pointer"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── FREQUENTLY ASKED QUESTIONS ── */}
      <section className="py-24 bg-[#050508] border-b border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <SectionTag text="FREQUENTLY ASKED QUESTIONS" />

            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
              Technical Clarity &amp; Platform Architecture
            </h2>

            <p className="text-white/60 text-base leading-relaxed">
              Have questions about engineering scope, tech stack integration, SLAs, or security specs? We have answers.
            </p>

            <div>
              <RedPillButton onClick={() => setModalOpen(true)}>
                Ask a Technical Question <ArrowRight size={16} />
              </RedPillButton>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = faqOpenIdx === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-[#0a0a0f] border border-white/10 rounded-2xl overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setFaqOpenIdx(isOpen ? null : idx)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-base text-white hover:text-[#e81c2e] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 bg-[#e81c2e] border-[#e81c2e] text-white" : "text-white/60"}`}>
                      <ChevronDown size={16} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-0 text-sm text-white/65 leading-relaxed border-t border-white/5 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ── CALL TO ACTION ── */}
      <section className="py-24 bg-[#08080d] border-b border-white/5 relative overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <SectionTag text="REQUEST A PROPOSAL" />

            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Ready to architect your next digital advantage?
            </h2>

            <p className="text-white/60 text-base sm:text-lg leading-relaxed max-w-lg">
              Talk to our technical architects. We respond with a detailed technical discovery proposal within 24 hours.
            </p>

            <div>
              <RedPillButton onClick={() => setModalOpen(true)}>
                Schedule Technical Call <ArrowRight size={16} />
              </RedPillButton>
            </div>
          </div>

          {/* Contact Box */}
          <div className="lg:col-span-5 bg-[#0a0a0f] border border-white/10 rounded-2xl p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e81c2e]">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-xs text-white/40 font-medium uppercase tracking-wider">Engineering Inquiries</div>
                  <a href="mailto:contact@fuera.in.net" className="text-white text-sm font-semibold hover:text-[#e81c2e] transition-colors">
                    contact@fuera.in.net
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e81c2e]">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-xs text-white/40 font-medium uppercase tracking-wider">Direct Phone</div>
                  <a href="tel:9449658382" className="text-white text-sm font-semibold hover:text-[#e81c2e] transition-colors">
                    +91 9449658382 / 7899945862
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#e81c2e]">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-xs text-white/40 font-medium uppercase tracking-wider">Tech Hub Headquarters</div>
                  <div className="text-white text-sm font-semibold">Koramangala, Bengaluru, India</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
              <span>Connect With Engineering</span>
              <div className="flex items-center gap-3 text-white">
                <a href="https://instagram.com/fuera.official.23" target="_blank" rel="noreferrer" className="hover:text-[#e81c2e] transition-colors"><Instagram size={16} /></a>
                <a href="#" className="hover:text-[#e81c2e] transition-colors"><Facebook size={16} /></a>
                <a href="#" className="hover:text-[#e81c2e] transition-colors"><Linkedin size={16} /></a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#030305] text-white py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 pb-8">
          <FueraLogo white />

          <nav className="flex flex-wrap items-center gap-6 text-sm text-white/70">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNav(item.href)}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="text-xs text-white/40 font-mono">
            © {new Date().getFullYear()} FUERA Technologies. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp FAB */}
      <a
        href="https://wa.me/919449658382?text=Hi+FUERA%2C+I%27m+interested+in+your+enterprise+technology+solutions"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center rounded-full shadow-[0_4px_25px_rgba(16,185,129,0.5)] transition-all hover:scale-105"
        aria-label="Contact Technical Team on WhatsApp"
      >
        <MessageCircle size={26} />
      </a>

    </div>
  );
}
