from fastapi import APIRouter, Depends

from app.models.hospital import Hospital
from app.models.hospital_update import HospitalUpdate
from app.models.hospital_register import HospitalRegisterRequest

from app.services.hospital_service import HospitalService

from app.core.auth import verify_firebase_token


router = APIRouter(
    prefix="/hospital",
    tags=["Hospital"]
)

hospital_service = HospitalService()


# --------------------------------------------------
# GET ALL HOSPITALS
# --------------------------------------------------

@router.get("/")
def get_all_hospitals():

    return hospital_service.get_all_hospitals()


# --------------------------------------------------
# REGISTER AUTHENTICATED HOSPITAL
# --------------------------------------------------

@router.post("/register")
def register_hospital(
    hospital: HospitalRegisterRequest,
    decoded_token: dict = Depends(verify_firebase_token),
):

    firebase_uid = decoded_token["uid"]

    firebase_email = decoded_token.get("email")

    email = firebase_email or hospital.email

    result = hospital_service.register_hospital(
        firebase_uid=firebase_uid,
        email=email,
        name=hospital.name,
    )

    return {
        "message": "Hospital registered successfully",
        "hospital": result,
    }


# --------------------------------------------------
# EXISTING ADMIN / DIRECT HOSPITAL CREATION
# --------------------------------------------------

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


# --------------------------------------------------
# GET HOSPITAL BY ID
# --------------------------------------------------

@router.get("/{hospital_id}")
def get_hospital(hospital_id: str):

    hospital = hospital_service.get_hospital_by_id(
        hospital_id
    )

    if hospital is None:
        return {
            "message": "Hospital not found"
        }

    return hospital


# --------------------------------------------------
# UPDATE HOSPITAL
# --------------------------------------------------

@router.patch("/{hospital_id}")
def update_hospital(
    hospital_id: str,
    update: HospitalUpdate
):

    updated = hospital_service.update_hospital(
        hospital_id,
        update.model_dump(exclude_unset=True)
    )

    if updated is None:
        return {
            "message": "Hospital not found"
        }

    return {
        "message": "Hospital updated successfully",
        "updated_fields": updated
    }


# --------------------------------------------------
# DELETE HOSPITAL
# --------------------------------------------------

@router.delete("/{hospital_id}")
def delete_hospital(hospital_id: str):

    deleted = hospital_service.delete_hospital(
        hospital_id
    )

    if not deleted:
        return {
            "message": "Hospital not found"
        }

    return {
        "message": "Hospital deleted successfully"
    }