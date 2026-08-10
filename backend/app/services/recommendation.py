from copy import deepcopy
from concurrent.futures import ThreadPoolExecutor, as_completed
from math import radians, sin, cos, sqrt, atan2

from ai.hospital_engine.hospital_ranker import (
    recommend_hospital,
    calculate_resource_match,
)

from app.services.hospital_service import HospitalService
from app.services.maps import MapsService


class RecommendationService:

    # Only calculate real driving routes for the best candidates.
    MAX_ROUTE_CANDIDATES = 5

    def __init__(self):
        self.hospital_service = HospitalService()
        self.maps_service = MapsService()

    @staticmethod
    def calculate_geo_distance_km(origin, destination):
        """
        Calculate straight-line distance locally.
        
        This does not call OpenRouteService.
        """

        lat1, lon1 = origin
        lat2, lon2 = destination

        earth_radius_km = 6371.0

        lat1 = radians(lat1)
        lat2 = radians(lat2)

        delta_lat = radians(lat2 - lat1)
        delta_lon = radians(lon2 - lon1)

        a = (
            sin(delta_lat / 2) ** 2
            + cos(lat1)
            * cos(lat2)
            * sin(delta_lon / 2) ** 2
        )

        c = 2 * atan2(sqrt(a), sqrt(1 - a))

        return earth_radius_km * c

    def _route_hospital(self, patient_location, hospital):
        """
        Calculate the route for one hospital.
        Runs inside a worker thread so multiple ORS
        requests can happen concurrently.
        """

        hospital_copy = deepcopy(hospital)

        hospital_location = (
            hospital["latitude"],
            hospital["longitude"],
        )

        route = self.maps_service.calculate_route(
            patient_location,
            hospital_location,
        )

        hospital_copy["eta"] = route["eta_minutes"]
        hospital_copy["distance_km"] = route["distance_km"]

        return hospital_copy

    def recommend_hospital(
        self,
        patient_location,
        patient_resources,
    ):
        """
        Recommend the best hospital while minimizing
        routing latency.
        """

        # ---------------------------------------------
        # 1. Get hospitals from Firestore
        # ---------------------------------------------

        hospitals = self.hospital_service.get_all_hospitals()

        if not hospitals:
            return None

        # ---------------------------------------------
        # 2. Local resource + geographic filtering
        # ---------------------------------------------

        candidates = []

        for hospital in hospitals:

            if (
                hospital.get("latitude") is None
                or hospital.get("longitude") is None
            ):
                continue

            resource_score, matched_resources = calculate_resource_match(
                patient_resources,
                hospital,
            )

            hospital_location = (
                hospital["latitude"],
                hospital["longitude"],
            )

            geo_distance = self.calculate_geo_distance_km(
                patient_location,
                hospital_location,
            )

            hospital_copy = deepcopy(hospital)

            hospital_copy["_resource_score"] = resource_score
            hospital_copy["_matched_resources"] = matched_resources
            hospital_copy["_geo_distance_km"] = geo_distance

            candidates.append(hospital_copy)

        if not candidates:
            return None

        # ---------------------------------------------
        # 3. Select only the best candidates
        # ---------------------------------------------

        candidates.sort(
            key=lambda hospital: (
                hospital["_resource_score"],
                -hospital["_geo_distance_km"],
            ),
            reverse=True,
        )

        candidates = candidates[: self.MAX_ROUTE_CANDIDATES]

        # ---------------------------------------------
        # 4. Calculate ORS routes CONCURRENTLY
        # ---------------------------------------------

        enriched_hospitals = []

        with ThreadPoolExecutor(
            max_workers=len(candidates)
        ) as executor:

            futures = {
                executor.submit(
                    self._route_hospital,
                    patient_location,
                    hospital,
                ): hospital
                for hospital in candidates
            }

            for future in as_completed(futures):

                hospital = futures[future]

                try:
                    enriched_hospitals.append(
                        future.result()
                    )

                except Exception as e:
                    print(
                        f"Route calculation failed for "
                        f"{hospital.get('name', 'Unknown Hospital')}: {e}"
                    )

                    # Keep the hospital even if routing fails.
                    fallback_hospital = deepcopy(hospital)

                    fallback_hospital["eta"] = None
                    fallback_hospital["distance_km"] = (
                        round(
                            hospital["_geo_distance_km"],
                            2,
                        )
                    )

                    enriched_hospitals.append(
                        fallback_hospital
                    )

        # ---------------------------------------------
        # 5. Final hospital ranking
        # ---------------------------------------------

        return recommend_hospital(
            patient_resources,
            enriched_hospitals,
        )