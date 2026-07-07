import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ArrowLeft, ArrowRight, Linkedin, Mail } from "lucide-react";
import PageLayout from "../components/PageLayout";

const TEAM = [
  {
    name: "R. Akash",
    role: "Founder & Managing Director",
    initials: "RA",
    email: "fuera.solutions.23@gmail.com",
    bio: "Visionary entrepreneur with a passion for building brands that scale. Akash founded FUERA with the mission to make world-class digital marketing accessible to every Indian business. He oversees strategy, innovation, and long-term growth across the organisation.",
    expertise: ["Business Strategy", "Brand Development", "Growth Hacking", "Investor Relations"],
    color: 200,
  },
  {
    name: "Niranjith M",
    role: "Co-Founder",
    initials: "NM",
    email: "fuera.solutions.23@gmail.com",
    bio: "Niranjith brings operational depth and product thinking to FUERA. He plays a critical role in shaping product offerings, driving business expansion, and ensuring seamless client delivery across all service lines.",
    expertise: ["Operations", "Product Development", "Business Expansion", "Client Management"],
    color: 255,
  },
  {
    name: "Rohith B",
    role: "Chief Executive Officer (CEO)",
    initials: "RB",
    email: "fuera.solutions.23@gmail.com",
    bio: "Rohith leads FUERA's day-to-day operations and is responsible for executing the company's strategic vision. With a deep focus on organisational efficiency and team performance, he ensures every department delivers at the highest level.",
    expertise: ["Executive Leadership", "Strategic Execution", "Team Management", "P&L Ownership"],
    color: 310,
  },
  {
    name: "Manya H. R.",
    role: "Chief Financial Officer (CFO)",
    initials: "MH",
    email: "fuera.solutions.23@gmail.com",
    bio: "Manya oversees all financial planning, budgeting, and investment strategy at FUERA. Her analytical approach and financial discipline are instrumental in ensuring sustainable growth and fiscal responsibility for the company and its clients.",
    expertise: ["Financial Planning", "Budgeting", "Investment Strategy", "Compliance"],
    color: 160,
  },
  {
    name: "Deepthi",
    role: "Chief Marketing Officer (CMO)",
    initials: "D",
    email: "fuera.solutions.23@gmail.com",
    bio: "Deepthi drives brand strategy, digital marketing initiatives, and customer acquisition for FUERA and its clients. She is at the forefront of every campaign, ensuring creative excellence and data-backed results are delivered consistently.",
    expertise: ["Brand Strategy", "Digital Campaigns", "Customer Acquisition", "Market Expansion"],
    color: 40,
  },
];

const CULTURE_POINTS = [
  { title: "Remote-Friendly", desc: "We trust our team to deliver from wherever they work best." },
  { title: "Learning First", desc: "Certifications, tools, and workshops — we invest in your growth." },
  { title: "Impact Driven", desc: "Every team member sees how their work affects real businesses." },
  { title: "Open Communication", desc: "No hierarchy of silence — everyone has a voice here." },
];

export default function TeamPage() {
  const navigate = useNavigate();

  return (
    <PageLayout>
      {/* Hero */}
      <section className="relative py-24 bg-[#070709] overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 60%)" }} />
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <button onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/50 hover:text-white text-sm mb-8 transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            <ArrowLeft size={16} /> Back to Home
          </button>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>
              The People Behind FUERA
            </p>
            <h1 className="text-white font-bold mb-5 leading-tight"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              Meet Our Team
            </h1>
            <p className="text-white/55 max-w-2xl text-base leading-relaxed">
              We are a tight-knit team of strategists, creatives, and technologists united by a single mission — to help businesses grow in the digital world.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-[#0d0d0f]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-14">
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>Leadership</p>
            <h2 className="text-white font-bold" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.2rem)" }}>Leadership Team</h2>
          </div>

          {/* Featured top 3 */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {TEAM.slice(0, 3).map((member, i) => (
              <motion.div key={member.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group border border-white/8 rounded-xl bg-[#111115] p-7 hover:border-white/25 hover:bg-[#161619] transition-all duration-300">
                {/* Avatar */}
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, hsl(${member.color}, 40%, 14%) 0%, hsl(${member.color + 30}, 45%, 20%) 100%)`,
                    border: `2px solid hsl(${member.color}, 40%, 28%)`,
                    boxShadow: `0 0 28px hsl(${member.color}, 45%, 12%)`,
                  }}>
                  <span className="text-2xl font-bold" style={{ fontFamily: "'Poppins', sans-serif", color: `hsl(${member.color}, 55%, 70%)` }}>
                    {member.initials}
                  </span>
                </div>
                <p className="text-white font-bold text-lg mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>{member.name}</p>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-4">{member.role}</p>
                <div className="w-10 h-px bg-white/10 mb-4" />
                <p className="text-white/50 text-sm leading-relaxed mb-5">{member.bio}</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {member.expertise.map(e => (
                    <span key={e} className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-white/50 font-medium">
                      {e}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a href={`mailto:${member.email}`}
                    className="w-8 h-8 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center rounded-full transition-colors">
                    <Mail size={13} className="text-white/60" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer"
                    className="w-8 h-8 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center rounded-full transition-colors">
                    <Linkedin size={13} className="text-white/60" />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Other 2 members */}
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {TEAM.slice(3).map((member, i) => (
              <motion.div key={member.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 + 0.3 }}
                className="group border border-white/8 rounded-xl bg-[#111115] p-7 hover:border-white/25 hover:bg-[#161619] transition-all duration-300">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(135deg, hsl(${member.color}, 40%, 14%) 0%, hsl(${member.color + 30}, 45%, 20%) 100%)`,
                      border: `2px solid hsl(${member.color}, 40%, 28%)`,
                      boxShadow: `0 0 20px hsl(${member.color}, 45%, 12%)`,
                    }}>
                    <span className="text-lg font-bold" style={{ fontFamily: "'Poppins', sans-serif", color: `hsl(${member.color}, 55%, 70%)` }}>
                      {member.initials}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-base mb-0.5" style={{ fontFamily: "'Poppins', sans-serif" }}>{member.name}</p>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-3">{member.role}</p>
                    <p className="text-white/50 text-sm leading-relaxed mb-4">{member.bio}</p>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map(e => (
                        <span key={e} className="text-[10px] px-2.5 py-1 rounded-full bg-white/5 border border-white/8 text-white/50 font-medium">
                          {e}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture */}
      <section className="py-16 bg-[#111115]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="text-center mb-12">
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>Life at FUERA</p>
            <h2 className="text-white font-bold" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>Our Culture</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {CULTURE_POINTS.map((c, i) => (
              <motion.div key={c.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="border border-white/8 rounded-xl bg-[#0d0d0f] p-6 hover:border-white/20 transition-all text-center">
                <div className="text-2xl mb-3">
                  {["🏠", "📚", "💡", "🗣️"][i]}
                </div>
                <h3 className="text-white font-semibold mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>{c.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0d0d0f]">
        <div className="max-w-3xl mx-auto px-5 text-center">
          <h2 className="text-white font-bold mb-4" style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(1.6rem, 3vw, 2.2rem)" }}>
            Want to join the FUERA family?
          </h2>
          <p className="text-white/60 mb-8">We're always looking for exceptional people. Check out our open positions.</p>
          <button onClick={() => navigate("/careers")}
            className="inline-flex items-center gap-2 bg-white text-black font-semibold px-8 py-4 rounded-sm hover:bg-gray-100 transition-all hover:-translate-y-0.5"
            style={{ fontFamily: "'Poppins', sans-serif" }}>
            View Open Roles <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </PageLayout>
  );
}
