from pydantic import BaseModel


class PatientRequest(BaseModel):
    age: int
    gender: str
    heart_rate: int
    spo2: int
    systolic_bp: int
    diastolic_bp: int
    complaint: str
    latitude: float
    longitude: float