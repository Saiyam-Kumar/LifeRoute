import { useNavigate } from "react-router-dom";
import usePrediction from "../../hooks/usePrediction";
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


const RESOURCE_META = {
    ICU: { Icon: BedDouble },
    ECG: { Icon: Activity },
    Oxygen: { Icon: Wind },
    Ventilator: { Icon: Zap },
    Cardiologist: { Icon: Stethoscope },
};


const ALL_RESOURCES = [
    "ICU",
    "ECG",
    "Oxygen",
    "Ventilator",
    "Cardiologist",
];


const fadeUp = {
    initial: {
        opacity: 0,
        y: 16,
    },

    whileInView: {
        opacity: 1,
        y: 0,
    },

    viewport: {
        once: true,
        amount: 0.3,
    },

    transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
    },
};


function SectionLabel({ children }) {
    return (
        <span className="font-mono text-[11px] uppercase tracking-wide text-white/30 block mb-3">
            {children}
        </span>
    );
}


function Panel({ children, className = "" }) {
    return (
        <motion.section
            {...fadeUp}
            className={`rounded-2xl border border-white/[0.08] bg-[#11151D] p-6 sm:p-8 ${className}`}
        >
            {children}
        </motion.section>
    );
}


export default function HospitalDetails() {

    const navigate = useNavigate();

    const { prediction } = usePrediction();


    /* -------------------------------------------------------------- */
    /* No prediction                                                   */
    /* -------------------------------------------------------------- */

    if (!prediction) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B0D12]">
                <p className="text-white/50">
                    No hospital recommendation available.
                </p>
            </div>
        );
    }


    const hospital = prediction.recommended_hospital;


    /* -------------------------------------------------------------- */
    /* Hospital name compatibility                                     */
    /* -------------------------------------------------------------- */

    const hospitalName =
        hospital?.name ||
        hospital?.hospital ||
        "Recommended Hospital";


    /* -------------------------------------------------------------- */
    /* Contact information                                              */
    /* -------------------------------------------------------------- */

    const phone =
        hospital?.phone ||
        null;


    const address =
        hospital?.address ||
        null;


    const emergencyDepartment =
        hospital?.emergency_department ||
        "Emergency Department";


    /* -------------------------------------------------------------- */
    /* Coordinates                                                      */
    /* -------------------------------------------------------------- */

    const latitude = hospital?.latitude;
    const longitude = hospital?.longitude;


    console.log("=================================");
    console.log("LIFEROUTE HOSPITAL DATA");
    console.log("=================================");
    console.log("Prediction:", prediction);
    console.log("Recommended hospital:", hospital);
    console.log("Hospital name:", hospitalName);
    console.log("Phone:", phone);
    console.log("Address:", address);
    console.log("Emergency department:", emergencyDepartment);
    console.log("Latitude:", latitude);
    console.log("Longitude:", longitude);


    const matched = new Set(
        hospital?.matched_resources || []
    );


    /* ============================================================== */
    /* NAVIGATION                                                      */
    /* ============================================================== */

    const startNavigation = () => {

        console.log("=================================");
        console.log("NAVIGATION BUTTON CLICKED");
        console.log("=================================");

        console.log("Hospital:", hospital);
        console.log("Latitude:", latitude);
        console.log("Longitude:", longitude);


        if (
            latitude === null ||
            latitude === undefined ||
            longitude === null ||
            longitude === undefined
        ) {

            console.error(
                "Hospital coordinates are missing."
            );

            alert(
                "Hospital location is currently unavailable."
            );

            return;
        }


        const mapsUrl =
            `https://www.google.com/maps/dir/?api=1` +
            `&destination=${latitude},${longitude}` +
            `&travelmode=driving`;


        console.log(
            "Google Maps URL:",
            mapsUrl
        );


        window.location.href = mapsUrl;
    };


    return (
        <div className="min-h-screen bg-[#0B0D12] pb-28">


            {/* ====================================================== */}
            {/* HEADER                                                  */}
            {/* ====================================================== */}

            <header className="border-b border-white/[0.08] bg-[#0D1016]">

                <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-5 flex items-center gap-4">

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/patient/results")
                        }
                        className="flex items-center justify-center h-9 w-9 rounded-full border border-white/10 hover:bg-white/[0.05] transition-colors"
                        aria-label="Back to results"
                    >

                        <ArrowLeft
                            size={16}
                            strokeWidth={2}
                            className="text-white/70"
                        />

                    </button>


                    <div className="flex items-center gap-2.5">

                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 26 26"
                            fill="none"
                            aria-hidden="true"
                        >

                            <circle
                                cx="4"
                                cy="21"
                                r="2.5"
                                fill="#FFFFFF"
                            />

                            <circle
                                cx="22"
                                cy="5"
                                r="2.5"
                                fill="#FF5A36"
                            />

                            <path
                                d="M5.5 19.5C11 12 13 12 20 6.5"
                                stroke="#FFFFFF"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeDasharray="1 4.2"
                            />

                        </svg>


                        <span className="font-mono text-[11.5px] uppercase tracking-wide text-white/30">
                            Hospital Details
                        </span>

                    </div>

                </div>

            </header>


            {/* ====================================================== */}
            {/* MAIN CONTENT                                           */}
            {/* ====================================================== */}

            <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pt-10">


                {/* ================================================== */}
                {/* HERO                                                 */}
                {/* ================================================== */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}

                    whileInView={{
                        opacity: 1,
                        y: 0,
                    }}

                    viewport={{
                        once: true,
                        amount: 0.3,
                    }}

                    transition={{
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                    }}

                    className="relative rounded-3xl border border-[#FF5A36]/25 bg-[#11151D] overflow-hidden mb-6 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.65)]"
                >

                    <svg
                        viewBox="0 0 600 200"
                        className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none"
                        fill="none"
                        aria-hidden="true"
                    >

                        <path
                            d="M20,170 C160,170 200,40 320,40 C440,40 480,150 580,150"
                            stroke="#FF5A36"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />

                    </svg>


                    <div className="relative px-6 sm:px-8 pt-6">

                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF5A36]/10 text-[#FF7A5C] px-3 py-1 text-[12px] font-medium">

                            <ShieldCheck
                                size={12}
                                strokeWidth={2}
                            />

                            Recommended For You

                        </span>

                    </div>


                    <div className="relative px-6 sm:px-8 pt-5 pb-7">

                        <div className="flex items-start gap-3.5 mb-6">

                            <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-[#FF5A36]/10 border border-[#FF5A36]/25 shrink-0">

                                <Building2
                                    size={20}
                                    strokeWidth={1.75}
                                    className="text-[#FF7A5C]"
                                />

                            </div>


                            <div>

                                <h1 className="font-display font-semibold text-[20px] sm:text-[22px] text-white tracking-tightest leading-tight">

                                    {hospitalName}

                                </h1>


                                <p className="text-[13.5px] text-white/30 mt-0.5">

                                    {emergencyDepartment}

                                </p>

                            </div>

                        </div>


                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                            {/* SCORE */}

                            <div className="rounded-xl border border-[#FF5A36]/20 bg-[#FF5A36]/[0.06] p-4">

                                <div className="flex items-center gap-1.5 text-[#FF7A5C] mb-1.5">

                                    <Activity size={13} />

                                    <span className="font-mono text-[10px] uppercase tracking-wide">
                                        Score
                                    </span>

                                </div>


                                <div className="font-display font-semibold text-[18px] sm:text-[20px] text-white tracking-tightest">

                                    {Number(
                                        hospital?.score ?? 0
                                    ).toFixed(1)}

                                </div>

                            </div>


                            {/* ETA */}

                            <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">

                                <div className="flex items-center gap-1.5 text-white/30 mb-1.5">

                                    <Clock3 size={13} />

                                    <span className="font-mono text-[10px] uppercase tracking-wide">
                                        ETA
                                    </span>

                                </div>


                                <div className="font-display font-semibold text-[18px] sm:text-[20px] text-white tracking-tightest">

                                    {hospital?.eta ?? "N/A"} min

                                </div>

                            </div>


                            {/* DISTANCE */}

                            <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] p-4">

                                <div className="flex items-center gap-1.5 text-white/30 mb-1.5">

                                    <MapPin size={13} />

                                    <span className="font-mono text-[10px] uppercase tracking-wide">
                                        Distance
                                    </span>

                                </div>


                                <div className="font-display font-semibold text-[18px] sm:text-[20px] text-white tracking-tightest">

                                    {hospital?.distance_km != null
                                        ? `${hospital.distance_km} km`
                                        : "N/A"}

                                </div>

                            </div>

                        </div>

                    </div>

                </motion.div>


                {/* ================================================== */}
                {/* RESOURCES                                            */}
                {/* ================================================== */}

                <Panel className="mb-6">

                    <SectionLabel>
                        Resources
                    </SectionLabel>


                    <div className="grid sm:grid-cols-2 gap-2.5">

                        {ALL_RESOURCES.map(
                            (name, i) => {

                                const available =
                                    matched.has(name);


                                const {
                                    Icon,
                                } =
                                    RESOURCE_META[name];


                                return (

                                    <motion.div
                                        key={name}
                                        initial={{
                                            opacity: 0,
                                            y: 8,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                        }}
                                        transition={{
                                            duration: 0.35,
                                            delay: i * 0.06,
                                        }}
                                        className={`flex items-center justify-between rounded-xl border px-4 py-3 ${
                                            available
                                                ? "border-white/[0.08] bg-white/[0.025]"
                                                : "border-white/[0.08] bg-white/[0.015] opacity-70"
                                        }`}
                                    >

                                        <div className="flex items-center gap-2.5">

                                            <Icon
                                                size={15}
                                                strokeWidth={1.75}
                                                className="text-white/30"
                                            />

                                            <span className="text-[13.5px] text-white/55">
                                                {name}
                                            </span>

                                        </div>


                                        {available ? (

                                            <CheckCircle2
                                                size={16}
                                                strokeWidth={2}
                                                className="text-[#FF5A36]"
                                            />

                                        ) : (

                                            <XCircle
                                                size={16}
                                                strokeWidth={2}
                                                className="text-white/25"
                                            />

                                        )}

                                    </motion.div>

                                );

                            }
                        )}

                    </div>

                </Panel>


                {/* ================================================== */}
                {/* AI EXPLANATION                                      */}
                {/* ================================================== */}

                <Panel className="mb-6">

                    <div className="flex items-center gap-2 mb-1">

                        <Sparkles
                            size={14}
                            className="text-[#FF7A5C]"
                            strokeWidth={2}
                        />

                        <SectionLabel>
                            Why LifeRoute chose this hospital
                        </SectionLabel>

                    </div>


                    <div className="relative flex flex-col gap-6 mt-3">

                        <div className="absolute left-[15px] top-2 bottom-2 w-px bg-white/[0.08]" />


                        {(prediction.reasons || []).map(
                            (reason, i) => (

                                <motion.div
                                    key={reason}
                                    initial={{
                                        opacity: 0,
                                        y: 10,
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        y: 0,
                                    }}
                                    viewport={{
                                        once: true,
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        delay: i * 0.08,
                                        ease: [
                                            0.22,
                                            1,
                                            0.36,
                                            1,
                                        ],
                                    }}
                                    className="relative flex items-start gap-4"
                                >

                                    <div className="relative z-10 flex items-center justify-center h-8 w-8 rounded-full border border-[#FF5A36]/30 bg-[#FF5A36]/10 shrink-0">

                                        <HeartPulse
                                            size={14}
                                            strokeWidth={1.75}
                                            className="text-[#FF7A5C]"
                                        />

                                    </div>


                                    <p className="text-[14px] leading-relaxed text-white/55 pt-1">

                                        {reason}

                                    </p>

                                </motion.div>

                            )
                        )}

                    </div>

                </Panel>


                {/* ================================================== */}
                {/* CONTACT                                              */}
                {/* ================================================== */}

                <Panel className="mb-8">

                    <SectionLabel>
                        Contact & Location
                    </SectionLabel>


                    <div className="rounded-xl border border-white/[0.08] divide-y divide-white/[0.06]">

                        {/* PHONE */}

                        <div className="flex items-center justify-between gap-4 px-4 py-3.5">

                            <div className="flex items-center gap-2.5 min-w-0">

                                <Phone
                                    size={15}
                                    strokeWidth={1.75}
                                    className="text-white/30 shrink-0"
                                />

                                <span className="text-[13.5px] text-white/55 truncate">

                                    {phone || "Phone not available"}

                                </span>

                            </div>


                            {phone ? (

                                <a
                                    href={`tel:${phone}`}
                                    className="shrink-0 font-mono text-[12px] text-[#FF7A5C] hover:text-[#FF8B70] transition-colors"
                                >
                                    Call
                                </a>

                            ) : (

                                <span className="shrink-0 font-mono text-[11px] text-white/30">
                                    Not Available
                                </span>

                            )}

                        </div>


                        {/* ADDRESS */}

                        <div className="flex items-start gap-2.5 px-4 py-3.5">

                            <MapPin
                                size={15}
                                strokeWidth={1.75}
                                className="text-white/30 shrink-0 mt-0.5"
                            />

                            <div className="min-w-0">

                                <p className="text-[11px] font-mono uppercase tracking-wide text-white/30 mb-1">
                                    Address
                                </p>

                                <span className="text-[13.5px] leading-relaxed text-white/55">

                                    {address ||
                                        "Address not available"}

                                </span>

                            </div>

                        </div>


                        {/* EMERGENCY DEPARTMENT */}

                        <div className="flex items-start gap-2.5 px-4 py-3.5">

                            <Building2
                                size={15}
                                strokeWidth={1.75}
                                className="text-white/30 shrink-0 mt-0.5"
                            />

                            <div>

                                <p className="text-[11px] font-mono uppercase tracking-wide text-white/30 mb-1">
                                    Emergency Department
                                </p>

                                <span className="text-[13.5px] text-white/55">
                                    {emergencyDepartment}
                                </span>

                            </div>

                        </div>

                    </div>

                </Panel>


                {/* ================================================== */}
                {/* ACTIONS                                              */}
                {/* ================================================== */}

                <div className="mt-8 flex flex-col sm:flex-row gap-4">

                    <button
                        type="button"
                        onClick={startNavigation}
                        className="group flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#FF5A36] px-8 py-4 text-[15px] font-medium text-white transition-all duration-300 hover:bg-[#ff6b4a] active:scale-[0.98] shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_8px_24px_-8px_rgba(255,90,54,0.55)]"
                    >

                        <Navigation
                            size={16}
                            strokeWidth={2.25}
                        />

                        Start Navigation

                    </button>


                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                "/patient/results"
                            )
                        }
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-8 py-4 text-[15px] font-medium text-white/70 hover:border-white/30 hover:bg-white/[0.03] transition-all duration-300 active:scale-[0.98]"
                    >

                        <ArrowLeft
                            size={15}
                            strokeWidth={2}
                        />

                        Back to Results

                    </button>

                </div>


            </div>

        </div>
    );
}