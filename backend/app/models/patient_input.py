from typing import Optional

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

    # Vitals can be missing when the patient
    # does not have measured vital signs.
    sbp: Optional[float] = None
    dbp: Optional[float] = None
    hr: Optional[float] = None
    rr: Optional[float] = None
    bt: Optional[float] = None
    saturation: Optional[float] = None

    # 0 = measured saturation/vitals available
    # 1 = vitals not available
    saturation_missing: int

    latitude: float
    longitude: float