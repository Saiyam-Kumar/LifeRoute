import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
    Activity,
    HeartPulse,
    MapPin,
    Clock3,
    Building2,
    ChevronRight,
    CheckCircle2,
    AlertTriangle,
    ShieldCheck,
    Stethoscope,
    RotateCcw,
    Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Mock prediction — shaped to match the eventual PredictionContext   */
/* payload, so swapping this prop for context data later is a         */
/* one-line change (see default export usage note at bottom).         */
/* ------------------------------------------------------------------ */

const MOCK_PREDICTION = {
    ktas_level: 2,
    category: "Cardiology",

    resources: ["ECG", "ICU", "Oxygen", "Ventilator", "Cardiologist"],

    reasons: [
        "Chest pain indicates cardiology.",
        "Low oxygen saturation requires oxygen support.",
        "KTAS Level 2 requires urgent ICU monitoring.",
    ],

    recommended_hospital: {
        hospital: "AIIMS Delhi",
        score: 91.75,
        eta: 11,
        distance: "6.2 km",
        matched_resources: ["ECG", "ICU", "Oxygen", "Ventilator"],
        missing_resources: [],
    },
};

/* ------------------------------------------------------------------ */
/* KTAS severity — color-coded per level, matching brand restraint:   */
/* still uses standard Tailwind palette, not new custom colors.       */
/* ------------------------------------------------------------------ */

const KTAS_MAP = {
    1: { label: "Level 1 — Critical", ring: "border-red-500/30", bg: "bg-red-500/10", text: "text-red-600", dot: "bg-red-500" },
    2: { label: "Level 2 — Emergent", ring: "border-orange-500/30", bg: "bg-orange-500/10", text: "text-orange-600", dot: "bg-orange-500" },
    3: { label: "Level 3 — Urgent", ring: "border-yellow-500/30", bg: "bg-yellow-500/10", text: "text-yellow-600", dot: "bg-yellow-500" },
    4: { label: "Level 4 — Less Urgent", ring: "border-green-500/30", bg: "bg-green-500/10", text: "text-green-600", dot: "bg-green-500" },
    5: { label: "Level 5 — Non-Urgent", ring: "border-blue-500/30", bg: "bg-blue-500/10", text: "text-blue-600", dot: "bg-blue-500" },
};

const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

/* ------------------------------------------------------------------ */
/* Small presentational primitives — local to this file only.         */
/* ------------------------------------------------------------------ */

function SectionLabel({ children }) {
    return (
        <span className="font-mono text-[11px] uppercase tracking-wide text-ink-faint block mb-3">
            {children}
        </span>
    );
}

function Panel({ children, className = "" }) {
    return (
        <motion.section
            {...fadeUp}
            className={`rounded-2xl border border-ink/[0.08] bg-white p-6 sm:p-8 ${className}`}
        >
            {children}
        </motion.section>
    );
}

/* ==================================================================== */

