import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, FileText, Activity, Building2, ListOrdered, CheckCircle2 } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Mock processing steps — no backend, purely simulated progress.     */
/* Shape mirrors what a future PredictionContext "status" stream      */
/* would emit, so swapping this for real progress events later is a  */
/* drop-in change.                                                    */
/* ------------------------------------------------------------------ */

const STEPS = [
  { label: "Analyzing Patient", Icon: FileText },
  { label: "Predicting KTAS", Icon: Activity },
  { label: "Allocating Resources", Icon: Sparkles },
  { label: "Searching Hospitals", Icon: Building2 },
  { label: "Calculating ETA", Icon: Activity },
  { label: "Ranking Hospitals", Icon: ListOrdered },
  { label: "Preparing Recommendation", Icon: CheckCircle2 },
];

const TOTAL_DURATION_MS = 5000;
const STEP_DURATION_MS = TOTAL_DURATION_MS / STEPS.length;

export default function Loading({ redirectTo = "/patient/results" }) {
  const navigate = useNavigate();
  const [stepIndex, setStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setStepIndex((i) => (i < STEPS.length - 1 ? i + 1 : i));
    }, STEP_DURATION_MS);

    const progressTimer = setInterval(() => {
      setProgress((p) => Math.min(p + 100 / (TOTAL_DURATION_MS / 60), 100));
    }, 60);

    const redirectTimer = setTimeout(() => {
      navigate(redirectTo);
    }, TOTAL_DURATION_MS + 300);

    return () => {
      clearInterval(stepTimer);
      clearInterval(progressTimer);
      clearTimeout(redirectTimer);
    };
  }, [navigate, redirectTo]);

  const circumference = 2 * Math.PI * 54;
  const dashOffset = circumference * (1 - progress / 100);

  return (
    <div className="min-h-screen bg-ink relative overflow-hidden flex items-center justify-center px-6">
      <div className="absolute inset-0 grid-texture opacity-40" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 55% at 22% 20%, rgba(124,140,245,0.16) 0%, rgba(11,13,18,0) 60%), radial-gradient(60% 50% at 82% 75%, rgba(255,90,54,0.12) 0%, rgba(11,13,18,0) 60%)",
        }}
      />

      <div className="relative w-full max-w-md flex flex-col items-center text-center gap-10">
        <div className="flex items-center gap-2.5">
          <span className="h-1.5 w-1.5 rounded-full bg-route animate-pulse-soft" />
          <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-white/50">
            Processing
          </span>
        </div>

        {/* circular AI animation */}
        <div className="relative h-44 w-44 flex items-center justify-center">
          {/* slow rotating outer ring, purely decorative */}
          <motion.div
            className="absolute inset-0 rounded-full border border-dashed border-white/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          />

          <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full -rotate-90">
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="2.5"
            />
            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="#FF5A36"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: "stroke-dashoffset 60ms linear" }}
            />
          </svg>

          <div className="relative flex items-center justify-center h-20 w-20 rounded-full bg-signal/15 border border-signal/30">
            <motion.div
              animate={{ scale: [1, 1.12, 1], opacity: [0.85, 1, 0.85] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles size={26} strokeWidth={1.75} className="text-signal" />
            </motion.div>
          </div>

          <span className="absolute -bottom-2 rounded-full bg-panel border border-white/10 px-3 py-1 font-mono text-[11px] text-white/60">
            {Math.round(progress)}%
          </span>
        </div>

        {/* headline */}
        <div className="flex flex-col gap-2">
          <h1 className="font-display font-semibold text-[19px] sm:text-[21px] text-canvas tracking-tightest">
            LifeRoute AI is analyzing your case...
          </h1>
          <p className="text-[13.5px] text-white/45">
            This usually takes just a few seconds.
          </p>
        </div>

        {/* current step indicator */}
        <div className="h-6 w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={stepIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center gap-2"
            >
              {(() => {
                const StepIcon = STEPS[stepIndex].Icon;
                return <StepIcon size={14} strokeWidth={1.75} className="text-route" />;
              })()}
              <span className="font-mono text-[13px] text-white/70">
                {STEPS[stepIndex].label}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* progress bar */}
        <div className="w-full flex flex-col gap-3">
          <div className="w-full h-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full bg-route"
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.06 }}
            />
          </div>

          {/* step list */}
          <div className="flex flex-col gap-2 mt-2">
            {STEPS.map((step, i) => {
              const done = i < stepIndex;
              const active = i === stepIndex;
              return (
                <div
                  key={step.label}
                  className={`flex items-center gap-2.5 text-[12.5px] transition-colors duration-300 ${
                    active ? "text-white/85" : done ? "text-white/40" : "text-white/25"
                  }`}
                >
                  {done ? (
                    <CheckCircle2 size={13} strokeWidth={2} className="text-route shrink-0" />
                  ) : (
                    <span
                      className={`h-[13px] w-[13px] rounded-full border shrink-0 ${
                        active ? "border-route" : "border-white/20"
                      }`}
                    />
                  )}
                  <span className="text-left">{step.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}