import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertCircle,
  BedDouble,
  CheckCircle2,
  Clock3,
  HeartPulse,
  RefreshCw,
  ShieldCheck,
  Stethoscope,
  Wind,
} from "lucide-react";
import { getMe } from "../../services/authService";

const API_BASE_URL = "https://liferoute-w329.onrender.com";

export default function Analytics() {
  const [hospital, setHospital] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchHospital = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const profile = await getMe();

      const hospitalId =
        profile?.hospital_id ||
        profile?.hospital?.id ||
        profile?.id;

      if (!hospitalId) {
        throw new Error("No hospital is linked to this account.");
      }

      const response = await fetch(
        `${API_BASE_URL}/hospital/${hospitalId}`
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (!data || data.message === "Hospital not found") {
        throw new Error("Hospital could not be found.");
      }

      setHospital(data);
    } catch (err) {
      console.error("Analytics page error:", err);
      setError(err.message || "Unable to load hospital analytics.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHospital();
  }, []);

  const metrics = useMemo(() => {
    if (!hospital) {
      return {
        beds: 0,
        icu: 0,
        ventilators: 0,
        specialists: 0,
        resources: 0,
      };
    }

    return {
      beds: hospital.available_beds ?? 0,
      icu: hospital.available_icu ?? 0,
      ventilators: hospital.ventilators ?? 0,
      specialists: hospital.specialists?.length ?? 0,
      resources: hospital.resources?.length ?? 0,
    };
  }, [hospital]);

  const readinessScore = useMemo(() => {
    if (!hospital) return 0;

    let score = 0;

    if (hospital.is_open) score += 25;
    if ((hospital.available_beds ?? 0) > 0) score += 25;
    if ((hospital.available_icu ?? 0) > 0) score += 25;
    if ((hospital.ventilators ?? 0) > 0) score += 25;

    return score;
  }, [hospital]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0D12] px-6 py-8 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-3 w-32 rounded bg-white/[0.06]" />
          <div className="mt-4 h-10 w-80 rounded bg-white/[0.06]" />
          <div className="mt-3 h-5 w-[520px] max-w-full rounded bg-white/[0.04]" />

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-36 rounded-2xl border border-white/[0.06] bg-white/[0.025]"
              />
            ))}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="h-80 rounded-2xl border border-white/[0.06] bg-white/[0.025]" />
            <div className="h-80 rounded-2xl border border-white/[0.06] bg-white/[0.025]" />
          </div>
        </div>
      </div>
    );
  }

  if (error && !hospital) {
    return (
      <div className="min-h-screen bg-[#0B0D12] px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-red-400/10 bg-red-400/[0.04] p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-400/[0.08] text-red-400">
              <AlertCircle size={21} />
            </div>

            <h1 className="mt-5 font-display text-2xl font-semibold text-white">
              Unable to load analytics
            </h1>

            <p className="mt-2 text-sm leading-6 text-white/40">
              {error}
            </p>

            <button
              type="button"
              onClick={() => fetchHospital()}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#FF5A36] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#ff6847]"
            >
              <RefreshCw size={15} />
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0D12] px-6 py-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#FF5A36]">
                Hospital Portal
              </span>

              <span className="h-1 w-1 rounded-full bg-white/20" />

              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">
                Operational Intelligence
              </span>
            </div>

            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Hospital Analytics
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/40">
              A live view of the capacity and capabilities currently available
              to LifeRoute's emergency routing system.
            </p>
          </div>

          <button
            type="button"
            onClick={() => fetchHospital(true)}
            disabled={refreshing}
            className="flex h-10 w-10 shrink-0 items-center justify-center self-start rounded-xl border border-white/[0.08] bg-white/[0.025] text-white/40 transition hover:bg-white/[0.06] hover:text-white disabled:opacity-50 md:self-auto"
            aria-label="Refresh analytics"
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />
          </button>
        </header>

        <section className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/[0.08] bg-[#11151D] p-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF5A36]/[0.08] text-[#FF5A36]">
              <Activity size={20} />
            </div>

            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
                Connected Hospital
              </p>

              <h2 className="mt-1 text-base font-semibold text-white">
                {hospital?.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full ${
                hospital?.is_open
                  ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.65)]"
                  : "bg-red-400"
              }`}
            />

            <span
              className={`text-sm ${
                hospital?.is_open
                  ? "text-emerald-300"
                  : "text-red-300"
              }`}
            >
              {hospital?.is_open ? "Operational" : "Closed"}
            </span>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={BedDouble}
            label="Available Beds"
            value={metrics.beds}
            description="Current general capacity"
            accent="orange"
          />

          <MetricCard
            icon={HeartPulse}
            label="Available ICU"
            value={metrics.icu}
            description="Critical-care capacity"
            accent="blue"
          />

          <MetricCard
            icon={Wind}
            label="Ventilators"
            value={metrics.ventilators}
            description="Currently available"
            accent="green"
          />

          <MetricCard
            icon={Stethoscope}
            label="Specialists"
            value={metrics.specialists}
            description="Currently listed"
            accent="purple"
          />
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-2xl border border-white/[0.08] bg-[#11151D] p-6">
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#FF5A36]/70">
                Capacity Overview
              </p>

              <h2 className="mt-2 font-display text-xl font-semibold text-white">
                Current routing readiness
              </h2>

              <p className="mt-1.5 text-sm leading-6 text-white/35">
                These live values are what LifeRoute can use when evaluating
                this hospital for an emergency recommendation.
              </p>
            </div>

            <div className="mt-7 space-y-5">
              <CapacityRow
                label="General Beds"
                value={metrics.beds}
                icon={BedDouble}
                description="Available now"
              />

              <CapacityRow
                label="ICU Beds"
                value={metrics.icu}
                icon={HeartPulse}
                description="Available now"
              />

              <CapacityRow
                label="Ventilators"
                value={metrics.ventilators}
                icon={Wind}
                description="Available now"
              />

              <CapacityRow
                label="Specialist Coverage"
                value={metrics.specialists}
                icon={Stethoscope}
                description="Specialists listed"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] bg-[#11151D] p-6">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#FF5A36]/70">
              Routing Readiness
            </p>

            <h2 className="mt-2 font-display text-xl font-semibold text-white">
              System status
            </h2>

            <div className="mt-7 flex items-center justify-center">
              <div className="relative flex h-44 w-44 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.02]">
                <div className="absolute inset-3 rounded-full border border-[#FF5A36]/10" />

                <div className="text-center">
                  <p className="font-display text-5xl font-semibold text-white">
                    {readinessScore}%
                  </p>

                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/25">
                    Readiness
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-7 space-y-3">
              <StatusRow
                label="Hospital operational"
                active={Boolean(hospital?.is_open)}
              />

              <StatusRow
                label="Beds available"
                active={metrics.beds > 0}
              />

              <StatusRow
                label="ICU available"
                active={metrics.icu > 0}
              />

              <StatusRow
                label="Ventilator available"
                active={metrics.ventilators > 0}
              />
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-2">
          <InfoPanel
            eyebrow="Medical Team"
            title="Specialist Coverage"
            icon={Stethoscope}
            count={metrics.specialists}
            items={hospital?.specialists ?? []}
            emptyMessage="No specialists currently listed."
          />

          <InfoPanel
            eyebrow="Facilities & Equipment"
            title="Available Resources"
            icon={ShieldCheck}
            count={metrics.resources}
            items={hospital?.resources ?? []}
            emptyMessage="No resources currently listed."
          />
        </section>

        <div className="mt-8 flex flex-col gap-2 border-t border-white/[0.06] pt-5 text-[11px] text-white/20 sm:flex-row sm:items-center sm:justify-between">
          <span>
            Hospital ID:{" "}
            <span className="font-mono text-white/30">
              {hospital?.id}
            </span>
          </span>

          <span className="flex items-center gap-2">
            <Clock3 size={12} />
            Live data from LifeRoute hospital service
          </span>
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  description,
  accent,
}) {
  const accents = {
    orange: "bg-[#FF5A36]/[0.08] text-[#FF5A36]",
    blue: "bg-[#7C8CF5]/[0.08] text-[#7C8CF5]",
    green: "bg-emerald-400/[0.08] text-emerald-400",
    purple: "bg-violet-400/[0.08] text-violet-400",
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#11151D] p-5 transition-colors hover:border-white/[0.12]">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${accents[accent]}`}
      >
        <Icon size={18} />
      </div>

      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs text-white/35">{label}</p>

          <p className="mt-1 font-display text-3xl font-semibold text-white">
            {value}
          </p>
        </div>

        <span className="pb-1 text-[10px] text-white/20">
          live
        </span>
      </div>

      <p className="mt-3 text-xs text-white/25">{description}</p>
    </div>
  );
}

