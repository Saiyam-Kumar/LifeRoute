from pydantic import BaseModel


class Hospital(BaseModel):
    name: str

    latitude: float
    longitude: float

    # Public hospital information
    address: str
    phone: str
    emergency_department: str

    # Operational capacity
    available_beds: int
    available_icu: int
    ventilators: int

    # Medical capabilities
    specialists: list[str]
    resources: list[str]

    # Hospital classification
    hospital_type: str
    emergency_level: str

    is_open: bool