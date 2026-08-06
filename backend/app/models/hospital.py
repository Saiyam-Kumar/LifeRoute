from pydantic import BaseModel


class Hospital(BaseModel):
    name: str

    latitude: float
    longitude: float

    available_beds: int
    available_icu: int
    ventilators: int

    specialists: list[str]

    resources: list[str]

    hospital_type: str
    emergency_level: str

    is_open: bool