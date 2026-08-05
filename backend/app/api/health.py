from fastapi import APIRouter
from app.core.config import settings

router = APIRouter(tags=["Health"])


@router.get("/")
def home():
    return {
        "message": f"{settings.APP_NAME} Running!",
        "version": settings.APP_VERSION,
    }


@router.get("/health")
def health():
    return {
        "status": "healthy",
        "server": settings.APP_NAME,
        "version": settings.APP_VERSION,
    }