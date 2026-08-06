import joblib
from pathlib import Path
MODEL = None

def load_model():
    global MODEL

    if MODEL is None:
        model_path = Path(__file__).parent / "models" / "triage_model.joblib"
        MODEL = joblib.load(model_path)

    return MODEL