from app.services.maps import MapsService


class EmergencyService:

    def __init__(self):
        self.maps = MapsService()

    def process_emergency(self, patient):

        hospitals = self.maps.get_nearby_hospitals(
            patient.latitude,
            patient.longitude
        )

        return {
            "message": "Emergency request received.",
            "patient": patient.model_dump(),
            "nearby_hospitals": hospitals
        }