from typing import Optional
from pydantic import BaseModel


class HospitalUpdate(BaseModel):
    name: Optional[str] = None

    latitude: Optional[float] = None
    longitude: Optional[float] = None

    # Public hospital information
    address: Optional[str] = None
    phone: Optional[str] = None
    emergency_department: Optional[str] = None

    # Operational capacity
    available_beds: Optional[int] = None
    available_icu: Optional[int] = None
    ventilators: Optional[int] = None

    # Medical capabilities
    specialists: Optional[list[str]] = None
    resources: Optional[list[str]] = None

    # Hospital classification
    hospital_type: Optional[str] = None
    emergency_level: Optional[str] = None

    is_open: Optional[bool] = None