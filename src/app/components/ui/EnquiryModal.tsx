import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check, ArrowRight } from "lucide-react";
import { WEB3FORMS_ACCESS_KEY } from "../../helpers";

interface EnquiryModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ open, onClose }: EnquiryModalProps) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    scope: "Enterprise Web Engineering",
    message: "",
    privacy: false
  });
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const set = (k: string) => (e: any) =>
    setForm(v => ({
      ...v,
      [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value
    }));

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
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          scope: form.scope,
          message: form.message,
          subject: `FUERA Tech Inquiry - ${form.scope}`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setDone(true);
        setForm({
          name: "",
          company: "",
          email: "",
          phone: "",
          scope: "Enterprise Web Engineering",
          message: "",
          privacy: false
        });
        setTimeout(() => {
          setDone(false);
          onClose();
        }, 3000);
      } else {
        alert("Something went wrong. Please try again or email contact@fuera.in.net directly.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending message. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full border border-white/10 bg-[#14141c] text-sm text-white px-4 py-2.5 rounded-lg focus:outline-none focus:border-[#e81c2e] transition-colors placeholder:text-white/40";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[100] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#0b0b10] border border-white/15 rounded-2xl p-6 sm:p-8 w-full max-w-lg overflow-y-auto max-h-[95vh] shadow-[0_30px_70px_rgba(0,0,0,0.95)]"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
          >
            <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
              <div>
                <span className="text-[#e81c2e] text-[10px] font-mono font-bold uppercase tracking-widest block mb-1">FUERA ENTERPRISE DISCOVERY</span>
                <h2 className="text-white text-xl font-black">
                  Request Technology Proposal
                </h2>
              </div>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors p-1"
                type="button"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wide">
                    Full Name *
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={set("name")}
                    className={inputCls}
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wide">
                    Company / Entity
                  </label>
                  <input
                    value={form.company}
                    onChange={set("company")}
                    className={inputCls}
                    placeholder="Acme Corp"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wide">
                    Phone Number *
                  </label>
                  <input
                    required
                    value={form.phone}
                    onChange={set("phone")}
                    className={inputCls}
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wide">
                    Corporate Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    className={inputCls}
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wide">
                  Project Scope / Capability Needed
                </label>
                <select
                  value={form.scope}
                  onChange={set("scope")}
                  className={`${inputCls} cursor-pointer`}
                >
                  <option value="Enterprise Web Engineering" className="bg-[#0b0b10] text-white">Enterprise Web Engineering</option>
                  <option value="AI & Intelligent Automation" className="bg-[#0b0b10] text-white">AI & Intelligent Automation</option>
                  <option value="Performance Growth Systems" className="bg-[#0b0b10] text-white">Performance Growth Systems</option>
                  <option value="Brand Identity & Experience Design" className="bg-[#0b0b10] text-white">Brand Identity & Experience Design</option>
                  <option value="Custom Enterprise Transformation" className="bg-[#0b0b10] text-white">Custom Enterprise Transformation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wide">
                  Technical Requirements & Objectives
                </label>
                <textarea
                  rows={3}
                  value={form.message}
                  onChange={set("message")}
                  className={`${inputCls} resize-none`}
                  placeholder="Describe your platform goals, current tech stack, or scaling target..."
                />
              </div>

              <div className="flex items-start gap-2 pt-1">
                <input
                  type="checkbox"
                  id="modal-privacy"
                  checked={form.privacy}
                  onChange={set("privacy")}
                  required
                  className="mt-0.5 w-4 h-4 accent-[#e81c2e]"
                />
                <label htmlFor="modal-privacy" className="text-xs text-white/50 leading-tight">
                  I agree to FUERA's privacy policy and consent to technical follow-up regarding this proposal request.
                </label>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={`w-full py-3.5 font-bold text-sm transition-all rounded-full cursor-pointer flex items-center justify-center gap-2 ${
                  done
                    ? "bg-emerald-500 text-white"
                    : "bg-[#e81c2e] hover:bg-[#d01728] text-white shadow-[0_4px_20px_rgba(232,28,46,0.5)]"
                }`}
              >
                {done ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check size={16} /> Request Received! We'll reply within 24h.
                  </span>
                ) : submitting ? (
                  "Submitting Architecture Inquiry..."
                ) : (
                  <>
                    <span>Submit Proposal Request</span> <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
