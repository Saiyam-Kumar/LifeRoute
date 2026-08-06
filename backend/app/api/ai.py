from fastapi import APIRouter

from app.models.patient_input import PatientInput
from ai.predictor import predict_ktas

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


@router.post("/predict")
def predict(patient: PatientInput):
    ktas_level = predict_ktas(patient.model_dump())

    return {
        "ktas_level": ktas_level
    }