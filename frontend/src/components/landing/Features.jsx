import { motion } from "framer-motion";
import {
  Activity,
  Radar,
  Target,
  Timer,
  Route,
  ShieldCheck,
} from "lucide-react";
import SectionHeading from "../common/SectionHeading";

const FEATURES = [
  {
    Icon: Activity,
    title: "KTAS-Based Triage",
    body: "Severity scoring built on the Korean Triage and Acuity Scale — clinically grounded, not a generic chatbot guess.",
  },
  {
    Icon: Radar,
    title: "Real-Time Capacity",
    body: "Live bed availability, ER load, and specialist on-call status, refreshed continuously.",
  },
  {
    Icon: Target,
    title: "Specialty Matching",
    body: "Routes every patient to the hospital actually equipped for their emergency.",
  },
  {
    Icon: Timer,
    title: "Predictive ETA",
    body: "Live traffic and travel time are included before recommending a hospital.",
  },
  {
    Icon: Route,
    title: "Explainable Routing",
    body: "Every recommendation includes the reasoning behind the decision.",
  },
  {
    Icon: ShieldCheck,
    title: "Built for Emergencies",
    body: "Fast, simple and designed for high-pressure situations.",
  },
];

export default function Features() {
  return (
    <section
      id="features"
      className="relative bg-[#141A24] py-24 lg:py-32"
    >
      <div className="absolute inset-0 grid-texture opacity-30" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Features"
          title="Every decision an emergency team would make — before you arrive."
          description="LifeRoute combines AI triage, hospital capacity, specialist availability and travel time into one recommendation."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: i * 0.05,
              }}
              whileHover={{
                y: -6,
              }}
              className="group rounded-2xl border border-white/10 bg-[#1C2330] p-7 transition-all duration-300 hover:bg-[#252D3A] hover:border-route/30"
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-white/5 mb-6 group-hover:bg-route/10 transition">
                <f.Icon
                  size={20}
                  strokeWidth={1.8}
                  className="text-white/80 group-hover:text-route transition"
                />
              </div>

              <h3 className="text-white font-semibold text-lg mb-3">
                {f.title}
              </h3>

              <p className="text-white/65 leading-7">
                {f.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}