import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import {
  Menu, X, ChevronDown, ChevronUp, ArrowRight, Phone, Mail, MapPin,
  Instagram, Globe, Facebook, Linkedin, MessageCircle, Check,
  Share2, Target, BarChart2, Search, Code, Palette, TrendingUp,
  Video, Megaphone, Star, Shield, Users, Award, Zap, ChevronLeft, ChevronRight,
  ScanSearch, FileText, Globe2, Rocket, Lock, Wifi, Sun, Moon
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import fueraLogo from "@/imports/image-4.png";
import fueraWordmark from "@/imports/image-7.png";
import EnquiryModal from "./components/ui/EnquiryModal";
import { scrollTo } from "./helpers";
import { useSEO } from "./hooks/useSEO";
import { CASE_STUDIES } from "./data/caseStudiesData";
import { BLOG_POSTS } from "./data/blogData";

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

// ─── DATA ─────────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  {
    label: "Services", href: "#services",
    children: [
      "Website Development", "Social Media Marketing", "Performance Marketing",
      "Meta Ads", "Google Ads", "Google SEO",
      "Branding", "Review Scanner", "Content Creation"
    ]
  },
  { label: "About", href: "/about" },
  { label: "Packages", href: "#packages" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Blog", href: "/blog" },
  { label: "Clients", href: "/clients" },
  { label: "Contact", href: "/contact" },
];

const HERO_SLIDES = [
  {
    tag: "Your Digital Growth Partner",
    heading: "Solutions tailor-crafted to build, rank and grow your business online.",
    sub: "From strategy to execution — FUERA delivers measurable results for every rupee you invest.",
    img: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=1400&h=700&fit=crop&auto=format",
  },
  {
    tag: "Full-Service Digital Agency",
    heading: "Full service from strategy to implementation — diverse expertise, one partner.",
    sub: "Websites, ads, SEO, branding and content — every digital need covered under one roof.",
    img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1400&h=700&fit=crop&auto=format",
  },
  {
    tag: "Data-Driven Results",
    heading: "We dig deep into customer insights and data to define the best path forward.",
    sub: "Every campaign is backed by analytics, optimised continuously, and reported transparently.",
    img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1400&h=700&fit=crop&auto=format",
  },
];

