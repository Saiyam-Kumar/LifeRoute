import { useState } from "react";
const INCIDENTS = [
  {
    id: "INC-001",
    role: "Hospital",
    status: "Active",
    ktas: 2,
    hospital: "AIIMS Delhi",
  },
  {
    id: "INC-002",
    role: "Authority",
    status: "Resolved",
    ktas: 3,
    hospital: "Fortis Delhi",
  },
  {
    id: "INC-003",
    role: "Patient",
    status: "Active",
    ktas: 4,
    hospital: "Max Hospital",
  },
];

export default function Incidents() {

    const [role, setRole] = useState("All");

    const filtered =
        role === "All"
            ? INCIDENTS
            : INCIDENTS.filter((incident) => incident.role === role);

    return (

        <div className="min-h-screen p-10 bg-gray-100">

    <h1 className="text-3xl font-bold mb-6">
        Incident Records
    </h1>

    <div className="flex gap-3 mb-6">

        {["All", "Hospital", "Authority", "Patient"].map((item) => (

            <button
                key={item}
                onClick={() => setRole(item)}
                className={`px-4 py-2 rounded-lg ${
                    role === item
                        ? "bg-blue-600 text-white"
                        : "bg-white border"
                }`}
            >
                {item}
            </button>

        ))}

    </div>

    <p className="mb-4">
        Showing {filtered.length} incidents
    </p>

    <div className="space-y-4">

        {filtered.map((incident) => (

            <div
                key={incident.id}
                className="bg-white rounded-xl shadow p-5"
            >

                <h2 className="font-bold text-lg">
                    {incident.id}
                </h2>

                <p>
                    Role: {incident.role}
                </p>

                <p>
                    Status: {incident.status}
                </p>

                <p>
                    KTAS: {incident.ktas}
                </p>

                <p>
                    Hospital: {incident.hospital}
                </p>

            </div>

        ))}

    </div>

</div>
    );
}