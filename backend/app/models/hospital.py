from pydantic import BaseModel


class Hospital(BaseModel):

    id: str

    name: str

    latitude: float

    longitude: float

    address: str

    icu_beds: int

    ventilators: int

    emergency_doctors: int

    available: bool