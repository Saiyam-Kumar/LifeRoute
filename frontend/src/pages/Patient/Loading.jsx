function Loading() {
  const steps = [
    "Analyzing Patient",
    "Predicting KTAS Severity",
    "Allocating Medical Resources",
    "Searching Nearby Hospitals",
    "Calculating ETA",
    "Ranking Hospitals",
    "Preparing Recommendation",
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-xl">

        <h1 className="text-3xl font-bold text-center text-blue-700">
          AI Processing
        </h1>

        <p className="text-gray-500 text-center mt-2 mb-8">
          Please wait while LifeRoute analyzes the patient's condition.
        </p>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border rounded-lg p-4"
            >
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>

              <span className="text-gray-700 font-medium">
                {step}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Loading;