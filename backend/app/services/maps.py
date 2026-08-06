import requests

from app.core.config import settings


class MapsService:

    BASE_URL = "https://api.openrouteservice.org/v2/directions/driving-car"

    def calculate_route(self, origin, destination):
        """
        Returns road distance (km) and ETA (minutes)
        using OpenRouteService.
        """

        headers = {
            "Authorization": settings.ORS_API_KEY,
            "Content-Type": "application/json"
        }

        body = {
            "coordinates": [
                [origin[1], origin[0]],
                [destination[1], destination[0]]
            ]
        }

        response = requests.post(
            self.BASE_URL,
            headers=headers,
            json=body,
            timeout=10
        )

        response.raise_for_status()

        data = response.json()

        summary = data["routes"][0]["summary"]

        return {
            "distance_km": round(summary["distance"] / 1000, 2),
            "eta_minutes": round(summary["duration"] / 60)
        }

    def calculate_distance(self, origin, destination):

        route = self.calculate_route(origin, destination)

        return route["distance_km"]

    def calculate_eta(self, origin, destination):

        route = self.calculate_route(origin, destination)

        return route["eta_minutes"]