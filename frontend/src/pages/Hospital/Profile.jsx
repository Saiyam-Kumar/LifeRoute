import { useEffect, useState } from "react";
import {
  Activity,
  Building2,
  Check,
  CircleAlert,
  Globe2,
  Loader2,
  MapPin,
  Phone,
  RefreshCw,
  Save,
  ShieldAlert,
} from "lucide-react";

const API_BASE_URL = "http://127.0.0.1:8000";

// Temporary development hospital.
// Replace this with the authenticated hospital ID once hospital login is connected.
const DEV_HOSPITAL_ID = "ttw0KceICTFNZtxXy7TG";

export default function Profile() {
  const [hospital, setHospital] = useState(null);

  const [name, setName] = useState("");
  const [hospitalType, setHospitalType] = useState("");
  const [emergencyDepartment, setEmergencyDepartment] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchHospital = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");
      setSuccess("");

      const response = await fetch(
        `${API_BASE_URL}/hospital/${DEV_HOSPITAL_ID}`
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();

      if (!data || data.message === "Hospital not found") {
        throw new Error("Hospital could not be found.");
      }

      setHospital(data);

      setName(data.name ?? "");
      setHospitalType(data.hospital_type ?? "");
      setEmergencyDepartment(data.emergency_department ?? "");
      setPhone(data.phone ?? "");
      setAddress(data.address ?? "");
      setLatitude(data.latitude ?? "");
      setLongitude(data.longitude ?? "");
    } catch (err) {
      console.error("Hospital profile error:", err);

      setError(
        err.message || "Unable to load hospital profile right now."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHospital();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      if (!name.trim()) {
        throw new Error("Hospital name is required.");
      }

      if (!hospitalType.trim()) {
        throw new Error("Hospital type is required.");
      }

      if (!address.trim()) {
        throw new Error("Hospital address is required.");
      }

      const parsedLatitude = Number(latitude);
      const parsedLongitude = Number(longitude);

      if (
        !Number.isFinite(parsedLatitude) ||
        parsedLatitude < -90 ||
        parsedLatitude > 90
      ) {
        throw new Error("Please enter a valid latitude between -90 and 90.");
      }

      if (
        !Number.isFinite(parsedLongitude) ||
        parsedLongitude < -180 ||
        parsedLongitude > 180
      ) {
        throw new Error(
          "Please enter a valid longitude between -180 and 180."
        );
      }

      const payload = {
        name: name.trim(),
        hospital_type: hospitalType.trim(),
        emergency_department: emergencyDepartment.trim(),
        phone: phone.trim(),
        address: address.trim(),
        latitude: parsedLatitude,
        longitude: parsedLongitude,
      };

      const response = await fetch(
        `${API_BASE_URL}/hospital/${DEV_HOSPITAL_ID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const responseText = await response.text();

        throw new Error(
          responseText || `Update failed with status ${response.status}`
        );
      }

      setSuccess("Hospital profile updated successfully.");

      await fetchHospital();

      setTimeout(() => {
        setSuccess("");
      }, 4000);
    } catch (err) {
      console.error("Hospital profile update error:", err);

      setError(
        err.message || "Unable to update hospital profile."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0D12] px-6 py-10 lg:px-10">
        <div className="mx-auto max-w-7xl animate-pulse">
          <div className="h-3 w-28 rounded bg-white/[0.06]" />

          <div className="mt-4 h-10 w-80 rounded bg-white/[0.06]" />

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="h-[520px] rounded-2xl border border-white/[0.06] bg-white/[0.025]" />

            <div className="h-[520px] rounded-2xl border border-white/[0.06] bg-white/[0.025]" />
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
              <CircleAlert size={21} />
            </div>

            <h1 className="mt-5 font-display text-2xl font-semibold text-white">
              Unable to load hospital profile
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

        {/* Header */}
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#FF5A36]">
                Hospital Portal
              </span>

              <span className="h-1 w-1 rounded-full bg-white/20" />

              <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/25">
                Hospital Profile
              </span>
            </div>

            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Hospital Profile
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/40">
              Manage the hospital information patients see when LifeRoute
              recommends your facility.
            </p>
          </div>

          <button
            type="button"
            onClick={() => fetchHospital(true)}
            disabled={refreshing || saving}
            className="flex h-10 w-10 shrink-0 items-center justify-center self-start rounded-xl border border-white/[0.08] bg-white/[0.025] text-white/40 transition hover:bg-white/[0.06] hover:text-white disabled:opacity-50 md:self-auto"
            aria-label="Refresh hospital profile"
          >
            <RefreshCw
              size={16}
              className={refreshing ? "animate-spin" : ""}
            />
          </button>
        </header>

        {/* Alerts */}
        {(error || success) && (
          <div className="mt-6">
            {error && (
              <div className="flex items-start gap-3 rounded-xl border border-red-400/10 bg-red-400/[0.04] px-4 py-3.5">
                <CircleAlert
                  size={17}
                  className="mt-0.5 shrink-0 text-red-400"
                />

                <p className="text-sm text-red-200/70">{error}</p>
              </div>
            )}

            {success && (
              <div className="flex items-start gap-3 rounded-xl border border-emerald-400/10 bg-emerald-400/[0.04] px-4 py-3.5">
                <Check
                  size={17}
                  className="mt-0.5 shrink-0 text-emerald-400"
                />

                <p className="text-sm text-emerald-200/70">
                  {success}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Main grid */}
        <div className="mt-8 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">

          {/* Left — editable information */}
          <section className="rounded-2xl border border-white/[0.08] bg-[#11151D]">

            <div className="border-b border-white/[0.07] px-6 py-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
                Identity
              </p>

              <h2 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-white">
                Hospital Information
              </h2>

              <p className="mt-1 text-xs leading-5 text-white/30">
                Keep your public hospital information accurate and up to date.
              </p>
            </div>

            <div className="space-y-6 p-6">

              <ProfileInput
                icon={Building2}
                label="Hospital Name"
                value={name}
                onChange={setName}
                placeholder="Enter hospital name"
              />

              <ProfileInput
                icon={Activity}
                label="Hospital Type"
                value={hospitalType}
                onChange={setHospitalType}
                placeholder="e.g. Super Speciality"
              />

              <ProfileInput
                icon={ShieldAlert}
                label="Emergency Department"
                value={emergencyDepartment}
                onChange={setEmergencyDepartment}
                placeholder="e.g. Emergency Department"
              />

              <div className="h-px bg-white/[0.06]" />

              <div>
                <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
                  Contact
                </p>

                <ProfileInput
                  icon={Phone}
                  label="Phone"
                  value={phone}
                  onChange={setPhone}
                  placeholder="Enter hospital phone number"
                  type="tel"
                />

                <div className="mt-5">
                  <ProfileTextarea
                    icon={MapPin}
                    label="Address"
                    value={address}
                    onChange={setAddress}
                    placeholder="Enter complete hospital address"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Right — location */}
          <div className="space-y-6">

            <section className="rounded-2xl border border-white/[0.08] bg-[#11151D]">

              <div className="border-b border-white/[0.07] px-6 py-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
                  Location
                </p>

                <h2 className="mt-1.5 font-display text-lg font-semibold tracking-tight text-white">
                  Hospital Coordinates
                </h2>

                <p className="mt-1 text-xs leading-5 text-white/30">
                  These coordinates are used when patients start navigation.
                </p>
              </div>

              <div className="p-6">

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">

                  <ProfileInput
                    icon={Globe2}
                    label="Latitude"
                    value={latitude}
                    onChange={setLatitude}
                    placeholder="30.74211"
                    type="number"
                    step="any"
                  />

                  <ProfileInput
                    icon={Globe2}
                    label="Longitude"
                    value={longitude}
                    onChange={setLongitude}
                    placeholder="76.66947"
                    type="number"
                    step="any"
                  />

                </div>

                {/* Coordinate preview */}
                <div className="mt-6 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0D1117]">

                  <div className="relative h-52">

                    {/* Grid */}
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        backgroundImage:
                          "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                      }}
                    />

                    {/* Radial glow */}
                    <div className="absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF5A36]/[0.07] blur-3xl" />

                    {/* Pin */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

                      <div className="absolute inset-0 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FF5A36]/20 blur-xl" />

                      <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#FF5A36]/30 bg-[#FF5A36]/[0.12]">
                        <MapPin
                          size={18}
                          className="text-[#FF5A36]"
                          fill="rgba(255,90,54,0.12)"
                        />
                      </div>

                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/[0.07] bg-[#0B0D12]/80 px-3.5 py-2.5 backdrop-blur-md">

                      <div className="flex items-center gap-2">

                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_7px_rgba(52,211,153,0.55)]" />

                        <span className="text-[10px] text-white/40">
                          Navigation location
                        </span>

                      </div>

                      <span className="font-mono text-[9px] text-white/25">
                        {latitude || "—"}, {longitude || "—"}
                      </span>

                    </div>
                  </div>
                </div>

                <div className="mt-4 flex gap-3 rounded-xl border border-[#7C8CF5]/10 bg-[#7C8CF5]/[0.035] p-4">

                  <MapPin
                    size={16}
                    className="mt-0.5 shrink-0 text-[#7C8CF5]"
                  />

                  <p className="text-xs leading-5 text-white/35">
                    LifeRoute uses these exact coordinates for the patient's
                    navigation destination. Keep them accurate.
                  </p>

                </div>
              </div>
            </section>

            {/* Current profile summary */}
            <section className="rounded-2xl border border-white/[0.08] bg-[#11151D] p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/[0.08] text-emerald-400">
                  <Check size={18} />
                </div>

                <div>
                  <p className="text-sm font-medium text-white/75">
                    Connected Profile
                  </p>

                  <p className="mt-1 text-xs text-white/30">
                    This information is shared with LifeRoute patients.
                  </p>
                </div>

              </div>

              <div className="mt-5 space-y-3">

                <SummaryRow
                  label="Hospital"
                  value={name || "Not set"}
                />

                <SummaryRow
                  label="Type"
                  value={hospitalType || "Not set"}
                />

                <SummaryRow
                  label="Phone"
                  value={phone || "Not available"}
                />

                <SummaryRow
                  label="Emergency"
                  value={
                    emergencyDepartment || "Not set"
                  }
                />

              </div>
            </section>
          </div>
        </div>

        {/* Save bar */}
        <div className="sticky bottom-5 z-20 mt-8">

          <div className="flex flex-col gap-4 rounded-2xl border border-white/[0.09] bg-[#0F131A]/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-medium text-white/70">
                Keep your hospital information current
              </p>

              <p className="mt-1 text-xs text-white/30">
                Changes are immediately reflected in the LifeRoute hospital
                information used by patients.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#FF5A36] px-5 py-3 text-sm font-semibold text-white shadow-[0_8px_25px_rgba(255,90,54,0.15)] transition hover:bg-[#ff6847] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2
                    size={16}
                    className="animate-spin"
                  />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={16} />
                  Save Changes
                </>
              )}
            </button>

          </div>
        </div>

        {/* Metadata */}
        <div className="mt-8 flex flex-col gap-2 border-t border-white/[0.06] pt-5 text-[11px] text-white/20 sm:flex-row sm:items-center sm:justify-between">

          <span>
            Hospital ID:{" "}
            <span className="font-mono text-white/30">
              {hospital?.id}
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


/* ================================================================ */
/* INPUT                                                            */
/* ================================================================ */

function ProfileInput({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  step,
}) {
  return (
    <label className="block">

      <span className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
        <Icon size={12} />
        {label}
      </span>

      <input
        type={type}
        step={step}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/[0.08] bg-[#0D1117] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/15 hover:border-white/[0.12] focus:border-[#FF5A36]/30 focus:bg-[#10151D] focus:ring-4 focus:ring-[#FF5A36]/[0.05]"
      />

    </label>
  );
}


/* ================================================================ */
/* TEXTAREA                                                         */
/* ================================================================ */

function ProfileTextarea({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <label className="block">

      <span className="mb-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
        <Icon size={12} />
        {label}
      </span>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full resize-none rounded-xl border border-white/[0.08] bg-[#0D1117] px-4 py-3 text-sm leading-6 text-white outline-none transition placeholder:text-white/15 hover:border-white/[0.12] focus:border-[#FF5A36]/30 focus:bg-[#10151D] focus:ring-4 focus:ring-[#FF5A36]/[0.05]"
      />

    </label>
  );
}


/* ================================================================ */
/* SUMMARY ROW                                                       */
/* ================================================================ */

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-white/[0.05] pb-3 last:border-0 last:pb-0">

      <span className="text-xs text-white/30">
        {label}
      </span>

      <span className="max-w-[65%] truncate text-right text-xs font-medium text-white/65">
        {value}
      </span>

    </div>
  );
}