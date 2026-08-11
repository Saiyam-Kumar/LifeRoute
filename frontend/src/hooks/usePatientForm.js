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

  // --------------------------------------------------
  // Handle input changes
  // --------------------------------------------------

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // --------------------------------------------------
  // Detect user's current location
  // --------------------------------------------------

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

  // --------------------------------------------------
  // Submit assessment
  // --------------------------------------------------

  const submitForm = async () => {
    let location;

    // Get user's current location ONCE
    try {
      location = await getCurrentLocation();
    } catch (error) {
      console.error("Location Error:", error);

      setErrors({
        location:
          "Unable to access your current location. Please allow location access and try again.",
      });

      return;
    }

    // ----------------------------------------------
    // Build final data that will be sent to backend
    // ----------------------------------------------

    const updatedFormData = {
      ...formData,

      latitude: location.latitude,
      longitude: location.longitude,
    };

    console.log(
      "Final assessment data:",
      updatedFormData
    );

    // ----------------------------------------------
    // Validate
    // ----------------------------------------------

    const validationErrors =
      validatePatientForm(updatedFormData);

    if (Object.keys(validationErrors).length > 0) {
      console.log(
        "Validation errors:",
        validationErrors
      );

      setErrors(validationErrors);

      return;
    }

    // Clear old errors
    setErrors({});

    // ----------------------------------------------
    // Run prediction
    // ----------------------------------------------

    try {
      setLoading(true);

      // Go to loading screen immediately
      navigate("/patient/loading");

      const result = await runPrediction(
        updatedFormData,
        setPrediction,
        setLoading
      );

      // Only show results after backend responds
      if (result) {
        navigate("/patient/results");
      }
    } catch (error) {
      console.error(
        "Prediction Error:",
        error
      );

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