function CapacityRow({
  label,
  value,
  icon: Icon,
  description,
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-white/40">
        <Icon size={17} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-white/70">
              {label}
            </p>

            <p className="mt-0.5 text-xs text-white/25">
              {description}
            </p>
          </div>

          <span className="font-display text-xl font-semibold text-white">
            {value}
          </span>
        </div>

        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.05]">
          <div
            className="h-full rounded-full bg-[#FF5A36]/70 transition-all"
            style={{
              width: `${Math.min(Math.max(Number(value) * 5, 8), 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

function StatusRow({ label, active }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
      <span className="text-xs text-white/45">{label}</span>

      <div className="flex items-center gap-2">
        {active ? (
          <CheckCircle2 size={15} className="text-emerald-400" />
        ) : (
          <AlertCircle size={15} className="text-white/20" />
        )}

        <span
          className={`text-xs ${
            active ? "text-emerald-300" : "text-white/25"
          }`}
        >
          {active ? "Ready" : "Unavailable"}
        </span>
      </div>
    </div>
  );
}

function InfoPanel({
  eyebrow,
  title,
  icon: Icon,
  count,
  items,
  emptyMessage,
}) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#11151D] p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#FF5A36]/70">
            {eyebrow}
          </p>

          <h2 className="mt-2 font-display text-xl font-semibold text-white">
            {title}
          </h2>
        </div>

        <div className="flex h-10 min-w-10 items-center justify-center gap-2 rounded-xl bg-white/[0.04] px-3 text-white/40">
          <Icon size={16} />
          <span className="text-xs">{count}</span>
        </div>
      </div>

      {items.length > 0 ? (
        <div className="mt-6 flex flex-wrap gap-2">
          {items.map((item) => (
            <span
              key={item}
              className="rounded-xl border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs text-white/45"
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm text-white/25">
          {emptyMessage}
        </p>
      )}
    </div>
  );
}