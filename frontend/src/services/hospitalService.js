import api from "./api";

// Get all hospitals
export const getHospitals = async () => {
  try {
    const response = await api.get("/hospital");
    return response.data;
  } catch (error) {
    console.error("Get Hospitals Error:", error);
    throw error;
  }
};

// Get one hospital
export const getHospitalById = async (id) => {
  try {
    const response = await api.get(`/hospital/${id}`);
    return response.data;
  } catch (error) {
    console.error("Get Hospital Error:", error);
    throw error;
  }
};

// Update hospital
export const updateHospital = async (id, data) => {
  try {
    const response = await api.put(`/hospital/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Update Hospital Error:", error);
    throw error;
  }
};