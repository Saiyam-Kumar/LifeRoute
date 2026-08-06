from copy import deepcopy

from ai.hospital_engine.hospital_ranker import recommend_hospital

from app.services.hospital_service import HospitalService
from app.services.maps import MapsService


class RecommendationService:

    def __init__(self):
        self.hospital_service = HospitalService()
        self.maps_service = MapsService()

    def recommend_hospital(
        self,
        patient_location,
        patient_resources,
    ):
        """
        Fetch hospitals, attach ETA & distance,
        then let the AI choose the best hospital.
        """

        hospitals = self.hospital_service.get_all_hospitals()

        enriched_hospitals = []

        for hospital in hospitals:

            hospital_copy = deepcopy(hospital)

            hospital_location = (
                hospital["latitude"],
                hospital["longitude"]
            )

            route = self.maps_service.calculate_route(
                patient_location,
                hospital_location
            )

            hospital_copy["eta"] = route["eta_minutes"]
            hospital_copy["distance_km"] = route["distance_km"]

            enriched_hospitals.append(hospital_copy)

        return recommend_hospital(
            patient_resources,
            enriched_hospitals
        )