import { motion } from "framer-motion";
import { Clock, SignpostBig, BrainCircuit } from "lucide-react";

const CARDS = [
  {
    Icon: Clock,
    label: "01",
    title: "Time Critical",
    body: "In an emergency, every misdirected minute compounds. Choosing where to go is often the single most consequential decision — made with the least information.",
  },
  {
    Icon: SignpostBig,
    label: "02",
    title: "Nearest Isn't Always Best",
    body: "The closest hospital may lack the specialty, imaging, or bed capacity your situation needs. Distance answers the wrong question.",
  },
  {
    Icon: BrainCircuit,
    label: "03",
    title: "Smarter Emergency Decisions",
    body: "LifeRoute weighs severity, hospital readiness, and real distance together — and shows you the reasoning, not just a pin on a map.",
  },
];

export default function ProblemSection() {
  return (
    <section className="relative bg-[#0B0D12] py-24 lg:py-32 overflow-hidden">

      {/* background grid */}
      <div className="absolute inset-0 grid-texture opacity-40" />

      {/* glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 20%, rgba(255,90,54,0.08), transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        <div className="mb-16 max-w-2xl">
          <span className="font-mono uppercase tracking-[0.22em] text-route text-xs">
            WHY LIFEROUTE
          </span>

          <h2 className="mt-4 text-5xl font-display font-semibold text-white leading-tight">
            Better decisions,
            <br />
            before you leave home.
          </h2>

          <p className="mt-5 text-white/60 text-lg leading-relaxed">
            Every recommendation considers urgency, hospital readiness,
            travel time and specialty fit—not just distance.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">

          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: .55,
                delay: i * .08
              }}
              whileHover={{
                y: -6
              }}
              className="rounded-2xl border border-white/10 bg-[#171B24] p-8 transition-all hover:border-route/30 hover:bg-[#1C2230]"
            >

              <div className="flex justify-between items-center mb-8">

                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                  <card.Icon
                    size={22}
                    className="text-route"
                  />
                </div>

                <span className="font-mono text-white/30">
                  {card.label}
                </span>

              </div>

              <h3 className="text-white text-2xl font-semibold mb-4">
                {card.title}
              </h3>

              <p className="text-white/60 leading-8">
                {card.body}
              </p>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}