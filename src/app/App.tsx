import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code,
  Megaphone,
  Globe,
  Users,
  TrendingUp,
  Layers,
  Shield,
  Zap,
  Sparkles,
  Cpu,
  Phone,
  Mail,
  MapPin,
  Instagram,
  X,
  Menu,
  ChevronDown,
  Star,
  Laptop,
  CheckCircle,
  FileCode,
  BarChart3,
  Search,
  Palette,
  Eye,
  RotateCcw,
} from "lucide-react";
import fueraLogo from "@/imports/fuera-logo.png";
import fueraEmblem from "@/imports/fuera-eagle-emblem.png";
import laptopImg from "@/imports/card-laptop.png";
import megaphoneImg from "@/imports/card-megaphone.png";
import founderImg from "@/imports/founder.png";
import cofounderImg from "@/imports/cofounder.png";
import ceoImg from "@/imports/ceo.png";
import manyaImg from "@/imports/manya.png";
import manjunathaImg from "@/imports/manjunatha.png";
import OpeningSequence from "./components/OpeningSequence";
import { useSEO } from "./hooks/useSEO";

// ─── AUTHENTIC VERIFIED DATA ──────────────────────────────────────────────────

const STATS = [
  { val: "50+", label: "Verified Partner Brands", sub: "Startups & Enterprises" },
  { val: "3×", label: "Average Growth Impact", sub: "Measurable Lead Velocity" },
  { val: "12+", label: "Cities Across India", sub: "Bangalore HQ & Regional Reach" },
  { val: "100%", label: "In-House Execution", sub: "Zero Outsourcing • Strict SLAs" },
];

const TECH_SERVICES = [
  {
    id: "web-dev",
    title: "High-Performance Website Development",
    desc: "Custom-crafted web solutions built with modern frameworks (React, Vite, Next.js). Engineered for sub-second load times, mobile-first responsiveness, and structured SEO architecture.",
    features: [
      "React & Next.js Modern Architecture",
      "Sub-second Core Web Vitals optimization",
      "Semantic HTML5 & JSON-LD Rich Schema",
      "Clean TypeScript code & custom interactions",
    ],
    metric: "<1.5s Load Speed",
    icon: Code,
  },
  {
    id: "web-apps",
    title: "Custom Web Applications & Software",
    desc: "Tailored business applications, interactive portals, and software engines designed to streamline customer workflows, internal operations, and revenue generation.",
    features: [
      "Custom business logic & workflow automation",
      "Robust REST & GraphQL API integrations",
      "Scalable database architecture & state management",
      "Enterprise security & access control",
    ],
    metric: "100% Custom Engineered",
    icon: Cpu,
  },
  {
    id: "ecommerce",
    title: "E-Commerce & Digital Storefronts",
    desc: "High-converting online shopping platforms engineered for seamless checkout experiences, automated catalog management, and payment gateway integrations.",
    features: [
      "Frictionless checkout & one-click purchasing",
      "Payment gateway integration (UPI, Razorpay, Stripe)",
      "Automated stock & inventory synchronisation",
      "Dynamic search & filter performance",
    ],
    metric: "3× Average Conversion Lift",
    icon: Laptop,
  },
  {
    id: "speed-infra",
    title: "Speed Optimization & Cloud Hosting",
    desc: "Full-stack performance tuning, server-side caching, edge CDN routing via Cloudflare, and automated continuous deployment infrastructure.",
    features: [
      "Global CDN edge distribution",
      "Advanced asset minification & webp rendering",
      "SSL Certificate & security headers setup",
      "Automated CI/CD build pipelines",
    ],
    metric: "99.9% Cloud Uptime",
    icon: Zap,
  },
];

const MARKETING_SERVICES = [
  {
    id: "seo",
    title: "Google Search Engine Optimization (SEO)",
    desc: "Comprehensive on-page, off-page, and technical SEO designed to secure top 3 Google positions for high-intent business keywords and dominant Bangalore local map packs.",
    features: [
      "High-intent keyword mapping & search clustering",
      "Technical crawlability & mobile indexation audits",
      "Google Business Profile local map pack dominance",
      "Authority content architecture & link equity",
    ],
    metric: "Top 3 Google Rankings",
    icon: Search,
  },
  {
    id: "performance-ads",
    title: "Performance Marketing (Meta & Google Ads)",
    desc: "Data-driven paid advertising across Google Search, YouTube, Instagram, and Facebook. Continuous A/B split-testing that maximizes Return On Ad Spend (ROAS).",
    features: [
      "Precision geo-targeting & custom audience cohorts",
      "High-converting landing page click attribution",
      "Negative keyword pruning & bid management",
      "Weekly analytics dashboards & transparent ROAS",
    ],
    metric: "40%+ Lower Cost Per Lead",
    icon: Megaphone,
  },
  {
    id: "branding-creative",
    title: "Brand Strategy & Visual Design Systems",
    desc: "Distinct visual languages that make businesses instantly memorable. Complete design systems covering typography, color science, logo design, and brand guidelines.",
    features: [
      "Comprehensive corporate brand books",
      "Logo suite, emblem variations & iconography",
      "Color theory & editorial typography pairings",
      "Packaging, marketing collateral & pitch decks",
    ],
    metric: "Unified Digital Presence",
    icon: Palette,
  },
  {
    id: "content-social",
    title: "Content Creation & Short-Form Video",
    desc: "Studio-grade Reels, educational carousels, and engaging brand narratives that turn passive scrollers into passionate brand advocates.",
    features: [
      "Viral short-form Reels & video scripting",
      "High-engagement Instagram carousel designs",
      "Community management & audience interaction",
      "Brand voice guideline & tone calibration",
    ],
    metric: "5× Instagram Engagement Lift",
    icon: Eye,
  },
];

