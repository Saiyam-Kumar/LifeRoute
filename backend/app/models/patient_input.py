from pydantic import BaseModel


class PatientInput(BaseModel):
    group: int
    sex: str
    age: int
    patients_number_per_hour: int
    arrival_mode: str
    injury: str
    chief_complain: str
    mental: str
    pain: int
    nrs_pain: int
    sbp: int
    dbp: int
    hr: int
    rr: int
    bt: float
    saturation: int
    saturation_missing: int