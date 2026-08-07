export function validatePatientForm(data) {

    const errors = {};

    if (!data.age)
        errors.age = "Age is required.";

    if (!data.chief_complain)
        errors.chief_complain = "Chief complaint is required.";

    if (!data.sbp)
        errors.sbp = "Systolic BP is required.";

    if (!data.dbp)
        errors.dbp = "Diastolic BP is required.";

    if (!data.hr)
        errors.hr = "Heart rate is required.";

    if (!data.rr)
        errors.rr = "Respiratory rate is required.";

    if (!data.bt)
        errors.bt = "Body temperature is required.";

    if (!data.saturation)
        errors.saturation = "SpO₂ is required.";

    if (data.saturation > 100)
        errors.saturation = "SpO₂ cannot exceed 100.";

    return errors;

}