const TECH_CASE_STUDIES = [
  {
    client: "RetailX",
    industry: "E-Commerce",
    dept: "01 Tech Solutions",
    challenge: "Outdated monolithic store with slow 6+ second load times causing massive cart abandonment.",
    solution: "Re-engineered frontend using modern React architecture, sub-second caching, and streamlined mobile checkout.",
    result: "3× Inbound Leads",
    metrics: ["<1.2s Load Speed", "+180% Organic Reach", "420% Ad ROI"],
  },
  {
    client: "HealthPro Clinics",
    industry: "Healthcare",
    dept: "01 Tech Solutions",
    challenge: "Clinic relied on walk-in visits with no mobile booking system or responsive patient access portal.",
    solution: "Engineered a lightning-fast clinic web app with one-tap WhatsApp API booking and automated doctor calendars.",
    result: "2× Patient Enquiries",
    metrics: ["120+ Monthly Leads", "<1.5s Speed", "+240% Online Bookings"],
  },
  {
    client: "CoreTech Engineering",
    industry: "Industrial Tech",
    dept: "01 Tech Solutions",
    challenge: "Complex product catalog that could not scale or load on mobile devices across nationwide factory visits.",
    solution: "Built a headless web platform with dynamic parametric filtering and instant PDF specification generation.",
    result: "Pan-India Expansion",
    metrics: ["12 Major Cities Reached", "Zero Latency", "100% In-House Code"],
  },
];

const MARKETING_CASE_STUDIES = [
  {
    client: "ZuddhaHerbs",
    industry: "Ayurveda / D2C",
    dept: "02 Digital Marketing",
    challenge: "Zero direct-to-consumer presence; relied entirely on low-margin distributor sales networks.",
    solution: "Deployed a full-funnel digital growth strategy: performance Meta Ads, educational video Reels, and customer retention.",
    result: "₹50L+ Revenue Impact",
    metrics: ["8,000+ D2C Orders", "500K+ Reach", "38% Repeat Purchase"],
  },
  {
    client: "BuildRight Real Estate",
    industry: "Property Development",
    dept: "02 Digital Marketing",
    challenge: "Burning ₹80,000 monthly on broad untargeted ads with low buyer lead qualification.",
    solution: "Restructured Google Search with high-intent property buyer keywords and geo-fenced Meta luxury lead forms.",
    result: "₹2Cr+ Qualified Leads",
    metrics: ["85+ High-Intent Leads/mo", "−40% Cost Per Lead", "+310% Site Visits"],
  },
  {
    client: "EduTech Solutions",
    industry: "Education",
    dept: "02 Digital Marketing",
    challenge: "Stagnant organic student discovery and frozen Instagram community at 2,000 followers.",
    solution: "Executed technical on-page Google SEO alongside a daily student-centric short-form Reels campaign.",
    result: "3× Enrolments",
    metrics: ["2K → 11K Followers", "+200% Organic Traffic", "Top 5 Rankings"],
  },
];

const LEADERSHIP = [
  {
    name: "R. Akash",
    role: "Founder",
    title: "Executive Leadership",
    image: founderImg,
    bio: "Visionary leader driving the core expansion and technical direction of FUERA.",
  },
  {
    name: "Niranjith M",
    role: "Co-Founder",
    title: "Executive Leadership",
    image: cofounderImg,
    bio: "Strategist shaping brand operations, partner networks, and product innovation roadmaps.",
  },
  {
    name: "Rohith B",
    role: "Chief Executive Officer (CEO)",
    title: "Executive Leadership",
    image: ceoImg,
    bio: "Leading execution, client relationships, and business development across all digital verticals.",
  },
  {
    name: "Manya H. R.",
    role: "President",
    title: "Executive Leadership",
    image: manyaImg,
    bio: "Spearheading organizational vision, corporate governance, and high-level strategy across both FUERA departments.",
  },
  {
    name: "Manjunatha Reddy",
    role: "Chief Operating Officer (COO)",
    title: "Executive Leadership",
    image: manjunathaImg,
    bio: "Overseeing day-to-day operations, delivery infrastructure, and operational excellence across technology and digital verticals.",
  },
];

const TESTIMONIALS = [
  {
    quote: "Working with FUERA has been a game-changer for our retail brand. Their Google Ads strategy and high-speed web rebuild tripled our inbound enquiries within two months.",
    author: "Rohan Mehta",
    company: "RetailX Bangalore",
    dept: "Tech & Marketing Integration",
  },
  {
    quote: "FUERA built our clinic website and ran our Meta Ads. The leads we get now are genuinely qualified and booking rates have surged. The team is transparent and truly invested.",
    author: "Priya Sharma",
    company: "HealthPro Clinics",
    dept: "Tech Solutions",
  },
  {
    quote: "Since partnering with FUERA for SEO and social media, our organic traffic has doubled and our Instagram community grew past 11,000 engaged followers.",
    author: "Arjun Nair",
    company: "EduTech Solutions",
    dept: "Digital Marketing",
  },
  {
    quote: "The FUERA team's data-driven approach delivered real estate results we hadn't seen with any previous agency. Over ₹2 Crore in qualified inquiries was generated in 4 months.",
    author: "Suresh Kumar",
    company: "BuildRight Real Estate",
    dept: "Performance Marketing",
  },
];

// ─── MAIN APP COMPONENT ───────────────────────────────────────────────────────

