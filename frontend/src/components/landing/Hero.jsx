import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../common/Button";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-[#0B0D12] pt-36 pb-24 lg:pt-40 lg:pb-32">

      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(74,88,180,.18), transparent 45%), radial-gradient(circle at bottom right, rgba(255,90,54,.10), transparent 40%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-20 items-center">

          {/* LEFT */}

          <div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 mb-8"
            >
              <span className="h-2 w-2 rounded-full bg-route"></span>
              <span className="font-mono text-xs text-white/70">
                Live hospital capacity, not a guess
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-display text-white/70 font-semibold leading-[1.02] tracking-tight text-[clamp(3.5rem,6vw,5.8rem)]"
            >
              The Right Care.
              <br />
              At The Right Time.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-8 text-white/65 text-lg leading-9 max-w-2xl"
            >
              LifeRoute reads your symptoms, checks live hospital capacity,
              specialist availability, and travel time before recommending
              the hospital most capable of treating your emergency.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex gap-4 mt-10 flex-wrap"
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

          {/* RIGHT */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >

            <div className="max-w-xl ml-auto rounded-3xl border border-white/10 bg-[#171C25]/90 backdrop-blur-xl p-7 shadow-[0_20px_70px_rgba(0,0,0,0.45)]">

              <div className="flex justify-between items-center mb-8">

                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-white/35">
                    Live Hospital Intelligence
                  </p>

                  <h2 className="text-2xl font-semibold text-white mt-2">
                    AI Recommendation
                  </h2>
                </div>

                <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse"></div>

              </div>

              <div className="space-y-6">

                <div className="flex justify-between">
                  <span className="text-white/45">Hospitals Checked</span>
                  <span className="text-white font-semibold">18</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/45">KTAS Severity</span>
                  <span className="text-route font-semibold">
                    Level 2 • Emergent
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/45">Predicted ETA</span>
                  <span className="text-white font-semibold">
                    11 min
                  </span>
                </div>

                <div className="border-t border-white/10"></div>

                <div>

                  <p className="text-white/40 text-sm">
                    Recommended Hospital
                  </p>

                  <h1 className="text-3xl font-bold text-white mt-2">
                    Fortis Delhi
                  </h1>

                  <p className="text-route mt-2">
                    Capacity Match • 98%
                  </p>

                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">

                  <div className="rounded-2xl bg-white/5 p-5">

                    <p className="text-white/40 text-sm">
                      ICU Beds
                    </p>

                    <h2 className="text-white text-2xl font-bold mt-2">
                      14
                    </h2>

                  </div>

                  <div className="rounded-2xl bg-white/5 p-5">

                    <p className="text-white/40 text-sm">
                      Confidence
                    </p>

                    <h2 className="text-route text-3xl font-bold mt-2">
                      96%
                    </h2>

                  </div>

                </div>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </section>
  );
}