const SERVICES = [
  { icon: Code,         label: "Website Development",     desc: "Premium, fast-loading, mobile-first websites built for performance, conversions and brand trust — free lifetime hosting included.",    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=480&h=360&fit=crop&auto=format" },
  { icon: Share2,       label: "Social Media Marketing",  desc: "Grow brand presence across Instagram, Facebook & LinkedIn with engaging content and targeted campaigns that convert followers to customers.", img: "https://images.unsplash.com/photo-1622549037543-49cf1ca0babc?w=480&h=360&fit=crop&auto=format" },
  { icon: Target,       label: "Performance Marketing",   desc: "Data-driven paid campaigns engineered for maximum ROI and conversion — every rupee tracked, optimised and reported.",                    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=480&h=360&fit=crop&auto=format" },
  { icon: Megaphone,    label: "Meta Ads",                desc: "Facebook & Instagram ad funnels designed to reach your ideal audience and generate quality leads at the lowest possible cost.",           img: "https://images.unsplash.com/photo-1636114673156-052a83459fc1?w=480&h=360&fit=crop&auto=format" },
  { icon: BarChart2,    label: "Google Ads",              desc: "Search, display and YouTube campaigns that put your brand in front of high-intent buyers exactly when they are ready to act.",            img: "https://images.unsplash.com/photo-1616499370260-485b3e5ed653?w=480&h=360&fit=crop&auto=format" },
  { icon: Search,       label: "Google SEO",              desc: "On-page and off-page optimisation plus Google Business Profile setup to rank higher and drive consistent organic traffic.",                img: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=480&h=360&fit=crop&auto=format" },
  { icon: Palette,      label: "Branding",                desc: "Visual identity, logo design and brand strategy that makes your business instantly recognisable and memorable to your audience.",          img: "https://images.unsplash.com/photo-1779261320306-8885b83599ff?w=480&h=360&fit=crop&auto=format" },
  { icon: ScanSearch,   label: "Review Scanner",          desc: "Monitor, manage and respond to customer reviews across Google and social platforms to protect and strengthen your reputation.",             img: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=480&h=360&fit=crop&auto=format" },
  { icon: FileText,     label: "Content Creation",        desc: "Scroll-stopping reels, ad creatives, graphics and copy crafted to build authority and drive real engagement for your brand.",             img: "https://images.unsplash.com/photo-1625690303837-654c9666d2d0?w=480&h=360&fit=crop&auto=format" },
];

const CLIENTS = [
  { name: "Namma Sihii Mane", sub: "E-Commerce", logo: "/logos/sihii.jpg", url: "https://nammasihiisweets.netlify.app/" },
  { name: "Sri Raghavendra Vaibhava", sub: "F&B Brand", logo: "/logos/raghavendra.png", url: "https://sriraghavendravaibhava.vercel.app" },
  { name: "Emmaus Academy", sub: "Enterprise Software", logo: "/logos/emmaus.png", url: "https://emmaus-erp-fuera.onrender.com/" },
  { name: "Pulse Intelligence", sub: "B2B SaaS", logo: "/logos/pulse.png", url: "https://pulse-ai-engine.onrender.com/" },
  { name: "FinGuard Solutions", sub: "Risk Management", logo: "/logos/finguard.png", url: "https://finguard-fuera.vercel.app/" },
  { name: "Nexus Telecom", sub: "Data Science", logo: "/logos/nexus.png", url: "https://nexus-telecom-fuera.onrender.com/" },
  { name: "OutboundFlow", sub: "Marketing Tech", logo: "/logos/outboundflow.png", url: "https://outboundflow-fuera.vercel.app/" },
  { name: "CoinWave", sub: "Crypto Dashboard", logo: "/logos/coinwave.svg", url: "https://coinwave-fuera.vercel.app/" },
  { name: "Zenith Tasks", sub: "Productivity App", logo: "/logos/zenith.svg", url: "https://zenith-tasks-fuera.vercel.app/" },
  { name: "Aira Conversational AI", sub: "Conversational AI", logo: "/logos/aira.png", url: "https://aira-ai-fuera.streamlit.app/" },
];

const DIFFERENTIATORS = [
  { icon: Globe2,  title: "Lifetime Hosting",         desc: "Every website we build comes with free lifetime hosting on Netlify or Vercel — no recurring server bills, ever." },
  { icon: Zap,     title: "Fast & Secure Websites",   desc: "SSL-secured, lightning-fast websites built with best-in-class performance so customers trust and stay on your site." },
  { icon: Wifi,    title: "Mobile Optimised",          desc: "Every pixel is designed mobile-first so your website looks and works perfectly on every screen size." },
  { icon: Search,  title: "SEO Ready",                 desc: "All websites ship with an SEO-friendly structure and Google setup baked in — your rankings start climbing from day one." },
  { icon: Rocket,  title: "Business Growth Solutions", desc: "From ads to reels to reputation management, we cover every channel your business needs to grow consistently online." },
  { icon: Shield,  title: "Dedicated Support",         desc: "A real team that responds fast. We are always available to fix, update, and optimise everything we build for you." },
];

const TESTIMONIALS = [
  {
    name: "Rohan Mehta",
    company: "RetailX Bangalore",
    text: "Working with FUERA has been a game-changer for our retail brand. Their Google Ads strategy tripled our inbound enquiries within two months. Highly recommend the team.",
    stars: 5,
  },
  {
    name: "Priya Sharma",
    company: "HealthPro Clinics",
    text: "FUERA built our website and ran our Meta Ads. The leads we get now are genuinely qualified. The team is transparent, responsive and truly invested in our growth.",
    stars: 5,
  },
  {
    name: "Arjun Nair",
    company: "EduTech Solutions",
    text: "Since partnering with FUERA for SEO and social media, our organic traffic has doubled and our Instagram engagement is at an all-time high. Outstanding work.",
    stars: 5,
  },
];

const INSIGHTS = [
  { icon: Users, title: "Clients", desc: "Our marketing and technology expertise has helped clients achieve consistent growth and strong online presence.", cta: "Know More", route: "/clients" },
  { icon: Award, title: "Case Studies", desc: "Detailed breakdowns of how our clients have scaled their business using FUERA's digital strategies.", cta: "Know More", route: "/case-studies" },
  { icon: Zap, title: "Careers", desc: "Join a forward-thinking team that values creativity, data, and impact. We are always looking for hungry talent.", cta: "Know More", route: "/careers" },
];

const FAQS = [
  { q: "What services does FUERA offer?", a: "FUERA offers Website Development, Social Media Marketing, Performance Marketing, Meta Ads, Google Ads, Google SEO, Branding, Review Scanner, and Content Creation — everything your business needs to grow online." },
  { q: "What is included in the Basic Package (₹5,999)?", a: "The Basic package includes a company website, free lifetime hosting on Netlify or Vercel, WhatsApp integration, mobile responsive design, SSL security, a contact form, and basic support." },
  { q: "What does the Standard Package (₹14,999) include?", a: "The Standard package includes everything in Basic plus a custom design, SEO-friendly structure, Google SEO setup, Google Business Profile optimisation, CRUD operations, basic branding support, and WhatsApp or Instagram integration. Valuable customers receive 5% off." },
  { q: "What is in the Premium Package (₹28,999)?", a: "The Premium package is the complete growth solution — everything in Standard plus a fully custom website, custom domain (.com / .in), advanced Google SEO, Instagram Reels (2 per month), Review Scanner, Meta Ads or Google Ads, professional ad creation and video editing, and a monthly performance report. Valuable customers receive 5% off." },
  { q: "How long does it take to build a website?", a: "A standard website typically takes 7–14 business days from the time we receive your content and approvals. Premium custom builds may take 3–4 weeks. We keep you informed at every stage." },
  { q: "How can I get started with FUERA?", a: "Simply reach out via our contact form, email contact@fuera.in.net, or call 9449658382. We will schedule a free discovery call to recommend the best package for your business." },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────



// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function FueraLogo({ white = false }: { white?: boolean }) {
  return (
    <div
      className="cursor-pointer shrink-0 flex items-center overflow-hidden"
      style={{ background: "#000", borderRadius: "6px", opacity: white ? 0.92 : 1 }}
      onClick={() => scrollTo("#home")}
    >
      {/* eagle icon */}
      <img
        src={fueraLogo}
        alt=""
        aria-hidden="true"
        style={{ height: "54px", width: "auto", objectFit: "contain", display: "block", flexShrink: 0 }}
      />
      {/* wordmark + tagline — black bg merges with eagle */}
      <img
        src={fueraWordmark}
        alt="FUERA — Powered by AK GROUPS"
        style={{ height: "54px", width: "auto", objectFit: "contain", display: "block", flexShrink: 0, marginLeft: "-6px" }}
      />
    </div>
  );
}

function OrangeBtn({ children, onClick, outline = false, sm = false }: any) {
  return (
    <button onClick={onClick}
      className={`inline-flex items-center gap-2 font-semibold transition-all duration-200 ${sm ? "px-5 py-2 text-sm" : "px-7 py-3 text-sm"} ${outline ? "border-2 border-white/30 text-white hover:bg-white hover:text-black" : "bg-[#111111] border border-white/20 text-white hover:bg-[#2a2a2a] shadow-sm hover:shadow-md"}`}
      style={{ fontFamily: "'Poppins', sans-serif", borderRadius: "4px" }}>
      {children}
    </button>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  useSEO({
    title: "FUERA | Digital Marketing & Website Development Agency",
    description: "FUERA helps businesses grow online with website development, SEO, social media marketing, branding, paid ads, content creation, and performance marketing services.",
    path: "/"
  });

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => (t === "dark" ? "light" : "dark"));
  };
  const [heroSlide, setHeroSlide] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Calculate rotation angle (max 12 degrees)
    const rotateX = -(mouseY / (height / 2)) * 12;
    const rotateY = (mouseX / (width / 2)) * 12;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleCardMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // 3D Canvas Particle Network Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // 3D Points definition
    interface Point3D {
      x: number;
      y: number;
      z: number;
      px: number;
      py: number;
    }

    const points: Point3D[] = [];
    const numPoints = 85;
    const fov = 250; // Perspective depth

    for (let i = 0; i < numPoints; i++) {
      points.push({
        x: (Math.random() - 0.5) * 600,
        y: (Math.random() - 0.5) * 600,
        z: Math.random() * 600,
        px: 0,
        py: 0
      });
    }

    let angleX = 0.0008;
    let angleY = 0.0012;

    // Mouse rotation interactive offset
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - width / 2) * 0.0004;
      mouseY = (e.clientY - rect.top - height / 2) * 0.0004;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const rotateX = (point: Point3D, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const y1 = point.y * cos - point.z * sin;
      const z1 = point.z * cos + point.y * sin;
      point.y = y1;
      point.z = z1;
    };

    const rotateY = (point: Point3D, angle: number) => {
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x1 = point.x * cos - point.z * sin;
      const z1 = point.z * cos + point.x * sin;
      point.x = x1;
      point.z = z1;
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Rotate points
      const currentAngleX = angleX + mouseY;
      const currentAngleY = angleY + mouseX;

      points.forEach(p => {
        rotateX(p, currentAngleX);
        rotateY(p, currentAngleY);

        // Project to 2D
        const scale = fov / (fov + p.z);
        p.px = p.x * scale + width / 2;
        p.py = p.y * scale + height / 2;
      });

      // Draw lines between close points
      ctx.lineWidth = 0.5;
      for (let i = 0; i < points.length; i++) {
        const p1 = points[i];
        if (p1.px < 0 || p1.px > width || p1.py < 0 || p1.py > height) continue;

        for (let j = i + 1; j < points.length; j++) {
          const p2 = points[j];
          if (p2.px < 0 || p2.px > width || p2.py < 0 || p2.py > height) continue;

          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.18;
            ctx.strokeStyle = `rgba(232, 28, 46, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw points
      points.forEach(p => {
        if (p.px < 0 || p.px > width || p.py < 0 || p.py > height) return;
        const scale = fov / (fov + p.z);
        const radius = Math.max(0.5, scale * 1.8);
        ctx.fillStyle = p.z < 0 ? "rgba(232, 28, 46, 0.75)" : "rgba(255, 255, 255, 0.35)";
        ctx.beginPath();
        ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-advance hero
  useEffect(() => {
    const t = setInterval(() => setHeroSlide(s => (s + 1) % HERO_SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  // Close dropdown on outside click
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
    <main className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── TOP BAR ── */}
      <div className="bg-black text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="mailto:contact@fuera.in.net" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
              <Mail size={12} /> contact@fuera.in.net
            </a>
            <a href="tel:9449658382" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
              <Phone size={12} /> 9449658382 / 7899945862
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a href="https://instagram.com/fuera.official.23" target="_blank" rel="noreferrer" className="hover:text-white/80 transition-colors"><Instagram size={13} /></a>
            <a href="#" className="hover:text-white/80 transition-colors"><Facebook size={13} /></a>
            <a href="#" className="hover:text-white/80 transition-colors"><Linkedin size={13} /></a>
            <a href="https://wa.me/919449658382?text=Hi+FUERA%2C+I%27m+interested+in+your+services" target="_blank" rel="noreferrer"
              className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-0.5 rounded-sm text-xs font-medium transition-colors">
              <MessageCircle size={11} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* ── HEADER ── */}
      <header className={`sticky top-0 z-50 bg-black transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm"} border-b border-white/5`}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16">
          <FueraLogo />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              item.children ? (
                <div key={item.label} className="relative" ref={dropdownRef}>
                  <button
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white hover:text-white transition-colors"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                    onClick={() => setServicesOpen(v => !v)}>
                    {item.label}
                    {servicesOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-56 bg-black border border-white/10 shadow-xl rounded-sm z-50 py-2">
                        {item.children.map(c => (
                          <button key={c} onClick={() => { setServicesOpen(false); navigate(`/services/${slugify(c)}`); }}
                            className="w-full text-left px-5 py-2 text-sm text-[#c0c0c0] hover:bg-[#1c1c20] hover:text-white transition-colors"
                            style={{ fontFamily: "'Inter', sans-serif" }}>
                            {c}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button key={item.label} onClick={() => handleNav(item.href)}
                  className="px-4 py-2 text-sm font-medium text-white hover:text-white transition-colors"
                  style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {item.label}
                </button>
              )
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-3">
              <OrangeBtn onClick={() => setModalOpen(true)} sm>Send Enquiry</OrangeBtn>
            </div>

            {/* Theme Toggle (Mobile & Desktop) */}
            <button onClick={toggleTheme}
              className="p-2 text-white/80 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center"
              aria-label="Toggle theme">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button aria-label="Toggle mobile menu" className="lg:hidden p-2 text-white" onClick={() => setMenuOpen(v => !v)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-white/5 bg-black">
              <div className="px-5 py-4 flex flex-col gap-1">
                {NAV_ITEMS.map(item => (
                  <button key={item.label} onClick={() => handleNav(item.href || "#")}
                    className="text-left px-3 py-2.5 text-sm font-medium text-white hover:bg-secondary rounded-sm transition-colors"
                    style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {item.label}
                  </button>
                ))}
                <div className="pt-2">
                  <OrangeBtn onClick={() => { setMenuOpen(false); setModalOpen(true); }}>Send Enquiry</OrangeBtn>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <EnquiryModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* ── HERO SLIDER (3D Animation Integrated) ── */}
      <section id="home" className="relative h-[92vh] min-h-[600px] overflow-hidden flex items-center bg-[#070709] border-b border-white/5">
        {/* Background Canvas for 3D Particles */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-10" />

        {/* Slide background image transitions */}
        {HERO_SLIDES.map((slide, i) => (
          <div key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${i === heroSlide ? "opacity-35" : "opacity-0"}`}>
            <img src={slide.img} alt={slide.heading} className="w-full h-full object-cover" loading={i === 0 ? "eager" : "lazy"} />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/30" />
          </div>
        ))}

        <div className="relative h-full w-full max-w-7xl mx-auto px-5 md:px-10 grid lg:grid-cols-12 gap-12 items-center z-20">
          {/* Left Column: Rotating Slide Texts */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            <AnimatePresence mode="wait">
              <motion.div key={heroSlide}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl">
                <span className="inline-block bg-[#e81c2e]/10 border border-[#e81c2e]/30 text-[#e81c2e] text-xs font-semibold px-4 py-1.5 mb-4 uppercase tracking-widest rounded-full"
                  style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {HERO_SLIDES[heroSlide].tag}
                </span>
                <h1 className="text-white mb-5 leading-tight font-extrabold"
                  style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 4vw, 3rem)" }}>
                  {HERO_SLIDES[heroSlide].heading}
                </h1>
                <p className="text-white/60 mb-8 text-base md:text-lg max-w-lg leading-relaxed">
                  {HERO_SLIDES[heroSlide].sub}
                </p>
                <div className="flex flex-wrap gap-4">
                  <OrangeBtn onClick={() => scrollTo("#services")}>
                    Explore More <ArrowRight size={15} />
                  </OrangeBtn>
                  <button onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-2 border-2 border-white/20 text-white text-sm font-semibold px-7 py-3 hover:bg-white hover:text-black hover:border-white transition-all rounded-md cursor-pointer"
                    style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Get a Free Quote
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: 3D Perspective Tilt Card */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              className="relative w-full max-w-[390px] aspect-[4/5] rounded-[2rem] border border-white/10 bg-[#111115]/50 backdrop-blur-xl shadow-2xl p-8 flex flex-col justify-between transition-transform duration-200 ease-out select-none cursor-pointer"
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transformStyle: "preserve-3d"
              }}
            >
              {/* Parallax Layer 1: Floating background gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#e81c2e]/10 to-transparent rounded-[2rem] pointer-events-none opacity-40" />

              {/* Parallax Layer 2: Card Header */}
              <div className="flex justify-between items-start" style={{ transform: "translateZ(35px)" }}>
                <div>
                  <span className="text-[#e81c2e] text-[10px] font-black uppercase tracking-widest">FUERA Engine</span>
                  <h3 className="text-white text-lg font-bold mt-1" style={{ fontFamily: "'Poppins', sans-serif" }}>Growth Analytics</h3>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              </div>

              {/* Parallax Layer 3: Main 3D Metric Display */}
              <div className="my-auto py-4 text-center flex flex-col items-center justify-center" style={{ transform: "translateZ(65px)" }}>
                <div className="relative inline-flex items-center justify-center p-6 bg-gradient-to-b from-white/5 to-transparent border border-white/5 rounded-full mb-4 w-28 h-28">
                  {/* Rotating outer ring */}
                  <div className="absolute inset-0 rounded-full border-t border-[#e81c2e] animate-spin" style={{ animationDuration: '4s' }} />
                  <span className="text-white text-2xl font-black font-sans">+380%</span>
                </div>
                <p className="text-white/80 text-sm font-semibold">Average Lead Generation Boost</p>
                <p className="text-white/40 text-xs mt-1">Real-time performance index</p>
              </div>

              {/* Parallax Layer 4: Floating Mini Badge */}
              <div 
                className="absolute top-1/4 -right-6 bg-black border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-xl"
                style={{ transform: "translateZ(85px)" }}
              >
                <Zap size={14} className="text-[#e81c2e] fill-[#e81c2e]" />
                <span className="text-white text-[10px] font-bold uppercase tracking-wider">AI Optimized</span>
              </div>

              {/* Parallax Layer 5: Card Footer */}
              <div className="flex justify-between items-center border-t border-white/5 pt-4" style={{ transform: "translateZ(45px)" }}>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#e81c2e]" />
                  <span className="text-white/50 text-[10px] uppercase font-mono">Active Optimization</span>
                </div>
                <span className="text-white/30 text-[9px] uppercase font-mono">v4.1.2</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Slide dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setHeroSlide(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === heroSlide ? "bg-[#e81c2e] w-8" : "bg-white/20"}`} />
          ))}
        </div>

        {/* Arrows */}
        <button aria-label="Previous slide" onClick={() => setHeroSlide(s => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center rounded-full transition-colors z-20">
          <ChevronLeft size={20} />
        </button>
        <button aria-label="Next slide" onClick={() => setHeroSlide(s => (s + 1) % HERO_SLIDES.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/5 hover:bg-white/10 text-white flex items-center justify-center rounded-full transition-colors z-20">
          <ChevronRight size={20} />
        </button>
      </section>

      {/* ── ABOUT INTRO ── */}
      <section id="about" className="py-20 bg-[#0d0d0f]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">

          {/* top: text + image */}
          <div className="grid md:grid-cols-2 gap-14 items-center mb-20">
            <div>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                About FUERA
              </p>
              <h2 className="text-white font-bold leading-tight mb-5"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3.5vw, 2.5rem)" }}>
                Innovative Digital Solutions<br />for the Growth Age
              </h2>
              <p className="text-white/55 mb-4 leading-relaxed text-sm">
                FUERA was founded with a single mission — help businesses establish a powerful online presence and generate quality leads. Based in Koramangala, Bangalore, we are a team of strategists, designers, marketers and developers who are passionate about growth.
              </p>
              <p className="text-white/55 mb-8 leading-relaxed text-sm">
                We work closely with startups and small businesses to understand their goals, craft data-backed strategies, and execute campaigns that deliver real, measurable results — from concept and branding to websites, digital advertising, and ongoing optimisation.
              </p>
              <OrangeBtn onClick={() => scrollTo("#packages")}>
                View Our Packages <ArrowRight size={15} />
              </OrangeBtn>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=700&h=500&fit=crop&auto=format"
                alt="FUERA team working on digital strategy"
                className="w-full rounded-xl shadow-2xl object-cover"
                style={{ aspectRatio: "4/3" }}
                loading="lazy"
              />
              <div className="absolute -bottom-5 -left-5 bg-black border border-white/10 text-white p-5 rounded-lg shadow-xl">
                <div className="text-3xl font-black" style={{ fontFamily: "'Poppins', sans-serif" }}>50+</div>
                <div className="text-xs text-white/50 uppercase tracking-widest mt-0.5">Happy Clients</div>
              </div>
              <div className="absolute -top-5 -right-5 bg-black border border-white/10 text-white p-5 rounded-lg shadow-xl">
                <div className="text-3xl font-black" style={{ fontFamily: "'Poppins', sans-serif" }}>100%</div>
                <div className="text-xs text-white/50 uppercase tracking-widest mt-0.5">Premium Quality</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-20 bg-[#1c1c20]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-14">
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              What We Offer
            </p>
            <h2 className="text-white font-bold mb-3"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
              Explore Our Services
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              End-to-end digital marketing services designed to put your business where your customers are searching, scrolling, and deciding.
            </p>
          </div>
          <style>{`
            .service-3d {
              perspective: 900px;
            }
            .service-3d-inner {
              transition: transform 0.45s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.45s ease;
              transform-style: preserve-3d;
              transform: rotateX(0deg) rotateY(0deg) translateZ(0);
              box-shadow: 6px 10px 28px rgba(0,0,0,0.5), 0 2px 6px rgba(255,255,255,0.04);
            }
            .service-3d:hover .service-3d-inner {
              transform: rotateX(-6deg) rotateY(6deg) translateZ(18px);
              box-shadow: 18px 28px 52px rgba(0,0,0,0.6), 0 6px 18px rgba(255,255,255,0.06);
            }
            .service-3d-face {
              backface-visibility: hidden;
            }
            .service-3d-inner::after {
              content: '';
              position: absolute;
              inset: 0;
              background: linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 60%);
              pointer-events: none;
              border-radius: inherit;
              opacity: 0;
              transition: opacity 0.35s;
            }
            .service-3d:hover .service-3d-inner::after {
              opacity: 1;
            }
          `}</style>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {SERVICES.map((s) => (
              <div key={s.label} className="service-3d cursor-default">
                <div className="relative">
                  {/* stacked depth layers */}
                  <div className="absolute -bottom-2 -right-2 left-2 h-full rounded-xl bg-[#2a2a2e]" style={{ filter: "blur(3px)" }} />
                  <div className="absolute -bottom-4 -right-4 left-4 h-full rounded-xl bg-[#1e1e22]" style={{ filter: "blur(5px)", opacity: 0.6 }} />

                  <div
                    className="service-3d-inner service-3d-face relative rounded-xl overflow-hidden border border-[rgba(255,255,255,0.09)] group"
                    style={{
                      minHeight: "268px",
                      background: "#08080c",
                    }}
                  >
                    {/* Lazy-loaded background image */}
                    <img
                      src={s.img}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                      style={{ opacity: 0.32 }}
                    />
                    {/* dark desaturating overlay — photo reads as texture */}
                    <div className="absolute inset-0" style={{ background: "rgba(8,8,12,0.68)" }} />
                    {/* red diagonal tint */}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)" }} />
                    {/* bottom vignette for text */}
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(8,8,12,0.5) 55%, rgba(8,8,12,0.96) 100%)" }} />
                    {/* hover red glow */}
                    <div className="absolute -top-8 -left-8 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%)" }} />
                    {/* top shimmer */}
                    <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent 10%, rgba(255,255,255,0.2) 50%, transparent 90%)" }} />

                    {/* content */}
                    <div className="relative z-10 flex flex-col gap-3 p-6 h-full">
                      <div
                        className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                        style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
                      >
                        <s.icon size={19} className="text-white" />
                      </div>
                      <h3
                        className="text-white font-semibold text-sm leading-snug mt-1"
                        style={{ fontFamily: "'Poppins', sans-serif", textShadow: "0 2px 12px rgba(0,0,0,1)" }}
                      >
                        {s.label}
                      </h3>
                      <p
                        className="text-white/55 group-hover:text-white/82 text-xs leading-relaxed transition-colors duration-300 line-clamp-3"
                        style={{ textShadow: "0 1px 8px rgba(0,0,0,1)" }}
                      >
                        {s.desc}
                      </p>
                      <button
                        onClick={() => navigate(`/services/${slugify(s.label)}`)}
                        className="text-xs font-semibold text-white flex items-center gap-1 mt-auto group-hover:gap-2 transition-all duration-300 cursor-pointer"
                        style={{ fontFamily: "'Poppins', sans-serif" }}
                      >
                        Explore More <ArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ── */}
      <section id="packages" className="py-20 bg-[#0d0d0f]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-14">
            <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Transparent Pricing
            </p>
            <h2 className="text-white font-bold mb-3"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}>
              Our Packages
            </h2>
            <p className="text-white/50 max-w-md mx-auto text-sm">
              Simple, all-inclusive packages for every stage of growth. No hidden fees.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">

            {/* ── BASIC ── */}
            <div className="flex flex-col border border-white/10 rounded-xl p-7 bg-[#111114] hover:border-white/20 transition-all duration-300">
              <div className="mb-5">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-white/50 mb-4 block" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  🚀 Basic Package
                </span>
                <div className="text-white font-black leading-none mb-1" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "2.6rem" }}>
                  ₹5,999
                </div>
                <p className="text-white/45 text-xs mt-2">Perfect for startups &amp; personal businesses</p>
              </div>
              <div className="h-px bg-white/8 mb-5" />
              <ul className="space-y-2.5 flex-1 mb-7">
                {[
                  "Company Website",
                  "Free Lifetime Hosting (Netlify/Vercel)",
                  "WhatsApp Integration",
                  "Mobile Responsive Design",
                  "SSL Security",
                  "Contact Form",
                  "Basic Support",
                ].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                    <Check size={13} className="text-white/60 mt-0.5 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <OrangeBtn outline onClick={() => setModalOpen(true)}>Get Started</OrangeBtn>
            </div>

            {/* ── STANDARD ── */}
            <div className="flex flex-col border border-white/25 rounded-xl p-7 bg-[#161619] relative hover:border-white/40 transition-all duration-300 shadow-xl">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                <span className="bg-white text-black text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest whitespace-nowrap"
                  style={{ fontFamily: "'Poppins', sans-serif" }}>
                  ⭐ Most Popular
                </span>
              </div>
              <div className="mb-5 mt-1">
                <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4 block" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  ⭐ Standard Package
                </span>
                <div className="text-white font-black leading-none mb-1" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "2.6rem" }}>
                  ₹14,999
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-white/40 line-through">₹15,788</span>
                  <span className="text-[10px] bg-white/10 text-white/70 px-2 py-0.5 rounded-full font-semibold">5% OFF for Valuable Customers</span>
                </div>
                <p className="text-white/45 text-xs mt-2">Professional online presence, complete.</p>
              </div>
              <div className="h-px bg-white/10 mb-5" />
              <ul className="space-y-2.5 flex-1 mb-7">
                {[
                  "Company Website with Custom Design",
                  "SEO-Friendly Structure",
                  "Google SEO Setup",
                  "Google Business Profile Optimization",
                  "Free Lifetime Hosting (Netlify/Vercel)",
                  "CRUD Operations",
                  "Basic Branding Support",
                  "WhatsApp or Instagram Integration",
                  "Responsive Website",
                  "Fast Loading Performance",
                ].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                    <Check size={13} className="text-white/60 mt-0.5 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <OrangeBtn onClick={() => setModalOpen(true)}>Get Started <ArrowRight size={14} /></OrangeBtn>
            </div>

            {/* ── PREMIUM ── */}
            <div className="flex flex-col border border-white/10 rounded-xl p-7 bg-[#111114] hover:border-white/20 transition-all duration-300">
              <div className="mb-5">
                <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4 block" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  👑 Premium Package
                </span>
                <div className="text-white font-black leading-none mb-1" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "2.6rem" }}>
                  ₹28,999
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs text-white/40 line-through">₹30,525</span>
                  <span className="text-[10px] bg-white/10 text-white/70 px-2 py-0.5 rounded-full font-semibold">5% OFF for Valuable Customers</span>
                </div>
                <p className="text-white/45 text-xs mt-2">Complete digital growth solution.</p>
              </div>
              <div className="h-px bg-white/8 mb-5" />
              <ul className="space-y-2.5 flex-1 mb-7">
                {[
                  "Everything in Standard Package",
                  "Premium & Fully Custom Website",
                  "Custom Domain (.com / .in)",
                  "Premium Hosting Setup",
                  "Advanced Google SEO Optimization",
                  "Instagram Reels (2 Reels)",
                  "Review Scanner",
                  "Meta Ads or Google Ads",
                  "Professional Ad Creation & Video Editing",
                  "Monthly Performance Report",
                  "WhatsApp or Instagram Integration",
                ].map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-white/70">
                    <Check size={13} className="text-white/60 mt-0.5 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <OrangeBtn outline onClick={() => setModalOpen(true)}>Get Started</OrangeBtn>
            </div>

          </div>
        </div>
      </section>

      {/* ── COLLABORATIONS GRID ── */}
      <section id="clients" className="py-20 bg-[#0d0d0f]">
        <div className="max-w-6xl mx-auto px-5 md:px-10">
          <div className="text-center mb-12">
            <p className="text-white text-xs font-semibold uppercase tracking-[0.3em] mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Our Most Successful
            </p>
            <h2 className="text-white font-bold" style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)" }}>
              Collaborations
            </h2>
          </div>

          {/* bordered table-grid matching image-3 layout */}
          <div className="border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5" style={{ borderCollapse: "collapse" }}>
              {CLIENTS.map((c, i) => (
                <a
                  key={i}
                  href={(c as any).url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center gap-1.5 px-4 py-8 bg-[#111115] hover:bg-[#17171c] transition-colors duration-200 cursor-pointer"
                  style={{
                    borderRight: (i + 1) % 5 !== 0 ? "1px solid rgba(255,255,255,0.06)" : "none",
                    borderBottom: i < CLIENTS.length - 5 ? "1px solid rgba(255,255,255,0.06)" : "none",
                  }}
                >
                  {/* coloured monogram circle or logo badge */}
                  {(c as any).logo ? (
                    <img
                      src={(c as any).logo}
                      alt={`${c.name} logo`}
                      className="w-14 h-14 rounded-full mb-2 transition-transform duration-300 group-hover:scale-110 shrink-0 object-cover border border-white/10 shadow-lg bg-[#111115]"
                    />
                  ) : (
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center mb-2 transition-transform duration-300 group-hover:scale-110 shrink-0"
                      style={{
                        background: `hsl(${(i * 43 + 12) % 360}, 38%, 16%)`,
                        border: `1.5px solid hsl(${(i * 43 + 12) % 360}, 42%, 28%)`,
                        boxShadow: `0 0 16px hsl(${(i * 43 + 12) % 360}, 50%, 18%)`,
                      }}
                    >
                      <span
                        className="text-base font-bold tracking-wide"
                        style={{
                          fontFamily: "'Poppins', sans-serif",
                          color: `hsl(${(i * 43 + 12) % 360}, 60%, 72%)`,
                        }}
                      >
                        {c.name.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                  )}

                  {/* name */}
                  <p
                    className="text-white/75 group-hover:text-white text-xs font-semibold text-center leading-tight transition-colors"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {c.name}
                  </p>

                  {/* industry pill */}
                  <span
                    className="text-[9px] font-medium uppercase tracking-widest text-white/30 group-hover:text-white transition-colors"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {c.sub}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── DIFFERENTIATORS ── */}
      <section className="py-20 bg-[#1c1c20]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-white text-xs font-bold uppercase tracking-widest mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Why Choose FUERA
              </p>
              <h2 className="text-white font-bold mb-5"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3.5vw, 2.3rem)" }}>
                What Makes Us Stand Out?
              </h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We are not just a digital agency — we are your growth partner. Here is what sets FUERA apart from the rest.
              </p>
              <OrangeBtn onClick={() => setModalOpen(true)}>
                Enquire Now <ArrowRight size={15} />
              </OrangeBtn>
            </div>
            <div className="grid gap-4">
              {DIFFERENTIATORS.map((d, i) => (
                <div key={d.title}
                  className="flex items-start gap-4 bg-[#1a1a1e] border border-border p-5 rounded-sm hover:border-white/40 hover:shadow-sm transition-all group">
                  <div className="w-10 h-10 bg-[#1c1c20] group-hover:bg-[#111111] rounded-full flex items-center justify-center shrink-0 transition-colors">
                    <d.icon size={18} className="text-white group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>{d.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 bg-[#1c1c20]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-12">
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Social Proof
            </p>
            <h2 className="text-white font-bold mb-2"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
              Voice of Our Customers.
            </h2>
            <p className="text-muted-foreground">{"Don't just take our word for it — see what our clients say."}</p>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div key={testimonialIdx}
                initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35 }}
                className="bg-[#1a1a1e] border border-border rounded-sm p-8 md:p-10 shadow-sm">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: TESTIMONIALS[testimonialIdx].stars }).map((_, i) => (
                    <Star key={i} size={16} className="text-white" fill="#ffffff" />
                  ))}
                </div>
                <p className="text-[#c0c0c0] text-base leading-relaxed mb-6 italic">
                  "{TESTIMONIALS[testimonialIdx].text}"
                </p>
                <div>
                  <p className="font-semibold text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {TESTIMONIALS[testimonialIdx].name}
                  </p>
                  <p className="text-xs text-muted-foreground">{TESTIMONIALS[testimonialIdx].company}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center gap-3 mt-6">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} aria-label={`Go to testimonial ${i + 1}`} onClick={() => setTestimonialIdx(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === testimonialIdx ? "bg-[#111111] w-8" : "bg-[#d1d5db]"}`} />
              ))}
            </div>
            <button aria-label="Previous testimonial" onClick={() => setTestimonialIdx(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#1a1a1e] border border-border shadow hover:bg-[#111111] hover:text-white text-white flex items-center justify-center rounded-full transition-colors hidden md:flex">
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => setTestimonialIdx(i => (i + 1) % TESTIMONIALS.length)}
              className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#1a1a1e] border border-border shadow hover:bg-[#111111] hover:text-white text-white flex items-center justify-center rounded-full transition-colors hidden md:flex">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── FEATURED CASE STUDIES ── */}
      <section className="py-20 bg-[#0d0d0f]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-white text-xs font-bold uppercase tracking-widest mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Proven Results
              </p>
              <h2 className="text-white font-bold"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
                Featured Case Studies
              </h2>
            </div>
            <button onClick={() => navigate("/case-studies")} className="text-white/70 hover:text-white text-sm font-semibold flex items-center gap-2 transition-colors">
              View All Case Studies <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {CASE_STUDIES.slice(0, 3).map((cs, i) => (
              <div key={i} className="bg-[#111115] border border-white/10 rounded-sm p-6 hover:border-white/30 transition-all flex flex-col h-full cursor-pointer group" onClick={() => navigate("/case-studies")}>
                <div className="mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-sm bg-white/5 text-white/70 border border-white/10 mb-4 inline-block">{cs.industry}</span>
                  <h3 className="text-white font-bold text-lg mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>{cs.client}</h3>
                  <p className="text-white/40 text-xs">{cs.service}</p>
                </div>
                <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1">
                  {cs.challenge.length > 100 ? cs.challenge.slice(0, 100) + "..." : cs.challenge}
                </p>
                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
                  {cs.results.slice(0, 2).map((r, j) => (
                    <div key={j}>
                      <p className="text-white font-bold text-lg mb-0.5" style={{ color: cs.color }}>{r.val}</p>
                      <p className="text-white/40 text-[10px] uppercase tracking-wider font-semibold">{r.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LATEST FROM THE BLOG ── */}
      <section className="py-20 bg-[#1a1a1e]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-white text-xs font-bold uppercase tracking-widest mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Explore
              </p>
              <h2 className="text-white font-bold"
                style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
                Latest from the Blog
              </h2>
            </div>
            <button onClick={() => navigate("/blog")} className="text-white/70 hover:text-white text-sm font-semibold flex items-center gap-2 transition-colors">
              View All Articles <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {BLOG_POSTS.slice(0, 3).map((post, i) => (
              <div key={post.id}
                className="bg-[#111115] border border-white/10 rounded-sm overflow-hidden hover:border-white/30 transition-all flex flex-col cursor-pointer group"
                onClick={() => navigate(`/blog/${post.slug}`)}>
                
                <div className="h-40 overflow-hidden relative">
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/20 text-white/90 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm z-10">
                    {post.category}
                  </div>
                  <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#c0c0c0] transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {post.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-6 flex-1">
                    {post.summary.length > 100 ? post.summary.slice(0, 100) + "..." : post.summary}
                  </p>
                  
                  <div className="flex items-center gap-2 text-xs font-semibold text-white mt-auto group-hover:gap-3 transition-all" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Read Article <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-[#1c1c20]">
        <div className="max-w-3xl mx-auto px-5 md:px-10">
          <div className="text-center mb-12">
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Got Questions?
            </p>
            <h2 className="text-white font-bold"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
              Discover everything you need to know — FAQs
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <div key={i} className="border border-border bg-[#1a1a1e] rounded-sm overflow-hidden">
                <button
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left text-sm font-semibold text-white hover:bg-[#1c1c20] transition-colors"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}>
                  {faq.q}
                  {faqOpen === i ? <ChevronUp size={16} className="shrink-0 text-white" /> : <ChevronDown size={16} className="shrink-0 text-muted-foreground" />}
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }}
                      transition={{ duration: 0.2 }} className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-20 bg-[#111111] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 70% 50%, rgba(255,255,255,0.06) 0%, transparent 60%)" }} />
        <div className="relative max-w-4xl mx-auto px-5 md:px-10 text-center">
          <h2 className="text-white font-bold mb-4"
            style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}>
            Ready to Transform Your Business?
          </h2>
          <p className="text-white/90 text-base mb-8 max-w-2xl mx-auto leading-relaxed">
            It is time to grow your brand online with data-driven marketing, premium websites, and strategies that actually work.
          </p>
          <button onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-black font-semibold px-9 py-4 rounded-sm text-base transition-all hover:shadow-lg hover:-translate-y-0.5"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            Get Started <ArrowRight size={16} />
          </button>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-20 bg-[#1a1a1e]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-14">
            <p className="text-white text-xs font-bold uppercase tracking-widest mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Reach Out
            </p>
            <h2 className="text-white font-bold"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
              Contact Us
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-14 max-w-5xl mx-auto">
            <div className="space-y-6">
              <ContactRow icon={Phone} label="Phone" value="9449658382 / 7899945862" href="tel:9449658382" />
              <ContactRow icon={Mail} label="Email" value="contact@fuera.in.net" href="mailto:contact@fuera.in.net" />
              <ContactRow icon={MapPin} label="Address" value="#1, Mahayogi Vemana Road, 3rd Block, Koramangala, Bengaluru - 560034" />
              <ContactRow icon={Instagram} label="Instagram" value="@fuera.official.23" href="https://instagram.com/fuera.official.23" />
              <ContactRow icon={Globe} label="Website" value="www.fuera.in.net" href="https://www.fuera.in.net" />
              <div className="pt-4">
                <img
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=280&fit=crop&auto=format"
                  alt="FUERA digital agency workspace"
                  className="w-full rounded-sm object-cover shadow-sm"
                  loading="lazy"
                />
              </div>
            </div>
            <EnquiryForm inline />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#070709] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div>
              <FueraLogo white />
              <p className="text-white/60 text-sm mt-4 leading-relaxed">
                FUERA helps businesses establish a powerful online presence and generate quality leads through strategy-first digital marketing.
              </p>
              <div className="flex gap-3 mt-5">
                <a href="https://instagram.com/fuera.official.23" target="_blank" rel="noreferrer"
                  className="w-8 h-8 bg-[#1a1a1e]/10 hover:bg-[#111111] flex items-center justify-center rounded-full transition-colors">
                  <Instagram size={14} />
                </a>
                <a href="#" className="w-8 h-8 bg-[#1a1a1e]/10 hover:bg-[#111111] flex items-center justify-center rounded-full transition-colors">
                  <Facebook size={14} />
                </a>
                <a href="#" className="w-8 h-8 bg-[#1a1a1e]/10 hover:bg-[#111111] flex items-center justify-center rounded-full transition-colors">
                  <Linkedin size={14} />
                </a>
              </div>
            </div>
            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest text-white/90" style={{ fontFamily: "'Poppins', sans-serif" }}>Services</h4>
              <ul className="space-y-2">
                {SERVICES.map(s => (
                  <li key={s.label}>
                    <button onClick={() => navigate(`/services/${slugify(s.label)}`)}
                      className="text-white/60 hover:text-white text-sm transition-colors text-left">{s.label}</button>
                  </li>
                ))}
              </ul>
            </div>
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest text-white/90" style={{ fontFamily: "'Poppins', sans-serif" }}>Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => scrollTo("#home")} className="text-white/60 hover:text-white text-sm transition-colors text-left">Home</button></li>
                <li><button onClick={() => navigate("/about")} className="text-white/60 hover:text-white text-sm transition-colors text-left">About Us</button></li>
                <li><button onClick={() => navigate("/leadership")} className="text-white/60 hover:text-white text-sm transition-colors text-left">Leadership Team</button></li>
                <li><button onClick={() => scrollTo("#packages")} className="text-white/60 hover:text-white text-sm transition-colors text-left">Packages</button></li>
                <li><button onClick={() => navigate("/clients")} className="text-white/60 hover:text-white text-sm transition-colors text-left">Clients</button></li>
                <li><button onClick={() => navigate("/case-studies")} className="text-white/60 hover:text-white text-sm transition-colors text-left">Case Studies</button></li>
                <li><button onClick={() => navigate("/blog")} className="text-white/60 hover:text-white text-sm transition-colors text-left">Blog</button></li>
                <li><button onClick={() => navigate("/careers")} className="text-white/60 hover:text-white text-sm transition-colors text-left">Careers</button></li>
                <li><button onClick={() => navigate("/contact")} className="text-white/60 hover:text-white text-sm transition-colors text-left">Contact</button></li>
              </ul>
            </div>
            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest text-white/90" style={{ fontFamily: "'Poppins', sans-serif" }}>Contact</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex items-start gap-2"><Mail size={13} className="mt-0.5 shrink-0 text-white" /> contact@fuera.in.net</li>
                <li className="flex items-start gap-2"><Phone size={13} className="mt-0.5 shrink-0 text-white" /> 9449658382 / 7899945862</li>
                <li className="flex items-start gap-2"><MapPin size={13} className="mt-0.5 shrink-0 text-white" /> #1, Mahayogi Vemana Road, 3rd Block, Koramangala, Bengaluru - 560034</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
            <p>© {new Date().getFullYear()} FUERA. All Rights Reserved.</p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/privacy")}
                className="hover:text-white/70 transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => navigate("/terms")}
                className="hover:text-white/70 transition-colors"
              >
                Terms of Use
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* ── ENQUIRY MODAL ── */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={e => { if (e.target === e.currentTarget) setModalOpen(false); }}>
            <motion.div initial={{ scale: 0.92, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.92, opacity: 0, y: 20 }}
              className="bg-[#1a1a1e] rounded-sm shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between px-6 py-5 border-b border-border bg-[#111111]">
                <h3 className="text-white font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>Send Us An Enquiry</h3>
                <button aria-label="Close modal" onClick={() => setModalOpen(false)} className="text-white/60 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <EnquiryForm onSubmit={() => setModalOpen(false)} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp FAB */}
      <a href="https://wa.me/919449658382?text=Hi+FUERA%2C+I%27m+interested+in+your+services"
        target="_blank" rel="noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
        <MessageCircle size={24} />
      </a>
    </main>
  );
}

// ─── SMALL COMPONENTS ─────────────────────────────────────────────────────────

function ContactRow({ icon: Icon, label, value, href }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 bg-[#1c1c20] border border-border rounded-full flex items-center justify-center shrink-0">
        <Icon size={16} className="text-white" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest mb-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>{label}</p>
        {href ? (
          <a href={href} target="_blank" rel="noreferrer" className="text-sm text-white hover:text-white transition-colors font-medium">{value}</a>
        ) : (
          <p className="text-sm text-white font-medium">{value}</p>
        )}
      </div>
    </div>
  );
}

function EnquiryForm({ onSubmit, inline = false }: { onSubmit?: () => void; inline?: boolean }) {
  const [form, setForm] = useState({ name: "", company: "", designation: "", email: "", phone: "", message: "", privacy: false });
  const [done, setDone] = useState(false);
  const set = (k: string) => (e: any) => setForm(v => ({ ...v, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => { setDone(false); onSubmit?.(); }, 3000);
    setForm({ name: "", company: "", designation: "", email: "", phone: "", message: "", privacy: false });
  };

  const inputCls = "w-full border border-border bg-[#f9fafb] text-sm !text-black px-4 py-2.5 rounded-sm focus:outline-none focus:border-white/40 transition-colors placeholder:text-muted-foreground";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="enquiry-name" className="block text-xs font-semibold text-[#c0c0c0] mb-1.5 uppercase tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>Name *</label>
          <input id="enquiry-name" required value={form.name} onChange={set("name")} className={inputCls} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="enquiry-company" className="block text-xs font-semibold text-[#c0c0c0] mb-1.5 uppercase tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>Company</label>
          <input id="enquiry-company" value={form.company} onChange={set("company")} className={inputCls} placeholder="Company name" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="enquiry-phone" className="block text-xs font-semibold text-[#c0c0c0] mb-1.5 uppercase tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>Phone *</label>
          <input id="enquiry-phone" required value={form.phone} onChange={set("phone")} className={inputCls} placeholder="+91 XXXXX XXXXX" />
        </div>
        <div>
          <label htmlFor="enquiry-email" className="block text-xs font-semibold text-[#c0c0c0] mb-1.5 uppercase tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>Email *</label>
          <input id="enquiry-email" required type="email" value={form.email} onChange={set("email")} className={inputCls} placeholder="you@email.com" />
        </div>
      </div>
      <div>
        <label htmlFor="enquiry-message" className="block text-xs font-semibold text-[#c0c0c0] mb-1.5 uppercase tracking-wide" style={{ fontFamily: "'Poppins', sans-serif" }}>Message</label>
        <textarea id="enquiry-message" rows={4} value={form.message} onChange={set("message")} className={`${inputCls} resize-none`} placeholder="Tell us about your project or goals..." />
      </div>
      <div className="flex items-start gap-2">
        <input type="checkbox" id="privacy" checked={form.privacy} onChange={set("privacy")} required
          className="mt-0.5 w-4 h-4 accent-white" />
        <label htmlFor="privacy" className="text-xs text-muted-foreground">
          I agree to the{" "}
          <span
            className="text-white underline cursor-pointer"
            onClick={() =>
              alert(
                "Privacy Policy:\n\nFUERA is committed to protecting your personal information. Any data submitted through this form will only be used to contact you regarding your business inquiry. We do not sell or share your data with third parties."
              )
            }
          >
            Privacy Policy
          </span>{" "}
          and consent to FUERA contacting me.
        </label>
      </div>
      <button type="submit"
        className={`w-full py-3.5 font-semibold text-sm transition-all rounded-sm ${done ? "bg-green-500 text-white" : "bg-[#111111] hover:bg-[#2a2a2a] text-white"}`}
        style={{ fontFamily: "'Poppins', sans-serif" }}>
        {done ? "Enquiry Sent! We will be in touch shortly." : "Submit My Query"}
      </button>
    </form>
  );
}
