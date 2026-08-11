export function validatePatientForm(data) {
  const errors = {};

  if (!data.age) {
    errors.age = "Age is required.";
  }

  if (!data.chief_complain) {
    errors.chief_complain = "Chief complaint is required.";
  }

  /*
   * Vitals are required ONLY when the patient has
   * measured vital signs.
   *
   * saturation_missing:
   * 0 = saturation/vitals available
   * 1 = vitals not available
   */
  const vitalsAvailable =
    Number(data.saturation_missing) === 0;

  if (vitalsAvailable) {
    if (data.sbp === null || data.sbp === "") {
      errors.sbp = "Systolic BP is required.";
    }

    if (data.dbp === null || data.dbp === "") {
      errors.dbp = "Diastolic BP is required.";
    }

    if (data.hr === null || data.hr === "") {
      errors.hr = "Heart rate is required.";
    }

    if (data.rr === null || data.rr === "") {
      errors.rr = "Respiratory rate is required.";
    }

    if (data.bt === null || data.bt === "") {
      errors.bt = "Body temperature is required.";
    }

    if (
      data.saturation === null ||
      data.saturation === ""
    ) {
      errors.saturation = "SpO₂ is required.";
    }
  }

  if (
    data.saturation !== null &&
    data.saturation !== "" &&
    Number(data.saturation) > 100
  ) {
    errors.saturation =
      "SpO₂ cannot exceed 100.";
  }

  return errors;
}