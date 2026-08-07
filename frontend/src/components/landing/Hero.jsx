import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Sparkles, Building2 } from "lucide-react";
import Button from "../common/Button";
import RoutePath from "../common/RoutePath";


const NODES = [
  { key: "patient", label: "Patient", sub: "Symptoms in", Icon: User, x: 60, y: 150 },
  { key: "ai", label: "LifeRoute AI", sub: "Assessing", Icon: Sparkles, x: 300, y: 50, accent: true },
  { key: "hospital", label: "Right Hospital", sub: "Best match", Icon: Building2, x: 540, y: 150 },
];

const PATH = "M60,150 C 160,150 200,50 300,50 C 400,50 440,150 540,150";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section id="top" className="relative overflow-hidden bg-ink pt-40 pb-28 lg:pt-48 lg:pb-36">
      {/* ambient background: faint grid + slow drifting gradient, no blobs */}
      <div className="absolute inset-0 grid-texture opacity-40" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 22% 20%, rgba(124,140,245,0.16) 0%, rgba(11,13,18,0) 60%), radial-gradient(60% 50% at 82% 75%, rgba(255,90,54,0.12) 0%, rgba(11,13,18,0) 60%)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-16 lg:gap-8 items-center">
          {/* left: copy */}
          <div className="flex flex-col gap-7">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-route animate-pulse-soft" />
              <span className="font-mono text-[12px] tracking-wide text-white/60">
                Live hospital capacity, not a guess
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-semibold text-canvas leading-[1.02] tracking-tightest text-[clamp(2.4rem,5.4vw,4.4rem)] text-balance"
            >
              The Right Care.
              <br />
              At The Right Time.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-white/60 text-[17px] leading-relaxed max-w-md"
            >
              LifeRoute reads your symptoms, checks real-time hospital capacity
              and specialty fit, and routes you to the facility built to treat
              you — not just the one closest to you.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="font-mono text-[13px] text-white/35 max-w-md"
            >
              LifeRoute recommends where to go. It does not diagnose, treat,
              or replace emergency services.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Button
                variant="primary"
                onClick={() => navigate("/patient/assessment")}
              >
                Start Emergency Assessment
              </Button>
              <Button variant="secondary-dark" icon={false}>
                See How It Works
              </Button>
            </motion.div>
          </div>

          {/* right: the signature route — Patient → AI → Hospital */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-8 lg:p-10">
              <RoutePath
                d={PATH}
                viewBox="0 0 600 200"
                className="w-full h-auto"
                strokeColor="#FF5A36"
                dotColor="#FF5A36"
                trackColor="rgba(255,255,255,0.1)"
                duration={3.2}
              />

              {/* nodes, positioned to match the path's viewBox coordinates */}
              <div className="absolute inset-8 lg:inset-10">
                {NODES.map((node, i) => (
                  <motion.div
                    key={node.key}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.5 + i * 0.15 }}
                    className="absolute flex flex-col items-center gap-2.5"
                    style={{
                      left: `${(node.x / 600) * 100}%`,
                      top: `${(node.y / 200) * 100}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <div
                      className={`flex items-center justify-center h-11 w-11 rounded-full border ${node.accent
                          ? "bg-signal/15 border-signal/40"
                          : "bg-panel-raised border-white/15"
                        }`}
                    >
                      <node.Icon
                        size={18}
                        strokeWidth={1.75}
                        className={node.accent ? "text-signal" : "text-white/70"}
                      />
                    </div>
                    <div className="text-center">
                      <div className="text-[12.5px] font-medium text-white/85 whitespace-nowrap">
                        {node.label}
                      </div>
                      <div className="font-mono text-[10.5px] text-white/35 whitespace-nowrap">
                        {node.sub}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="absolute -bottom-4 -right-4 hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-panel px-3.5 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-route" />
              <span className="font-mono text-[11.5px] text-white/55">Routed in 8.2s avg.</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
