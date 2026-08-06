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
    complaint = patient["chief_complain"].lower()

    category = MEDICAL_CATEGORIES.get(complaint)

    if category:
        resources.update(CATEGORY_RESOURCES[category])
        reasons.append(f"Chief complaint belongs to {category}")
    else:
        reasons.append("Chief complaint not found in knowledge base")

    # ----------------------------
    # Vital Signs
    # ----------------------------
    vital_resources = get_vital_resources(patient)
    resources.update(vital_resources)

    if patient["saturation"] < 90:
        reasons.append("Low SpO₂ (<90%) → Oxygen support required")

    if patient["sbp"] < 90:
        reasons.append("Low systolic blood pressure (<90 mmHg) → ICU evaluation")

    if patient["hr"] > 120:
        reasons.append("High heart rate (>120 bpm) → Cardiac monitoring")

    if patient["rr"] > 24:
        reasons.append("Rapid breathing (>24 breaths/min) → Emergency physician required")

    # ----------------------------
    # KTAS Rules
    # ----------------------------
    ktas_resources = get_ktas_resources(patient["ktas"])
    resources.update(ktas_resources)

    reasons.append(f"KTAS Level {patient['ktas']} considered")

    # ----------------------------
    # Final Output
    # ----------------------------
    return {
        "category": category,
        "resources": sorted(resources),
        "reasons": reasons
    }