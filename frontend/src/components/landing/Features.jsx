import { motion } from "framer-motion";
import { Activity, Radar, Target, Timer, Route, ShieldCheck } from "lucide-react";
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
    body: "Live bed availability, ER load, and specialist on-call status, refreshed continuously — not a static directory.",
  },
  {
    Icon: Target,
    title: "Specialty Matching",
    body: "Routes stroke, cardiac, pediatric, and trauma cases to hospitals actually equipped to treat that condition.",
  },
  {
    Icon: Timer,
    title: "Predictive ETA",
    body: "Accounts for live traffic and transport mode, so the estimate is your real arrival time — not a straight line on a map.",
  },
  {
    Icon: Route,
    title: "Explainable Routing",
    body: "Every recommendation shows its reasoning: severity, wait time, distance, and fit — never a black box.",
  },
  {
    Icon: ShieldCheck,
    title: "Built for Emergencies",
    body: "Minimal input, maximum clarity. Every screen is designed to be usable by someone under real stress.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative bg-canvas py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Features"
          title="Every decision an ER physician would make — before you arrive."
          description="LifeRoute compresses triage, capacity checks, and hospital selection into the first step of your emergency, not the last."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -3 }}
              className="group rounded-2xl border border-ink/[0.08] bg-white p-7 transition-shadow duration-300 hover:shadow-[0_20px_50px_-24px_rgba(11,13,18,0.16)]"
            >
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-ink/[0.04] group-hover:bg-route/10 transition-colors duration-300 mb-6">
                <f.Icon size={18} strokeWidth={1.75} className="text-ink group-hover:text-route transition-colors duration-300" />
              </div>
              <h3 className="font-display font-semibold text-[16.5px] tracking-tightest text-ink mb-2.5">
                {f.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-ink-soft">{f.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
