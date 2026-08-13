from fastapi import Header, HTTPException
from firebase_admin import auth


def verify_firebase_token(authorization: str | None = Header(default=None)):
    """
    Verify a Firebase ID token sent as:

    Authorization: Bearer <firebase_id_token>

    Returns the decoded Firebase token if valid.
    """

    if not authorization:
        raise HTTPException(
            status_code=401,
            detail="Authorization header is required",
        )

    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Authorization header must use Bearer token",
        )

    id_token = authorization.split("Bearer ", 1)[1].strip()

    if not id_token:
        raise HTTPException(
            status_code=401,
            detail="Firebase ID token is missing",
        )

    try:
        decoded_token = auth.verify_id_token(id_token)
        return decoded_token

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired Firebase ID token",
        )