from fastapi import APIRouter

router = APIRouter(prefix="/hospital", tags=["Hospital"])


@router.get("/")
def get_hospitals():
    return {
        "message": "Hospital API coming soon."
    }