export default function App() {
  useSEO({
    title: "FUERA | Tech Solutions & Digital Marketing — Bangalore",
    description: "FUERA operates across two specialized departments: FUERA Tech Solutions (custom web applications, software, high-speed platforms) and FUERA Digital Marketing (Google SEO, Meta Ads, branding, creative growth).",
    path: "/",
  });

  const navigate = useNavigate();

  // Intro state: Check if intro already seen in session
  const [showIntro, setShowIntro] = useState(() => {
    return !sessionStorage.getItem("fuera_intro_shown");
  });

  const [activeDept, setActiveDept] = useState<"all" | "tech" | "marketing">("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedDeptForEnquiry, setSelectedDeptForEnquiry] = useState<string>("Both Departments (Full Spectrum)");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Smooth scroll
  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleIntroComplete = () => {
    sessionStorage.setItem("fuera_intro_shown", "true");
    setShowIntro(false);
  };

  const replayIntro = () => {
    setShowIntro(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-[#121214] font-sans antialiased selection:bg-[#E6002A] selection:text-white relative">
      
      {/* ── 1. ANIMATED OPENING SEQUENCE ── */}
      {showIntro && <OpeningSequence onComplete={handleIntroComplete} />}

      {/* ── 2. EDITORIAL TOP TICKER & NAVIGATION ── */}
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#121214]/8 transition-all">
        {/* Subtle Brand Meta Bar */}
        <div className="hidden lg:flex items-center justify-between px-8 py-1.5 text-[10px] font-mono tracking-[0.2em] text-[#121214]/50 border-b border-[#121214]/5 bg-[#F4F3EE]/60">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-bold text-[#E6002A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E6002A] animate-pulse" />
              FUERA TWO-DEPARTMENT ARCHITECTURE
            </span>
            <span>•</span>
            <span>BANGALORE HQ: KORAMANGALA 5TH BLOCK</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={replayIntro}
              className="hover:text-[#E6002A] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw size={10} />
              <span>REPLAY INTRO</span>
            </button>
            <span>•</span>
            <a href="tel:+919449658382" className="hover:text-[#E6002A] transition-colors">
              +91 94496 58382
            </a>
            <span>•</span>
            <a href="mailto:fuera.solutions.23@gmail.com" className="hover:text-[#E6002A] transition-colors">
              fuera.solutions.23@gmail.com
            </a>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-20 flex items-center justify-between gap-6">
          {/* Logo Lockup */}
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("top");
            }}
            className="flex items-center gap-3.5 group cursor-pointer select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-white border border-[#121214]/10 p-1 shadow-xs flex items-center justify-center transition-transform group-hover:scale-105">
              <img src={fueraLogo} alt="FUERA Emblem" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 leading-none">
                <span className="font-black text-2xl tracking-[0.2em] text-[#121214]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  FUERA
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6002A]" />
              </div>
              <span className="text-[9px] font-mono tracking-[0.22em] text-[#121214]/50 uppercase mt-0.5">
                TECH SOLUTIONS & DIGITAL MARKETING
              </span>
            </div>
          </a>

          {/* Department Quick Filter Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-[#EFECE6] p-1 rounded-full border border-[#121214]/5 text-xs font-medium">
            <button
              onClick={() => {
                setActiveDept("all");
                scrollTo("departments-section");
              }}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                activeDept === "all"
                  ? "bg-white text-[#121214] font-bold shadow-xs"
                  : "text-[#121214]/60 hover:text-[#121214]"
              }`}
            >
              Unified Brand
            </button>
            <button
              onClick={() => {
                setActiveDept("tech");
                scrollTo("tech-solutions");
              }}
              className={`px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer ${
                activeDept === "tech"
                  ? "bg-[#121214] text-white font-bold shadow-xs"
                  : "text-[#121214]/60 hover:text-[#121214]"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E6002A]" />
              01 Tech Solutions
            </button>
            <button
              onClick={() => {
                navigate("/digital-marketing");
              }}
              className="px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 cursor-pointer text-[#121214]/70 hover:text-[#E6002A] hover:bg-[#121214]/5"
              title="Open FUERA Digital Marketing Experience"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E6002A]" />
              02 Digital Marketing
            </button>
          </nav>

          {/* Right Action Links */}
          <div className="hidden lg:flex items-center gap-5 text-xs font-semibold">
            <button
              onClick={() => scrollTo("synergy-matrix")}
              className="text-[#121214]/70 hover:text-[#E6002A] transition-colors cursor-pointer"
            >
              Synergy
            </button>
            <button
              onClick={() => scrollTo("case-studies")}
              className="text-[#121214]/70 hover:text-[#E6002A] transition-colors cursor-pointer"
            >
              Case Studies
            </button>
            <button
              onClick={() => scrollTo("leadership")}
              className="text-[#121214]/70 hover:text-[#E6002A] transition-colors cursor-pointer"
            >
              Leadership
            </button>
            <button
              onClick={() => {
                setSelectedDeptForEnquiry("Both Departments (Full Spectrum)");
                setEnquiryModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#121214] hover:bg-[#E6002A] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-xs cursor-pointer group"
            >
              <span>Consultation</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-white border border-[#121214]/10 flex items-center justify-center text-[#121214] cursor-pointer"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-[#121214]/8 bg-[#FAF9F6] px-6 py-6 space-y-4 overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono tracking-widest text-[#121214]/40 uppercase">Departments</span>
                <button
                  onClick={() => {
                    setActiveDept("tech");
                    scrollTo("tech-solutions");
                  }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#121214]/8 text-left font-bold text-sm"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E6002A]" />
                    01 FUERA Tech Solutions
                  </span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate("/digital-marketing");
                  }}
                  className="flex items-center justify-between p-3 rounded-xl bg-white border border-[#121214]/8 text-left font-bold text-sm hover:border-[#E6002A]/40 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E6002A]" />
                    02 FUERA Digital Marketing (Interactive Studio)
                  </span>
                  <ArrowRight size={14} className="text-[#E6002A]" />
                </button>
              </div>

              <div className="pt-2 flex flex-col gap-2 text-sm font-semibold text-[#121214]/75">
                <button onClick={() => scrollTo("synergy-matrix")} className="text-left py-1 hover:text-[#E6002A]">
                  Synergy Matrix
                </button>
                <button onClick={() => scrollTo("case-studies")} className="text-left py-1 hover:text-[#E6002A]">
                  Verified Case Studies
                </button>
                <button onClick={() => scrollTo("leadership")} className="text-left py-1 hover:text-[#E6002A]">
                  Executive Leadership Team
                </button>
                <button onClick={() => scrollTo("contact-section")} className="text-left py-1 hover:text-[#E6002A]">
                  Bangalore HQ & Contact
                </button>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setEnquiryModalOpen(true);
                }}
                className="w-full py-3.5 rounded-xl bg-[#E6002A] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <span>Request Project Consultation</span>
                <ArrowRight size={14} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── 3. HERO: DUAL-DEPARTMENT DIGITAL EXPERIENCE ── */}
      <section id="top" className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 overflow-hidden">
        {/* Subtle Architectural Grid Hairlines */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 30%, rgba(230,0,42,0.06) 0%, transparent 60%),
                              linear-gradient(to right, rgba(18,18,20,0.04) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(18,18,20,0.04) 1px, transparent 1px)`,
            backgroundSize: "100% 100%, 6rem 6rem, 6rem 6rem",
          }}
        />

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10 text-center flex flex-col items-center">
          
          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#121214]/10 shadow-xs mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#E6002A] animate-pulse" />
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#121214] uppercase">
              TWO BRANCHES • ONE FUERA
            </span>
            <span className="text-[#121214]/30">•</span>
            <span className="text-[11px] font-mono text-[#121214]/60">BANGALORE, INDIA</span>
          </motion.div>

          {/* Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black text-[#121214] tracking-tight leading-[1.05] max-w-5xl mb-6 uppercase"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            BUILD THE <span className="text-[#E6002A]">FUTURE</span> OF YOUR BUSINESS.
          </motion.h1>

          {/* Editorial Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-[#121214]/70 font-normal max-w-3xl leading-relaxed mb-12"
          >
            FUERA operates across two dedicated departments under a unified standard of excellence — precision technology engineering and data-driven creative growth.
          </motion.p>

          {/* Dual Department Hero Showcase Cards */}
          <div id="departments-section" className="w-full grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl text-left mb-16">
            
            {/* Card 01 — FUERA Tech Solutions */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -4 }}
              onClick={() => {
                setActiveDept("tech");
                scrollTo("tech-solutions");
              }}
              className="group relative bg-white border border-[#121214]/10 hover:border-[#121214]/30 rounded-3xl p-7 sm:p-9 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#121214]" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E6002A]" />
                    <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#121214]/60 uppercase">
                      DEPARTMENT 01
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#F4F3EE] text-[#121214]">
                    ENGINEERING
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2
                      className="text-2xl sm:text-3xl font-black text-[#121214] mb-1.5 group-hover:text-[#E6002A] transition-colors"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      FUERA Tech Solutions
                    </h2>
                    <p className="text-xs font-mono font-bold tracking-wider text-[#E6002A] uppercase mb-4">
                      Innovate. Develop. Transform.
                    </p>
                  </div>
                  <div className="w-20 h-20 shrink-0 flex items-center justify-center p-1 bg-[#F9F8F6] rounded-2xl border border-[#121214]/5 group-hover:scale-105 transition-transform">
                    <img src={laptopImg} alt="FUERA Tech Solutions" className="w-full h-full object-contain" />
                  </div>
                </div>

                <p className="text-sm text-[#121214]/70 leading-relaxed mb-6">
                  Specialized engineering of custom web applications, React/Next.js architectures, modern digital storefronts, and sub-second business platforms.
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs font-medium text-[#121214]/80 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Check size={14} className="text-[#E6002A]" />
                    <span>Custom Web Engines</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check size={14} className="text-[#E6002A]" />
                    <span>Clean TypeScript Code</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check size={14} className="text-[#E6002A]" />
                    <span>Sub-Second Load Time</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check size={14} className="text-[#E6002A]" />
                    <span>Full Security &amp; SLAs</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#121214]/8 flex items-center justify-between text-xs font-bold text-[#121214]">
                <span className="flex items-center gap-1.5 group-hover:text-[#E6002A] transition-colors">
                  <span>Explore Tech Solutions</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
                <span className="font-mono text-[#121214]/40 text-[11px]">01 // TECH</span>
              </div>
            </motion.div>

            {/* Card 02 — FUERA Digital Marketing */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -4 }}
              onClick={() => {
                navigate("/digital-marketing");
              }}
              className="group relative bg-white border border-[#121214]/10 hover:border-[#E6002A]/40 rounded-3xl p-7 sm:p-9 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              {/* Subtle top indicator bar in FUERA red */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#E6002A]" />

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#E6002A]" />
                    <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#121214]/60 uppercase">
                      DEPARTMENT 02
                    </span>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-[#FFEBEF] text-[#E6002A]">
                    CREATIVE &amp; GROWTH
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2
                      className="text-2xl sm:text-3xl font-black text-[#121214] mb-1.5 group-hover:text-[#E6002A] transition-colors"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      FUERA Digital Marketing
                    </h2>
                    <p className="text-xs font-mono font-bold tracking-wider text-[#E6002A] uppercase mb-4">
                      Strategize. Create. Grow.
                    </p>
                  </div>
                  <div className="w-20 h-20 shrink-0 flex items-center justify-center p-1 bg-[#F9F8F6] rounded-2xl border border-[#121214]/5 group-hover:scale-105 transition-transform">
                    <img src={megaphoneImg} alt="FUERA Digital Marketing" className="w-full h-full object-contain" />
                  </div>
                </div>

                <p className="text-sm text-[#121214]/70 leading-relaxed mb-6">
                  Targeted performance marketing, Google &amp; Local SEO dominance, high-impact short-form video creation, and measurable full-funnel customer acquisition.
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs font-medium text-[#121214]/80 mb-6">
                  <div className="flex items-center gap-1.5">
                    <Check size={14} className="text-[#E6002A]" />
                    <span>Google SEO Dominance</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check size={14} className="text-[#E6002A]" />
                    <span>Meta &amp; Google Ads (ROAS)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check size={14} className="text-[#E6002A]" />
                    <span>Viral Reels &amp; Content</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check size={14} className="text-[#E6002A]" />
                    <span>Review &amp; Brand Systems</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#121214]/8 flex items-center justify-between text-xs font-bold text-[#121214]">
                <span className="flex items-center gap-1.5 group-hover:text-[#E6002A] transition-colors">
                  <span>Explore Digital Marketing</span>
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
                <span className="font-mono text-[#121214]/40 text-[11px]">02 // GROWTH</span>
              </div>
            </motion.div>

          </div>

          {/* Quick Metrics Bar */}
          <div className="w-full max-w-5xl bg-white border border-[#121214]/8 rounded-2xl p-6 sm:p-8 shadow-2xs grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.label} className="space-y-1">
                <div
                  className="text-3xl sm:text-4xl font-black text-[#121214] tracking-tight"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {s.val}
                </div>
                <div className="text-xs font-bold text-[#121214] uppercase tracking-wider">{s.label}</div>
                <div className="text-[11px] text-[#121214]/50">{s.sub}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 4. DEPARTMENT 01: FUERA TECH SOLUTIONS DEEP DIVE ── */}
      <section id="tech-solutions" className="py-20 sm:py-28 bg-[#F4F3EE]/60 border-t border-[#121214]/8 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          {/* Department Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#121214]" />
                <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#121214]">
                  DEPARTMENT 01 // DIGITAL TECHNOLOGY SOLUTIONS
                </span>
              </div>
              <h2
                className="text-3xl sm:text-5xl font-black text-[#121214] tracking-tight max-w-2xl"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                High-Performance Web &amp; Software Engineering.
              </h2>
            </div>
            <p className="text-sm text-[#121214]/70 max-w-md leading-relaxed">
              We architect digital platforms built for scale, lightning-fast execution, and seamless user experiences. No templates, no bloated codebases — only custom, production-grade systems.
            </p>
          </div>

          {/* Tech Services Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {TECH_SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="bg-white border border-[#121214]/8 rounded-3xl p-7 sm:p-9 shadow-xs hover:border-[#121214]/25 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF9F6] border border-[#121214]/10 flex items-center justify-center text-[#121214] group-hover:bg-[#121214] group-hover:text-white transition-colors">
                      <srv.icon size={22} />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-[#F4F3EE] text-[#121214]">
                      {srv.metric}
                    </span>
                  </div>

                  <h3
                    className="text-xl sm:text-2xl font-bold text-[#121214] mb-3 group-hover:text-[#E6002A] transition-colors"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {srv.title}
                  </h3>
                  <p className="text-sm text-[#121214]/70 leading-relaxed mb-6">
                    {srv.desc}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {srv.features.map((f) => (
                      <li key={f} className="text-xs text-[#121214]/80 flex items-center gap-2">
                        <Check size={14} className="text-[#E6002A] shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#121214]/6 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedDeptForEnquiry("Department 01 — FUERA Tech Solutions");
                      setEnquiryModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#121214] hover:text-[#E6002A] transition-colors cursor-pointer"
                  >
                    <span>Request Engineering Scope</span>
                    <ArrowRight size={13} />
                  </button>
                  <span className="text-[10px] font-mono text-[#121214]/40">SLA GUARANTEED</span>
                </div>
              </div>
            ))}
          </div>

          {/* Department 01 Verified Case Studies */}
          <div className="bg-white border border-[#121214]/8 rounded-3xl p-8 sm:p-10 shadow-xs">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#121214]/8">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E6002A] block mb-1">
                  PROVEN CLIENT WORK
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#121214]">
                  Tech Solutions Case Studies
                </h3>
              </div>
              <span className="text-xs font-mono text-[#121214]/50">3 VERIFIED CASE STUDIES</span>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {TECH_CASE_STUDIES.map((cs) => (
                <div
                  key={cs.client}
                  className="bg-[#FAF9F6] border border-[#121214]/6 rounded-2xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-[#121214]">{cs.client}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-[#121214]/10 text-[#121214]/70">
                        {cs.industry}
                      </span>
                    </div>
                    <div className="text-2xl font-black text-[#121214] mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {cs.result}
                    </div>
                    <p className="text-xs text-[#121214]/70 leading-relaxed mb-4">
                      {cs.solution}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#121214]/6">
                    {cs.metrics.map((m) => (
                      <span key={m} className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-white border border-[#121214]/8 text-[#121214]/80">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 5. DEPARTMENT 02: FUERA DIGITAL MARKETING DEEP DIVE ── */}
      <section id="digital-marketing" className="py-20 sm:py-28 bg-[#FAF9F6] border-t border-[#121214]/8 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          {/* Department Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E6002A]" />
                <span className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-[#E6002A]">
                  DEPARTMENT 02 // CREATIVE &amp; GROWTH MARKETING
                </span>
              </div>
              <h2
                className="text-3xl sm:text-5xl font-black text-[#121214] tracking-tight max-w-2xl"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Data-Driven Growth, SEO &amp; Visual Storytelling.
              </h2>
            </div>
            <p className="text-sm text-[#121214]/70 max-w-md leading-relaxed">
              We engineer scalable customer acquisition systems that blend algorithmic performance ads, dominant local search rankings, and creative content that captures and holds attention.
            </p>
          </div>

          {/* Interactive Creative Reel & Shutter Theme Showcase Banner */}
          <div className="mb-14 p-7 sm:p-9 rounded-3xl bg-gradient-to-br from-[#2c2d1e] via-[#3a3c26] to-[#121214] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl border border-white/10 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-[#E6002A]" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#E6002A]">
                  DEDICATED DIGITAL MARKETING EXPERIENCE
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Explore the FUERA Shutter Roll &amp; Cinematic Studio
              </h3>
              <p className="text-xs sm:text-sm text-white/75 max-w-xl leading-relaxed">
                Experience our custom scroll-driven film camera showcase featuring analog color stocks, viral short-form creative frameworks, and full-funnel campaign production.
              </p>
            </div>
            <button
              onClick={() => navigate("/digital-marketing")}
              className="relative z-10 inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#E6002A] hover:bg-[#CC0025] text-white text-xs font-bold tracking-wider uppercase shadow-xl transition-all hover:scale-105 shrink-0 cursor-pointer"
            >
              <span>Launch Studio Experience</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Marketing Services Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {MARKETING_SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="bg-white border border-[#121214]/8 rounded-3xl p-7 sm:p-9 shadow-xs hover:border-[#E6002A]/30 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF9F6] border border-[#121214]/10 flex items-center justify-center text-[#E6002A] group-hover:bg-[#E6002A] group-hover:text-white transition-colors">
                      <srv.icon size={22} />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-[#FFEBEF] text-[#E6002A]">
                      {srv.metric}
                    </span>
                  </div>

                  <h3
                    className="text-xl sm:text-2xl font-bold text-[#121214] mb-3 group-hover:text-[#E6002A] transition-colors"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {srv.title}
                  </h3>
                  <p className="text-sm text-[#121214]/70 leading-relaxed mb-6">
                    {srv.desc}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {srv.features.map((f) => (
                      <li key={f} className="text-xs text-[#121214]/80 flex items-center gap-2">
                        <Check size={14} className="text-[#E6002A] shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-[#121214]/6 flex items-center justify-between">
                  <button
                    onClick={() => {
                      setSelectedDeptForEnquiry("Department 02 — FUERA Digital Marketing");
                      setEnquiryModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#121214] hover:text-[#E6002A] transition-colors cursor-pointer"
                  >
                    <span>Request Growth Strategy</span>
                    <ArrowRight size={13} />
                  </button>
                  <span className="text-[10px] font-mono text-[#121214]/40">VERIFIED ATTRIBUTION</span>
                </div>
              </div>
            ))}
          </div>

          {/* Department 02 Verified Case Studies */}
          <div className="bg-white border border-[#121214]/8 rounded-3xl p-8 sm:p-10 shadow-xs">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#121214]/8">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#E6002A] block mb-1">
                  PROVEN CLIENT WORK
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-[#121214]">
                  Digital Marketing Case Studies
                </h3>
              </div>
              <span className="text-xs font-mono text-[#121214]/50">3 VERIFIED CASE STUDIES</span>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {MARKETING_CASE_STUDIES.map((cs) => (
                <div
                  key={cs.client}
                  className="bg-[#FAF9F6] border border-[#121214]/6 rounded-2xl p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold text-[#121214]">{cs.client}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white border border-[#121214]/10 text-[#121214]/70">
                        {cs.industry}
                      </span>
                    </div>
                    <div className="text-2xl font-black text-[#E6002A] mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      {cs.result}
                    </div>
                    <p className="text-xs text-[#121214]/70 leading-relaxed mb-4">
                      {cs.solution}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#121214]/6">
                    {cs.metrics.map((m) => (
                      <span key={m} className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-white border border-[#121214]/8 text-[#121214]/80">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── 6. SYNERGY MATRIX: WHY TWO DEPARTMENTS UNDER ONE ROOF ── */}
      <section id="synergy-matrix" className="py-20 sm:py-24 bg-[#F4F3EE]/80 border-t border-[#121214]/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[11px] font-mono font-bold tracking-[0.25em] text-[#E6002A] uppercase block mb-3">
              THE FULL-SPECTRUM ADVANTAGE
            </span>
            <h2
              className="text-3xl sm:text-4xl md:text-5xl font-black text-[#121214] tracking-tight mb-4 uppercase"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              How Tech &amp; Marketing Multiply Each Other.
            </h2>
            <p className="text-sm sm:text-base text-[#121214]/70 leading-relaxed">
              Most businesses lose revenue because their web development team and marketing agency work in separate silos. At FUERA, code and creative are engineered together from day one.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border border-[#121214]/8 rounded-3xl p-7 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#121214]/10 flex items-center justify-center text-[#121214] mb-5">
                <Zap size={20} className="text-[#E6002A]" />
              </div>
              <h3 className="text-lg font-bold text-[#121214] mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Speed Lowers Ad Cost (PPC)
              </h3>
              <p className="text-xs text-[#121214]/70 leading-relaxed">
                When FUERA Tech builds a sub-second web platform, Google and Meta assign higher Quality Scores to your ads — slashing your Cost Per Click (CPC) and boosting landing page conversion.
              </p>
            </div>

            <div className="bg-white border border-[#121214]/8 rounded-3xl p-7 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#121214]/10 flex items-center justify-center text-[#121214] mb-5">
                <Search size={20} className="text-[#E6002A]" />
              </div>
              <h3 className="text-lg font-bold text-[#121214] mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Clean Code Accelerates SEO
              </h3>
              <p className="text-xs text-[#121214]/70 leading-relaxed">
                Our developers write semantic HTML5 and JSON-LD schema right alongside our marketing SEO strategists, ensuring Google crawl bots index and rank your pages in record time.
              </p>
            </div>

            <div className="bg-white border border-[#121214]/8 rounded-3xl p-7 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#FAF9F6] border border-[#121214]/10 flex items-center justify-center text-[#121214] mb-5">
                <Palette size={20} className="text-[#E6002A]" />
              </div>
              <h3 className="text-lg font-bold text-[#121214] mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Brand Cohesion Builds Trust
              </h3>
              <p className="text-xs text-[#121214]/70 leading-relaxed">
                Every customer touchpoint — from social Reels and Google Search to the live website checkout — feels unified, premium, and trustworthy, maximizing client lifetime value.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ── 7. VERIFIED EXECUTIVE LEADERSHIP TEAM ── */}
      <section id="leadership" className="py-20 sm:py-28 bg-white border-t border-[#121214]/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#E6002A] block mb-2">
                WHO WE ARE // PROVEN LEADERSHIP
              </span>
              <h2
                className="text-3xl sm:text-5xl font-black text-[#121214] tracking-tight"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Executive Leadership Team.
              </h2>
            </div>
            <p className="text-sm text-[#121214]/70 max-w-md leading-relaxed">
              Meet the executive leadership driving FUERA's technological innovation, web development standards, and creative digital marketing strategies.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {LEADERSHIP.map((leader) => (
              <div
                key={leader.name}
                className="bg-[#FAF9F6] border border-[#121214]/8 rounded-3xl p-6 sm:p-7 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-full aspect-square rounded-2xl bg-white border border-[#121214]/8 overflow-hidden mb-6 flex items-center justify-center relative">
                    {leader.image ? (
                      <img
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-full bg-[#121214]/5 flex items-center justify-center font-bold text-xl text-[#121214]/60">
                        {leader.name.charAt(0)}
                      </div>
                    )}
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[10px] font-mono font-bold border border-[#121214]/10">
                      {leader.title}
                    </div>
                  </div>

                  <h3
                    className="text-xl font-bold text-[#121214] mb-1"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {leader.name}
                  </h3>
                  <p className="text-xs font-mono font-semibold text-[#E6002A] uppercase mb-3">
                    {leader.role}
                  </p>
                  <p className="text-xs text-[#121214]/70 leading-relaxed">
                    {leader.bio}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#121214]/6 flex items-center justify-between text-[11px] text-[#121214]/40 font-mono">
                  <span>BANGALORE HQ</span>
                  <span>FUERA EXECUTIVE</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 8. CLIENT ENDORSEMENTS (VERIFIED TESTIMONIALS) ── */}
      <section id="testimonials" className="py-20 bg-[#F4F3EE]/60 border-t border-[#121214]/8">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[10px] font-mono font-bold uppercase tracking-[0.25em] text-[#E6002A] block mb-2">
              CLIENT TESTIMONIALS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#121214]" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Trusted by Ambitious Brands.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {TESTIMONIALS.map((t, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#121214]/8 rounded-3xl p-7 sm:p-9 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#E6002A] mb-5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={15} fill="#E6002A" />
                    ))}
                  </div>
                  <p className="text-sm sm:text-base text-[#121214]/80 leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-[#121214]/8 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-[#121214]">{t.author}</div>
                    <div className="text-xs text-[#121214]/50">{t.company}</div>
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-[#FAF9F6] border border-[#121214]/8 text-[#121214]/70">
                    {t.dept}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 9. BANGALORE HQ & CONSULTATION CONTACT ── */}
      <section id="contact-section" className="py-20 sm:py-28 bg-white border-t border-[#121214]/8 relative">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          <div className="bg-[#121214] text-white rounded-3xl p-8 sm:p-14 overflow-hidden relative shadow-xl">
            {/* Background geometric flare */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#E6002A]/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid lg:grid-cols-12 gap-10 items-center relative z-10">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E6002A] text-xs font-mono font-bold tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E6002A] animate-ping" />
                  INITIATE A NEW PROJECT
                </div>

                <h2
                  className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight uppercase"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Ready to Build the Future of Your Business?
                </h2>

                <p className="text-sm sm:text-base text-white/70 max-w-xl leading-relaxed">
                  Whether you require Department 01 (Tech Solutions), Department 02 (Digital Marketing), or an integrated full-funnel strategy, our team responds with a detailed scope and execution plan within 24 hours.
                </p>

                <div className="pt-2 grid sm:grid-cols-2 gap-4 text-xs text-white/80 font-mono">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#E6002A] shrink-0" />
                    <span>Koramangala 5th Block, Bangalore 560068</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-[#E6002A] shrink-0" />
                    <span>+91 94496 58382</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-[#E6002A] shrink-0" />
                    <span>fuera.solutions.23@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Instagram size={16} className="text-[#E6002A] shrink-0" />
                    <span>@fuera.official.23</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-white/5 border border-white/10 p-6 sm:p-8 rounded-2xl backdrop-blur-sm space-y-4">
                <h3 className="text-xl font-bold text-white mb-1">Schedule a Consultation</h3>
                <p className="text-xs text-white/60 mb-4">
                  Select the department suited to your immediate goals:
                </p>

                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setSelectedDeptForEnquiry("Department 01 — FUERA Tech Solutions");
                      setEnquiryModalOpen(true);
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white text-white hover:text-[#121214] font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span>01 // Tech Solutions Only</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedDeptForEnquiry("Department 02 — FUERA Digital Marketing");
                      setEnquiryModalOpen(true);
                    }}
                    className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white text-white hover:text-[#121214] font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-between cursor-pointer"
                  >
                    <span>02 // Digital Marketing Only</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    onClick={() => {
                      setSelectedDeptForEnquiry("Both Departments (Full Spectrum Integration)");
                      setEnquiryModalOpen(true);
                    }}
                    className="w-full py-3.5 px-4 rounded-xl bg-[#E6002A] hover:bg-[#d00025] text-white font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-between cursor-pointer shadow-sm"
                  >
                    <span>Both Departments (Full Spectrum)</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── 10. EDITORIAL FOOTER ── */}
      <footer className="bg-white border-t border-[#121214]/8 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#121214]/8">
            
            {/* Col 1 & 2: Brand & Address */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#FAF9F6] border border-[#121214]/10 p-1 flex items-center justify-center">
                  <img src={fueraLogo} alt="FUERA" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-xl tracking-[0.18em] text-[#121214]" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    FUERA
                  </span>
                  <span className="text-[9px] font-mono tracking-widest text-[#121214]/50 uppercase">
                    TWO BRANCHES • ONE FUERA
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#121214]/70 leading-relaxed max-w-sm">
                Koramangala 5th Block, Bangalore, Karnataka 560068, India
              </p>
              <p className="text-xs text-[#121214]/60 leading-relaxed">
                Operating with two specialized departments: FUERA Tech Solutions (digital software &amp; web architecture) and FUERA Digital Marketing (SEO, performance ads &amp; branding).
              </p>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://instagram.com/fuera.official.23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#FAF9F6] border border-[#121214]/10 flex items-center justify-center text-[#121214] hover:text-[#E6002A] transition-colors"
                >
                  <Instagram size={15} />
                </a>
                <a
                  href="mailto:fuera.solutions.23@gmail.com"
                  className="w-8 h-8 rounded-lg bg-[#FAF9F6] border border-[#121214]/10 flex items-center justify-center text-[#121214] hover:text-[#E6002A] transition-colors"
                >
                  <Mail size={15} />
                </a>
                <a
                  href="tel:+919449658382"
                  className="w-8 h-8 rounded-lg bg-[#FAF9F6] border border-[#121214]/10 flex items-center justify-center text-[#121214] hover:text-[#E6002A] transition-colors"
                >
                  <Phone size={15} />
                </a>
              </div>
            </div>

            {/* Col 3: Department 01 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#121214] mb-4 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#121214]" />
                01 Tech Solutions
              </h4>
              <ul className="space-y-2 text-xs text-[#121214]/70">
                <li><button onClick={() => scrollTo("tech-solutions")} className="hover:text-[#E6002A]">Website Development</button></li>
                <li><button onClick={() => scrollTo("tech-solutions")} className="hover:text-[#E6002A]">Custom Web Software</button></li>
                <li><button onClick={() => scrollTo("tech-solutions")} className="hover:text-[#E6002A]">E-Commerce Engines</button></li>
                <li><button onClick={() => scrollTo("tech-solutions")} className="hover:text-[#E6002A]">Speed &amp; Core Web Vitals</button></li>
                <li><button onClick={() => scrollTo("tech-solutions")} className="hover:text-[#E6002A]">API &amp; Cloud Infra</button></li>
              </ul>
            </div>

            {/* Col 4: Department 02 */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#121214] mb-4 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E6002A]" />
                02 Digital Marketing
              </h4>
              <ul className="space-y-2 text-xs text-[#121214]/70">
                <li>
                  <button
                    onClick={() => navigate("/digital-marketing")}
                    className="font-bold text-[#E6002A] hover:underline flex items-center gap-1 cursor-pointer text-left"
                  >
                    <span>★ Interactive Studio Reel</span>
                    <ArrowRight size={11} />
                  </button>
                </li>
                <li><button onClick={() => scrollTo("digital-marketing")} className="hover:text-[#E6002A]">Google SEO &amp; Local Maps</button></li>
                <li><button onClick={() => scrollTo("digital-marketing")} className="hover:text-[#E6002A]">Performance Ads (Meta &amp; Google)</button></li>
                <li><button onClick={() => scrollTo("digital-marketing")} className="hover:text-[#E6002A]">Brand Design Systems</button></li>
                <li><button onClick={() => scrollTo("digital-marketing")} className="hover:text-[#E6002A]">Content &amp; Viral Reels</button></li>
                <li><button onClick={() => scrollTo("digital-marketing")} className="hover:text-[#E6002A]">Review Scanner</button></li>
              </ul>
            </div>

            {/* Col 5: Company & Quick Links */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#121214] mb-4 font-mono">
                Company
              </h4>
              <ul className="space-y-2 text-xs text-[#121214]/70">
                <li><button onClick={() => scrollTo("leadership")} className="hover:text-[#E6002A]">Executive Leadership</button></li>
                <li><button onClick={() => scrollTo("synergy-matrix")} className="hover:text-[#E6002A]">Synergy Matrix</button></li>
                <li><button onClick={() => navigate("/case-studies")} className="hover:text-[#E6002A]">Case Studies Archive</button></li>
                <li><button onClick={() => navigate("/privacy")} className="hover:text-[#E6002A]">Privacy Policy</button></li>
                <li><button onClick={() => navigate("/terms")} className="hover:text-[#E6002A]">Terms of Service</button></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#121214]/50">
            <div>© 2026 FUERA Tech Solutions. All rights reserved.</div>
            <div className="flex items-center gap-6">
              <span>Bangalore, Karnataka 560068</span>
              <span>•</span>
              <button onClick={replayIntro} className="hover:text-[#E6002A] transition-colors">
                Replay Brand Intro
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* ── 11. INTERACTIVE CONSULTATION / PROJECT ENQUIRY MODAL ── */}
      <AnimatePresence>
        {enquiryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#121214]/60 backdrop-blur-sm"
              onClick={() => setEnquiryModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative z-10 w-full max-w-lg bg-[#FAF9F6] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#121214]/10 text-left"
            >
              <button
                onClick={() => setEnquiryModalOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white border border-[#121214]/10 hover:bg-[#121214] hover:text-white flex items-center justify-center text-[#121214] transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>

              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#E6002A]" />
                <span className="text-xs uppercase font-mono font-bold tracking-wider text-[#E6002A]">
                  Direct Project Inquiry
                </span>
              </div>
              <h3 className="text-2xl font-black text-[#121214] mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Start Your Engagement
              </h3>
              <p className="text-xs text-[#121214]/70 mb-5">
                Our Bangalore team will review your requirements and provide an engineering &amp; growth proposal within 24 hours.
              </p>

              {formSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                    <CheckCircle size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-[#121214]">Consultation Request Received</h4>
                  <p className="text-xs text-[#121214]/70 max-w-sm mx-auto">
                    Thank you. The FUERA leadership team in Bangalore has received your project details and will connect with you promptly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setEnquiryModalOpen(false);
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-[#121214] text-white text-xs font-bold uppercase tracking-wider"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-3.5"
                >
                  {/* Department Selector */}
                  <div>
                    <label className="text-xs font-semibold text-[#121214] block mb-1">
                      Target Department *
                    </label>
                    <select
                      value={selectedDeptForEnquiry}
                      onChange={(e) => setSelectedDeptForEnquiry(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#121214]/15 bg-white text-xs font-medium focus:outline-none focus:border-[#E6002A]"
                    >
                      <option value="Both Departments (Full Spectrum Integration)">Both Departments (Tech + Marketing Integration)</option>
                      <option value="Department 01 — FUERA Tech Solutions">Department 01 — FUERA Tech Solutions (Web &amp; Software)</option>
                      <option value="Department 02 — FUERA Digital Marketing">Department 02 — FUERA Digital Marketing (SEO &amp; Ads)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-[#121214] block mb-1">Your Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Rohith"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#121214]/15 bg-white text-xs focus:outline-none focus:border-[#E6002A]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-[#121214] block mb-1">Phone / WhatsApp *</label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 94496 58382"
                        className="w-full px-3.5 py-2 rounded-xl border border-[#121214]/15 bg-white text-xs focus:outline-none focus:border-[#E6002A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#121214] block mb-1">Corporate Email *</label>
                    <input
                      required
                      type="email"
                      placeholder="name@company.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-[#121214]/15 bg-white text-xs focus:outline-none focus:border-[#E6002A]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#121214] block mb-1">Project Goals &amp; Scope *</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Outline your website, software, or digital marketing objectives..."
                      className="w-full px-3.5 py-2 rounded-xl border border-[#121214]/15 bg-white text-xs focus:outline-none focus:border-[#E6002A] resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#121214] hover:bg-[#E6002A] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer shadow-xs"
                  >
                    Send Project Inquiry
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
