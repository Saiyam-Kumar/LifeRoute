import math
import requests

from app.core.config import settings


class MapsService:

    BASE_URL = "https://api.openrouteservice.org/v2/directions/driving-car"

    def calculate_route(self, origin, destination):

        headers = {
            "Authorization": settings.ORS_API_KEY,
            "Content-Type": "application/json",
        }

        body = {
            "coordinates": [
                [origin[1], origin[0]],
                [destination[1], destination[0]],
            ]
        }

        try:
            response = requests.post(
                self.BASE_URL,
                headers=headers,
                json=body,
                timeout=1,
            )

            response.raise_for_status()

            data = response.json()

            summary = data["routes"][0]["summary"]

            return {
                "distance_km": round(summary["distance"] / 1000, 2),
                "eta_minutes": round(summary["duration"] / 60),
            }

        except Exception as e:
            print("ORS Error:", e)

            # Fast local fallback when ORS is unavailable.
            distance_km = self._calculate_distance_km(
                origin,
                destination,
            )

            # Approximate urban driving speed.
            # This is only a fallback; ORS remains preferred.
            estimated_eta = max(
                1,
                round((distance_km / 30) * 60),
            )

            return {
                "distance_km": round(distance_km, 2),
                "eta_minutes": estimated_eta,
            }

    @staticmethod
    def _calculate_distance_km(origin, destination):

        lat1, lon1 = origin
        lat2, lon2 = destination

        earth_radius_km = 6371.0

        lat1 = math.radians(lat1)
        lat2 = math.radians(lat2)

        delta_lat = math.radians(lat2 - lat1)
        delta_lon = math.radians(lon2 - lon1)

        a = (
            math.sin(delta_lat / 2) ** 2
            + math.cos(lat1)
            * math.cos(lat2)
            * math.sin(delta_lon / 2) ** 2
        )

        c = 2 * math.atan2(
            math.sqrt(a),
            math.sqrt(1 - a),
        )

        return earth_radius_km * c