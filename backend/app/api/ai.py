from fastapi import APIRouter, Depends

from app.models.patient_input import PatientInput
from app.services.recommendation import RecommendationService
from app.services.patient_service import PatientService
from app.core.auth import verify_firebase_token

from ai.predictor import predict_ktas
from ai.resource_engine.resource_predictor import predict_resources


router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


recommendation_service = RecommendationService()
patient_service = PatientService()


@router.post("/predict")
def predict(
    patient: PatientInput,
    decoded_token: dict = Depends(
        verify_firebase_token
    ),
):

    # --------------------------------------------------
    # Authenticated patient
    # --------------------------------------------------

    uid = decoded_token.get("uid")

    if not uid:
        return {
            "error":
                "Authenticated user UID not found."
        }


    # --------------------------------------------------
    # Initial live state
    # --------------------------------------------------

    patient_service.update_emergency_state(
        uid,
        {
            "stage": "assessment_processing",
            "status": "Emergency assessment is being processed.",
        }
    )


    patient_data = patient.model_dump()


    # --------------------------------------------------
    # Step 1: KTAS Prediction
    # --------------------------------------------------

    ktas_level = predict_ktas(
        patient_data
    )

    patient_data["ktas"] = ktas_level


    # --------------------------------------------------
    # Update live state after KTAS
    # --------------------------------------------------

    patient_service.update_emergency_state(
        uid,
        {
            "stage": "ktas_completed",
            "status": "Emergency triage completed.",
            "ktas_level": ktas_level,
        }
    )


    # --------------------------------------------------
    # Step 2: Resource Allocation
    # --------------------------------------------------

    resource_result = predict_resources(
        patient_data
    )

    resources = resource_result["resources"]


    # --------------------------------------------------
    # Update live state after resources
    # --------------------------------------------------

    patient_service.update_emergency_state(
        uid,
        {
            "stage": "resources_identified",
            "status":
                "Required emergency resources identified.",
            "ktas_level": ktas_level,
            "category":
                resource_result["category"],
            "resources": resources,
            "reasons":
                resource_result["reasons"],
        }
    )


    # --------------------------------------------------
    # Step 3: Hospital Recommendation
    # --------------------------------------------------

    patient_location = (
        patient.latitude,
        patient.longitude
    )


    patient_service.update_emergency_state(
        uid,
        {
            "stage": "hospital_matching",
            "status":
                "Matching patient requirements with hospitals.",
            "ktas_level": ktas_level,
            "resources": resources,
        }
    )


    hospital_result = (
        recommendation_service.recommend_hospital(
            patient_location=patient_location,
            patient_resources=resources
        )
    )


    # --------------------------------------------------
    # Extract recommendation information
    # --------------------------------------------------

    recommended_hospital_name = None
    eta = None
    distance_km = None

    if hospital_result:

        recommended_hospital_name = (
            hospital_result.get("hospital")
            or hospital_result.get("name")
        )

        eta = hospital_result.get(
            "eta"
        )

        distance_km = hospital_result.get(
            "distance_km"
        )


    # --------------------------------------------------
    # Final live state
    # --------------------------------------------------

    patient_service.update_emergency_state(
        uid,
        {
            "stage": "hospital_recommended",
            "status":
                "Most suitable hospital has been identified.",
            "ktas_level": ktas_level,
            "category":
                resource_result["category"],
            "resources": resources,
            "recommended_hospital":
                recommended_hospital_name,
            "eta": eta,
            "distance_km": distance_km,
        }
    )


    # --------------------------------------------------
    # Final response
    # --------------------------------------------------

    return {
        "ktas_level": ktas_level,
        "category":
            resource_result["category"],
        "resources": resources,
        "reasons":
            resource_result["reasons"],
        "recommended_hospital":
            hospital_result
    }