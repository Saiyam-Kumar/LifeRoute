from app.database.firebase import db


class HospitalService:
    """
    Handles all Firestore operations related to hospitals.
    """

    COLLECTION = "hospitals"

    def get_all_hospitals(self):
        hospitals = []

        docs = db.collection(self.COLLECTION).stream()

        for doc in docs:
            hospital = doc.to_dict()
            hospital["id"] = doc.id
            hospitals.append(hospital)

        return hospitals

    def get_hospital_by_id(self, hospital_id: str):

        doc = db.collection(self.COLLECTION).document(hospital_id).get()

        if not doc.exists:
            return None

        hospital = doc.to_dict()
        hospital["id"] = doc.id

        return hospital

    def get_hospital_by_firebase_uid(self, firebase_uid: str):

        docs = (
            db.collection(self.COLLECTION)
            .where("firebase_uid", "==", firebase_uid)
            .limit(1)
            .stream()
        )

        for doc in docs:
            hospital = doc.to_dict()
            hospital["id"] = doc.id
            return hospital

        return None

    def register_hospital(
        self,
        firebase_uid: str,
        email: str,
        name: str,
    ):

        # Prevent duplicate hospital accounts
        existing = self.get_hospital_by_firebase_uid(firebase_uid)

        if existing:
            return existing

        doc_ref = db.collection(self.COLLECTION).document()

        hospital_data = {
            "firebase_uid": firebase_uid,
            "email": email,
            "name": name,

            # Location / contact
            "address": "",
            "phone": "",
            "latitude": 0.0,
            "longitude": 0.0,
            "emergency_department": "Emergency Department",

            # Operational defaults
            "available_beds": 0,
            "available_icu": 0,
            "ventilators": 0,

            # Medical capabilities
            "specialists": [],
            "resources": [],

            # Classification defaults
            "hospital_type": "Multispeciality",
            "emergency_level": "Level 1",

            "is_open": True,
        }

        doc_ref.set(hospital_data)

        hospital_data["id"] = doc_ref.id

        return hospital_data

    def add_hospital(self, hospital_data: dict):

        doc_ref = db.collection(self.COLLECTION).document()

        doc_ref.set(hospital_data)

        return {
            "id": doc_ref.id,
            "hospital": hospital_data
        }

    def update_hospital(self, hospital_id: str, update_data: dict):

        doc_ref = db.collection(self.COLLECTION).document(hospital_id)

        if not doc_ref.get().exists:
            return None

        doc_ref.update(update_data)

        return update_data

    def delete_hospital(self, hospital_id: str):

        doc_ref = db.collection(self.COLLECTION).document(hospital_id)

        if not doc_ref.get().exists:
            return False

        doc_ref.delete()

        return True