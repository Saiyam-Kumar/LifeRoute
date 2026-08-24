import { useEffect, useState } from "react";
import {
  Activity,
  BedDouble,
  Building2,
  CircleAlert,
  Clock3,
  HeartPulse,
  RefreshCw,
  Stethoscope,
  Syringe,
  Wind,
  Network,
  CheckCircle2,
} from "lucide-react";

import { getMe } from "../../services/authService";

const API_BASE_URL = "http://127.0.0.1:8000";

function StatCard({
  icon: Icon,
  label,
  value,
  description,
  accent = "orange",
}) {
  const accentClasses = {
    orange:
      "text-[#FF5A36] bg-[#FF5A36]/[0.08] border-[#FF5A36]/10",
    blue:
      "text-[#7C8CF5] bg-[#7C8CF5]/[0.08] border-[#7C8CF5]/10",
    green:
      "text-emerald-400 bg-emerald-400/[0.08] border-emerald-400/10",
    purple:
      "text-purple-400 bg-purple-400/[0.08] border-purple-400/10",
  };

  return (
    <div className="group rounded-2xl border border-white/[0.08] bg-[#11151D] p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.13] hover:bg-[#141922]">
      <div className="flex items-start justify-between">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
            accentClasses[accent]
          }`}
        >
          <Icon size={18} strokeWidth={1.8} />
        </div>

        <Activity
          size={16}
          className="text-white/[0.12] transition-colors group-hover:text-white/20"
        />
      </div>

      <div className="mt-5">
        <p className="text-sm text-white/40">{label}</p>

        <p className="mt-1 font-display text-3xl font-semibold tracking-tight text-white">
          {value}
        </p>

        <p className="mt-1.5 text-xs text-white/25">{description}</p>
      </div>
    </div>
  );
}

function SectionCard({
  title,
  eyebrow,
  children,
  className = "",
}) {
  return (
    <section
      className={`rounded-2xl border border-white/[0.08] bg-[#11151D] ${className}`}
    >
      <div className="border-b border-white/[0.07] px-6 py-5">
        {eyebrow && (
          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
            {eyebrow}
          </p>
        )}

        <h2 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-white">
          {title}
        </h2>
      </div>

      <div className="p-6">{children}</div>
    </section>
  );
}

