import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, Target, Shield, Zap, Mail, Linkedin } from "lucide-react";
import PageLayout from "../components/PageLayout";
import { useSEO } from "../hooks/useSEO";
import founderImg from "@/imports/founder.png";
import cofounderImg from "@/imports/cofounder.png";
import ceoImg from "@/imports/ceo.png";

// Define Executive Leaders data
const EXECUTIVES = [
  {
    name: "R. Akash",
    role: "Founder",
    initials: "RA",
    image: founderImg,
    gradient: "from-cyan-500 via-blue-600 to-indigo-700",
    glow: "shadow-blue-500/20",
    bio: "Visionary leader driving the core expansion and technical direction of Fuera Solutions.",
  },
  {
    name: "Niranjith M",
    role: "Co-Founder",
    initials: "NM",
    image: cofounderImg,
    gradient: "from-purple-500 via-pink-600 to-rose-700",
    glow: "shadow-pink-500/20",
    bio: "Strategist shaping brand operations, partner networks, and product innovation roadmaps.",
  },
  {
    name: "Rohith B",
    role: "Chief Executive Officer (CEO)",
    initials: "RB",
    image: ceoImg,
    gradient: "from-amber-500 via-orange-600 to-red-700",
    glow: "shadow-orange-500/20",
    bio: "Leading execution, client relationships, and business development across all digital verticals.",
  },
];

// Define Leadership Team members
const TEAM_MEMBERS = [
  { name: "Manya H. R.", role: "Leadership Team", initials: "MH", gradient: "from-teal-400 to-emerald-600" },
  { name: "Manjunatha Reddy", role: "Leadership Team", initials: "MR", gradient: "from-violet-400 to-purple-600" },
  { name: "Deepthi", role: "Leadership Team", initials: "D", gradient: "from-fuchsia-400 to-pink-600" },
];

export default function LeadershipPage() {
  useSEO({
    title: "Leadership Team | FUERA Solutions",
    description: "Meet the executive leadership team of FUERA Solutions, driving technological innovation, web development, and digital marketing strategies.",
    path: "/leadership",
  });

  const navigate = useNavigate();

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative py-24 bg-[#070709] overflow-hidden border-b border-white/5">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 70%)",
          }}
        />
        <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors group"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>

          <div className="grid md:grid-cols-12 gap-8 items-center">
            <motion.div
              className="md:col-span-7"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p
                className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mb-3"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Who We Are
              </p>
              <h1
                className="text-white font-bold mb-6 leading-tight bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent"
                style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(2.2rem, 6vw, 3.8rem)" }}
              >
                Fuera Solutions <br />
                <span className="text-white/40 font-medium">Leadership Team</span>
              </h1>
              <p className="text-white/70 text-lg leading-relaxed max-w-2xl mb-4">
                Fuera Solutions is a technology company focused on delivering innovative digital solutions,
                software development, web development, and technology services. Our mission is to build
                reliable, modern, and customer-focused solutions that help businesses grow through technology.
              </p>
            </motion.div>

            <motion.div
              className="md:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none" />
              <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                <Target className="text-white/80" size={20} />
                Our Commitment
              </h3>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Our leadership team is committed to innovation, quality, and delivering value through innovation,
                integrity, and customer-focused solutions. We drive performance by aligning technology stacks with real business goals.
              </p>
              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-white/40" />
                  <span className="text-xs text-white/50">High Integrity</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-white/40" />
                  <span className="text-xs text-white/50">Cutting Edge</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Executive Leadership Grid */}
      <section className="py-24 bg-[#0d0d0f]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="mb-12 text-left">
            <h2
              className="text-white font-bold leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(2.2rem, 5vw, 3.2rem)" }}
            >
              Executive team
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {EXECUTIVES.map((exec, idx) => (
              <motion.div
                key={exec.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="group flex flex-col relative w-full"
              >
                {/* Full Frame Portrait Photo with custom border-radius */}
                <div className="overflow-hidden rounded-[2.2rem] aspect-[4/5] w-full bg-[#111115] border border-white/5 relative">
                  {exec.image ? (
                    <img
                      src={exec.image}
                      alt={exec.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div
                      className={`w-full h-full bg-gradient-to-tr ${exec.gradient} flex items-center justify-center text-white text-5xl font-black font-mono transition-transform duration-500 group-hover:scale-105`}
                    >
                      {exec.initials}
                    </div>
                  )}
                </div>

                {/* Name, role, and LinkedIn button underneath */}
                <div className="mt-5 flex justify-between items-start w-full px-2">
                  <div>
                    <h3
                      className="text-white text-xl font-bold font-sans tracking-tight"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {exec.name}
                    </h3>
                    <p className="text-white/50 text-sm font-semibold mt-0.5">
                      {exec.role}
                    </p>
                  </div>
                  <a
                    href="#"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xs font-black font-sans shrink-0 hover:opacity-80 transition-all cursor-pointer"
                    aria-label={`${exec.name}'s LinkedIn`}
                  >
                    in
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Leadership Team */}
      <section className="py-20 bg-[#0a0a0d] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="mb-12 text-left">
            <h2
              className="text-white font-bold leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}
            >
              Leadership team
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-10 max-w-4xl mx-auto">
            {TEAM_MEMBERS.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="group flex flex-col relative w-full"
              >
                {/* Full Frame Initial card header with custom border-radius */}
                <div className="overflow-hidden rounded-[2rem] aspect-[4/5] w-full bg-[#111115] border border-white/5 relative">
                  <div
                    className={`w-full h-full bg-gradient-to-tr ${member.gradient} flex items-center justify-center text-white text-3xl font-black font-mono transition-transform duration-500 group-hover:scale-105`}
                  >
                    {member.initials}
                  </div>
                </div>

                {/* Name, role, and LinkedIn button underneath */}
                <div className="mt-4 flex justify-between items-start w-full px-2">
                  <div>
                    <h4
                      className="text-white text-lg font-bold font-sans tracking-tight"
                      style={{ fontFamily: "'Poppins', sans-serif" }}
                    >
                      {member.name}
                    </h4>
                    <p className="text-white/50 text-xs font-semibold mt-0.5">
                      {member.role}
                    </p>
                  </div>
                  <a
                    href="#"
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-[10px] font-black font-sans shrink-0 hover:opacity-80 transition-all cursor-pointer"
                    aria-label={`${member.name}'s LinkedIn`}
                  >
                    in
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Call to Action */}
      <section className="py-20 bg-[#0d0d0f] relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 100%, rgba(255,255,255,0.02) 0%, transparent 60%)",
          }}
        />
        <div className="max-w-4xl mx-auto px-5 text-center relative z-10">
          <h2
            className="text-white font-bold mb-4"
            style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.4rem)" }}
          >
            Want to Collaborate with Us?
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            Let's work together to design, build, and scale your technology solution. Get in touch with our team today.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-sm hover:bg-gray-100 transition-all hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-xl"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Contact Team <ArrowLeft className="rotate-180" size={16} />
          </button>
        </div>
      </section>
    </PageLayout>
  );
}
