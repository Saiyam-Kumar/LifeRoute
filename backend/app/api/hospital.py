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
# UPDATE AUTHENTICATED HOSPITAL
# --------------------------------------------------

@router.patch("/{hospital_id}")
def update_hospital(
    hospital_id: str,
    update: HospitalUpdate,
    decoded_token: dict = Depends(
        verify_firebase_token
    ),
):

    # --------------------------------------------------
    # 1. Get authenticated Firebase UID
    # --------------------------------------------------

    firebase_uid = decoded_token.get("uid")

    if not firebase_uid:
        return {
            "message": "Authenticated Firebase user UID not found."
        }


    # --------------------------------------------------
    # 2. Find hospital
    # --------------------------------------------------

    hospital = hospital_service.get_hospital_by_id(
        hospital_id
    )

    if hospital is None:
        return {
            "message": "Hospital not found"
        }


    # --------------------------------------------------
    # 3. Make sure this hospital belongs to the
    #    authenticated Firebase account
    # --------------------------------------------------

    if hospital.get("firebase_uid") != firebase_uid:

        return {
            "message":
                "You are not authorized to update this hospital."
        }


    # --------------------------------------------------
    # 4. Update only supplied fields
    # --------------------------------------------------

    update_data = update.model_dump(
        exclude_unset=True
    )


    # --------------------------------------------------
    # 5. Save to Firestore
    # --------------------------------------------------

    updated = hospital_service.update_hospital(
        hospital_id,
        update_data
    )

    if updated is None:
        return {
            "message": "Hospital not found"
        }


    # --------------------------------------------------
    # 6. Return updated fields
    # --------------------------------------------------

    return {
        "message":
            "Hospital resources updated successfully",

        "updated_fields":
            updated
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