export default function Dashboard() {
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

      // -----------------------------------------
      // 1. Get authenticated Firebase/LifeRoute user
      // -----------------------------------------

      const profile = await getMe();

      console.log("Authenticated hospital profile:", profile);

      if (!profile?.hospital_id) {
        throw new Error(
          "Your account is not linked to a LifeRoute hospital."
        );
      }

      // -----------------------------------------
      // 2. Get the hospital belonging to that user
      // -----------------------------------------

      const response = await fetch(
        `${API_BASE_URL}/hospital/${profile.hospital_id}`
      );

      if (!response.ok) {
        throw new Error(
          `Request failed with status ${response.status}`
        );
      }

      const data = await response.json();

      if (!data || data.message === "Hospital not found") {
        throw new Error(
          "Your hospital record could not be found."
        );
      }

      setHospital(data);
    } catch (err) {
      console.error("Hospital dashboard error:", err);

      setError(
        err.message ||
          "Unable to load hospital information right now."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHospital();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0D12] px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="h-3 w-28 rounded bg-white/[0.06]" />
            <div className="mt-4 h-10 w-72 rounded bg-white/[0.06]" />

            <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-40 rounded-2xl border border-white/[0.06] bg-white/[0.025]"
                />
              ))}
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="h-80 rounded-2xl border border-white/[0.06] bg-white/[0.025]" />
              <div className="h-80 rounded-2xl border border-white/[0.06] bg-white/[0.025]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B0D12] px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-red-400/10 bg-red-400/[0.04] p-8">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-400/[0.08] text-red-400">
              <CircleAlert size={21} />
            </div>

            <h1 className="mt-5 font-display text-2xl font-semibold text-white">
              Unable to load hospital
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

  const isOpen = hospital?.is_open;

  return (
    <div className="min-h-screen bg-[#0B0D12] px-6 py-8 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-7xl">

        {/* ------------------------------------------------ */}
        {/* HEADER */}
        {/* ------------------------------------------------ */}

        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#FF5A36]">
                Hospital Portal
              </span>

              <span className="h-1 w-1 rounded-full bg-white/20" />

              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">
                Live Overview
              </span>
            </div>

            <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
              {hospital.name}
            </h1>

            <p className="mt-2 text-sm text-white/40">
              Monitor your hospital's current capacity and emergency readiness.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 rounded-full border px-4 py-2 ${
                isOpen
                  ? "border-emerald-400/10 bg-emerald-400/[0.06]"
                  : "border-red-400/10 bg-red-400/[0.06]"
              }`}
            >
              <span
                className={`h-2 w-2 rounded-full ${
                  isOpen ? "bg-emerald-400" : "bg-red-400"
                }`}
              />

              <span
                className={`text-xs font-medium ${
                  isOpen ? "text-emerald-300" : "text-red-300"
                }`}
              >
                {isOpen ? "Operational" : "Closed"}
              </span>
            </div>

            <button
              type="button"
              onClick={() => fetchHospital(true)}
              disabled={refreshing}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-white/40 transition hover:bg-white/[0.06] hover:text-white disabled:opacity-50"
              aria-label="Refresh hospital data"
            >
              <RefreshCw
                size={16}
                className={refreshing ? "animate-spin" : ""}
              />
            </button>
          </div>
        </header>

        {/* ------------------------------------------------ */}
        {/* CAPACITY STATS */}
        {/* ------------------------------------------------ */}

        <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={BedDouble}
            label="Available Beds"
            value={hospital.available_beds}
            description="General capacity currently available"
            accent="orange"
          />

          <StatCard
            icon={HeartPulse}
            label="ICU Beds"
            value={hospital.available_icu}
            description="Critical-care beds available"
            accent="blue"
          />

          <StatCard
            icon={Wind}
            label="Ventilators"
            value={hospital.ventilators}
            description="Ventilators currently available"
            accent="green"
          />

          <StatCard
            icon={CircleAlert}
            label="Emergency Level"
            value={hospital.emergency_level}
            description={hospital.hospital_type}
            accent="purple"
          />
        </div>

        {/* ------------------------------------------------ */}
        {/* CAPACITY + READINESS */}
        {/* ------------------------------------------------ */}

        <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">

          <SectionCard
            eyebrow="Capacity"
            title="Resource Availability"
          >
            <div className="space-y-6">

              <ResourceBar
                label="General Beds"
                value={hospital.available_beds}
                icon={BedDouble}
                max={Math.max(hospital.available_beds, 100)}
              />

              <ResourceBar
                label="ICU Beds"
                value={hospital.available_icu}
                icon={HeartPulse}
                max={Math.max(hospital.available_icu, 25)}
              />

              <ResourceBar
                label="Ventilators"
                value={hospital.ventilators}
                icon={Wind}
                max={Math.max(hospital.ventilators, 15)}
              />

            </div>

            <div className="mt-7 rounded-xl border border-[#FF5A36]/10 bg-[#FF5A36]/[0.035] p-4">
              <div className="flex gap-3">

                <Activity
                  size={17}
                  className="mt-0.5 shrink-0 text-[#FF5A36]"
                />

                <div>
                  <p className="text-sm font-medium text-white/75">
                    Live capacity matters
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/35">
                    These resource values are used by LifeRoute's hospital
                    routing system when determining which facilities are best
                    equipped for an emergency.
                  </p>
                </div>

              </div>
            </div>
          </SectionCard>

          <SectionCard
            eyebrow="Hospital"
            title="Emergency Readiness"
          >
            <div className="space-y-5">

              <InfoRow
                icon={CircleAlert}
                label="Emergency Level"
                value={hospital.emergency_level}
              />

              <InfoRow
                icon={Building2}
                label="Hospital Type"
                value={hospital.hospital_type}
              />

              <InfoRow
                icon={Clock3}
                label="Operational Status"
                value={isOpen ? "Currently Open" : "Currently Closed"}
              />

              <InfoRow
                icon={Stethoscope}
                label="Specialists"
                value={`${hospital.specialists?.length || 0} available`}
              />

              <InfoRow
                icon={Syringe}
                label="Resources"
                value={`${hospital.resources?.length || 0} available`}
              />

            </div>
          </SectionCard>

        </div>

        {/* ------------------------------------------------ */}
        {/* ROUND 2 — HOSPITAL NETWORK */}
        {/* ------------------------------------------------ */}

        <div className="mt-6">
          <SectionCard
            eyebrow="LifeRoute Network"
            title="Hospital Coordination Plan"
          >
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">

              {/* Main explanation */}
              <div>
                <div className="flex items-start gap-4">

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#FF5A36]/15 bg-[#FF5A36]/[0.07] text-[#FF5A36]">
                    <Network size={22} strokeWidth={1.7} />
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight text-white">
                      LifeRoute Hospital Network
                    </h3>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-white/40">
                      LifeRoute keeps emergency access free for patients while
                      hospitals subscribe to the coordination infrastructure
                      that powers resource visibility and intelligent emergency
                      routing.
                    </p>
                  </div>

                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">

                  <PlanFeature
                    icon={Activity}
                    title="Resource Management"
                    description="Maintain current hospital capacity and resource availability."
                  />

                  <PlanFeature
                    icon={HeartPulse}
                    title="Emergency Routing"
                    description="Connect patients with hospitals suited to their requirements."
                  />

                  <PlanFeature
                    icon={Network}
                    title="Network Visibility"
                    description="Become part of a connected emergency healthcare network."
                  />

                  <PlanFeature
                    icon={Stethoscope}
                    title="Future Resource Coordination"
                    description="Designed to scale across beds, oxygen, blood, medicines and equipment."
                  />

                </div>
              </div>

              {/* Pricing card */}
              <div className="rounded-2xl border border-[#FF5A36]/15 bg-gradient-to-br from-[#FF5A36]/[0.08] via-white/[0.02] to-transparent p-5">

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#FF5A36]">
                      Proposed Plan
                    </p>

                    <h3 className="mt-2 font-display text-lg font-semibold text-white">
                      LifeRoute Hospital
                    </h3>
                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF5A36]/[0.08] text-[#FF5A36]">
                    <CheckCircle2 size={18} />
                  </div>
                </div>

                <div className="mt-5 flex items-end gap-2">
                  <span className="font-display text-4xl font-semibold tracking-tight text-white">
                    ₹5,000
                  </span>

                  <span className="mb-1 text-xs text-white/30">
                    / hospital / month
                  </span>
                </div>

                <p className="mt-3 text-xs leading-5 text-white/35">
                  Proposed affordable pricing for the LifeRoute hospital
                  coordination platform.
                </p>

                <div className="mt-5 space-y-3 border-t border-white/[0.07] pt-5">

                  <PlanCheck text="Live resource management" />
                  <PlanCheck text="Emergency patient routing" />
                  <PlanCheck text="Hospital network visibility" />
                  <PlanCheck text="Resource and capacity analytics" />

                </div>

                <div className="mt-6 rounded-xl border border-white/[0.06] bg-black/10 px-4 py-3">
                  <p className="text-[10px] uppercase tracking-[0.15em] text-white/20">
                    Access Model
                  </p>

                  <p className="mt-1 text-xs text-white/45">
                    Patients remain free to use LifeRoute for emergency
                    assessment and hospital recommendation.
                  </p>
                </div>

              </div>

            </div>
          </SectionCard>
        </div>

        {/* ------------------------------------------------ */}
        {/* SPECIALISTS + RESOURCES */}
        {/* ------------------------------------------------ */}

        <div className="mt-6 grid gap-6 lg:grid-cols-2">

          <SectionCard
            eyebrow="Medical Team"
            title="Specialists"
          >
            <div className="flex flex-wrap gap-2">

              {(hospital.specialists || []).map((specialist) => (
                <span
                  key={specialist}
                  className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-xs text-white/55 transition hover:border-white/[0.12] hover:bg-white/[0.045] hover:text-white/75"
                >
                  {specialist}
                </span>
              ))}

            </div>
          </SectionCard>

          <SectionCard
            eyebrow="Facilities"
            title="Available Resources"
          >
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">

              {(hospital.resources || []).map((resource) => (
                <div
                  key={resource}
                  className="flex items-center gap-2.5 rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2.5"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF5A36]" />

                  <span className="text-xs text-white/55">
                    {resource}
                  </span>
                </div>
              ))}

            </div>
          </SectionCard>

        </div>

        {/* ------------------------------------------------ */}
        {/* FOOTER */}
        {/* ------------------------------------------------ */}

        <div className="mt-8 flex flex-col gap-2 border-t border-white/[0.06] pt-5 text-[11px] text-white/20 sm:flex-row sm:items-center sm:justify-between">

          <span>
            Hospital ID:{" "}
            <span className="font-mono text-white/30">
              {hospital.id}
            </span>
          </span>

          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/70" />
            Connected to LifeRoute backend
          </span>

        </div>

      </div>
    </div>
  );
}

function ResourceBar({
  label,
  value,
  icon: Icon,
  max,
}) {
  const numericValue = Number(value) || 0;
  const percentage = Math.min(
    (numericValue / max) * 100,
    100
  );

  return (
    <div>

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-2.5">

          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.04] text-white/45">
            <Icon size={15} />
          </div>

          <span className="text-sm text-white/55">
            {label}
          </span>

        </div>

        <span className="font-display text-lg font-semibold text-white">
          {numericValue}
        </span>

      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">

        <div
          className="h-full rounded-full bg-gradient-to-r from-[#FF5A36] to-[#FF8A70] transition-all duration-700"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between gap-4">

      <div className="flex min-w-0 items-center gap-3">

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025] text-white/35">
          <Icon size={16} />
        </div>

        <span className="text-sm text-white/40">
          {label}
        </span>

      </div>

      <span className="truncate text-right text-sm font-medium text-white/75">
        {value}
      </span>

    </div>
  );
}

function PlanFeature({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
      <div className="flex items-start gap-3">

        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.04] text-white/40">
          <Icon size={15} />
        </div>

        <div>
          <p className="text-xs font-medium text-white/70">
            {title}
          </p>

          <p className="mt-1 text-[11px] leading-5 text-white/30">
            {description}
          </p>
        </div>

      </div>
    </div>
  );
}

function PlanCheck({ text }) {
  return (
    <div className="flex items-center gap-2.5">
      <CheckCircle2
        size={14}
        className="shrink-0 text-emerald-400/80"
      />

      <span className="text-xs text-white/50">
        {text}
      </span>
    </div>
  );
}