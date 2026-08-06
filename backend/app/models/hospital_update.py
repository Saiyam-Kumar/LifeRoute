from typing import Optional
from pydantic import BaseModel


class HospitalUpdate(BaseModel):
    name: Optional[str] = None

    latitude: Optional[float] = None
    longitude: Optional[float] = None

    available_beds: Optional[int] = None
    available_icu: Optional[int] = None
    ventilators: Optional[int] = None

    specialists: Optional[list[str]] = None

    resources: Optional[list[str]] = None

    hospital_type: Optional[str] = None
    emergency_level: Optional[str] = None

    is_open: Optional[bool] = None