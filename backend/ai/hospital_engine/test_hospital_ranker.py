from hospital_ranker import recommend_hospital

patient_resources = [
    "ICU",
    "CT Scan",
    "Ventilator",
    "Emergency Physician"
]

hospitals = [
    {
        "name": "Apollo Hospital",
        "available_icu": 4,
        "ventilators": 6,
        "specialists": [
            "Emergency Physician",
            "Cardiologist"
        ],
        "resources": [
            "CT Scan",
            "ECG",
            "Cardiac Monitoring"
        ],
        "is_open": True,
        "eta": 8
    },
    {
        "name": "City Hospital",
        "available_icu": 1,
        "ventilators": 2,
        "specialists": [],
        "resources": [
            "ECG"
        ],
        "is_open": True,
        "eta": 5
    }
]

result = recommend_hospital(
    patient_resources,
    hospitals
)

print(result)