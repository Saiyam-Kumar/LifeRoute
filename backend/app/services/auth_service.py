from app.database.firebase import db


class AuthService:
    COLLECTION = "users"
    HOSPITAL_COLLECTION = "hospitals"

    def get_user(self, uid: str):
        # First check normal LifeRoute users collection
        doc = db.collection(self.COLLECTION).document(uid).get()

        if doc.exists:
            user = doc.to_dict()
            user["uid"] = doc.id
            return user

        # If no normal user exists, check hospital records
        hospitals = (
            db.collection(self.HOSPITAL_COLLECTION)
            .where("firebase_uid", "==", uid)
            .limit(1)
            .stream()
        )

        for hospital_doc in hospitals:
            hospital = hospital_doc.to_dict()

            return {
                "uid": uid,
                "email": hospital.get("email"),
                "role": "hospital",
                "hospital_id": hospital_doc.id,
                "hospital": {
                    **hospital,
                    "id": hospital_doc.id,
                },
            }

        return None

    def create_user(self, uid: str, user_data: dict):
        doc_ref = db.collection(self.COLLECTION).document(uid)

        if doc_ref.get().exists:
            return None

        data = {
            "uid": uid,
            **user_data,
        }

        doc_ref.set(data)

        return data

    def update_user(self, uid: str, update_data: dict):
        doc_ref = db.collection(self.COLLECTION).document(uid)

        if not doc_ref.get().exists:
            return None

        doc_ref.update(update_data)

        updated = doc_ref.get().to_dict()
        updated["uid"] = doc_ref.id

        return updated