import { useEffect } from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import ShutterRollTemplate from "../components/ui/shutter-roll-template";
import { useSEO } from "../hooks/useSEO";

export default function DigitalMarketingPage() {
  useSEO({
    title: "FUERA Digital Marketing — Creative Campaigns, Reels & Visual Storytelling",
    description: "Department 02 of FUERA: High-impact creative campaigns, viral short-form Reels, performance Meta/Google Ads, and visual storytelling for high-growth brands in Bangalore.",
    path: "/digital-marketing",
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#2c2d1e]">
      {/* Return to FUERA Home Quick Nav Button */}
      <div className="fixed top-4 left-4 z-[999] pointer-events-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#121214]/85 hover:bg-[#E6002A] text-white text-xs font-semibold backdrop-blur-md transition-all shadow-xl border border-white/15 group"
          title="Return to FUERA Home"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Return to FUERA Home</span>
        </Link>
      </div>

      <ShutterRollTemplate height="100vh" preloader={true} />
    </div>
  );
}
