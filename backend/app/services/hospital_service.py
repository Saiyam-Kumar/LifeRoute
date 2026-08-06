from app.database.firebase import db


class HospitalService:
    """
    Handles all Firestore operations related to hospitals.
    """

    def get_all_hospitals(self):
        hospitals = []

        docs = db.collection("hospitals").stream()

        for doc in docs:
            hospital = doc.to_dict()
            hospital["id"] = doc.id
            hospitals.append(hospital)

        return hospitals

    def get_hospital_by_id(self, hospital_id: str):

        doc = db.collection("hospitals").document(hospital_id).get()

        if not doc.exists:
            return None

        hospital = doc.to_dict()
        hospital["id"] = doc.id

        return hospital

    def add_hospital(self, hospital_data: dict):

        doc_ref = db.collection("hospitals").document()

        doc_ref.set(hospital_data)

        return {
            "id": doc_ref.id,
            "hospital": hospital_data
        }

    def update_hospital(self, hospital_id: str, update_data: dict):

        doc_ref = db.collection("hospitals").document(hospital_id)

        if not doc_ref.get().exists:
            return None

        doc_ref.update(update_data)

        return update_data

    def delete_hospital(self, hospital_id: str):

        doc_ref = db.collection("hospitals").document(hospital_id)

        if not doc_ref.get().exists:
            return False

        doc_ref.delete()

        return True