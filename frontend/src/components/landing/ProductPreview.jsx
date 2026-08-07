import { motion } from "framer-motion";
import { Building2, Clock3, Activity, BedDouble, Syringe, ScanLine, ChevronRight } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import RoutePath from "../common/RoutePath";

const RESOURCES = [
  { Icon: BedDouble, label: "ER Beds", value: "6 open" },
  { Icon: Syringe, label: "Trauma Team", value: "On call" },
  { Icon: ScanLine, label: "CT Imaging", value: "Available" },
];

export default function ProductPreview() {
  return (
    <section className="relative bg-ink py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-texture opacity-[0.25]" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          eyebrow="Inside LifeRoute"
          title="One recommendation. Fully explained."
          description="Not a list of nearby pins — a single ranked answer, with the reasoning attached."
          dark
        />

        <div className="relative mt-16 lg:mt-20 rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10 lg:p-16">
          {/* faint background route echo */}
          <RoutePath
            d="M40,260 C 220,260 260,60 460,60 C 620,60 680,180 760,180"
            viewBox="0 0 800 320"
            className="absolute inset-0 w-full h-full opacity-[0.35]"
            strokeColor="#7C8CF5"
            dotColor="#7C8CF5"
            trackColor="rgba(255,255,255,0.06)"
            duration={5}
          />

          <div className="relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-md animate-float rounded-2xl border border-white/15 bg-panel/70 backdrop-blur-xl p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
            >
              {/* header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-route animate-pulse-soft" />
                  <span className="font-mono text-[11.5px] uppercase tracking-wide text-white/45">
                    Recommendation
                  </span>
                </div>
                <span className="font-mono text-[11.5px] text-white/35">Routed in 7.8s</span>
              </div>

              {/* hospital */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-signal/15 border border-signal/30 shrink-0">
                    <Building2 size={19} strokeWidth={1.75} className="text-signal" />
                  </div>
                  <div>
                    <div className="font-display font-semibold text-[17px] text-canvas tracking-tightest leading-tight">
                      St. Helena Medical Center
                    </div>
                    <div className="text-[13px] text-white/45 mt-0.5">
                      Level II Trauma · Cardiac Ready
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-white/30 mt-1.5 shrink-0" />
              </div>

              {/* ETA + KTAS row */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex items-center gap-1.5 text-white/40 mb-2">
                    <Clock3 size={13} />
                    <span className="font-mono text-[10.5px] uppercase tracking-wide">ETA</span>
                  </div>
                  <div className="font-display font-semibold text-[22px] text-canvas tracking-tightest">
                    11 min
                  </div>
                </div>
                <div className="rounded-xl border border-route/25 bg-route/[0.08] p-4">
                  <div className="flex items-center gap-1.5 text-route/80 mb-2">
                    <Activity size={13} />
                    <span className="font-mono text-[10.5px] uppercase tracking-wide">KTAS Level</span>
                  </div>
                  <div className="font-display font-semibold text-[22px] text-canvas tracking-tightest">
                    2 — Emergent
                  </div>
                </div>
              </div>

              {/* resources */}
              <div className="rounded-xl border border-white/10 bg-white/[0.02] divide-y divide-white/[0.06]">
                {RESOURCES.map((r) => (
                  <div key={r.label} className="flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <r.Icon size={15} strokeWidth={1.75} className="text-white/45" />
                      <span className="text-[13.5px] text-white/70">{r.label}</span>
                    </div>
                    <span className="font-mono text-[12.5px] text-white/50">{r.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
