import { useContext } from "react";
import PredictionContext from "../context/PredictionContext";

const usePrediction = () => {
  return useContext(PredictionContext);
};

export default usePrediction;