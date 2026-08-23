import useLivePatientState from "../../hooks/useLivePatientState";

import {
  CheckCircle2,
} from "lucide-react";


const stageOrder = {
  patient_identified: 1,
  assessment_processing: 2,
  ktas_completed: 3,
  resources_identified: 4,
  hospital_matching: 5,
  hospital_recommended: 6,
};


const stages = [
  {
    key: "patient_identified",
    label: "Patient Identified",
  },
  {
    key: "assessment_processing",
    label: "Emergency Assessment",
  },
  {
    key: "ktas_completed",
    label: "KTAS Triage",
  },
  {
    key: "resources_identified",
    label: "Resources Identified",
  },
  {
    key: "hospital_matching",
    label: "Hospital Matching",
  },
  {
    key: "hospital_recommended",
    label: "Hospital Recommended",
  },
];


function LiveEmergencyStatus() {

  const {
    emergencyState,
    loading,
    error,
  } = useLivePatientState();


  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pt-8">

        <section className="rounded-2xl border border-white/[0.08] bg-[#11151D] overflow-hidden">

          <div className="px-6 sm:px-8 py-6">

            <div className="flex items-center gap-3">

              <div className="h-5 w-5 rounded-full border-2 border-white/10 border-t-emerald-400 animate-spin" />

              <p className="text-sm text-white/45">
                Synchronizing live emergency state...
              </p>

            </div>

          </div>

        </section>

      </div>
    );
  }


  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pt-8">

        <section className="rounded-2xl border border-red-400/20 bg-[#11151D] overflow-hidden">

          <div className="px-6 sm:px-8 py-6">

            <p className="text-sm text-red-300">
              {error}
            </p>

          </div>

        </section>

      </div>
    );
  }


  if (!emergencyState) {
    return (
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pt-8">

        <section className="rounded-2xl border border-white/[0.08] bg-[#11151D] overflow-hidden">

          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/[0.08]">

            <div>

              <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-white/30">
                Live Emergency Status
              </span>

              <h2 className="font-display font-semibold text-[18px] text-white mt-1">
                Your Current Journey
              </h2>

            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">

              <span className="h-2 w-2 rounded-full bg-white/20" />

              <span className="font-mono text-[10px] uppercase tracking-wide text-white/30">
                Waiting
              </span>

            </div>

          </div>

          <div className="px-6 sm:px-8 py-6">

            <p className="text-sm text-white/35">
              Your live emergency state will appear here
              when an assessment is processed.
            </p>

          </div>

        </section>

      </div>
    );
  }


  const currentStage =
    stageOrder[emergencyState.stage] || 1;


  return (
    <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pt-8">

      <section className="rounded-2xl border border-white/[0.08] bg-[#11151D] overflow-hidden">

        {/* ====================================================== */}
        {/* HEADER                                                  */}
        {/* ====================================================== */}

        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/[0.08]">

          <div>

            <span className="block font-mono text-[11px] uppercase tracking-[0.14em] text-[#FF7A5C]">
              Live Emergency Status
            </span>

            <h2 className="font-display font-semibold text-[18px] text-white mt-1">
              Your Current Journey
            </h2>

          </div>


          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/[0.05] px-3 py-1.5">

            <span className="relative flex h-2 w-2">

              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-50 animate-ping" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />

            </span>

            <span className="font-mono text-[10px] uppercase tracking-wide text-emerald-300">
              Live
            </span>

          </div>

        </div>


        {/* ====================================================== */}
        {/* BODY                                                    */}
        {/* ====================================================== */}

        <div className="px-6 sm:px-8 py-6">


          {/* CURRENT STATE */}

          <div className="rounded-xl border border-[#FF5A36]/20 bg-[#FF5A36]/[0.035] p-5 mb-7">

            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/30">
              Current State
            </span>

            <p className="font-display font-semibold text-[16px] sm:text-[17px] text-white mt-2">
              {emergencyState.status ||
                "Emergency state active."}
            </p>

            {emergencyState.updated_at && (
              <p className="text-[11px] text-white/30 mt-2">
                ● Updated{" "}
                {formatTimestamp(
                  emergencyState.updated_at
                )}
              </p>
            )}

          </div>


          {/* ==================================================== */}
          {/* JOURNEY TIMELINE                                     */}
          {/* ==================================================== */}

          <div className="relative">

            {/* connecting line */}

            <div className="absolute left-[14px] top-[16px] bottom-[16px] w-px bg-white/[0.08]" />


            <div className="flex flex-col gap-5">

              {stages.map(
                (stage) => {

                  const stageNumber =
                    stageOrder[stage.key];

                  const completed =
                    currentStage > stageNumber;

                  const active =
                    currentStage === stageNumber;


                  return (
                    <div
                      key={stage.key}
                      className="relative flex items-center gap-4"
                    >

                      {/* STATUS CIRCLE */}

                      <div
                        className={`relative z-10 flex items-center justify-center h-8 w-8 rounded-full shrink-0 border ${
                          completed
                            ? "border-emerald-400/30 bg-emerald-400/[0.08] text-emerald-400"
                            : active
                            ? "border-[#FF5A36]/40 bg-[#FF5A36]/[0.08] text-[#FF7A5C]"
                            : "border-white/[0.08] bg-[#11151D] text-white/20"
                        }`}
                      >

                        {completed ? (
                          <CheckCircle2
                            size={15}
                            strokeWidth={2}
                          />
                        ) : active ? (
                          <span className="h-2.5 w-2.5 rounded-full bg-[#FF7A5C] animate-pulse" />
                        ) : (
                          <span className="text-[10px]">
                            {stageNumber}
                          </span>
                        )}

                      </div>


                      {/* LABEL */}

                      <div className="min-w-0">

                        <p
                          className={`text-[13px] font-medium ${
                            completed
                              ? "text-white/70"
                              : active
                              ? "text-[#FF7A5C]"
                              : "text-white/25"
                          }`}
                        >
                          {stage.label}
                        </p>

                        {active && (
                          <p className="text-[11px] text-white/30 mt-0.5">
                            Currently in progress
                          </p>
                        )}

                      </div>

                    </div>
                  );
                }
              )}

            </div>

          </div>


          {/* ==================================================== */}
          {/* LIVE METRICS                                         */}
          {/* ==================================================== */}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">

            {emergencyState.ktas_level !== undefined &&
              emergencyState.ktas_level !== null && (

                <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">

                  <span className="font-mono text-[10px] uppercase tracking-wide text-white/30">
                    KTAS Level
                  </span>

                  <p className="font-display font-semibold text-[18px] text-white mt-1">
                    {emergencyState.ktas_level}
                  </p>

                </div>

              )}


            {Array.isArray(
              emergencyState.resources
            ) && (

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">

                <span className="font-mono text-[10px] uppercase tracking-wide text-white/30">
                  Resource Needs
                </span>

                <p className="font-display font-semibold text-[18px] text-white mt-1">
                  {emergencyState.resources.length}
                </p>

              </div>

            )}


            <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-4">

              <span className="font-mono text-[10px] uppercase tracking-wide text-white/30">
                Last Updated
              </span>

              <p className="font-display font-semibold text-[16px] text-white mt-1">
                {formatTimestamp(
                  emergencyState.updated_at
                )}
              </p>

            </div>

          </div>


          {/* ==================================================== */}
          {/* RECOMMENDED HOSPITAL                                 */}
          {/* ==================================================== */}

          {emergencyState.recommended_hospital && (

            <div className="mt-4 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.035] p-5">

              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-400">
                Recommended Hospital
              </span>


              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mt-2">

                <div>

                  <p className="font-display font-semibold text-[17px] text-white">
                    {emergencyState.recommended_hospital}
                  </p>

                </div>


                <div className="flex items-center gap-5">

                  {emergencyState.eta !== undefined &&
                    emergencyState.eta !== null && (

                    <div>

                      <span className="block font-mono text-[10px] uppercase tracking-wide text-white/30">
                        ETA
                      </span>

                      <p className="text-[14px] font-medium text-white mt-1">
                        {emergencyState.eta} min
                      </p>

                    </div>

                  )}


                  {emergencyState.distance_km !== undefined &&
                    emergencyState.distance_km !== null && (

                    <div>

                      <span className="block font-mono text-[10px] uppercase tracking-wide text-white/30">
                        Distance
                      </span>

                      <p className="text-[14px] font-medium text-white mt-1">
                        {emergencyState.distance_km} km
                      </p>

                    </div>

                  )}

                </div>

              </div>

            </div>

          )}

        </div>

      </section>

    </div>
  );
}


/* ================================================================ */
/* TIMESTAMP FORMATTER                                              */
/* ================================================================ */

function formatTimestamp(timestamp) {

  if (!timestamp) {
    return "Just now";
  }


  try {

    let date;


    if (
      timestamp &&
      typeof timestamp === "object" &&
      timestamp.seconds
    ) {

      date = new Date(
        timestamp.seconds * 1000
      );

    } else {

      date = new Date(timestamp);

    }


    if (Number.isNaN(date.getTime())) {
      return "Just now";
    }


    return date.toLocaleTimeString(
      [],
      {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
      }
    );

  } catch {

    return "Just now";

  }
}


export default LiveEmergencyStatus;