class MapsService:

    def get_nearby_hospitals(self, latitude, longitude):

        return [
            {
                "name": "AIIMS Delhi",
                "distance_km": 2.4
            },
            {
                "name": "Safdarjung Hospital",
                "distance_km": 3.1
            },
            {
                "name": "Apollo Hospital",
                "distance_km": 5.6
            }
        ]


    def calculate_eta(self, origin, destination):

        return 12


    def calculate_distance(self, origin, destination):

        return 5.6