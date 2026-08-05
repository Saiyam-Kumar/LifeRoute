from fastapi import APIRouter
from app.database.firebase import db
from app.models.hospital import Hospital
from app.models.hospital_update import HospitalUpdate

router = APIRouter(
    prefix="/hospital",
    tags=["Hospital"]
)


@router.get("/")
def get_all_hospitals():
    hospitals = []

    docs = db.collection("hospitals").stream()

    for doc in docs:
        hospital = doc.to_dict()
        hospital["id"] = doc.id
        hospitals.append(hospital)

    return hospitals


@router.post("/")
def add_hospital(hospital: Hospital):

    hospital_data = hospital.model_dump()

    doc_ref = db.collection("hospitals").document()

    doc_ref.set(hospital_data)

    return {
        "message": "Hospital added successfully",
        "id": doc_ref.id,
        "hospital": hospital_data
    }

@router.get("/{hospital_id}")
def get_hospital(hospital_id: str):

    doc = db.collection("hospitals").document(hospital_id).get()

    if not doc.exists:
        return {"message": "Hospital not found"}

    hospital = doc.to_dict()
    hospital["id"] = doc.id

    return hospital

@router.patch("/{hospital_id}")
def update_hospital(hospital_id: str, update: HospitalUpdate):

    doc_ref = db.collection("hospitals").document(hospital_id)

    if not doc_ref.get().exists:
        return {"message": "Hospital not found"}

    update_data = update.model_dump(exclude_unset=True)

    doc_ref.update(update_data)

    return {
        "message": "Hospital updated successfully",
        "updated_fields": update_data
    }

@router.delete("/{hospital_id}")
def delete_hospital(hospital_id: str):

    doc_ref = db.collection("hospitals").document(hospital_id)

    if not doc_ref.get().exists:
        return {"message": "Hospital not found"}

    doc_ref.delete()

    return {
        "message": "Hospital deleted successfully"
    }