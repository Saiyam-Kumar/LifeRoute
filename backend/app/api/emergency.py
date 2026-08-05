from fastapi import APIRouter

from app.models.patient import PatientRequest
from app.services.emergency_service import EmergencyService

router = APIRouter(prefix="/emergency", tags=["Emergency"])

service = EmergencyService()


@router.post("/request")
def emergency_request(patient: PatientRequest):
    return service.process_emergency(patient)