import os
import json
import firebase_admin
from firebase_admin import credentials, firestore
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent.parent
SERVICE_ACCOUNT_KEY = BASE_DIR / "firebase_key.json"


if not firebase_admin._apps:

    # Local development: use firebase_key.json
    if SERVICE_ACCOUNT_KEY.exists():

        cred = credentials.Certificate(
            str(SERVICE_ACCOUNT_KEY)
        )

    # Production: use Firebase credentials from environment
    else:

        firebase_credentials = os.getenv(
            "FIREBASE_CREDENTIALS"
        )

        if not firebase_credentials:
            raise RuntimeError(
                "FIREBASE_CREDENTIALS environment variable is missing."
            )

        cred = credentials.Certificate(
            json.loads(firebase_credentials)
        )

    firebase_admin.initialize_app(cred)


db = firestore.client()