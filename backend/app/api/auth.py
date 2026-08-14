from fastapi import APIRouter, Depends

from app.core.auth import verify_firebase_token
from app.services.auth_service import AuthService


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)

auth_service = AuthService()


@router.get("/me")
def get_current_user(
    decoded_token: dict = Depends(verify_firebase_token),
):
    uid = decoded_token["uid"]

    user = auth_service.get_user(uid)

    if user is None:
        return {
            "uid": uid,
            "email": decoded_token.get("email"),
            "message": "Authenticated Firebase user has no LifeRoute profile yet",
        }

    return user