from fastapi import APIRouter

from app.models.patient_input import PatientInput

from ai.predictor import predict_ktas
from ai.resource_engine.resource_predictor import predict_resources
from ai.hospital_engine.hospital_ranker import recommend_hospital

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


@router.post("/predict")
def predict(patient: PatientInput):

    patient_data = patient.model_dump()

    # ----------------------------
    # Step 1: KTAS Prediction
    # ----------------------------
    ktas_level = predict_ktas(patient_data)

    patient_data["ktas"] = ktas_level

    # ----------------------------
    # Step 2: Resource Allocation
    # ----------------------------
    resource_result = predict_resources(patient_data)

    # ----------------------------
    # Step 3: Hospital Ranking
    # ----------------------------
    hospital_result = recommend_hospital(
        resource_result["resources"]
    )

    # ----------------------------
    # Final Response
    # ----------------------------
    return {
        "ktas_level": ktas_level,
        "category": resource_result["category"],
        "resources": resource_result["resources"],
        "reasons": resource_result["reasons"],
        "recommended_hospital": hospital_result
    }