"""
LifeRoute AI
Vital Signs Rules
"""


def get_vital_resources(patient):

    resources = set()

    # Low oxygen
    if patient["saturation"] < 90:
        resources.update([
            "Oxygen",
            "Ventilator",
            "ICU"
        ])

    # Very low blood pressure
    if patient["sbp"] < 90:
        resources.update([
            "ICU",
            "Emergency Physician"
        ])

    # High heart rate
    if patient["hr"] > 120:
        resources.add("Cardiac Monitoring")

    # Very high respiratory rate
    if patient["rr"] > 24:
        resources.add("Emergency Physician")

    return resources