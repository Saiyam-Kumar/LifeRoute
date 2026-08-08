import { useEffect, useState } from "react";

const STORAGE_KEY = "incident-checklist";

export default function IncidentChecklist() {
  const [checklist, setChecklist] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved
      ? JSON.parse(saved)
      : {
          assessment: true,
          dispatch: false,
          contact: false,
          escalation: false,
          resolved: false,
        };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(checklist));
  }, [checklist]);

  const toggle = (key) => {
    setChecklist((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const total = Object.keys(checklist).length;

  const completed = Object.values(checklist).filter(Boolean).length;

  const progress = Math.round((completed / total) * 100);

  return (
    <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold mb-5">
        Incident Response Checklist
      </h2>

      <div className="space-y-3">

        {[
          ["assessment", "Assessment Completed"],
          ["dispatch", "Ambulance Dispatched"],
          ["contact", "Hospital Contacted"],
          ["escalation", "Escalated to Emergency Team"],
          ["resolved", "Incident Resolved"],
        ].map(([key, label]) => (
          <label
            key={key}
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="checkbox"
              checked={checklist[key]}
              onChange={() => toggle(key)}
            />

            <span>{label}</span>
          </label>
        ))}

      </div>

      <div className="mt-6">

        <div className="flex justify-between mb-2">

          <span>Progress</span>

          <span>{progress}%</span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">

          <div
            className="bg-green-600 h-3 rounded-full"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

    </div>
  );
}