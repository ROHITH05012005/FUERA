import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Phone, Mail, MapPin, Instagram, MessageCircle, Send, CheckCircle } from "lucide-react";
import PageLayout from "../components/PageLayout";
import { useSEO } from "../hooks/useSEO";
import { motion, AnimatePresence } from "motion/react";
import { WEB3FORMS_ACCESS_KEY } from "../helpers";

export default function ContactPage() {
  const navigate = useNavigate();
  useSEO({
    title: "Contact Us | FUERA",
    description: "Get in touch with FUERA. Request a custom quote for website development, SEO, ads, branding, and content creation services.",
    path: "/contact"
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const servicesList = [
    "Website Development",
    "Google SEO",
    "Meta Ads",
    "Google Ads",
    "Social Media SMM",
    "Branding",
    "Review Scanner",
    "Content Creation",
  ];

  const handleServiceToggle = (service: string) => {
    setSelectedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          services: selectedServices.join(", "),
          message: formData.message,
          subject: "New Website Contact Enquiry - FUERA",
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", company: "", message: "" });
        setSelectedServices([]);
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert("Something went wrong. Please try again or reach out directly via email.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending message. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-20 bg-[#070709] overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <button onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            <ArrowLeft size={16} /> Back to Home
          </button>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Get In Touch
            </p>
            <h1 className="text-white font-extrabold mb-5 leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Let's Build Something Great Together
            </h1>
            <p className="text-white/60 max-w-2xl text-base md:text-lg leading-relaxed">
              Have a project in mind, want to scale your organic rankings, or looking to run high-ROI campaigns? Drop us a line below and we'll get back to you within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Form & Info Section */}
      <section className="py-20 bg-[#0d0d0f]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Info Cards Column (Left) */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-white font-bold text-2xl mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Contact Information
                </h2>
                <p className="text-white/50 text-sm">
                  Reach out directly via phone or email, or drop by our Koramangala block office.
                </p>
              </div>

              <div className="space-y-6">
                {/* Phone Card */}
                <div className="flex gap-4 p-5 bg-[#121215] border border-white/5 rounded-sm hover:border-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center text-white shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h3 className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Phone & Call
                    </h3>
                    <p className="text-white font-semibold text-sm">+91 9449658382</p>
                    <p className="text-white/60 text-xs mt-0.5">+91 7899945862</p>
                  </div>
                </div>

                {/* Email Card */}
                <a href="mailto:contact@fuera.in.net" className="flex gap-4 p-5 bg-[#121215] border border-white/5 rounded-sm hover:border-white/10 transition-colors block">
                  <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center text-white shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Email Us
                    </h3>
                    <p className="text-white font-semibold text-sm hover:underline">contact@fuera.in.net</p>
                    <p className="text-white/60 text-xs mt-0.5">Quick response guaranteed</p>
                  </div>
                </a>

                {/* Address Card */}
                <div className="flex gap-4 p-5 bg-[#121215] border border-white/5 rounded-sm hover:border-white/10 transition-colors">
                  <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center text-white shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h3 className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Office Location
                    </h3>
                    <p className="text-white font-semibold text-sm">Koramangala 5th Block</p>
                    <p className="text-white/60 text-xs mt-0.5">Bangalore, Karnataka – 560068</p>
                  </div>
                </div>

                {/* Instagram Card */}
                <a href="https://instagram.com/fuera.official.23" target="_blank" rel="noreferrer" className="flex gap-4 p-5 bg-[#121215] border border-white/5 rounded-sm hover:border-white/10 transition-colors block">
                  <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center text-white shrink-0">
                    <Instagram size={18} />
                  </div>
                  <div>
                    <h3 className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Instagram
                    </h3>
                    <p className="text-white font-semibold text-sm hover:underline">@fuera.official.23</p>
                    <p className="text-white/60 text-xs mt-0.5">Follow for marketing tips</p>
                  </div>
                </a>

                {/* WhatsApp Chat */}
                <a href="https://wa.me/919449658382?text=Hi+FUERA%2C+I%27m+interested+in+your+services" target="_blank" rel="noreferrer" className="flex gap-4 p-5 bg-[#121215] border border-white/5 rounded-sm hover:border-white/10 transition-colors block">
                  <div className="w-10 h-10 rounded-sm bg-white/5 flex items-center justify-center text-white shrink-0">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <h3 className="text-white/40 text-xs font-semibold uppercase tracking-wider mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      WhatsApp
                    </h3>
                    <p className="text-white font-semibold text-sm hover:underline">Chat With Us</p>
                    <p className="text-white/60 text-xs mt-0.5">Click to chat instantly</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Interactive Enquiry Form (Right) */}
            <div className="lg:col-span-7 bg-[#121215] border border-white/5 p-8 md:p-10 rounded-sm relative">
              <AnimatePresence>
                {submitted ? (
                  <motion.div
                    className="absolute inset-0 bg-[#121215] z-10 flex flex-col items-center justify-center text-center p-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white mb-6 border border-white/10">
                      <CheckCircle size={32} />
                    </div>
                    <h3 className="text-white text-2xl font-bold mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Enquiry Sent Successfully!
                    </h3>
                    <p className="text-white/60 max-w-sm text-sm">
                      Thank you for reaching out. A team member from FUERA will review your request and contact you shortly.
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-white font-bold text-xl mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Send us a Message
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-[#c0c0c0] mb-2 uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      className="w-full bg-white border border-white/10 !text-black px-4 py-3 rounded-sm focus:outline-none focus:border-black/30 text-sm transition-colors placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#c0c0c0] mb-2 uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="name@company.com"
                      className="w-full bg-white border border-white/10 !text-black px-4 py-3 rounded-sm focus:outline-none focus:border-black/30 text-sm transition-colors placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-[#c0c0c0] mb-2 uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone number"
                      className="w-full bg-white border border-white/10 !text-black px-4 py-3 rounded-sm focus:outline-none focus:border-black/30 text-sm transition-colors placeholder:text-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#c0c0c0] mb-2 uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company (optional)"
                      className="w-full bg-white border border-white/10 !text-black px-4 py-3 rounded-sm focus:outline-none focus:border-black/30 text-sm transition-colors placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c0c0c0] mb-3 uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Services Needed
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {servicesList.map((service, idx) => {
                      const isSelected = selectedServices.includes(service);
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleServiceToggle(service)}
                          className={`text-left text-xs px-3.5 py-2.5 rounded-sm border transition-all ${
                            isSelected
                              ? "bg-white text-black border-white font-medium"
                              : "bg-[#18181c] text-white/60 border-white/5 hover:border-white/20"
                          }`}
                        >
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#c0c0c0] mb-2 uppercase tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Message *
                  </label>
                  <textarea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us about your project, target audience, and goals..."
                    className="w-full bg-white border border-white/10 !text-black px-4 py-3 rounded-sm focus:outline-none focus:border-black/30 text-sm transition-colors resize-none placeholder:text-gray-400"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-sm hover:bg-gray-100 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {submitting ? "Sending..." : "Submit Enquiry"} <Send size={15} />
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative h-[450px] bg-[#070709] border-t border-white/5">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.5843455119794!2d77.62002577590822!3d12.934415815682855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1451f28b49e1%3A0xe2128795796df34c!2s5th%20Block%2C%20Koramangala%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1719946800000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) grayscale(85%) contrast(95%)" }}
          allowFullScreen={false}
          loading="lazy"
          title="FUERA Location Map"
        />
      </section>
    </PageLayout>
  );
}
