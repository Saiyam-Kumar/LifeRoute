import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  UserRound,
  Activity,
  BedDouble,
  ListFilter,
  MapPin,
  ArrowRight,
  Check,
} from "lucide-react";

const STEPS = [
  {
    number: "01",
    title: "Patient",
    description:
      "You describe what's happening in your own words — no forms, no medical jargon required.",
    icon: UserRound,
  },
  {
    number: "02",
    title: "KTAS AI Assessment",
    description:
      "LifeRoute scores severity using KTAS-aligned triage logic, the same framework emergency teams use.",
    icon: Activity,
  },
  {
    number: "03",
    title: "Resource Prediction",
    description:
      "It forecasts which nearby hospitals will actually have the beds, staff, and equipment free by the time you arrive.",
    icon: BedDouble,
  },
  {
    number: "04",
    title: "Hospital Ranking",
    description:
      "Candidates are ranked on specialty fit, predicted wait, and true travel time — not straight-line distance.",
    icon: ListFilter,
  },
  {
    number: "05",
    title: "Best Recommendation",
    description:
      "One clear answer: where to go, why, and how long it will take — with the reasoning shown, not hidden.",
    icon: MapPin,
  },
];

function RoutingEngineCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        relative
        w-full
        overflow-hidden
        rounded-[26px]
        border border-white/[0.10]
        bg-[#11151D]
        shadow-[0_30px_90px_rgba(0,0,0,0.32)]
      "
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#4A58B4]/10 blur-[100px]" />

        <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-[#FF5A36]/10 blur-[100px]" />
      </div>

      {/* Top highlight */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />

      <div className="relative flex min-h-[590px] flex-col p-7 lg:p-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-route shadow-[0_0_8px_rgba(255,90,54,0.8)]" />

              <p className="font-mono text-[10px] font-medium uppercase tracking-[0.25em] text-white/35">
                LifeRoute Routing Engine
              </p>
            </div>

            <h3 className="mt-3 font-display text-[22px] font-semibold tracking-tight text-white">
              From symptoms to route
            </h3>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-emerald-400/15 bg-emerald-400/[0.06] px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,0.8)]" />

            <span className="font-mono text-[9px] font-medium uppercase tracking-[0.18em] text-emerald-300/80">
              Active
            </span>
          </div>
        </div>

        {/* Routing stages */}
        <div className="mt-8 space-y-3">
          {/* Patient */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 transition-colors duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]">
            <div className="flex items-center gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#171C25] text-white/45">
                <UserRound size={16} strokeWidth={1.7} />
              </div>

              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                  Patient input
                </p>

                <p className="mt-1 text-sm font-medium text-white/75">
                  Symptoms & arrival mode
                </p>
              </div>
            </div>
          </div>

          {/* Severity */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 transition-colors duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-route/20 bg-route/[0.06] text-route">
                  <Activity size={16} strokeWidth={1.7} />
                </div>

                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                    Severity assessment
                  </p>

                  <p className="mt-1 text-sm font-medium text-white/75">
                    KTAS Level
                  </p>
                </div>
              </div>

              <span className="rounded-full border border-route/15 bg-route/[0.08] px-2.5 py-1 font-mono text-[9px] font-medium text-route">
                Emergent
              </span>
            </div>
          </div>

          {/* Resources */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 transition-colors duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]">
            <div className="flex items-center gap-4">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#171C25] text-white/45">
                <BedDouble size={16} strokeWidth={1.7} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                  Resource match
                </p>

                <div className="mt-2 flex flex-wrap gap-2">
                  {["ICU", "Specialist", "Oxygen"].map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-white/[0.08] bg-white/[0.035] px-2 py-1 text-[10px] font-medium text-white/45"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Ranking */}
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 transition-colors duration-300 hover:border-white/[0.12] hover:bg-white/[0.04]">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#171C25] text-white/45">
                  <ListFilter size={16} strokeWidth={1.7} />
                </div>

                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                    Hospital ranking
                  </p>

                  <p className="mt-1 text-sm font-medium text-white/75">
                    Candidate hospitals
                  </p>
                </div>
              </div>

              <span className="text-[11px] text-white/30">
                18 checked
              </span>
            </div>
          </div>

          {/* Recommendation */}
          <div className="rounded-2xl border border-route/25 bg-gradient-to-r from-route/[0.08] to-transparent p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-route/25 bg-route/[0.08] text-route">
                  <MapPin size={16} strokeWidth={1.7} />
                </div>

                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30">
                    Final recommendation
                  </p>

                  <p className="mt-1 text-sm font-semibold text-white/85">
                    Best-fit hospital
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-emerald-400">
                <Check size={14} strokeWidth={2} />

                <span className="text-[10px] font-medium">
                  Matched
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom explanation */}
        <div className="mt-auto pt-7">
          <div className="h-px bg-white/[0.07]" />

          <div className="flex items-start gap-3 pt-5">
            <div className="mt-0.5 text-route">
              <ArrowRight size={15} />
            </div>

            <p className="text-xs leading-5 text-white/35">
              Every decision narrows the route until one hospital remains.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  /*
    This ref represents ONLY the timeline.

    Framer Motion watches the position of this element
    relative to the viewport.
  */
  const timelineRef = useRef(null);

  /*
    scrollYProgress:
      0 = timeline hasn't reached the activation point
      1 = timeline has completely passed through it

    This is what makes the orange line actually respond
    to the user's page scrolling.
  */
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 65%", "end 35%"],
  });

  /*
    The orange line starts at 0% height and grows to 100%.
  */
  const orangeLineHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-[#0B0D12] py-24 lg:py-32"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[8%] top-[25%] h-96 w-96 rounded-full bg-[#4A58B4]/[0.06] blur-[140px]" />

        <div className="absolute bottom-[10%] right-[8%] h-96 w-96 rounded-full bg-[#FF5A36]/[0.05] blur-[140px]" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 grid-texture opacity-[0.16]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-route" />

            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-white/40">
              How LifeRoute Works
            </span>
          </div>

          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2.5rem,4vw,4rem)] font-semibold leading-[1.04] tracking-[-0.035em] text-white">
            One route, five decisions,
            <br />
            made in seconds.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-7 text-white/50 md:text-lg md:leading-8">
            Each stage narrows the field — from an open-ended description to
            a single, specific recommendation.
          </p>
        </motion.div>

        {/* =========================================================
            CONTENT
        ========================================================= */}
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(460px,0.9fr)] lg:gap-16">
          {/* =======================================================
              TIMELINE
          ======================================================= */}
          <div ref={timelineRef} className="relative min-w-0">
            {/*
              GREY BASE LINE

              This is ALWAYS visible.
              It represents the entire route.
            */}
            <div className="pointer-events-none absolute left-[20px] top-[20px] bottom-[20px] w-px bg-white/[0.10]" />

            {/*
              ORANGE PROGRESS LINE

              This is controlled by Framer Motion.

              As the user scrolls:
              0%  -> nothing orange
              25% -> first quarter orange
              50% -> half orange
              75% -> three quarters orange
              100% -> complete orange

              It sits ABOVE the grey line.
            */}
            <motion.div
              style={{
                height: orangeLineHeight,
              }}
              className="
                pointer-events-none
                absolute
                left-[20px]
                top-[20px]
                w-px
                origin-top
                bg-route
                shadow-[0_0_8px_rgba(255,90,54,0.35)]
              "
            />

            {/* Timeline steps */}
            <div className="relative space-y-7">
              {STEPS.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{
                      once: true,
                      amount: 0.25,
                    }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.07,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative flex gap-5"
                  >
                    {/* Node */}
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.12] bg-[#0B0D12] text-white/45 shadow-[0_0_0_5px_#0B0D12]">
                      <Icon size={16} strokeWidth={1.6} />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 pb-3 pt-0.5">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[10px] font-medium text-route">
                          {step.number}
                        </span>

                        <h3 className="font-display text-[17px] font-semibold tracking-tight text-white">
                          {step.title}
                        </h3>
                      </div>

                      <p className="mt-3 max-w-2xl text-sm leading-6 text-white/45 md:text-[15px] md:leading-7">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* =======================================================
              RIGHT CARD
          ======================================================= */}
          <div className="min-w-0 lg:sticky lg:top-28">
            <RoutingEngineCard />
          </div>
        </div>
      </div>
    </section>
  );
}