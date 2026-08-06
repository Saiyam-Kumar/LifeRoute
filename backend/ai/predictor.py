from pathlib import Path

import joblib
import pandas as pd


# --------------------------------------------------
# Model Path
# --------------------------------------------------

MODEL_PATH = Path(__file__).parent / "models" / "triage_model.joblib"


# --------------------------------------------------
# Load Model
# --------------------------------------------------

try:
    model = joblib.load(MODEL_PATH)
    print("✅ KTAS model loaded successfully.")

except Exception as e:
    raise RuntimeError(
        f"Failed to load KTAS model from {MODEL_PATH}\nError: {e}"
    )


# --------------------------------------------------
# KTAS Prediction Function
# --------------------------------------------------

def predict_ktas(patient_data: dict) -> int:
    """
    Predict the KTAS level for a patient.

    Parameters
    ----------
    patient_data : dict
        Dictionary containing patient information.

    Returns
    -------
    int
        Predicted KTAS level.
    """

    # Convert API field names to the exact feature names
    # used during model training.
    mapped_data = {
        "Group": patient_data["group"],
        "Sex": patient_data["sex"],
        "Age": patient_data["age"],
        "Patients number per hour": patient_data["patients_number_per_hour"],
        "Arrival mode": patient_data["arrival_mode"],
        "Injury": patient_data["injury"],
        "Chief_complain": patient_data["chief_complain"],
        "Mental": patient_data["mental"],
        "Pain": patient_data["pain"],
        "NRS_pain": patient_data["nrs_pain"],
        "SBP": patient_data["sbp"],
        "DBP": patient_data["dbp"],
        "HR": patient_data["hr"],
        "RR": patient_data["rr"],
        "BT": patient_data["bt"],
        "Saturation": patient_data["saturation"],
        "Saturation_missing": patient_data["saturation_missing"],
    }

    input_df = pd.DataFrame([mapped_data])

    prediction = model.predict(input_df)

    return int(prediction[0])