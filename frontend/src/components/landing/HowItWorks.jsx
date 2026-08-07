import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { User, Activity, LineChart, ListOrdered, MapPin } from "lucide-react";
import SectionHeading from "../common/SectionHeading";

const STAGES = [
  {
    Icon: User,
    title: "Patient",
    body: "You describe what's happening in your own words — no forms, no medical jargon required.",
  },
  {
    Icon: Activity,
    title: "KTAS AI Assessment",
    body: "LifeRoute scores severity using KTAS-aligned triage logic, the same framework emergency teams use.",
  },
  {
    Icon: LineChart,
    title: "Resource Prediction",
    body: "It forecasts which nearby hospitals will actually have the beds, staff, and equipment free by the time you arrive.",
  },
  {
    Icon: ListOrdered,
    title: "Hospital Ranking",
    body: "Candidates are ranked on specialty fit, predicted wait, and true travel time — not straight-line distance.",
  },
  {
    Icon: MapPin,
    title: "Best Recommendation",
    body: "One clear answer: where to go, why, and how long it will take — with the reasoning shown, not hidden.",
  },
];

export default function HowItWorks() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.75", "end 0.4"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="about" className="relative bg-ink py-24 lg:py-32">
      <div className="absolute inset-0 grid-texture opacity-[0.25]" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="How LifeRoute Works"
          title="One route, five decisions, made in seconds."
          description="Each stage narrows the field — from an open-ended description to a single, specific recommendation."
          dark
        />

        <div ref={containerRef} className="relative mt-16 lg:mt-20 max-w-2xl">
          {/* static track */}
          <div className="absolute left-[21px] top-2 bottom-2 w-px bg-white/10" />
          {/* progress line, tied to scroll */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[21px] top-2 w-px bg-route"
          />

          <div className="flex flex-col gap-12">
            {STAGES.map((stage, i) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex gap-6 pl-0"
              >
                <div className="relative z-10 flex items-center justify-center h-11 w-11 shrink-0 rounded-full border border-white/15 bg-panel">
                  <stage.Icon size={18} strokeWidth={1.75} className="text-white/80" />
                </div>
                <div className="pt-1.5">
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <span className="font-mono text-[12px] text-route">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="font-display font-semibold text-[18px] text-canvas tracking-tightest">
                      {stage.title}
                    </h3>
                  </div>
                  <p className="text-[14.5px] leading-relaxed text-white/55 max-w-md">
                    {stage.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
