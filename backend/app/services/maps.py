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
                timeout=10,
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

            # Fallback values
            return {
                "distance_km": 0,
                "eta_minutes": 15,
            }