import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, FileText, CheckCircle, Scale, AlertTriangle, ShieldAlert } from "lucide-react";
import PageLayout from "../components/PageLayout";
import { useSEO } from "../hooks/useSEO";

export default function TermsPage() {
  const navigate = useNavigate();

  useSEO({
    title: "Terms and Conditions | Fuera Solutions",
    description: "Terms and Conditions for Fuera Solutions. Review the service agreement rules for website development and digital services.",
    path: "/terms"
  });

  return (
    <PageLayout>
      <section className="relative py-24 bg-[#070709] overflow-hidden border-b border-white/5">
        <div className="max-w-4xl mx-auto px-5 relative z-10">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors group"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Go Back
          </button>

          <div className="flex items-center gap-3 mb-4">
            <Scale className="text-white/40" size={24} />
            <span className="text-white/40 text-xs font-bold uppercase tracking-[0.3em]">Agreement Details</span>
          </div>

          <h1
            className="text-white font-bold mb-6 leading-tight bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Terms & Conditions
          </h1>

          <p className="text-white/60 text-sm">
            Last Updated: July 10, 2026
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#0d0d0f]">
        <div className="max-w-4xl mx-auto px-5">
          <div className="space-y-12">

            {/* Section 1 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#111115] border border-white/5 p-8 rounded-2xl"
            >
              <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <CheckCircle size={20} className="text-white/60" />
                1. Acceptance of Terms
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                By visiting our website or ordering our development packages (Basic, Standard, Premium), you agree to be bound by these Terms & Conditions. If you do not agree, please do not access or use our services.
              </p>
            </motion.div>

            {/* Section 2 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#111115] border border-white/5 p-8 rounded-2xl"
            >
              <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <FileText size={20} className="text-white/60" />
                2. Scope of Services
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                Fuera Solutions provides software solutions, frontend web development, Google Business and SEO optimization, social media marketing, Meta/Google paid advertisements management, branding, and video editing.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-white/50 text-sm">
                <li><strong>Delivery timelines:</strong> Vary by service package selected. Standard sites take 7–14 days.</li>
                <li><strong>Hosting dependencies:</strong> Netlify/Vercel standard packages utilize free-tier cloud hosting lines unless custom hosting packages are subscribed.</li>
                <li><strong>Subcontracting:</strong> FUERA retains rights to deploy internal coordinators or developers to manage campaign objectives.</li>
              </ul>
            </motion.div>

            {/* Section 3 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#111115] border border-white/5 p-8 rounded-2xl"
            >
              <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <ShieldAlert size={20} className="text-white/60" />
                3. User Obligations
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                Users agree to provide accurate files, assets, texts, logos, and approvals in a timely manner. Fuera Solutions is not liable for project delivery delays resulting from missing assets or late client feedback.
              </p>
            </motion.div>

            {/* Section 4 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#111115] border border-white/5 p-8 rounded-2xl"
            >
              <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <AlertTriangle size={20} className="text-white/60" />
                4. Limitation of Liability
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                FUERA is not liable for indirect, incidental, or consequential damages, including loss of profits, data, or customer conversion rates, resulting from code implementation, ad campaign performance variations, or network downtime.
              </p>
            </motion.div>

            {/* Section 5 */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-[#111115] border border-white/5 p-8 rounded-2xl"
            >
              <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <Scale size={20} className="text-white/60" />
                5. Governing Law
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                These terms shall be governed by and structured under the laws of Bangalore jurisdiction, India. Any disputes will be subject to exclusive resolution in Bangalore courts.
              </p>
            </motion.div>

          </div>
        </div>
      </section>
    </PageLayout>
  );
}
