from fastapi import APIRouter

from app.models.patient_input import PatientInput

from ai.predictor import predict_ktas
from ai.resource_engine.resource_predictor import predict_resources

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


@router.post("/predict")
def predict(patient: PatientInput):

    # Convert Pydantic model to dictionary
    patient_data = patient.model_dump()

    # ----------------------------
    # Step 1: KTAS Prediction
    # ----------------------------
    ktas_level = predict_ktas(patient_data)

    # Add KTAS prediction for Resource Engine
    patient_data["ktas"] = ktas_level

    # ----------------------------
    # Step 2: Resource Prediction
    # ----------------------------
    resource_result = predict_resources(patient_data)

    # ----------------------------
    # Final Response
    # ----------------------------
    return {
        "ktas_level": ktas_level,
        "category": resource_result["category"],
        "resources": resource_result["resources"],
        "reasons": resource_result["reasons"]
    }