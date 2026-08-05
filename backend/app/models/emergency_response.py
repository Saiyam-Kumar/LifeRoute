from pydantic import BaseModel


class EmergencyResponse(BaseModel):

    severity: str

    recommended_hospital: str

    eta: str

    distance: float