from fastapi import APIRouter
from app.database.firebase import db

router = APIRouter(prefix="/hospital", tags=["Hospital"])


@router.get("/")
def get_all_hospitals():
    hospitals = []

    docs = db.collection("hospitals").stream()

    for doc in docs:
        hospital = doc.to_dict()
        hospital["id"] = doc.id
        hospitals.append(hospital)

    return hospitals