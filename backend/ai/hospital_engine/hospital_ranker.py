def calculate_resource_match(patient_resources, hospital):
    matched = []

    for resource in patient_resources:

        if resource == "ICU":
            if hospital.get("available_icu", 0) > 0:
                matched.append(resource)

        elif resource == "Ventilator":
            if hospital.get("ventilators", 0) > 0:
                matched.append(resource)

        elif resource in hospital.get("specialists", []):
            matched.append(resource)

        elif resource in hospital.get("resources", []):
            matched.append(resource)

    score = 0

    if patient_resources:
        score = (len(matched) / len(patient_resources)) * 100

    return score, matched


def calculate_eta_score(hospital):
    eta = hospital.get("eta", 999)

    return max(0, 100 - eta * 5)


def calculate_open_score(hospital):
    return 100 if hospital.get("is_open", False) else 0


def recommend_hospital(patient_resources, hospitals):

    best_hospital = None
    best_score = -1

    for hospital in hospitals:

        resource_score, matched = calculate_resource_match(
            patient_resources,
            hospital
        )

        eta = hospital.get("eta")

        # If routing failed, don't give it an artificial advantage.
        if eta is None:
            eta_score = 0
        else:
            eta_score = max(0, 100 - eta * 5)

        open_score = calculate_open_score(hospital)

        # --------------------------------------------------
        # Resource-first recommendation
        # --------------------------------------------------

        # Hospitals that cannot provide ANY required resource
        # should not be preferred.
        if patient_resources and resource_score == 0:
            continue

        # Main score:
        # 70% resource suitability
        # 25% travel time
        # 5% availability/open status
        final_score = (
            resource_score * 0.70
            + eta_score * 0.25
            + open_score * 0.05
        )

        if final_score > best_score:

            best_score = final_score

            best_hospital = {
                "hospital": hospital["name"],
                "score": round(final_score, 2),

                "latitude": hospital.get("latitude"),
                "longitude": hospital.get("longitude"),

                "matched_resources": matched,

                "missing_resources": [
                    r for r in patient_resources
                    if r not in matched
                ],

                "eta": hospital.get("eta"),
                "distance_km": hospital.get("distance_km"),

                "phone": hospital.get("phone"),
                "address": hospital.get("address"),
                "emergency_department": hospital.get(
                    "emergency_department",
                    "Emergency Department"
                ),
            }

    return best_hospital