export default function Results({ prediction = MOCK_PREDICTION }) {
    const ktas = KTAS_MAP[prediction.ktas_level] ?? KTAS_MAP[3];
    const hospital = prediction.recommended_hospital;
    const navigate = useNavigate();
    const hasMissing = hospital.missing_resources?.length > 0;

    return (
        <div className="min-h-screen bg-canvas pb-28">
            {/* urgency strip */}
            <div className="bg-route text-canvas">
                <div className="max-w-3xl mx-auto px-6 py-2.5 flex items-center justify-center gap-2 text-[13px] font-medium">
                    <AlertTriangle size={14} strokeWidth={2} />
                    <span>If this is life-threatening, call emergency services now.</span>
                </div>
            </div>

            {/* header */}
            <header className="border-b border-ink/[0.06] bg-white">
                <div className="max-w-3xl mx-auto px-6 py-5 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2.5">
                        <svg width="22" height="22" viewBox="0 0 26 26" fill="none" aria-hidden="true">
                            <circle cx="4" cy="21" r="2.5" fill="#0B0D12" />
                            <circle cx="22" cy="5" r="2.5" fill="#FF5A36" />
                            <path
                                d="M5.5 19.5C11 12 13 12 20 6.5"
                                stroke="#0B0D12"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeDasharray="1 4.2"
                            />
                        </svg>
                        <span className="font-display font-semibold text-[16px] text-ink tracking-tightest">
                            LifeRoute
                        </span>
                        <span className="ml-2 font-mono text-[11.5px] uppercase tracking-wide text-ink-faint hidden sm:inline">
                            Patient Results
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium ${ktas.ring} ${ktas.bg} ${ktas.text}`}
                        >
                            <span className={`h-1.5 w-1.5 rounded-full ${ktas.dot}`} />
                            KTAS {prediction.ktas_level}
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/25 bg-signal/10 text-signal px-3 py-1.5 text-[12px] font-medium">
                            <Stethoscope size={12} strokeWidth={2} />
                            {prediction.category}
                        </span>
                    </div>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-6 pt-10">
                {/* page intro */}
                <motion.div {...fadeUp} className="mb-8">
                    <div className="flex items-center gap-2.5 mb-3">
                        <Sparkles size={14} className="text-signal" strokeWidth={2} />
                        <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-faint">
                            AI Recommendation
                        </span>
                    </div>
                    <h1 className="font-display font-semibold text-[clamp(1.6rem,3vw,2.1rem)] tracking-tightest text-ink text-balance">
                        Here's where to go.
                    </h1>
                    <p className="text-[15px] text-ink-soft mt-2 max-w-lg">
                        Based on your assessment, LifeRoute matched you to the hospital
                        best equipped to treat you right now.
                    </p>
                </motion.div>

                {/* hero recommendation card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -3 }}
                    className="relative rounded-3xl border border-route/25 bg-white overflow-hidden mb-6 shadow-[0_20px_60px_-24px_rgba(11,13,18,0.16)]"
                >
                    {/* faint route echo, consistent with brand motif */}
                    <svg
                        viewBox="0 0 600 200"
                        className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none"
                        fill="none"
                        aria-hidden="true"
                    >
                        <path
                            d="M20,170 C 160,170 200,40 320,40 C 440,40 480,150 580,150"
                            stroke="#FF5A36"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>

                    <div className="relative flex items-center justify-between px-6 sm:px-8 pt-6">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-route/10 text-route px-3 py-1 text-[12px] font-medium">
                            <ShieldCheck size={12} strokeWidth={2} />
                            Recommended For You
                        </span>
                        <span className="font-mono text-[12px] text-ink-faint">
                            Match score {hospital.score.toFixed(1)}
                        </span>
                    </div>

                    <div className="relative px-6 sm:px-8 pt-5 pb-7">
                        <div className="flex items-start gap-3.5 mb-6">
                            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-signal/10 border border-signal/25 shrink-0">
                                <Building2 size={20} strokeWidth={1.75} className="text-signal" />
                            </div>
                            <div>
                                <h2 className="font-display font-semibold text-[20px] sm:text-[22px] text-ink tracking-tightest leading-tight">
                                    {hospital.hospital}
                                </h2>
                                <p className="text-[13.5px] text-ink-faint mt-0.5">
                                    Best overall fit for your assessment
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-7">
                            <div className="rounded-xl border border-route/20 bg-route/[0.06] p-4">
                                <div className="flex items-center gap-1.5 text-route/80 mb-1.5">
                                    <Activity size={13} />
                                    <span className="font-mono text-[10px] uppercase tracking-wide">Score</span>
                                </div>
                                <div className="font-display font-semibold text-[18px] sm:text-[20px] text-ink tracking-tightest">
                                    {hospital.score.toFixed(1)}
                                </div>
                            </div>
                            <div className="rounded-xl border border-ink/[0.08] bg-canvas-dim/40 p-4">
                                <div className="flex items-center gap-1.5 text-ink-faint mb-1.5">
                                    <Clock3 size={13} />
                                    <span className="font-mono text-[10px] uppercase tracking-wide">ETA</span>
                                </div>
                                <div className="font-display font-semibold text-[18px] sm:text-[20px] text-ink tracking-tightest">
                                    {hospital.eta} min
                                </div>
                            </div>
                            <div className="rounded-xl border border-ink/[0.08] bg-canvas-dim/40 p-4">
                                <div className="flex items-center gap-1.5 text-ink-faint mb-1.5">
                                    <MapPin size={13} />
                                    <span className="font-mono text-[10px] uppercase tracking-wide">Distance</span>
                                </div>
                                <div className="font-display font-semibold text-[18px] sm:text-[20px] text-ink tracking-tightest">
                                    {hospital.distance}
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/patient/hospital")}
                            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-route px-8 py-4 text-[15px] font-medium text-canvas transition-all duration-300 hover:bg-[#ff6b4a] active:scale-[0.98] shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_8px_24px_-8px_rgba(255,90,54,0.55)]"
                        >
                            View Hospital Details
                            <ChevronRight
                                size={16}
                                strokeWidth={2.25}
                                className="transition-transform duration-300 group-hover:translate-x-0.5"
                            />
                        </button>
                    </div>
                </motion.div>

                {/* severity */}
                <Panel className="mb-6">
                    <SectionLabel>Severity</SectionLabel>
                    <div className={`flex items-center gap-3.5 rounded-xl border p-4 ${ktas.ring} ${ktas.bg}`}>
                        <span className={`flex items-center justify-center h-10 w-10 rounded-full text-canvas font-display font-semibold text-[15px] ${ktas.dot}`}>
                            {prediction.ktas_level}
                        </span>
                        <div>
                            <div className={`font-display font-semibold text-[15.5px] tracking-tightest ${ktas.text}`}>
                                {ktas.label}
                            </div>
                            <div className="text-[13px] text-ink-faint mt-0.5">
                                Determined from your reported symptoms and vitals
                            </div>
                        </div>
                    </div>
                </Panel>

                {/* required resources */}
                <Panel className="mb-6">
                    <SectionLabel>Required Resources</SectionLabel>
                    <div className="flex flex-wrap gap-2">
                        {prediction.resources.map((r, i) => (
                            <motion.span
                                key={r}
                                initial={{ opacity: 0, y: 8 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.35, delay: i * 0.05 }}
                                className="rounded-full border border-ink/[0.1] bg-canvas-dim/40 px-3.5 py-1.5 text-[13px] text-ink-soft"
                            >
                                {r}
                            </motion.span>
                        ))}
                    </div>
                </Panel>

                {/* available / missing resources */}
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                    <Panel>
                        <SectionLabel>Available at {hospital.hospital}</SectionLabel>
                        <div className="flex flex-col gap-2.5">
                            {hospital.matched_resources.map((r, i) => (
                                <motion.div
                                    key={r}
                                    initial={{ opacity: 0, x: -8 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.35, delay: i * 0.06 }}
                                    className="flex items-center gap-2.5 text-[13.5px] text-ink-soft"
                                >
                                    <CheckCircle2 size={16} strokeWidth={2} className="text-route shrink-0" />
                                    {r}
                                </motion.div>
                            ))}
                        </div>
                    </Panel>

                    <Panel>
                        <SectionLabel>Missing Resources</SectionLabel>
                        {hasMissing ? (
                            <div className="flex flex-col gap-2.5">
                                {hospital.missing_resources.map((r, i) => (
                                    <motion.div
                                        key={r}
                                        initial={{ opacity: 0, x: -8 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.35, delay: i * 0.06 }}
                                        className="flex items-center gap-2.5 text-[13.5px] text-ink-soft"
                                    >
                                        <AlertTriangle size={16} strokeWidth={2} className="text-orange-500 shrink-0" />
                                        {r}
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex items-center gap-2.5 text-[13.5px] text-route">
                                <CheckCircle2 size={16} strokeWidth={2} className="shrink-0" />
                                All required resources available
                            </div>
                        )}
                    </Panel>
                </div>

                {/* AI clinical reasons — vertical timeline */}
                <Panel className="mb-8">
                    <SectionLabel>AI Clinical Reasons</SectionLabel>
                    <div className="relative flex flex-col gap-6 mt-1">
                        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-ink/10" />
                        {prediction.reasons.map((reason, i) => (
                            <motion.div
                                key={reason}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                className="relative flex items-start gap-4"
                            >
                                <div className="relative z-10 flex items-center justify-center h-8 w-8 rounded-full border border-signal/30 bg-signal/10 shrink-0">
                                    <HeartPulse size={14} strokeWidth={1.75} className="text-signal" />
                                </div>
                                <p className="text-[14px] leading-relaxed text-ink-soft pt-1">{reason}</p>
                            </motion.div>
                        ))}
                    </div>
                </Panel>

                {/* bottom actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="button"
                        onClick={() => navigate("/patient/hospital")}
                        className="group flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-route px-8 py-4 text-[15px] font-medium text-canvas transition-all duration-300 hover:bg-[#ff6b4a] active:scale-[0.98] shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_8px_24px_-8px_rgba(255,90,54,0.55)]"
                    >
                        View Hospital Details
                        <ChevronRight
                            size={16}
                            strokeWidth={2.25}
                            className="transition-transform duration-300 group-hover:translate-x-0.5"
                        />
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/patient/assessment")}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-8 py-4 text-[15px] font-medium text-ink hover:border-ink/30 hover:bg-ink/[0.03] transition-all duration-300 active:scale-[0.98]"
                    >
                        <RotateCcw size={15} strokeWidth={2} />
                        Start New Assessment
                    </button>
                </div>
            </div>
        </div>
    );
}