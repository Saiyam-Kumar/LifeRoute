"""
LifeRoute AI
Vital Signs Rules
"""


def get_vital_resources(patient):
    resources = set()

    # --------------------------------------------------
    # Low oxygen
    # Only evaluate this rule when SpO2 is available.
    # --------------------------------------------------

    saturation = patient.get("saturation")

    if saturation is not None and saturation < 90:
        resources.update([
            "Oxygen",
            "Ventilator",
            "ICU",
        ])

    # --------------------------------------------------
    # Very low blood pressure
    # Only evaluate when systolic BP is available.
    # --------------------------------------------------

    sbp = patient.get("sbp")

    if sbp is not None and sbp < 90:
        resources.update([
            "ICU",
            "Emergency Physician",
        ])

    # --------------------------------------------------
    # High heart rate
    # Only evaluate when HR is available.
    # --------------------------------------------------

    hr = patient.get("hr")

    if hr is not None and hr > 120:
        resources.add("Cardiac Monitoring")

    # --------------------------------------------------
    # Very high respiratory rate
    # Only evaluate when RR is available.
    # --------------------------------------------------

    rr = patient.get("rr")

    if rr is not None and rr > 24:
        resources.add("Emergency Physician")

    return resources