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
    <section className="relative bg-canvas py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-7">
          {CARDS.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl border border-ink/[0.08] bg-white p-8 transition-shadow duration-300 hover:shadow-[0_20px_50px_-24px_rgba(11,13,18,0.18)]"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center justify-center h-11 w-11 rounded-xl bg-ink/[0.04] group-hover:bg-route/10 transition-colors duration-300">
                  <card.Icon size={20} strokeWidth={1.75} className="text-ink group-hover:text-route transition-colors duration-300" />
                </div>
                <span className="font-mono text-[12px] text-ink-faint">{card.label}</span>
              </div>
              <h3 className="font-display font-semibold text-[19px] tracking-tightest text-ink mb-3">
                {card.title}
              </h3>
              <p className="text-[14.5px] leading-relaxed text-ink-soft">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
