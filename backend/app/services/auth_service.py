from app.database.firebase import db


class AuthService:
    COLLECTION = "users"

    def get_user(self, uid: str):
        doc = db.collection(self.COLLECTION).document(uid).get()

        if not doc.exists:
            return None

        user = doc.to_dict()
        user["uid"] = doc.id

        return user

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