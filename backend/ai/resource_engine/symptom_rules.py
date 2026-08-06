"""
LifeRoute AI
Symptom Knowledge Base
"""

SYMPTOM_RULES = {
    # CARDIOLOGY
    "chest pain": {
        "category": "Cardiology",
        "resources": [
            "ECG",
            "Cardiologist"
        ]
    },

    "palpitations": {
        "category": "Cardiology",
        "resources": [
            "ECG",
            "Cardiologist"
        ]
    },
    # NEUROLOGY

    "head trauma": {
        "category": "Neurology",
        "resources": [
            "CT Scan",
            "Neurosurgeon"
        ]
    },

    "convulsion": {
        "category": "Neurology",
        "resources": [
            "CT Scan",
            "Neurologist"
        ]
    },

    # RESPIRATORY

    "dyspnea": {
        "category": "Respiratory",
        "resources": [
            "Oxygen",
            "Ventilator",
            "Pulmonologist"
        ]
    },

    # TRAUMA

    "open wound": {
        "category": "Trauma",
        "resources": [
            "Trauma Team",
            "General Surgeon"
        ]
    },

    # INFECTIOUS

    "fever": {
        "category": "Infectious",
        "resources": [
            "Emergency Physician"
        ]
    }
}