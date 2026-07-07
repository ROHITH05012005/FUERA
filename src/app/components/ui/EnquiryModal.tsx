import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Check } from "lucide-react";

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
    message: "",
    privacy: false
  });
  const [done, setDone] = useState(false);

  const set = (k: string) => (e: any) =>
    setForm(v => ({
      ...v,
      [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value
    }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
    setTimeout(() => {
      setDone(false);
      onClose();
    }, 2500);
    setForm({
      name: "",
      company: "",
      email: "",
      phone: "",
      message: "",
      privacy: false
    });
  };

  const inputCls =
    "w-full border border-white/10 bg-[#1a1a1e] text-sm text-white px-4 py-2.5 rounded-sm focus:outline-none focus:border-white/40 transition-colors placeholder:text-gray-500";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#111114] border border-white/20 rounded-xl p-6 w-full max-w-lg overflow-y-auto max-h-[95vh]"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-5">
              <h2
                className="text-white text-lg font-bold"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Send Enquiry
              </h2>
              <button
                onClick={onClose}
                className="text-white/60 hover:text-white transition-colors"
                type="button"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xs font-semibold text-[#c0c0c0] mb-1.5 uppercase tracking-wide"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Name *
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={set("name")}
                    className={inputCls}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    className="block text-xs font-semibold text-[#c0c0c0] mb-1.5 uppercase tracking-wide"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Company
                  </label>
                  <input
                    value={form.company}
                    onChange={set("company")}
                    className={inputCls}
                    placeholder="Company name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-xs font-semibold text-[#c0c0c0] mb-1.5 uppercase tracking-wide"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Phone *
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
                  <label
                    className="block text-xs font-semibold text-[#c0c0c0] mb-1.5 uppercase tracking-wide"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={set("email")}
                    className={inputCls}
                    placeholder="you@email.com"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-xs font-semibold text-[#c0c0c0] mb-1.5 uppercase tracking-wide"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Message
                </label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={set("message")}
                  className={`${inputCls} resize-none`}
                  placeholder="Tell us about your project or goals..."
                />
              </div>
              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="modal-privacy"
                  checked={form.privacy}
                  onChange={set("privacy")}
                  required
                  className="mt-0.5 w-4 h-4 accent-white"
                />
                <label htmlFor="modal-privacy" className="text-xs text-[#a0a0ab]">
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
              <button
                type="submit"
                className={`w-full py-3.5 font-semibold text-sm transition-all rounded-sm ${
                  done
                    ? "bg-green-600 text-white"
                    : "bg-[#111111] hover:bg-[#2a2a2a] text-white border border-white/10"
                }`}
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                {done ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check size={16} /> Enquiry Sent! We will be in touch.
                  </span>
                ) : (
                  "Submit My Query"
                )}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
