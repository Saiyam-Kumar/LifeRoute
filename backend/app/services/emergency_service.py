from app.services.recommendation import RecommendationService


class EmergencyService:

    def __init__(self):
        self.recommendation = RecommendationService()

    def process_emergency(
        self,
        patient,
        patient_resources,
    ):
        """
        Processes an emergency request and returns
        the best hospital recommendation.
        """

        patient_location = (
            patient.latitude,
            patient.longitude
        )

        recommendation = self.recommendation.recommend_hospital(
            patient_location=patient_location,
            patient_resources=patient_resources,
        )

        return {
            "message": "Emergency processed successfully.",
            "patient": patient.model_dump(),
            "recommended_hospital": recommendation
        }