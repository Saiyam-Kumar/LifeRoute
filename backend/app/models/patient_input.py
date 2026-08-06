from pydantic import BaseModel


class PatientInput(BaseModel):
    group: int
    sex: int
    age: int
    patients_number_per_hour: int
    arrival_mode: int
    injury: int
    chief_complain: str
    mental: int
    pain: int
    nrs_pain: int
    sbp: float
    dbp: float
    hr: float
    rr: float
    bt: float
    saturation: float
    saturation_missing: int

    latitude: float
    longitude: float