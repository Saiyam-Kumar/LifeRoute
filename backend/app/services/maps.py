import math
import requests

from app.core.config import settings


class MapsService:

    BASE_URL = (
        "https://api.openrouteservice.org/v2/directions/driving-car"
    )

    TIMEOUT_SECONDS = 3

    def calculate_route(self, origin, destination):

        if not self._valid_coordinates(origin):
            return self._fallback_route(origin, destination)

        if not self._valid_coordinates(destination):
            return self._fallback_route(origin, destination)

        api_key = getattr(
            settings,
            "ORS_API_KEY",
            None,
        )

        if not api_key:
            print(
                "ORS API key unavailable. "
                "Using local route estimate."
            )

            return self._fallback_route(
                origin,
                destination,
            )

        headers = {
            "Authorization": api_key,
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
                timeout=self.TIMEOUT_SECONDS,
            )

            response.raise_for_status()

            data = response.json()

            routes = data.get("routes", [])

            if not routes:
                raise ValueError(
                    "ORS returned no routes."
                )

            summary = routes[0].get("summary")

            if not summary:
                raise ValueError(
                    "ORS response contains no route summary."
                )

            distance_meters = summary.get("distance")
            duration_seconds = summary.get("duration")

            if (
                distance_meters is None
                or duration_seconds is None
            ):
                raise ValueError(
                    "ORS route summary is incomplete."
                )

            return {
                "distance_km": round(
                    distance_meters / 1000,
                    2,
                ),
                "eta_minutes": max(
                    1,
                    round(duration_seconds / 60),
                ),
            }

        except requests.RequestException as error:

            print(
                f"ORS request failed: {error}. "
                "Using local route estimate."
            )

            return self._fallback_route(
                origin,
                destination,
            )

        except Exception as error:

            print(
                f"ORS response error: {error}. "
                "Using local route estimate."
            )

            return self._fallback_route(
                origin,
                destination,
            )

    @staticmethod
    def _fallback_route(
        origin,
        destination,
    ):

        distance_km = MapsService._calculate_distance_km(
            origin,
            destination,
        )

        estimated_eta = max(
            1,
            round(
                (distance_km / 30) * 60
            ),
        )

        return {
            "distance_km": round(
                distance_km,
                2,
            ),
            "eta_minutes": estimated_eta,
        }

    @staticmethod
    def _valid_coordinates(location):

        if not location or len(location) != 2:
            return False

        latitude, longitude = location

        if latitude is None or longitude is None:
            return False

        try:
            latitude = float(latitude)
            longitude = float(longitude)
        except (TypeError, ValueError):
            return False

        return (
            -90 <= latitude <= 90
            and -180 <= longitude <= 180
        )

    @staticmethod
    def _calculate_distance_km(
        origin,
        destination,
    ):

        lat1, lon1 = origin
        lat2, lon2 = destination

        earth_radius_km = 6371.0

        lat1 = math.radians(lat1)
        lat2 = math.radians(lat2)

        delta_lat = math.radians(
            lat2 - lat1
        )

        delta_lon = math.radians(
            lon2 - lon1
        )

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


