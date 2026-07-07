import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface EnquiryModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ open, onClose }: EnquiryModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-[#111114] border border-white/20 rounded-xl p-6 w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-lg font-semibold" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Send Enquiry
              </h2>
              <button onClick={onClose} className="text-white hover:text-gray-300" type="button">
                <X size={20} />
              </button>
            </div>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="px-4 py-2 bg-[#1a1a1e] border border-white/10 rounded text-white placeholder-gray-500 focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="px-4 py-2 bg-[#1a1a1e] border border-white/10 rounded text-white placeholder-gray-500 focus:outline-none"
                required
              />
              <textarea
                placeholder="Your Message"
                className="px-4 py-2 bg-[#1a1a1e] border border-white/10 rounded text-white placeholder-gray-500 focus:outline-none"
                rows={4}
                required
              />
              <button
                type="submit"
                className="bg-[#111111] text-white py-2 rounded hover:bg-[#222222] transition-colors"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
