import { createContext, useState } from "react";

const PredictionContext = createContext();

export function PredictionProvider({ children }) {
  const [prediction, setPrediction] = useState(null);

  return (
    <PredictionContext.Provider
      value={{
        prediction,
        setPrediction,
      }}
    >
      {children}
    </PredictionContext.Provider>
  );
}

export default PredictionContext;