import api from "./api";

export const predictPatient = async (patientData) => {
  try {
    const response = await api.post("/ai/predict", patientData);
    return response.data;
  } catch (error) {
    console.error("Prediction Error:", error);

    throw error;
  }
};