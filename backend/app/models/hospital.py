from pydantic import BaseModel


class Hospital(BaseModel):
    name: str
    latitude: float
    longitude: float

    available_beds: int
    available_icu: int
    ventilators: int

    emergency_level: str
    hospital_type: str

    specialists: list[str]

    is_open: bool