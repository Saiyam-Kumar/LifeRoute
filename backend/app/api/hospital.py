from fastapi import APIRouter

from app.models.hospital import Hospital
from app.models.hospital_update import HospitalUpdate
from app.services.hospital_service import HospitalService

router = APIRouter(
    prefix="/hospital",
    tags=["Hospital"]
)

hospital_service = HospitalService()


@router.get("/")
def get_all_hospitals():
    return hospital_service.get_all_hospitals()


@router.post("/")
def add_hospital(hospital: Hospital):

    result = hospital_service.add_hospital(
        hospital.model_dump()
    )

    return {
        "message": "Hospital added successfully",
        "id": result["id"],
        "hospital": result["hospital"]
    }


@router.get("/{hospital_id}")
def get_hospital(hospital_id: str):

    hospital = hospital_service.get_hospital_by_id(hospital_id)

    if hospital is None:
        return {"message": "Hospital not found"}

    return hospital


@router.patch("/{hospital_id}")
def update_hospital(hospital_id: str, update: HospitalUpdate):

    updated = hospital_service.update_hospital(
        hospital_id,
        update.model_dump(exclude_unset=True)
    )

    if updated is None:
        return {"message": "Hospital not found"}

    return {
        "message": "Hospital updated successfully",
        "updated_fields": updated
    }


@router.delete("/{hospital_id}")
def delete_hospital(hospital_id: str):

    deleted = hospital_service.delete_hospital(hospital_id)

    if not deleted:
        return {"message": "Hospital not found"}

    return {
        "message": "Hospital deleted successfully"
    }