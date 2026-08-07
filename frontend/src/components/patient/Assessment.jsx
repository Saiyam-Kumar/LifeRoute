import { useState } from "react";
import {
  User,
  MessageSquareText,
  HeartPulse,
  Activity,
  Thermometer,
  ClipboardList,
  ArrowUpRight,
  ChevronDown,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Local presentational primitives — kept in this file only.          */
/* ------------------------------------------------------------------ */

function Card({ icon: Icon, title, subtitle, children }) {
  return (
    <section className="rounded-2xl border border-ink/[0.08] bg-white p-6 sm:p-8">
      <div className="flex items-start gap-3.5 mb-7">
        <div className="flex items-center justify-center h-10 w-10 rounded-xl bg-ink/[0.04] shrink-0">
          <Icon size={18} strokeWidth={1.75} className="text-ink" />
        </div>
        <div>
          <h2 className="font-display font-semibold text-[17px] tracking-tightest text-ink">
            {title}
          </h2>
          {subtitle && (
            <p className="text-[13.5px] text-ink-faint mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>
      {children}
    </section>
  );
}

function Field({ label, hint, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="flex items-baseline justify-between">
        <span className="text-[13.5px] font-medium text-ink-soft">{label}</span>
        {hint && (
          <span className="font-mono text-[11px] text-ink-faint">{hint}</span>
        )}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-ink/[0.1] bg-canvas-dim/40 px-4 py-3 text-[14.5px] text-ink placeholder:text-ink-faint outline-none transition-colors focus:border-route/50 focus:bg-white";

function Select({ value, onChange, options, placeholder }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`${inputClass} appearance-none pr-10 ${
          value ? "text-ink" : "text-ink-faint"
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={16}
        strokeWidth={1.75}
        className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
      />
    </div>
  );
}

function SegmentedControl({ options, value, onChange, columns = 3 }) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-xl border px-3 py-2.5 text-[13.5px] font-medium transition-all duration-200 ${
              active
                ? "border-route bg-route/[0.08] text-route"
                : "border-ink/[0.1] bg-canvas-dim/40 text-ink-soft hover:border-ink/20"
            }`}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Assessment page                                                    */
/* ------------------------------------------------------------------ */

const STEPS = ["Symptom Intake", "AI Assessment", "Hospital Match"];

const GENDER_OPTIONS = [
  { value: "female", label: "Female" },
  { value: "male", label: "Male" },
  { value: "other", label: "Other" },
];

const CONSCIOUSNESS_OPTIONS = [
  { value: "alert", label: "Alert — fully aware" },
  { value: "verbal", label: "Responds to voice" },
  { value: "pain", label: "Responds to pain" },
  { value: "unresponsive", label: "Unresponsive" },
];

const BREATHING_OPTIONS = [
  { value: "normal", label: "Normal" },
  { value: "labored", label: "Labored" },
  { value: "shallow", label: "Shallow" },
  { value: "absent", label: "Absent" },
];

export default function Assessment() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("female");
  const [symptoms, setSymptoms] = useState("");
  const [pain, setPain] = useState(3);
  const [consciousness, setConsciousness] = useState("");
  const [breathing, setBreathing] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [bpSystolic, setBpSystolic] = useState("");
  const [bpDiastolic, setBpDiastolic] = useState("");
  const [temperature, setTemperature] = useState("");
  const [hasInjury, setHasInjury] = useState(false);
  const [allergies, setAllergies] = useState("");
  const [conditions, setConditions] = useState("");

  return (
    <div className="min-h-screen bg-canvas pb-28">
      {/* header */}
      <header className="border-b border-ink/[0.06] bg-white">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center gap-2.5">
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
          <span className="ml-2 font-mono text-[11.5px] uppercase tracking-wide text-ink-faint">
            Patient Assessment
          </span>
        </div>
      </header>

      {/* progress indicator */}
      <div className="sticky top-0 z-40 bg-canvas/90 backdrop-blur-md border-b border-ink/[0.06]">
        <div className="max-w-3xl mx-auto px-6 py-5">
          <div className="flex items-center">
            {STEPS.map((step, i) => {
              const active = i === 0;
              return (
                <div key={step} className="flex items-center flex-1 last:flex-none">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flex items-center justify-center h-6 w-6 rounded-full border font-mono text-[11px] shrink-0 ${
                        active
                          ? "border-route bg-route text-canvas"
                          : "border-ink/15 text-ink-faint"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={`text-[13px] font-medium hidden sm:inline whitespace-nowrap ${
                        active ? "text-ink" : "text-ink-faint"
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <span className="flex-1 h-px bg-ink/10 mx-3" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pt-10">
        <div className="mb-10">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-route animate-pulse-soft" />
            <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-ink-faint">
              Emergency Assessment
            </span>
          </div>
          <h1 className="font-display font-semibold text-[clamp(1.6rem,3vw,2.1rem)] tracking-tightest text-ink text-balance">
            Tell us what's happening.
          </h1>
          <p className="text-[15px] text-ink-soft mt-2 max-w-lg">
            A few details help LifeRoute route you accurately. Skip anything
            you don't know — an estimate is still useful.
          </p>
        </div>

        <div className="flex flex-col gap-6">
          {/* Patient information */}
          <Card icon={User} title="Patient Information" subtitle="Who this assessment is for">
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Age" hint="years">
                <input
                  type="number"
                  min="0"
                  max="120"
                  placeholder="e.g. 34"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Gender">
                <SegmentedControl
                  options={GENDER_OPTIONS}
                  value={gender}
                  onChange={setGender}
                  columns={3}
                />
              </Field>
            </div>
          </Card>

          {/* Symptoms */}
          <Card
            icon={MessageSquareText}
            title="Symptoms"
            subtitle="Describe it in your own words"
          >
            <Field label="What's happening?" hint={`${symptoms.length}/500`}>
              <textarea
                rows={4}
                maxLength={500}
                placeholder="e.g. Sharp chest pain since 20 minutes ago, worse when breathing in..."
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                className={`${inputClass} resize-none`}
              />
            </Field>
          </Card>

          {/* Vitals & condition */}
          <Card
            icon={HeartPulse}
            title="Vitals & Condition"
            subtitle="Enter what you can measure or estimate"
          >
            <div className="flex flex-col gap-6">
              <Field label="Pain scale" hint={`${pain} / 10`}>
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: 11 }, (_, i) => i).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setPain(n)}
                      aria-label={`Pain level ${n}`}
                      className={`flex-1 rounded-lg py-2 text-[12px] font-mono transition-all duration-150 ${
                        n === pain
                          ? "bg-route text-canvas"
                          : n < pain
                          ? "bg-route/15 text-route"
                          : "bg-ink/[0.05] text-ink-faint hover:bg-ink/[0.08]"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </Field>

              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Consciousness">
                  <Select
                    value={consciousness}
                    onChange={setConsciousness}
                    options={CONSCIOUSNESS_OPTIONS}
                    placeholder="Select a state"
                  />
                </Field>

                <Field label="Breathing">
                  <Select
                    value={breathing}
                    onChange={setBreathing}
                    options={BREATHING_OPTIONS}
                    placeholder="Select a pattern"
                  />
                </Field>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                <Field label="Heart rate" hint="bpm">
                  <div className="relative">
                    <Activity
                      size={15}
                      strokeWidth={1.75}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
                    />
                    <input
                      type="number"
                      placeholder="72"
                      value={heartRate}
                      onChange={(e) => setHeartRate(e.target.value)}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </Field>

                <Field label="Blood pressure" hint="mmHg">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="120"
                      value={bpSystolic}
                      onChange={(e) => setBpSystolic(e.target.value)}
                      className={inputClass}
                    />
                    <span className="text-ink-faint font-mono text-[13px]">/</span>
                    <input
                      type="number"
                      placeholder="80"
                      value={bpDiastolic}
                      onChange={(e) => setBpDiastolic(e.target.value)}
                      className={inputClass}
                    />
                  </div>
                </Field>

                <Field label="Temperature" hint="°F">
                  <div className="relative">
                    <Thermometer
                      size={15}
                      strokeWidth={1.75}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-faint"
                    />
                    <input
                      type="number"
                      placeholder="98.6"
                      value={temperature}
                      onChange={(e) => setTemperature(e.target.value)}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </Field>
              </div>
            </div>
          </Card>

          {/* Injury & history */}
          <Card
            icon={ClipboardList}
            title="Injury & History"
            subtitle="Anything responders should know in advance"
          >
            <div className="flex flex-col gap-5">
              <label className="flex items-center gap-3 rounded-xl border border-ink/[0.1] bg-canvas-dim/40 px-4 py-3.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasInjury}
                  onChange={(e) => setHasInjury(e.target.checked)}
                  className="h-4.5 w-4.5 rounded-md border-ink/20 text-route accent-[#FF5A36]"
                />
                <span className="text-[14.5px] font-medium text-ink">
                  Visible injury or trauma involved
                </span>
              </label>

              <Field label="Allergies">
                <input
                  type="text"
                  placeholder="e.g. Penicillin, latex — separate with commas"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  className={inputClass}
                />
              </Field>

              <Field label="Existing conditions">
                <input
                  type="text"
                  placeholder="e.g. Asthma, diabetes, heart condition"
                  value={conditions}
                  onChange={(e) => setConditions(e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>
          </Card>
        </div>

        {/* continue */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-route px-8 py-4 text-[15px] font-medium text-canvas transition-all duration-300 hover:bg-[#ff6b4a] active:scale-[0.98] shadow-[0_1px_0_0_rgba(255,255,255,0.15)_inset,0_8px_24px_-8px_rgba(255,90,54,0.55)]"
          >
            Continue Assessment
            <ArrowUpRight
              size={16}
              strokeWidth={2.25}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </button>
          <p className="text-[12.5px] text-ink-faint text-center sm:text-left">
            LifeRoute recommends where to go. It does not diagnose or treat.
          </p>
        </div>
      </div>
    </div>
  );
}