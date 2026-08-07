from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from app.core.config import settings

from app.api.health import router as health_router
from app.api.emergency import router as emergency_router
from app.api.hospital import router as hospital_router
from app.api.ai import router as ai_router

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------------------
# Validation Error Handler
# ----------------------------
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    print("\n========== VALIDATION ERROR ==========")
    print(exc.errors())
    print("======================================\n")

    return JSONResponse(
        status_code=422,
        content={"detail": exc.errors()},
    )

# ----------------------------
# Routers
# ----------------------------
app.include_router(health_router)
app.include_router(emergency_router)
app.include_router(hospital_router)
app.include_router(ai_router)