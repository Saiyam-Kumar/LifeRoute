import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowLeft,
    Building2,
    Clock3,
    MapPin,
    Activity,
    ShieldCheck,
    Phone,
    Navigation,
    HeartPulse,
    BedDouble,
    Zap,
    Wind,
    Stethoscope,
    CheckCircle2,
    XCircle,
    Sparkles,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Mock data — shaped to match the prediction payload used in         */
/* Results.jsx, so this is a straightforward PredictionContext swap   */
/* later: <HospitalDetails prediction={contextValue} />.              */
/* ------------------------------------------------------------------ */

const MOCK_PREDICTION = {
    ktas_level: 2,
    category: "Cardiology",
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
        phone: "+91 11 2658 8500",
        address: "Ansari Nagar East, New Delhi, 110029",
        emergency_department: "24/7 Level I Trauma & Cardiac Emergency",
        matched_resources: ["ICU", "ECG", "Oxygen", "Ventilator"],
        missing_resources: [],
    },
};

const RESOURCE_META = {
    ICU: { Icon: BedDouble },
    ECG: { Icon: Activity },
    Oxygen: { Icon: Wind },
    Ventilator: { Icon: Zap },
    Cardiologist: { Icon: Stethoscope },
};

const ALL_RESOURCES = ["ICU", "ECG", "Oxygen", "Ventilator", "Cardiologist"];

const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};

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

export default function HospitalDetails({ prediction = MOCK_PREDICTION }) {
    const navigate = useNavigate();
    const hospital = prediction.recommended_hospital;
    const matched = new Set(hospital.matched_resources);

    return (
        <div className="min-h-screen bg-canvas pb-28">
            <header className="border-b border-ink/[0.06] bg-white">
                <div className="max-w-3xl mx-auto px-6 py-5 flex items-center gap-4">
                    <button
                        type="button"
                        onClick={() => navigate("/patient/results")}
                        className="flex items-center justify-center h-9 w-9 rounded-full border border-ink/10 hover:bg-ink/[0.03] transition-colors"
                        aria-label="Back to results"
                    >
                        <ArrowLeft size={16} strokeWidth={2} className="text-ink" />
                    </button>
                    <div className="flex items-center gap-2.5">
                        <svg width="20" height="20" viewBox="0 0 26 26" fill="none" aria-hidden="true">
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
                        <span className="font-mono text-[11.5px] uppercase tracking-wide text-ink-faint">
                            Hospital Details
                        </span>
                    </div>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-6 pt-10">
                {/* hero */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="relative rounded-3xl border border-route/25 bg-white overflow-hidden mb-6 shadow-[0_20px_60px_-24px_rgba(11,13,18,0.16)]"
                >
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

                    <div className="relative px-6 sm:px-8 pt-6">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-route/10 text-route px-3 py-1 text-[12px] font-medium">
                            <ShieldCheck size={12} strokeWidth={2} />
                            Recommended For You
                        </span>
                    </div>

                    <div className="relative px-6 sm:px-8 pt-5 pb-7">
                        <div className="flex items-start gap-3.5 mb-6">
                            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-signal/10 border border-signal/25 shrink-0">
                                <Building2 size={20} strokeWidth={1.75} className="text-signal" />
                            </div>
                            <div>
                                <h1 className="font-display font-semibold text-[20px] sm:text-[22px] text-ink tracking-tightest leading-tight">
                                    {hospital.hospital}
                                </h1>
                                <p className="text-[13.5px] text-ink-faint mt-0.5">
                                    {hospital.emergency_department}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
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
                    </div>
                </motion.div>

                {/* resources */}
                <Panel className="mb-6">
                    <SectionLabel>Resources</SectionLabel>
                    <div className="grid sm:grid-cols-2 gap-2.5">
                        {ALL_RESOURCES.map((name, i) => {
                            const available = matched.has(name);
                            const { Icon } = RESOURCE_META[name];
                            return (
                                <motion.div
                                    key={name}
                                    initial={{ opacity: 0, y: 8 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.35, delay: i * 0.06 }}
                                    className={`flex items-center justify-between rounded-xl border px-4 py-3 ${available
                                            ? "border-ink/[0.08] bg-canvas-dim/40"
                                            : "border-ink/[0.08] bg-canvas-dim/20 opacity-70"
                                        }`}
                                >
                                    <div className="flex items-center gap-2.5">
                                        <Icon size={15} strokeWidth={1.75} className="text-ink-faint" />
                                        <span className="text-[13.5px] text-ink-soft">{name}</span>
                                    </div>
                                    {available ? (
                                        <CheckCircle2 size={16} strokeWidth={2} className="text-route" />
                                    ) : (
                                        <XCircle size={16} strokeWidth={2} className="text-ink-faint" />
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </Panel>

                {/* AI explanation */}
                <Panel className="mb-6">
                    <div className="flex items-center gap-2 mb-1">
                        <Sparkles size={14} className="text-signal" strokeWidth={2} />
                        <SectionLabel>Why LifeRoute chose this hospital</SectionLabel>
                    </div>
                    <div className="relative flex flex-col gap-6 mt-3">
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

                {/* contact */}
                <Panel className="mb-8">
                    <SectionLabel>Contact & Location</SectionLabel>
                    <div className="rounded-xl border border-ink/[0.08] divide-y divide-ink/[0.06]">
                        <div className="flex items-center justify-between px-4 py-3.5">
                            <div className="flex items-center gap-2.5">
                                <Phone
                                    size={15}
                                    strokeWidth={1.75}
                                    className="text-ink-faint"
                                />
                                <span className="text-[13.5px] text-ink-soft">
                                    {hospital.phone}
                                </span>
                            </div>

                            <a
                                href={`tel:${hospital.phone}`}
                                className="font-mono text-[12px] text-route hover:text-[#ff6b4a] transition-colors"
                            >
                                Call
                            </a>
                        </div>
                        <div className="flex items-start gap-2.5 px-4 py-3.5">
                            <MapPin size={15} strokeWidth={1.75} className="text-ink-faint shrink-0 mt-0.5" />
                            <span className="text-[13.5px] text-ink-soft">{hospital.address}</span>
                        </div>
                        <div className="flex items-start gap-2.5 px-4 py-3.5">
                            <Building2 size={15} strokeWidth={1.75} className="text-ink-faint shrink-0 mt-0.5" />
                            <span className="text-[13.5px] text-ink-soft">{hospital.emergency_department}</span>
                        </div>
                    </div>
                </Panel>

                {/* actions */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        type="button"
                        className="group flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-route px-8 py-4 text-[15px] font-medium text-canvas transition-all duration-300 hover:bg-[#ff6b4a] active:scale-[0.98] shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_8px_24px_-8px_rgba(255,90,54,0.55)]"
                    >
                        <Navigation size={16} strokeWidth={2.25} />
                        Start Navigation
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/patient/results")}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/15 px-8 py-4 text-[15px] font-medium text-ink hover:border-ink/30 hover:bg-ink/[0.03] transition-all duration-300 active:scale-[0.98]"
                    >
                        <ArrowLeft size={15} strokeWidth={2} />
                        Back to Results
                    </button>
                </div>
            </div>
        </div>
    );
}