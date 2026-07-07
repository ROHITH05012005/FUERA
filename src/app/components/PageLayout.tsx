import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Menu, X, ChevronDown, ChevronUp,
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

function FueraLogo() {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer shrink-0 flex items-center overflow-hidden"
      style={{ background: "#000", borderRadius: "6px" }}
      onClick={() => navigate("/")}
    >
      <img src={fueraLogo} alt="" aria-hidden="true"
        style={{ height: "54px", width: "auto", objectFit: "contain", display: "block", flexShrink: 0 }} />
      <img src={fueraWordmark} alt="FUERA — Growth Powered by Strategy"
        style={{ height: "54px", width: "auto", objectFit: "contain", display: "block", flexShrink: 0, marginLeft: "-6px" }} />
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
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goHome = (hash?: string) => {
    setMenuOpen(false);
    setServicesOpen(false);
    navigate(hash ? `/#${hash.replace("#", "")}` : "/");
    // After navigation, scroll to section
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
    { label: "About", action: () => goHome("#about") },
    { label: "Packages", action: () => goHome("#packages") },
    { label: "Clients", action: () => navigate("/clients") },
    { label: "Contact", action: () => goHome("#contact") },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Top bar */}
      <div className="bg-black text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a href="mailto:fuera.solutions.23@gmail.com" className="flex items-center gap-1.5 hover:text-white/80 transition-colors">
              <Mail size={12} /> fuera.solutions.23@gmail.com
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

      {/* Header */}
      <header className={`sticky top-0 z-50 bg-black transition-shadow duration-300 ${scrolled ? "shadow-md" : "shadow-sm"} border-b border-white/5`}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between h-16">
          <FueraLogo />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              item.hasChildren ? (
                <div key={item.label} className="relative">
                  <button
                    className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-white hover:text-white/80 transition-colors"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                    onClick={() => setServicesOpen(v => !v)}>
                    {item.label}
                    {servicesOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-56 bg-black border border-white/10 shadow-xl rounded-sm z-50 py-2">
                        {SERVICES_LIST.map(c => (
                          <button key={c} onClick={() => goHome("#services")}
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
                <button key={item.label} onClick={item.action}
                  className="px-4 py-2 text-sm font-medium text-white hover:text-white/80 transition-colors"
                  style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {item.label}
                </button>
              )
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 font-semibold transition-all duration-200 px-5 py-2 text-sm bg-[#111111] border border-white/20 text-white hover:bg-[#2a2a2a] shadow-sm hover:shadow-md"
              style={{ fontFamily: "'Poppins', sans-serif", borderRadius: "4px" }}>
              Send Enquiry
            </button>
          </div>

          <button className="lg:hidden p-2 text-white" onClick={() => setMenuOpen(v => !v)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="lg:hidden overflow-hidden border-t border-white/5 bg-black">
              <div className="px-5 py-4 flex flex-col gap-1">
                {NAV_ITEMS.map(item => (
                  <button key={item.label} onClick={item.action}
                    className="text-left px-3 py-2.5 text-sm font-medium text-white hover:bg-[#1c1c20] rounded-sm transition-colors"
                    style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {item.label}
                  </button>
                ))}
                <div className="pt-2">
                  <button onClick={() => { setMenuOpen(false); setModalOpen(true); }}
                    className="inline-flex items-center gap-2 font-semibold transition-all duration-200 px-7 py-3 text-sm bg-[#111111] border border-white/20 text-white hover:bg-[#2a2a2a]"
                    style={{ fontFamily: "'Poppins', sans-serif", borderRadius: "4px" }}>
                    Send Enquiry
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
      <footer className="bg-[#070709] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div>
              <FueraLogo />
              <p className="text-white/60 text-sm mt-4 leading-relaxed">
                FUERA helps businesses establish a powerful online presence and generate quality leads through strategy-first digital marketing.
              </p>
              <div className="flex gap-3 mt-5">
                <a href="https://instagram.com/fuera.official.23" target="_blank" rel="noreferrer"
                  className="w-8 h-8 bg-white/5 hover:bg-[#111111] flex items-center justify-center rounded-full transition-colors">
                  <Instagram size={14} />
                </a>
                <a href="#" className="w-8 h-8 bg-white/5 hover:bg-[#111111] flex items-center justify-center rounded-full transition-colors">
                  <Facebook size={14} />
                </a>
                <a href="#" className="w-8 h-8 bg-white/5 hover:bg-[#111111] flex items-center justify-center rounded-full transition-colors">
                  <Linkedin size={14} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest text-white/90" style={{ fontFamily: "'Poppins', sans-serif" }}>Services</h4>
              <ul className="space-y-2">
                {SERVICES_LIST.map(s => (
                  <li key={s}>
                    <button onClick={() => goHome("#services")} className="text-white/60 hover:text-white text-sm transition-colors">{s}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest text-white/90" style={{ fontFamily: "'Poppins', sans-serif" }}>Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => goHome("#home")} className="text-white/60 hover:text-white text-sm transition-colors">Home</button></li>
                <li><button onClick={() => goHome("#about")} className="text-white/60 hover:text-white text-sm transition-colors">About</button></li>
                <li><button onClick={() => goHome("#packages")} className="text-white/60 hover:text-white text-sm transition-colors">Packages</button></li>
                <li><button onClick={() => navigate("/clients")} className="text-white/60 hover:text-white text-sm transition-colors">Clients</button></li>
                <li><button onClick={() => navigate("/team")} className="text-white/60 hover:text-white text-sm transition-colors">Our Team</button></li>
                <li><button onClick={() => navigate("/careers")} className="text-white/60 hover:text-white text-sm transition-colors">Careers</button></li>
                <li><button onClick={() => goHome("#contact")} className="text-white/60 hover:text-white text-sm transition-colors">Contact</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-widest text-white/90" style={{ fontFamily: "'Poppins', sans-serif" }}>Contact</h4>
              <ul className="space-y-3 text-sm text-white/60">
                <li className="flex items-start gap-2"><Mail size={13} className="mt-0.5 shrink-0 text-white" /> fuera.solutions.23@gmail.com</li>
                <li className="flex items-start gap-2"><Phone size={13} className="mt-0.5 shrink-0 text-white" /> 9449658382 / 7899945862</li>
                <li className="flex items-start gap-2"><MapPin size={13} className="mt-0.5 shrink-0 text-white" /> Koramangala 5th Block, Bangalore – 560068</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
            <p>© {new Date().getFullYear()} FUERA. All Rights Reserved.</p>
            <div className="flex gap-4">
              <button onClick={() => alert("Privacy Policy:\n\nFUERA is committed to protecting your personal information. Any data submitted through this website will only be used to contact you regarding your business inquiry. We do not sell or share your data with third parties.")}
                className="hover:text-white/70 transition-colors">Privacy Policy</button>
              <button onClick={() => alert("Terms of Use:\n\nBy using this website, you agree to comply with and be bound by the terms and conditions of FUERA. All services provided are subject to our client service agreements.")}
                className="hover:text-white/70 transition-colors">Terms of Use</button>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp FAB */}
      <a href="https://wa.me/919449658382?text=Hi+FUERA%2C+I%27m+interested+in+your+services"
        target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 text-white flex items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
        <MessageCircle size={24} />
      </a>
    </div>
  );
}
