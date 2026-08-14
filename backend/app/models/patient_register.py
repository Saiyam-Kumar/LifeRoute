from pydantic import BaseModel


class PatientRegister(BaseModel):
    """
    Patient registration data.

    The Firebase UID and email are taken from the
    authenticated Firebase token, not from the client.
    """

    pass