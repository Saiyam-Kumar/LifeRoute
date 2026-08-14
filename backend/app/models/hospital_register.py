from pydantic import BaseModel


class HospitalRegisterRequest(BaseModel):
    name: str
    email: str