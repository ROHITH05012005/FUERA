import { useParams, useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, CheckCircle, HelpCircle } from "lucide-react";
import { SERVICES_DATA } from "../data/servicesData";
import PageLayout from "../components/PageLayout";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useSEO } from "../hooks/useSEO";
import { WEB3FORMS_ACCESS_KEY } from "../helpers";

export default function ServicePage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Fallback / redirect if serviceId is invalid
  const service = serviceId ? SERVICES_DATA[serviceId] : null;

  useSEO({
    title: service ? `${service.title} | FUERA` : "Service Not Found | FUERA",
    description: service ? service.subtitle : "The service page you are looking for does not exist.",
    path: `/services/${serviceId || "not-found"}`
  });

  if (!service) {
    return (
      <PageLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-5">
          <HelpCircle size={64} className="text-white/30 mb-4" />
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Service Not Found</h1>
          <p className="text-white/60 mb-6 max-w-md">The service page you are looking for does not exist or has been moved.</p>
          <button onClick={() => navigate("/")} className="bg-white text-black font-semibold px-6 py-3 rounded-sm hover:bg-gray-100 transition-colors">
            Back to Home
          </button>
        </div>
      </PageLayout>
    );
  }

  const [submitting, setSubmitting] = useState(false);

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
          service: service?.title,
          message: formData.message,
          subject: `New ${service?.title} Service Enquiry - FUERA`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
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
      <section className="relative min-h-[55vh] flex items-center py-20 bg-[#070709] overflow-hidden">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0">
          <img src={service.heroImage} alt="" className="w-full h-full object-cover opacity-25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0f] via-[#070709]/80 to-transparent" />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 70%)" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full">
          <button onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            <ArrowLeft size={16} /> Back to Home
          </button>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Our Services
            </p>
            <h1 className="text-white font-extrabold mb-5 leading-tight max-w-4xl"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(2.2rem, 6vw, 4rem)" }}>
              {service.title}
            </h1>
            <p className="text-white/70 max-w-2xl text-base md:text-lg leading-relaxed mb-8">
              {service.subtitle}
            </p>
            
            <a href="#quote" className="inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-sm hover:bg-gray-100 transition-all hover:-translate-y-0.5"
              style={{ fontFamily: "'Poppins', sans-serif" }}>
              Request a Quote <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 bg-[#0d0d0f] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <h2 className="text-white font-bold mb-6" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
                Overview & Approach
              </h2>
              <p className="text-white/60 text-base leading-relaxed mb-6">
                {service.overview}
              </p>
              
              <div className="space-y-3 mt-8">
                {service.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="text-white/80 mt-1 shrink-0" size={16} />
                    <span className="text-white/70 text-sm">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:col-span-5">
              <div className="p-8 rounded-xl bg-[#111115] border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full pointer-events-none" />
                <h3 className="text-white font-semibold text-lg mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Why Partner With FUERA?
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-6">
                  We bridge the gap between creative design and data analytics. Every line of code written, ad deployed, and review acquired is structured around growing your bottom line.
                </p>
                <div className="border-t border-white/10 pt-4 flex items-center justify-between text-xs text-white/40">
                  <span>Strategy-First Approach</span>
                  <span>•</span>
                  <span>Dedicated Expert Team</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-[#0a0a0c] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-14">
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Key Deliverables
            </p>
            <h2 className="text-white font-bold" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
              What You Get
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {service.benefits.map((b, idx) => {
              const IconComp = b.icon;
              return (
                <div key={idx} className="p-8 rounded-xl bg-[#111115] border border-white/5 hover:border-white/20 transition-all duration-300">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6">
                    <IconComp size={24} className="text-white/80" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {b.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {b.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process Section */}
      <section className="py-20 bg-[#0d0d0f] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-14">
            <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Execution Strategy
            </p>
            <h2 className="text-white font-bold" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
              Our Working Process
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Process cards */}
            {service.process.map((step, idx) => (
              <div key={idx} className="relative p-8 rounded-xl bg-[#111115] border border-white/5">
                <div className="absolute top-4 right-6 text-5xl font-black text-white/5 select-none" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {step.step}
                </div>
                <h3 className="text-white font-semibold text-lg mb-3 mt-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {step.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contextual CTA Form */}
      <section id="quote" className="py-24 bg-[#0a0a0c] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-5">
          <div className="text-center mb-10">
            <h2 className="text-white font-bold mb-3" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
              Request a Custom Quote
            </h2>
            <p className="text-white/55 text-sm">
              Interested in <strong>{service.title}</strong>? Let us know what you need, and we'll get back to you with a detailed proposal.
            </p>
          </div>

          <div className="p-8 md:p-10 rounded-xl bg-[#111115] border border-white/5 shadow-2xl relative">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center text-center py-10">
                  <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6">
                    <CheckCircle size={32} className="text-white" />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Inquiry Received!
                  </h3>
                  <p className="text-white/60 text-sm max-w-sm">
                    Thank you for reaching out. Our team will review your requirements for {service.title} and get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.form initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Name</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-[#16161c] border border-white/10 text-white rounded px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Email</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-[#16161c] border border-white/10 text-white rounded px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Phone</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#16161c] border border-white/10 text-white rounded px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors" />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/50 mb-2">Message (Tell us about your project)</label>
                    <textarea rows={4} required value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={`Tell us what you're looking to achieve with ${service.title}...`}
                      className="w-full bg-[#16161c] border border-white/10 text-white rounded px-4 py-3 text-sm focus:outline-none focus:border-white/30 transition-colors resize-none" />
                  </div>

                  <button type="submit"
                    disabled={submitting}
                    className="w-full bg-white text-black font-semibold py-4 rounded hover:bg-gray-100 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: "'Poppins', sans-serif" }}>
                    {submitting ? "Sending..." : `Send Enquiry for ${service.title}`}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
