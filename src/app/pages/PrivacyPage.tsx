import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText, Database } from "lucide-react";
import PageLayout from "../components/PageLayout";
import { useSEO } from "../hooks/useSEO";

export default function PrivacyPage() {
  const navigate = useNavigate();

  useSEO({
    title: "Privacy Policy | Fuera Solutions",
    description: "Privacy Policy for Fuera Solutions. Understand how we collect, use, and protect your personal business data.",
    path: "/privacy"
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
            <Lock className="text-white/40" size={24} />
            <span className="text-white/40 text-xs font-bold uppercase tracking-[0.3em]">Legal Document</span>
          </div>

          <h1
            className="text-white font-bold mb-6 leading-tight bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Privacy Policy
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
                <Eye size={20} className="text-white/60" />
                1. Introduction
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                At Fuera Solutions, we value your privacy and are committed to protecting your personal and business data. This Privacy Policy details how we collect, store, share, and safeguard the information you provide when you interact with our website, request enquiries, or subscribe to our digital services, package plans, or digital consultation resources.
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
                <Database size={20} className="text-white/60" />
                2. Information We Collect
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                We may collect data from you in the following ways depending on your interaction with the agency website:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-white/50 text-sm">
                <li><strong>Identity Data:</strong> Full Name, company name, and job position coordinates.</li>
                <li><strong>Contact Data:</strong> Email address, mobile telephone coordinates, and business address.</li>
                <li><strong>Enquiry details:</strong> Information regarding marketing goals, package preferences, or websites you submit through our enquiry modal and forms.</li>
                <li><strong>Technical Data:</strong> IP Address, browser types, session timings, and navigation paths.</li>
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
                <ShieldCheck size={20} className="text-white/60" />
                3. How We Use Your Information
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-4">
                FUERA uses the gathered details to deliver value, support growth, and maintain reliable service lines. Specifically, we use information:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-white/50 text-sm">
                <li>To register, execute, and deliver client project milestones.</li>
                <li>To follow up on custom package requests, enquiries, and digital audits.</li>
                <li>To communicate digital marketing performance reports and agency reports.</li>
                <li>To comply with regulatory guidelines and coordinate accounting records.</li>
              </ul>
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
                <FileText size={20} className="text-white/60" />
                4. Data Protection & Sharing
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                FUERA does not sell, rent, or lease your private personal details to third-party databases. We implement standard encryption metrics to protect your files. Your files are shared only with authorized partners, hosting networks, or legal authorities when required under compliance protocols.
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
                <Lock size={20} className="text-white/60" />
                5. Contact Legal Team
              </h2>
              <p className="text-white/60 text-sm leading-relaxed">
                For questions regarding data logs, private storage, or updating coordinates, email us at:{" "}
                <a href="mailto:contact@fuera.in.net" className="text-white hover:underline font-semibold">
                  contact@fuera.in.net
                </a>
              </p>
            </motion.div>

          </div>
        </div>
      </section>
    </PageLayout>
  );
}
