import api from "./api";

export const predictPatient = async (patientData) => {
  console.log("Sending Data:", patientData);

  try {
    const response = await api.post("/ai/predict", patientData);

    console.log("Response:", response.data);

    return response.data;

  } catch (error) {

    console.error("Prediction Error:", error);

    if (error.response) {
      console.log("Backend Error:", JSON.stringify(error.response.data, null, 2));
    }

    throw error;
  }
};