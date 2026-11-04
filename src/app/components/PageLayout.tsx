import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Menu, X, ChevronDown, ChevronUp, ArrowRight,
  Phone, Mail, MapPin, Instagram, Facebook, Linkedin, MessageCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import fueraLogo from "@/imports/image-4.png";
import fueraWordmark from "@/imports/image-7.png";
import EnquiryModal from "./ui/EnquiryModal";

const SERVICES_LIST = [
  "Website Development", "Social Media Marketing", "Performance Marketing",
  "Meta Ads", "Google Ads", "Google SEO",
  "Branding", "Review Scanner", "Content Creation"
];

const slugify = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

function FueraLogo() {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer shrink-0 flex items-center gap-2.5 group select-none"
      onClick={() => navigate("/")}
    >
      <img
        src={fueraLogo}
        alt="FUERA Emblem"
        className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
      />
      <div className="flex flex-col justify-center -space-y-0.5">
        <span className="text-white font-black text-xl sm:text-2xl tracking-[0.16em] leading-tight">FUERA</span>
        <span className="text-[9px] text-white/50 tracking-[0.18em] font-medium flex items-center gap-1">
          <span className="text-[#e81c2e]">•</span> Build the Future <span className="text-[#e81c2e]">•</span>
        </span>
      </div>
    </div>
  );
}

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goHome = (hash?: string) => {
    setMenuOpen(false);
    setServicesOpen(false);
    navigate(hash ? `/#${hash.replace("#", "")}` : "/");
    setTimeout(() => {
      if (hash) {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, 100);
  };

  const NAV_ITEMS = [
    { label: "Home", action: () => goHome("#home") },
    { label: "Services", action: () => goHome("#services"), hasChildren: true },
    { label: "Work", action: () => goHome("#featured-work") },
    { label: "About", action: () => navigate("/about") },
    { label: "Insights", action: () => goHome("#insights") },
    { label: "Contact", action: () => navigate("/contact") },
  ];

  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-[#e81c2e] selection:text-white relative overflow-x-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      
      {/* Grid Pattern Background */}
      <div className="fixed inset-0 grid-pattern pointer-events-none z-0" />

      {/* Ambient Red Spotlights */}
      <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-[#e81c2e]/10 blur-[160px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-0 w-[600px] h-[600px] bg-[#e81c2e]/08 blur-[160px] pointer-events-none z-0" />

      {/* ── TOP CONTACT & SOCIAL BAR ── */}
      <div className="relative z-50 bg-[#050508] border-b border-white/10 py-1.5 px-4 sm:px-8 text-xs text-white/70 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="absolute top-0 left-0 w-36 h-[1px] bg-gradient-to-r from-[#e81c2e] to-transparent pointer-events-none" />
          <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs">
            <a href="mailto:contact@fuera.in.net" className="flex items-center gap-1.5 hover:text-white transition-colors">
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
          <div className="flex items-center gap-3 sm:gap-4">
            <a href="https://instagram.com/fuera.official.23" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#e81c2e] transition-colors" aria-label="Instagram">
              <Instagram size={13} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#e81c2e] transition-colors" aria-label="Facebook">
              <Facebook size={13} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#e81c2e] transition-colors" aria-label="LinkedIn">
              <Linkedin size={13} />
            </a>
            <a href="https://wa.me/919449658382" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] hover:bg-[#20ba59] text-white text-[11px] font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(37,211,102,0.3)] hover:scale-105">
              <MessageCircle size={12} fill="currentColor" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "bg-[#050508]/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3" : "bg-[#050508] border-b border-white/5 py-4"}`}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
          <FueraLogo />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_ITEMS.map(item => (
              item.hasChildren ? (
                <div key={item.label} className="relative">
                  <button
                    className="flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white transition-colors py-1 cursor-pointer"
                    onClick={() => setServicesOpen(v => !v)}>
                    {item.label}
                    {servicesOpen ? <ChevronUp size={14} className="text-[#e81c2e]" /> : <ChevronDown size={14} />}
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-3 w-60 bg-[#0c0c10] border border-white/10 shadow-2xl rounded-xl z-50 py-2 overflow-hidden">
                        {SERVICES_LIST.map(c => (
                          <button key={c} onClick={() => { setServicesOpen(false); navigate(`/services/${slugify(c)}`); }}
                            className="w-full text-left px-4 py-2.5 text-xs text-white/70 hover:bg-[#e81c2e]/10 hover:text-white transition-colors flex items-center justify-between">
                            <span>{c}</span>
                            <ArrowRight size={12} className="text-[#e81c2e]" />
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button key={item.label} onClick={item.action}
                  className="text-sm font-medium text-white/80 hover:text-white transition-colors py-1 cursor-pointer">
                  {item.label}
                </button>
              )
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button onClick={() => setModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 bg-[#e81c2e] hover:bg-[#d01728] text-white font-medium text-sm px-6 py-3 rounded-full transition-all duration-200 shadow-[0_4px_20px_rgba(232,28,46,0.4)] hover:scale-[1.02] cursor-pointer">
              Start a Project <ArrowRight size={15} />
            </button>

            <button className="lg:hidden p-2 text-white/80 hover:text-white" onClick={() => setMenuOpen(v => !v)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden bg-[#0a0a0d] border-b border-white/10 px-6 py-5">
              <div className="flex flex-col gap-3">
                {NAV_ITEMS.map(item => (
                  <button key={item.label} onClick={item.action}
                    className="text-left py-2 text-sm font-medium text-white/80 hover:text-white">
                    {item.label}
                  </button>
                ))}
                <div className="pt-3 border-t border-white/10">
                  <button onClick={() => { setMenuOpen(false); setModalOpen(true); }}
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#e81c2e] hover:bg-[#d01728] text-white font-medium text-sm px-6 py-3 rounded-full transition-all">
                    Start a Project <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <EnquiryModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Page content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-[#040406] text-white py-12">
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-white/10 pb-8">
          <FueraLogo />

          <nav className="flex flex-wrap items-center gap-6 text-sm text-white/70">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className="hover:text-white transition-colors cursor-pointer"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="text-xs text-white/40 font-mono">
            © {new Date().getFullYear()} FUERA. All rights reserved.
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a href="https://wa.me/919449658382?text=Hi+FUERA%2C+I%27m+interested+in+your+services"
        target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center rounded-full shadow-[0_4px_20px_rgba(16,185,129,0.4)] transition-all hover:scale-105"
        aria-label="Contact on WhatsApp">
        <MessageCircle size={26} />
      </a>
    </div>
  );
}
