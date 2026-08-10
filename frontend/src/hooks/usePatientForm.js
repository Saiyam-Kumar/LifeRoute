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
      throw error;
    }
  };

  // Submit assessment
  const submitForm = async () => {
    let location;

    try {
      location = await getCurrentLocation();
    } catch (error) {
      console.error("Location Error:", error);
      return;
    }

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
      // Show the loading UI immediately.
      setLoading(true);

      // Move to the real loading screen.
      navigate("/patient/loading");

      // Run the actual AI + hospital prediction.
      const result = await runPrediction(
        updatedFormData,
        setPrediction,
        setLoading
      );

      // Only go to results after the real backend response arrives.
      if (result) {
        navigate("/patient/results");
      }
    } catch (error) {
      console.error("Prediction Error:", error);

      // Return to assessment if prediction fails.
      setLoading(false);
      navigate("/patient/assessment");
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