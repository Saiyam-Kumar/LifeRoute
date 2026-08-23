import LiveEmergencyStatus
  from "../../components/patient/LiveEmergencyStatus";


function Dashboard() {

  return (
    <div className="min-h-screen bg-[#0B0D12] text-white">

      {/* HEADER */}

      <header className="border-b border-white/10 bg-[#0D1015]">

        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-[0.2em] text-orange-400">
              LifeRoute
            </p>

            <h1 className="text-xl font-semibold mt-1">
              Patient Dashboard
            </h1>

          </div>


          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-green-500/20 bg-green-500/5">

            <span className="w-2 h-2 rounded-full bg-green-400" />

            <span className="text-xs text-green-400">
              System Online
            </span>

          </div>

        </div>

      </header>


      {/* CONTENT */}

      <main className="max-w-6xl mx-auto px-6 py-10">


        <div className="mb-8">

          <p className="text-xs uppercase tracking-[0.2em] text-gray-500">
            Emergency Care
          </p>

          <h2 className="text-3xl font-bold mt-2">
            Your Live Health Journey
          </h2>

          <p className="text-gray-400 mt-3 max-w-2xl">
            View your current LifeRoute emergency status,
            triage progress and hospital recommendation
            in real time.
          </p>

        </div>


        <div className="max-w-3xl">

          <LiveEmergencyStatus />

        </div>


      </main>

    </div>
  );
}


export default Dashboard;