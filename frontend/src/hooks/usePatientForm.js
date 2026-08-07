import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { initialPatientForm } from "../models/patientForm";
import { validatePatientForm } from "../utils/validation";
import { runPrediction } from "../utils/predictionWorkflow";
import { getCurrentLocation } from "../services/locationService";

import usePrediction from "./usePrediction";

const usePatientForm = () => {
  const navigate = useNavigate();

  const { setPrediction, setLoading } = usePrediction();

  const [formData, setFormData] = useState(initialPatientForm);

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (field, value) => {

  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));
};

  // Detect user's current location
  const detectLocation = async () => {
    try {
      const location = await getCurrentLocation();

      setFormData((prev) => ({
        ...prev,
        latitude: location.latitude,
        longitude: location.longitude,
      }));

      return location; 
    } catch (error) {
      console.error("Location Error:", error);
    }
  };

  // Submit assessment
const submitForm = async () => {
  const location = await getCurrentLocation();

  const updatedFormData = {
    ...formData,
    latitude: location.latitude,
    longitude: location.longitude,
  };

  const validationErrors = validatePatientForm(updatedFormData);

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    await runPrediction(
      updatedFormData,
      setPrediction,
      setLoading
    );

    navigate("/patient/results");
  } catch (error) {
    console.error("Prediction Error:", error);
  }
};

  return {
    formData,
    errors,
    handleChange,
    detectLocation,
    submitForm,
  };
};

export default usePatientForm;