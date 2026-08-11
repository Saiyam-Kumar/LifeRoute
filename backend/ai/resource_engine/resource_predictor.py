from ai.resource_engine.medical_categories import MEDICAL_CATEGORIES
from ai.resource_engine.category_resources import CATEGORY_RESOURCES
from ai.resource_engine.vital_rules import get_vital_resources
from ai.resource_engine.ktas_rules import get_ktas_resources


def predict_resources(patient):
    """
    Predict required hospital resources based on:
    - Chief Complaint
    - KTAS Level
    - Vital Signs

    Returns:
    {
        "category": "...",
        "resources": [...],
        "reasons": [...]
    }
    """

    resources = set()
    reasons = []

    # ----------------------------
    # Chief Complaint
    # ----------------------------

    complaint = patient["chief_complain"].strip().lower()

    # First try an exact match.
    category = MEDICAL_CATEGORIES.get(complaint)

    # If exact match is not found, look for a known
    # complaint phrase inside the user's text.
    if category is None:
        matches = []

        for phrase, phrase_category in MEDICAL_CATEGORIES.items():
            if phrase in complaint:
                matches.append(
                    (len(phrase), phrase_category)
                )

        # Prefer the longest matching phrase.
        if matches:
            matches.sort(reverse=True)
            category = matches[0][1]

    if category:
        resources.update(
            CATEGORY_RESOURCES[category]
        )

        reasons.append(
            f"Chief complaint belongs to {category}"
        )
    else:
        reasons.append(
            "Chief complaint not found in knowledge base"
        )

    # ----------------------------
    # Vital Signs
    # ----------------------------

    vital_resources = get_vital_resources(patient)
    resources.update(vital_resources)

    # Vitals may be None when the patient
    # does not have measured vital signs.
    saturation = patient.get("saturation")
    sbp = patient.get("sbp")
    hr = patient.get("hr")
    rr = patient.get("rr")

    # Low oxygen
    if saturation is not None and saturation < 90:
        reasons.append(
            "Low SpO₂ (<90%) → Oxygen support required"
        )

    # Low systolic blood pressure
    if sbp is not None and sbp < 90:
        reasons.append(
            "Low systolic blood pressure (<90 mmHg) → ICU evaluation"
        )

    # High heart rate
    if hr is not None and hr > 120:
        reasons.append(
            "High heart rate (>120 bpm) → Cardiac monitoring"
        )

    # Rapid breathing
    if rr is not None and rr > 24:
        reasons.append(
            "Rapid breathing (>24 breaths/min) → Emergency physician required"
        )

    # ----------------------------
    # KTAS Rules
    # ----------------------------

    ktas_resources = get_ktas_resources(
        patient["ktas"]
    )

    resources.update(ktas_resources)

    reasons.append(
        f"KTAS Level {patient['ktas']} considered"
    )

    # ----------------------------
    # Final Output
    # ----------------------------

    return {
        "category": category,
        "resources": sorted(resources),
        "reasons": reasons,
    }